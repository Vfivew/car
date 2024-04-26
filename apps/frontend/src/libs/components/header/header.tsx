import logo from "~/assets/img/logo.svg";
import { useAppDispatch, useCallback, useState } from "~/libs/hooks/hooks.js";
import { type MenuItem } from "~/libs/types/types.js";
import {
	type UserAuthResponseDto,
	actions as authActions,
} from "~/modules/auth/auth.js";

import { Image } from "../image/image.js";
// import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";

import { Button } from "../button/button.js";
import { Link } from "../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	menuItems: MenuItem[];
	user: UserAuthResponseDto | null;
};

const Header: React.FC<Properties> = ({ menuItems, user }: Properties) => {
	const dispatch = useAppDispatch();
	const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
	console.log(user)
	const handleLogOut = useCallback(() => {
		void dispatch(authActions.logOut()).unwrap();
		// .then(() => {
		// 	dispatch(userCoursesActions.reset());
		// });
	}, [dispatch]);

	const toggleBurger = useCallback(() => {
		setIsBurgerOpen(!isBurgerOpen);
	}, [isBurgerOpen]);

	const handleLinkClick = useCallback(() => {
		setIsBurgerOpen(false);
	}, []);

	return (
		<header className={styles["header-container"]}>
			<div className={styles["wrapper"]}>
				<label className={styles["burger-controller"]}>
					<input
						checked={isBurgerOpen}
						className={styles["burger-cheakbox"]}
						onChange={toggleBurger}
						type="checkbox"
					/>
					<span className={styles["menu"]}>
						<span className={styles["hamburger"]} />{" "}
					</span>
					<nav className={styles["burger-nav"]}>
						<Link to="/">
							<Image alt="website logo" className={styles["logo"]} src={logo} />
						</Link>
						<ul className={styles["burger-list"]}>
							{menuItems.map(({ href, label }) => {
								return (
									<Link
										activeClassName={styles["active"]}
										className={styles["burger-link"]}
										key={label}
										onClick={handleLinkClick}
										to={href}
									>
										<span className={styles["link-title"]}>{label}</span>
									</Link>
								);
							})}
							{user ? (
								<Button
									className={styles["log-out-btn"]}
									iconName="logOut"
									label="Log Out"
									onClick={handleLogOut}
								/>
							) : (
								<>
									<Link
										activeClassName={styles["active"]}
										className={styles["burger-link"]}
										key="Login"
										onClick={handleLinkClick}
										to="/sign-in"
									>
										<span className={styles["link-title"]}>Login</span>
									</Link>
									<Link
										activeClassName={styles["active"]}
										className={styles["burger-link"]}
										key="Registration"
										onClick={handleLinkClick}
										to="/sign-up"
									>
										<span className={styles["link-title"]}>Registration</span>
									</Link>
								</>
							)}
						</ul>
					</nav>
				</label>
			</div>
		</header>
	);
};

export { Header };
