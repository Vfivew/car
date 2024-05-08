import { AppRoute, AppTitle, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useAppTitle,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";
import {
	Button,
	Checkbox,
	Image,
	Input,
	Loader,
	Navigate,
} from "~/libs/components/components.js";
import {
	Form,
	actions as formActions,
	FormPriceRequestDto,
	formInformationParametersValidationSchema,
} from "~/modules/form/forms.js";
import { getDays } from "~/libs/helpers/helpers.js";

const ReservationInformation: React.FC<{ onOpenModal: () => void }> = ({
	onOpenModal,
}) => {
	useAppTitle(AppTitle.RESERVATION);
	const dispatch = useAppDispatch();
	const { date, car, price, addons } = useAppSelector((state) => state.forms);
	const { user } = useAppSelector((state) => state.auth);
	const days = getDays(date.startDate, date.returnDate);
	const isFinishDataForm = date.startDate && date.returnDate;
	const priceDataStatus = useAppSelector(({ forms }) => {
		return forms.priceStatus;
	});
	const isPriceLoading = priceDataStatus === DataStatus.PENDING;

	const { control, errors, handleSubmit, reset, getValues } = useAppForm<Form>({
		defaultValues: {
			firstName: user ? user.firstName : "",
			lastName: user ? user.lastName : "",
			phone: user?.phoneNumber ?? "",
			country: "",
			email: user ? user.email : "",
			city: "",
			address: "",
			driverLicense: "",
			isRullesAccepted: false,
		},
		// validationSchema: formInformationParametersValidationSchema,
	});

	const handleInputChange = useCallback(
		(formData: Form): void => {
			void dispatch(
				formActions.updateDate({
					firstName: formData.firstName,
					lastName: formData.lastName,
					phone: formData.phone,
					country: formData.country,
					driverLicense: formData.driverLicense,
					email: formData.email,
					city: formData.city,
					address: formData.address,
				}),
			);
			if (!Object.keys(errors).length) {
				const payload = {
					...getValues(),
					...date,
					...car,
					...addons,
					...price,
				};
				console.log(payload);
				void dispatch(formActions.createForm(payload));
				onOpenModal();
			}
		},
		[dispatch],
	);

	const handleFormSubmit = useCallback(
		async (event_: React.BaseSyntheticEvent): Promise<void> => {
			await handleSubmit(handleInputChange)(event_);
		},
		[handleSubmit, handleInputChange, errors],
	);

	const handleResetForm = useCallback(() => {
		void dispatch(formActions.resetForm());
		reset();
	}, [reset]);

	useEffect(() => {
		const payload: FormPriceRequestDto = {
			days: days,
			price: car.rentPrice,
			childSeat: addons.childSeat,
			additionalInsurance: addons.additionalInsurance,
			ownDriver: addons.ownDriver,
		};
		void dispatch(formActions.getPrice(payload));
	}, [dispatch, date, car, addons]);

	if (!isFinishDataForm) {
		return <Navigate replace to={AppRoute.RESERVATION_DATE} />;
	}

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
							{isPriceLoading ? (
								<div className={styles["price-container"]}>
									<p>Price: </p>
									<Loader size={"micro"} className={styles["price-loader"]} />
								</div>
							) : (
								<div className={styles["price-container"]}>
									<p>Price: {price.price} $</p>
								</div>
							)}
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
						<Checkbox
							control={control}
							errors={errors}
							className={styles["checkbox"]}
							to={AppRoute.RULES}
							label="I have read and agree to the website terms and conditions *"
							name={"isRullesAccepted"}
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
								label="Send form"
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
