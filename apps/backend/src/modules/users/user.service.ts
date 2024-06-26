import { ExceptionMessage } from "~/libs/enums/enums.js";
import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserError } from "./libs/exceptions/exceptions.js";
import {
	type UserAuthResponseDto,
	type UserProfileRequestDto,
	type UserSignUpRequestDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encrypt: Encrypt;
	private userRepository: UserRepository;

	public constructor(encrypt: Encrypt, userRepository: UserRepository) {
		this.encrypt = encrypt;
		this.userRepository = userRepository;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserAuthResponseDto> {
		const { hash, salt } = await this.encrypt.encrypt(payload.password);

		const user = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				firstName: payload.firstName,
				lastName: payload.lastName,
				passwordHash: hash,
				passwordSalt: salt,
			}),
		);

		return user.toObject();
	}

	public async delete(userId: number): Promise<boolean> {
		const user = await this.userRepository.find(userId);

		if (!user) {
			throw new UserError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.userRepository.delete(userId);
	}

	public find(): Promise<UserAuthResponseDto | null> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserAuthResponseDto[]> {
		const users = await this.userRepository.findAll();

		return users.map((user) => user.toObject());
	}

	public async findById(id: number): Promise<UserAuthResponseDto | null> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new UserError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return user.toObject();
	}

	public async getByEmail(email: string): Promise<UserEntity | null> {
		return await this.userRepository.getByEmail(email);
	}

	public async getByNickname(nickname: string): Promise<UserEntity | null> {
		return await this.userRepository.getByPhoneNumber(nickname);
	}

	public async update(
		userId: number,
		userProfile: UserProfileRequestDto,
	): Promise<UserAuthResponseDto | null> {
		const { firstName, lastName, phoneNumber, sex } = userProfile;
		const user = await this.userRepository.find(userId);
		const hasUser = Boolean(user);
		const isSameUser = user?.toObject().id === userId;

		if (hasUser && !isSameUser) {
			throw new UserError({
				message: ExceptionMessage.NICKNAME_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const updatedUser = await this.userRepository.update(userId, {
			firstName,
			lastName,
			phoneNumber,
			sex,
		});

		return updatedUser?.toObject() ?? null;
	}

	public async updatePassword(
		userId: number,
		password: string,
	): Promise<UserAuthResponseDto> {
		const { hash, salt } = await this.encrypt.encrypt(password);

		const updatedUser = await this.userRepository.updatePassword(userId, {
			hash,
			salt,
		});

		return updatedUser.toObject();
	}
}

export { UserService };
