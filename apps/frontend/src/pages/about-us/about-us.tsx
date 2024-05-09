import { AppTitle } from "~/libs/enums/enums.js";
import { useAppTitle } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const AboutUs: React.FC = () => {
	useAppTitle(AppTitle.ABOUT_US);

	return (
		<section className={styles["container"]}>
			<h2 className={styles["title"]}>Terms and conditions</h2>
		</section>
	);
};

export { AboutUs };
