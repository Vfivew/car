import { FormCar, type CarResponseDto } from "@car/shared";

import styles from "./styles.module.css";
import { Button, Checkbox, Icon, Input, Modal } from "~/libs/components/components.js";
import { useAppDispatch, useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	actions as formActions,
	formCarParametersValidationSchema,
} from "~/modules/form/forms.js";
type CardProps = {
	onClose: () => void;
	isOpen: boolean;
};

const CarReservationModal: React.FC<CardProps> = ({isOpen, onClose}) => {
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit, reset, watch } = useAppForm<FormCar>({
		defaultValues: {
			additionalInsurance: false,
			childSeat: "",
			ownDriver: false,
		},
		// validationSchema: formCarParametersValidationSchema,
	});

	const handleInputChange = useCallback(
		(formData: FormCar): void => {
			console.log(formData);
			void dispatch(
				formActions.updateCarId({
					childSeat: formData.childSeat,
					additionalInsurance: formData.additionalInsurance,
					ownDriver: formData.ownDriver,
				}),
			);
		},
		[dispatch],
	);

	const handleFormSubmit = useCallback(
		(event: React.BaseSyntheticEvent): void => {
			event.preventDefault();
			handleSubmit(handleInputChange)(event);
			onClose();
				console.log(errors);
			if (!Object.keys(errors).length) {

				// Дополнительная логика при успешной отправке формы
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
