import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import {
	type Token,
	type TokenPayload,
	type UpdatePasswordTokenPayload,
} from "~/libs/modules/token/token.js";
import {
	type UserAuthResponseDto,
	type UserEntity,
	type UserService,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { AuthError } from "./libs/exceptions/exceptions.js";
import { type AuthUpdatePasswordResponseDto } from "./libs/types/types.js";

type Constructor = {
	encrypt: Encrypt;
	token: Token<TokenPayload>;
	updatePasswordLink: string;
	updatePasswordToken: Token<UpdatePasswordTokenPayload>;
	userService: UserService;
};

class AuthService {
	private encrypt: Encrypt;
	private token: Token<TokenPayload>;
	private updatePasswordLink: string;
	private updatePasswordToken: Token<UpdatePasswordTokenPayload>;
	private userService: UserService;

	public constructor({
		encrypt,
		token,
		updatePasswordLink,
		updatePasswordToken,
		userService,
	}: Constructor) {
		this.encrypt = encrypt;
		this.token = token;
		this.updatePasswordLink = updatePasswordLink;
		this.updatePasswordToken = updatePasswordToken;
		this.userService = userService;
	}

	private async verifyLoginCredentials({
		email,
		password,
	}: UserSignInRequestDto): Promise<UserEntity> | never {
		const user = await this.userService.getByEmail(email);

		if (!user) {
			throw new AuthError({
				message: ExceptionMessage.INVALID_CREDENTIALS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const { passwordHash, passwordSalt: salt } = user.toNewObject();
		const isEqualPassword = await this.encrypt.compare({
			password,
			passwordHash,
			salt,
		});

		if (!isEqualPassword) {
			throw new AuthError({
				message: ExceptionMessage.INVALID_CREDENTIALS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return user;
	}

	private async verifyUpdatePasswordToken(
		token: string,
	): Promise<UserAuthResponseDto> {
		const {
			payload: { updatedAt, userId },
		} = await this.updatePasswordToken.verify(token);

		const user = await this.userService.findById(userId);
		const userUpdatedAt = new Date(user?.updatedAt as string).toISOString();

		if (!user || updatedAt !== userUpdatedAt) {
			throw new AuthError({
				message: ExceptionMessage.UNAUTHORIZED,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		return user;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const user = await this.verifyLoginCredentials(userRequestDto);

		const { id } = user.toObject();

		return {
			token: await this.token.create({ userId: id }),
			user: user.toObject(),
		};
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const user = await this.userService.getByEmail(userRequestDto.email);
		const hasUser = Boolean(user);

		if (hasUser) {
			throw new AuthError({
				message: ExceptionMessage.EMAIL_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const newUser = await this.userService.create(userRequestDto);

		return {
			token: await this.token.create({ userId: newUser.id }),
			user: newUser,
		};
	}

	public async updatePassword(
		password: string,
		token: string,
	): Promise<AuthUpdatePasswordResponseDto> {
		const user = await this.verifyUpdatePasswordToken(token);
		const updatedUser = await this.userService.updatePassword(
			user.id,
			password,
		);

		const newToken = await this.token.create({ userId: user.id });

		return {
			token: newToken,
			user: updatedUser,
		};
	}
}

export { AuthService };
