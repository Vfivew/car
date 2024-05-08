const AppRoute = {
	ANY: "*",
	FORGOT_PASSWORD: "/forgot-password",
	PROFILE: "/profile",
	ROOT: "/",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	UPDATE_PASSWORD: "/update-password",
	RESERVATION_DATE: "/reservation-date",
	RESERVATION_CAR: "/reservation-car",
	FORM: "/form",
	RESERVATION_INFROMATION: "/reservation-information",
	RULES: "/rules"
} as const;

export { AppRoute };
