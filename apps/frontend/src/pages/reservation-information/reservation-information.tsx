import { AppRoute, AppTitle } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
	useNavigate,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";
import { Button, Image, Input } from "~/libs/components/components.js";
import {
	Form,
	actions as formActions,
	FormPriceRequestDto,
	formInformationParametersValidationSchema,
} from "~/modules/form/forms.js";
import { getDays } from "~/libs/helpers/helpers.js";

const ReservationInformation: React.FC = () => {
	useAppTitle(AppTitle.RESERVATION);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { date, car, price } = useAppSelector((state) => state.forms);
	const { user} = useAppSelector((state) => state.auth);
	const isFinishDataForm = date.startDate && date.returnDate;
	// if (!isFinishDataForm) {
	// 	return <Navigate replace to={AppRoute.RESERVATION_DATE} />;
	// }
	const days = getDays(date.startDate, date.returnDate);

	useEffect(() => {
		const payload: FormPriceRequestDto = {
			days: days,
			...car,
		};
		void dispatch(formActions.getPrice(payload));
	}, [dispatch, date.startDate, date.returnDate, car]);

	const { control, errors, handleSubmit, reset } = useAppForm<Form>({
		defaultValues: {
			firstName: "",
			lastName: "",
			phone: "",
			country: "",
			email: "",
			city: "",
			address: "",
			driverLicense: "",
		},
		validationSchema: formInformationParametersValidationSchema,
	});

	const handleInputChange = useCallback(
		(formData: Form): void => {
			void dispatch(
				formActions.updateDate({
					firstName: formData.firstName,
					lastName: formData.lastName,
					firstNphoneame: formData.phone,
					country: formData.country,
					driverLicense: formData.driverLicense,
					email: formData.email,
					city: formData.city,
					address: formData.address,
				}),
			);
			if (!Object.keys(errors).length) {
				// navigate(AppRoute.RESERVATION_CAR);
			}
		},
		[dispatch],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleInputChange)(event_);
		},
		[handleSubmit, handleInputChange, errors],
	);

	const handleResetForm = useCallback(() => {
		void dispatch(formActions.resetForm());
		reset();
	}, [reset]);

	return (
		<div className={styles["container"]}>
			<section className={styles["form-wrapper"]}>
				<h2 className={styles["title"]}>Checkout</h2>
				<form action="" className={styles["form"]} onSubmit={handleFormSubmit}>
					<div className={styles["content"]}>
						<h3>Checkout</h3>
						<Image alt="Your car" className={styles["image"]} src={car.image} />
						<section>
							<h4>Rate</h4>
							<p>Days: {days}</p>
							<p>Price: {price.price}</p>
						</section>
					</div>
					<div className={styles["content"]}>
						<h4>Information</h4>
						<Input
							control={control}
							errors={errors}
							label="First name *"
							name="firstName"
							placeholder="Enter your name"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							label="Last name *"
							name="lastName"
							placeholder="Enter your last name"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							label="Phone *"
							name="phone"
							placeholder="Enter your phone"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							label="Email *"
							name="email"
							placeholder="Enter your email"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							label="Country (optional)"
							name="country"
							placeholder="Enter your country"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							label="City (optional)"
							name="city"
							placeholder="Enter your city"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							label="Address (optional)"
							name="address"
							placeholder="Enter your address"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							label="Driver License number (optional)"
							name="driverLicense"
							placeholder="Enter your nubmer of driver license"
							type="text"
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

export { ReservationInformation };
