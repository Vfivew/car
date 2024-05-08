import { FormCarAddons } from "@car/shared";

import styles from "./styles.module.css";
import {
	Button,
	Checkbox,
	Icon,
	Input,
	Modal,
} from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useNavigate,
} from "~/libs/hooks/hooks.js";
import {
	actions as formActions,
	formCarParametersValidationSchema,
} from "~/modules/form/forms.js";
import { AppRoute } from "~/libs/enums/enums.js";

type CardProps = {
	onClose: () => void;
	isOpen: boolean;
};

const CarReservationModal: React.FC<CardProps> = ({ isOpen, onClose }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const carData = useAppSelector((state) => state.forms.addons);

	const { control, errors, handleSubmit, reset, register } =
		useAppForm<FormCarAddons>({
			defaultValues: {
				additionalInsurance: carData.additionalInsurance,
				childSeat: carData.childSeat,
				ownDriver: carData.ownDriver,
			},
			validationSchema: formCarParametersValidationSchema,
		});

	useEffect(() => {
		reset({
			additionalInsurance: carData.additionalInsurance,
			childSeat: carData.childSeat,
			ownDriver: carData.ownDriver,
		});
	}, [carData, reset]);

	const handleInputChange = useCallback(
		(formData: FormCarAddons): void => {
			void dispatch(
				formActions.updateAddons({
					childSeat: formData.childSeat,
					additionalInsurance: formData.additionalInsurance,
					ownDriver: formData.ownDriver,
				}),
			);
		},
		[dispatch],
	);

	const handleFormSubmit = useCallback(
		async (event_: React.BaseSyntheticEvent): Promise<void> => {
			event_.preventDefault();
			await handleSubmit(handleInputChange)(event_);
			if (!Object.keys(errors).length) {
				onClose();
				navigate(AppRoute.RESERVATION_INFROMATION);
			}
		},
		[handleSubmit, handleInputChange, errors],
	);

	return (
		<Modal
			className={styles["edit-modal"]}
			isCentered
			isOpen={isOpen}
			onClose={onClose}
		>
			<form className={styles["container"]} onSubmit={handleFormSubmit}>
				<ul className={styles["list-wrapper"]}>
					<h2 className={styles["title"]}>Optional addon</h2>
					<li className={styles["car-modification-item"]}>
						<Icon className={styles["checked"]} name={"checked"} />
						Own driver
						<Checkbox
							control={control}
							errors={errors}
							hasVisuallyHiddenLabel
							label="Own driver"
							name={"ownDriver"}
						/>
					</li>
					<li className={styles["car-modification-item"]}>
						<Icon className={styles["checked"]} name={"checked"} />
						<Input
							control={control}
							errors={errors}
							label="Child seat"
							name="childSeat"
							placeholder="Child seat"
							type="number"
							inputMode="numeric"
							register={register}
						/>
					</li>
					<li className={styles["car-modification-item"]}>
						<Icon className={styles["checked"]} name={"checked"} />
						Additional insurancer
						<Checkbox
							control={control}
							errors={errors}
							hasVisuallyHiddenLabel
							label="Additional insurance"
							name={"additionalInsurance"}
						/>
					</li>
				</ul>
				<div className={styles["btn-wrapper"]}>
					<Button
						className={styles["button"]}
						label="Next stage"
						size="default"
						type="submit"
					/>
				</div>
			</form>
		</Modal>
	);
};

export { CarReservationModal };
