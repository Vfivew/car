import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute, AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppForm,
	useAppSelector,
	useAppTitle,
	useCallback,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
		validationSchema: userSignInValidationSchema,
	});

	const authDataStatus = useAppSelector(({ auth }) => {
		return auth.dataStatus;
	});

	const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	const handleChangePasswordVisibility = useCallback(() => {
		setPasswordVisibility(!isPasswordVisible);
	}, [isPasswordVisible]);

	useAppTitle(AppTitle.SIGN_IN);

	const isLoading = authDataStatus === DataStatus.PENDING;

	return (
		<form className={styles["form"]} onSubmit={handleFormSubmit}>
			<div>
				<h2 className={styles["title"]}>Log In</h2>
				<p className={styles["subtitle"]}>
					No account? Go to{" "}
					<Link className={styles["link"]} to={AppRoute.SIGN_UP}>
						Create an account
					</Link>
				</p>
			</div>
			<Input
				control={control}
				errors={errors}
				inputMode="email"
				label="Email"
				name="email"
				placeholder="email@example.com"
				type="text"
			/>
			<div className={styles["password-input"]}>
				<Link
					className={styles["forgot-password-link"]}
					to={AppRoute.FORGOT_PASSWORD}
				>
					Forgot password?
				</Link>
				<Input
					className={styles["password"]}
					control={control}
					errors={errors}
					label="Password"
					name="password"
					placeholder="••••••••"
					type={isPasswordVisible ? "text" : "password"}
				/>
				<Button
					className={styles["icon"]}
					hasVisuallyHiddenLabel
					iconName={isPasswordVisible ? "eye" : "eyeOff"}
					label="eye-icon"
					onClick={handleChangePasswordVisibility}
					style="secondary"
				/>
			</div>
			<Button
				className={styles["button"]}
				isDisabled={isLoading}
				isLoading={isLoading}
				label="Log In"
				type="submit"
			/>
		</form>
	);
};

export { SignInForm };
