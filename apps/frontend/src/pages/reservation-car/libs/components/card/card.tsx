import { type CarResponseDto } from "@car/shared";

import styles from "./styles.module.css";
import { Button, Icon, Image } from "~/libs/components/components.js";

type CardProps = {
	car: CarResponseDto;
	onSubmit: (car: CarResponseDto) => void;
};

const Card: React.FC<CardProps> = ({ car, onSubmit }: CardProps) => {
	const handleFormSubmit = (
		event: React.MouseEvent<HTMLButtonElement>,
	): void => {
		event.preventDefault();
		onSubmit(car);
	};

	return (
		<div className={styles["container"]}>
			<Image alt="car" className={styles["image"]} src={car.image} />
			<section className={styles["content"]}>
				<div className={styles["common-info"]}>
					<h2 className={styles["title"]}>{car.name}</h2>
					<ul>
						<li className={styles["item-content"]}>
							<Icon className={styles["icon"]} name={"carDoor"} />
							<p>{car.numberOfDoors} seat</p>
						</li>
						<li className={styles["item-content"]}>
							<Icon className={styles["icon"]} name={"climateControl"} />
							<p>{car.climateControl} A/C</p>
						</li>
						<li className={styles["item-content"]}>
							<Icon className={styles["icon"]} name={"trunk"} />
							<p>{car.trunkVolume} L</p>
						</li>
					</ul>
				</div>

				<ul className={styles["car-modifications"]}>
					{car.cdPlayer && (
						<li className={styles["car-modification-item"]}>
							CD Player <Icon className={styles["checked"]} name={"checked"} />
						</li>
					)}
					{car.climateControl && (
						<li className={styles["car-modification-item"]}>
							Climate Control{" "}
							<Icon className={styles["checked"]} name={"checked"} />
						</li>
					)}
					{car.navigationSystem && (
						<li className={styles["car-modification-item"]}>
							Navigation System{" "}
							<Icon className={styles["checked"]} name={"checked"} />
						</li>
					)}
					{car.parkingSensors && (
						<li className={styles["car-modification-item"]}>
							Parking Sensors{" "}
							<Icon className={styles["checked"]} name={"checked"} />
						</li>
					)}
					{car.panoramicRoof && (
						<li className={styles["car-modification-item"]}>
							Panoramic Roof{" "}
							<Icon className={styles["checked"]} name={"checked"} />
						</li>
					)}
				</ul>

				<div className={styles["button-container"]}>
					<Button
						label="Next stage"
						size="default"
						type="submit"
						onClick={handleFormSubmit}
					/>
				</div>
			</section>
		</div>
	);
};

export { Card };
