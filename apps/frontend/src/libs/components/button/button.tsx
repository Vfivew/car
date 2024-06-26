import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import { Link } from "../link/link.js";
import { Loader } from "../loader/loader.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	hasVisuallyHiddenLabel?: boolean;
	href?: ValueOf<typeof AppRoute>;
	iconClassName?: string | undefined;
	iconName?: IconName | undefined;
	isDisabled?: boolean;
	isLoading?: boolean;
	label: string;
	// loaderColor?: React.ComponentProps<typeof Loader>["color"];
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	size?: "default" | "regular" | "small";
	style?: "black" | "primary" | "red" | "secondary";
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	hasVisuallyHiddenLabel = false,
	href,
	iconClassName,
	iconName,
	isDisabled = false,
	isLoading,
	label,
	// loaderColor = "white",
	onClick,
	size = "regular",
	style = "primary",
	type = "button",
}: Properties) => {
	const buttonStyles = getValidClassNames(
		styles["button"],
		styles[size],
		styles[style],
		className,
		isDisabled && styles["disabled"],
	);

	const icon = iconName ? (
		<Icon className={iconClassName} name={iconName} />
	) : null;
	const labelStyle = getValidClassNames(
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	const buttonContentStyles = getValidClassNames(
		styles["content"],
		isLoading && styles["content-hidden"],
	);

	return (
		<>
			{href ? (
				<Link className={buttonStyles} isDisabled={isDisabled} to={href}>
					{icon}
					<span className={labelStyle}>{label}</span>
				</Link>
			) : (
				<button
					className={buttonStyles}
					disabled={isDisabled}
					onClick={onClick}
					type={type}
				>
					{isLoading && (
						<Loader
							className={getValidClassNames(styles["button-loader"])}
							// color={loaderColor}
							size="small"
						/>
					)}
					<div className={buttonContentStyles}>
						{icon}
						<span className={labelStyle}>{label}</span>
					</div>
				</button>
			)}
		</>
	);
};

export { Button };
