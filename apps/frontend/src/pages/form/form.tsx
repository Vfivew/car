import { AppRoute } from "~/libs/enums/enums.js";
import { useCallback, useLocation, useNavigate, useState } from "~/libs/hooks/hooks.js";
import styles from "./styles.module.css";

import { ReservationBanner } from "~/libs/components/components.js";
import { ReservationInformation } from "./components/reservation-information/reservation-information.js";
import { ReservationInformationModal } from "./modal/reservation-information-modal.js";
import { ReservationDate } from "./components/reservation/reservation-date.js";
import { ReservationCar } from "./components/reservation-car/reservation-car.js";

const Form: React.FC = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		navigate(AppRoute.ROOT);
	}, []);

	const handleOpen = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.RESERVATION_DATE: {
				return <ReservationDate />;
			}

			case AppRoute.RESERVATION_CAR: {
				return <ReservationCar />;
			}

			case AppRoute.RESERVATION_INFROMATION: {
				return <ReservationInformation onOpenModal={handleOpen} />;
			}
		}

		return null;
	};

	return (
		<div className={styles["container"]}>
			<ReservationBanner />
			{handleScreenRender(pathname)}
			<ReservationInformationModal isOpen={isOpen} onClose={handleClose} />
		</div>
	);
};

export { Form };
