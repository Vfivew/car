import logo from "~/assets/img/logo.svg";
import { Button } from "~/libs/components/components.js";
import { AppTitle } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppTitle } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const NotFound: React.FC = () => {
	useAppTitle(AppTitle.NOT_FOUND);

	return (
		<div className={styles["not-found-page-container"]}>
			<div className={styles["not-found-page-content-container"]}>
				<div className={styles["content-heading"]}>
					<div className={styles["error-scene"]}>
						<div className={styles["error-sign"]}>
							<div
								className={getValidClassNames(
									styles["error-sign-head"],
									styles["octagon"],
								)}
							>
								<div
									className={getValidClassNames(
										styles["error-sign-content"],
										styles["octagon"],
									)}
								>
									<span
										className={getValidClassNames(
											styles["error-sign-content-text"],
											styles["octagon"],
										)}
									>
										404
									</span>
								</div>
							</div>
							<div className={styles["error-sign-leg"]} />
						</div>
						<img alt="logo" className={styles["error-scene-img"]} src={logo} />
					</div>
				</div>
				<h2 className={styles["title"]}>Page Not Found</h2>
				<p className={styles["content"]}>
					There is no page you are trying to find.
				</p>
				<div className={styles["actions"]}>
					<Button href="/" label="Go Home" />
				</div>
			</div>
		</div>
	);
};

export { NotFound };
