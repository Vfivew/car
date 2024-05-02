import {
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { reducer as appReducer } from "~/libs/slices/app/app.js";
import { authApi, reducer as authReducer } from "~/modules/auth/auth.js";
import { carApi, reducer as carsReducer } from "~/modules/cars/cars.js";
import { userApi, reducer as usersReducer } from "~/modules/users/users.js";
import { formApi, reducer as formsReducer } from "~/modules/form/forms.js";

import { storage } from "../storage/storage.js";
import { handleError } from "./middlewares/middlewares.js";

type RootReducer = {
	app: ReturnType<typeof appReducer>;
	auth: ReturnType<typeof authReducer>;
	cars: ReturnType<typeof carsReducer>;
	users: ReturnType<typeof usersReducer>;
	forms: ReturnType<typeof formsReducer>;
};

type ExtraArguments = {
	authApi: typeof authApi;
	carApi: typeof carApi;
	notification: typeof notification;
	storage: typeof storage;
	userApi: typeof userApi;
	formApi: typeof formApi;
};

class Store {
	public instance: ReturnType<
		typeof configureStore<
			RootReducer,
			UnknownAction,
			Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
		>
	>;

	public constructor(config: Config) {
		this.instance = configureStore({
			devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
			middleware: (getDefaultMiddleware) => {
				return getDefaultMiddleware({
					thunk: {
						extraArgument: this.extraArguments,
					},
				}).prepend([handleError]);
			},
			reducer: {
				app: appReducer,
				auth: authReducer,
				cars: carsReducer,
				users: usersReducer,
				forms: formsReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			carApi,
			notification,
			storage,
			userApi,
			formApi,
		};
	}
}

export { type ExtraArguments };
export { Store };
