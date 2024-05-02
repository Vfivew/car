const AppRoute = {
	ANY: "*",
	FORGOT_PASSWORD: "/forgot-password",
	PROFILE: "/profile",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	UPDATE_PASSWORD: "/update-password",
	RESERVATION: "/reservation",
	CAR: "/car",
} as const;

export { AppRoute };
