import { AppRoute } from "~/libs/enums/enums.js";
import {
	useLocation,
} from "~/libs/hooks/hooks.js";
import styles from "./styles.module.css";
import { ReservationDate } from "../reservation/reservation-date.js";
import { ReservationCar } from "../reservation-car/reservation-car.js";
import { ReservationBanner } from "~/libs/components/components.js";
import { ReservationInformation } from "../reservation-information/reservation-information.js";

const Form: React.FC = () => {
	const { pathname } = useLocation();

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.RESERVATION_DATE: {
				return <ReservationDate/>;
			}

			case AppRoute.RESERVATION_CAR: {
				return <ReservationCar />;
			}

			case AppRoute.RESERVATION_INFROMATION: {
				return <ReservationInformation />;
			}

		}

		return null;
	};

	return (
		<div className={styles["container"]}>
			<ReservationBanner />
			{handleScreenRender(pathname)}
		</div>
	);
};

export { Form };
