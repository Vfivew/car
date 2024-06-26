import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type UserAuthResponseDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { type AuthService } from "./auth.service.js";
import { AuthApiPath } from "./libs/enums/enums.js";
import { type AuthUpdatePasswordRequestDto } from "./libs/types/types.js";
import { authUpdatePasswordValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

class AuthController extends BaseController {
	private authService: AuthService;

	public constructor(logger: Logger, authService: AuthService) {
		super(logger, APIPath.AUTH);

		this.authService = authService;

		this.addRoute({
			handler: (options) =>
				this.signUp(
					options as APIHandlerOptions<{
						body: UserSignUpRequestDto;
					}>,
				),
			method: "POST",
			path: AuthApiPath.SIGN_UP,
			validation: {
				body: userSignUpValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.updatePassword(
					options as APIHandlerOptions<{
						body: AuthUpdatePasswordRequestDto;
					}>,
				);
			},
			method: "PATCH",
			path: AuthApiPath.UPDATE_PASSWORD,
			validation: {
				body: authUpdatePasswordValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.getAuthenticatedUser(
					options as APIHandlerOptions<{ user: UserAuthResponseDto | null }>,
				),
			method: "GET",
			path: AuthApiPath.AUTHENTICATED_USER,
		});

		this.addRoute({
			handler: (options) =>
				this.signIn(
					options as APIHandlerOptions<{
						body: UserSignInRequestDto;
					}>,
				),
			method: "POST",
			path: AuthApiPath.SIGN_IN,
			validation: {
				body: userSignInValidationSchema,
			},
		});
	}

	private getAuthenticatedUser(options: APIHandlerOptions): APIHandlerResponse {
		const { user } = options;

		return {
			payload: user ?? null,
			status: HTTPCode.OK,
		};
	}

	private async signIn(
		options: APIHandlerOptions<{
			body: UserSignInRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.signIn(options.body),
			status: HTTPCode.OK,
		};
	}

	private async signUp(
		options: APIHandlerOptions<{
			body: UserSignUpRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.signUp(options.body),
			status: HTTPCode.CREATED,
		};
	}

	private async updatePassword({
		body: { password, token },
	}: APIHandlerOptions<{
		body: AuthUpdatePasswordRequestDto;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.updatePassword(password, token),
			status: HTTPCode.OK,
		};
	}
}

export { AuthController };
