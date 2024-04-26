import { type CarResponseDto } from "@car/shared";

import { Image } from "../image/image.js";
import styles from "./styles.module.css";

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
					<li>{car.numberOfDoors}</li>
					<li>{car.climateControl}</li>
					<li>{car.trunkVolume}</li>
				</ul>
				<p className={styles["price"]}>
					from&nbsp;
					<span>
						<span className={styles["select-price"]}>{car.rentPrice}</span>
						/day
					</span>
				</p>
			</section>
		</div>
	);
};

export { Card };
