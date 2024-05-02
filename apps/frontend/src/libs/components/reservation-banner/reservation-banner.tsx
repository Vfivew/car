import styles from "./styles.module.css";
import { Link } from "../link/link.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

const ReservationBanner: React.FC = () => {
	const { date, car, form } = useAppSelector((state) => state.forms);

	return (
		<div className={styles["container"]}>
			<div className={styles["container-wrapper"]}>
				<h2 className={styles["title"]}>Reservation</h2>
				<ul className={styles["list"]}>
					<li className={styles["item"]}>
						<Link to={AppRoute.RESERVATION} activeClassName={styles["active"]}>
							<section className={styles["item-header"]}>
								<p className={styles["item-number"]}>1</p>
								<h3 className={styles["item-title"]}>Date</h3>
							</section>
							<div className={styles["item-content"]}>
								<h4>Pick Up</h4>
								<p>{date.startDate ? date.startDate : "-- --"}</p>
								<h4>Drop Off</h4>
								<p>{date.returnDate ? date.returnDate : "-- --"}</p>
							</div>
						</Link>
					</li>
					<li className={styles["item"]}>
						<Link to={AppRoute.CAR} activeClassName={styles["active"]}>
							<section className={styles["item-header"]}>
								<p className={styles["item-number"]}>2</p>
								<h3 className={styles["item-title"]}>Car</h3>
							</section>
							<div className={styles["item-content"]}>
								<p>Car</p>
								<p>{car.name ? car.name : "-- --"}</p>
								<ul>
									Addons:
									<li>Child seat: {car.childSeat ? car.childSeat: "none"}</li>
									<li>{car.ownDriver && "Own Driver"}</li>
									<li>{car.additionalInsurance && "Additional insurance"}</li>
								</ul>
							</div>
						</Link>
					</li>
					<li className={styles["item"]}>
						<Link to={AppRoute.RESERVATION} activeClassName={styles["active"]}>
							<section className={styles["item-header"]}>
								<p className={styles["item-number"]}>3</p>
								<h3 className={styles["item-title"]}>Information</h3>
							</section>
							<div className={styles["item-content"]}>
								<ul>You information</ul>
								{Object.values(form).map((item, index) =>
									item ? <li key={index}>{item}</li> : null,
								)}
								<p>Payment information</p>
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export { ReservationBanner };
