import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";
import {
	App,
	Notification,
	RouterProvider,
	StoreProvider,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { Auth } from "~/pages/auth/auth.jsx";

import { NotFound } from "./pages/not-found/not-found.js";
import { Overview } from "./pages/overview/overview.js";
import { Reservation } from "./pages/reservation/reservation.js";
import { ReservationCar } from "./pages/reservation-car/reservation-car.js";


createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<Notification />
		<StoreProvider store={store.instance}>
			<RouterProvider
				routes={[
					{
						children: [
							{
								element: <Overview />,
								path: AppRoute.ROOT,
							},
							{
								element: <Reservation />,
								path: AppRoute.RESERVATION,
							},
							{
								element: <ReservationCar />,
								path: AppRoute.CAR,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_IN,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_UP,
							},
							{
								element: <Auth />,
								path: AppRoute.FORGOT_PASSWORD,
							},
							{
								element: <Auth />,
								path: AppRoute.UPDATE_PASSWORD,
							},
						],
						element: <App />,
						path: AppRoute.ROOT,
					},
					{ element: <NotFound />, path: AppRoute.ANY },
				]}
			/>
		</StoreProvider>
	</StrictMode>,
);
