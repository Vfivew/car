import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	size: "large" | "small" | "micro";
};

const Loader: React.FC<Properties> = ({ className, size }: Properties) => {
	return (
		<span
			className={getValidClassNames(styles["loader"], className, styles[size])}
		></span>
	);
};

export { Loader };
