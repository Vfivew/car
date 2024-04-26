import { type CarResponseDto } from "@car/shared";

import { Card } from "../card/card.js";
import styles from "./styles.module.css";

type Properties = {
	cars: CarResponseDto[];
};

const AutoPark: React.FC<Properties> = ({ cars }: Properties) => {
	console.log(cars);

	return (
		<div className={styles["container"]}>
			<h2 className={styles["title"]}>Our Auto Park</h2>
			<div className={styles["list"]}>
				{cars.map((car) => (
					<Card car={car} key={car.id} />
				))}
			</div>
		</div>
	);
};

export { AutoPark };
