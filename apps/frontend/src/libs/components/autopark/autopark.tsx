import { type CarResponseDto } from "@car/shared";

import { Card } from "../card/card.js";
import styles from "./styles.module.css";
import { useAppSelector, useInView } from "~/libs/hooks/hooks.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { Loader } from "../components.js";

type Properties = {
	cars: CarResponseDto[];
};

const AutoPark: React.FC<Properties> = ({ cars }: Properties) => {
	const carDataStatus = useAppSelector(({ cars }) => {
		return cars.dataStatus;
	});

	const isLoading = carDataStatus === DataStatus.PENDING;
	const { inView, ref } = useInView({
		threshold: 0.05,
		triggerOnce: true,
	});

	return (
		<div className={styles["container"]} ref={ref}>
			<h2 className={styles["title"]}>Our Auto Park</h2>
			{isLoading ? (
				<Loader size="large" />
			) : (
				<div className={`${styles["list"]} ${inView && styles["active"]}`}>
					{cars.map((car) => (
						<Card car={car} key={car.id} />
					))}
				</div>
			)}
		</div>
	);
};

export { AutoPark };
