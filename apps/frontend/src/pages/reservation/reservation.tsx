import { AppRoute, AppTitle } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppTitle,
	useCallback,
	useMemo,
	useNavigate,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";
import {
	Button,
	Input,
	ReservationBanner,
	Select,
} from "~/libs/components/components.js";
import {
	FormDate,
	actions as formActions,
	formParametersValidationSchema,
} from "~/modules/form/forms.js";
import { getTomorrowDateString } from "~/libs/helpers/helpers.js";
import { OUR_OFFICE } from "./libs/constants/constants.js";

const Reservation: React.FC = () => {
	useAppTitle(AppTitle.RESERVATION);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit, reset, watch } = useAppForm<FormDate>({
		defaultValues: {
			office: "",
			startDate: "",
			returnDate: "",
		},
		validationSchema: formParametersValidationSchema,
	});

	const startDate = watch("startDate");
	const returnDate = watch("returnDate");

	const officeOption = useMemo(() => {
		return OUR_OFFICE.map((item) => ({
			label: item,
			value: item,
		}));
	}, []);

	const handleInputChange = useCallback(
		(formData: FormDate): void => {
			console.log(formData)
			console.log('555');
			void dispatch(
				formActions.updateDate({
					office: formData.office,
					startDate: formData.startDate,
					returnDate: formData.returnDate,
				}),
			);
		},
		[dispatch],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleInputChange)(event_);
			if (!Object.keys(errors).length) {
				  navigate(AppRoute.CAR);
			}
		},
		[handleSubmit, handleInputChange],
	);

	const handleResetForm = useCallback(() => {
		reset();
	}, [reset]);

	return (
		<div className={styles["container"]}>
			<ReservationBanner />
			<section className={styles["form-wrapper"]}>
				<h2 className={styles["title"]}>Reserve your vehicle</h2>
				<form action="" className={styles["form"]} onSubmit={handleFormSubmit}>
					<div className={styles["content"]}>
						<h4>Pick up</h4>
						<Input
							control={control}
							errors={errors}
							label="Start date"
							name="startDate"
							placeholder="Choise start day"
							type="date"
							minDate={getTomorrowDateString(new Date())}
							maxDate={getTomorrowDateString(returnDate)}
						/>
						<Input
							control={control}
							errors={errors}
							label="Return date"
							name="returnDate"
							placeholder="Choise return day"
							type="date"
							minDate={getTomorrowDateString(startDate)}
						/>
					</div>
					<div className={styles["content"]}>
						<h4>Return</h4>
						<Select
							control={control}
							errors={errors}
							label="place to pick up the car*"
							name="office"
							options={officeOption}
							placeholder="Place to pick up the car"
						/>
						<div className={styles["btn-wrapper"]}>
							<Button
								className={styles["button"]}
								label="Reset"
								onClick={handleResetForm}
								size="default"
								style="secondary"
							/>
							<Button
								className={styles["button"]}
								label="Next stage"
								size="default"
								type="submit"
							/>
						</div>
					</div>
				</form>
			</section>
		</div>
	);
};

export { Reservation };
