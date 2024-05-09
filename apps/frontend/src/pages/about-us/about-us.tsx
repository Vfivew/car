import { AppTitle } from "~/libs/enums/enums.js";
import { useAppTitle } from "~/libs/hooks/hooks.js";

import { OurTeam, WelcomeBlock } from "./components/components.js";
import styles from "./styles.module.css";

const AboutUs: React.FC = () => {
	useAppTitle(AppTitle.ABOUT_US);

	return (
		<section className={styles["container"]}>
			<WelcomeBlock />
			<OurTeam />
		</section>
	);
};

export { AboutUs };
