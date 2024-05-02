import { type CarResponseDto } from "@car/shared";

import { Image } from "../image/image.js";
import styles from "./styles.module.css";
import { Icon } from "../icon/icon.js";

type Properties = {
	car: CarResponseDto;
};

const Card: React.FC<Properties> = ({ car }: Properties) => {
	return (
		<div className={styles["container"]}>
			<Image alt="car" className={styles["image"]} src={car.image} />
			<section className={styles["content"]}>
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
				<p className={styles["price"]}>
					from&nbsp;
					<span>
						<span className={styles["select-price"]}>${car.rentPrice}</span>
						/day
					</span>
				</p>
			</section>
		</div>
	);
};

export { Card };
