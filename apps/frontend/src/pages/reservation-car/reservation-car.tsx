import { AppRoute, AppTitle } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";
import { ReservationBanner } from "~/libs/components/components.js";
import { FormCar, actions as formActions } from "~/modules/form/forms.js";
import { CarResponseDto, actions as carsActions } from "~/modules/cars/cars.js";
import { Card } from "./libs/components/card/card.js";
import { CarReservationModal } from "./libs/components/modal/car-reservation-modal.js";

const ReservationCar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	useAppTitle(AppTitle.RESERVATION);
	const dispatch = useAppDispatch();
	const { cars } = useAppSelector((state) => state.cars);
	useEffect(() => {
		void dispatch(carsActions.getAllCars());
	}, [dispatch]);

	const { handleSubmit } = useAppForm<FormCar>({
		defaultValues: {
			carId: null,
			name: "",
		},
	});

	const handleFormSubmit = useCallback(
		(car: CarResponseDto): void => {
			dispatch(formActions.updateCarId(car));
			setIsOpen(true);
		},
		[handleSubmit],
	);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		console.log('+++wdqdwq')
	}, []);

	return (
		<div className={styles["container"]}>
			<ReservationBanner />
			<section className={styles["form-wrapper"]}>
				<h2 className={styles["title"]}>Select your car</h2>
				<form action="" className={styles["form"]}>
					<ul className={styles["list"]}>
						{cars.map((car) => (
							<li key={car.id}>
								<Card car={car} onSubmit={handleFormSubmit} />
							</li>
						))}
					</ul>
				</form>
				<CarReservationModal isOpen={isOpen} onClose={handleClose} />
			</section>
		</div>
	);
};

export { ReservationCar };
