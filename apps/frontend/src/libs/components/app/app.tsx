import { RouterOutlet } from "~/libs/components/components.js";
import { MENU_ITEMS } from "~/libs/constants/constants.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import { Footer } from "../footer/footer.js";
import { Header } from "../header/header.js";
import styles from "./styles.module.css";
import { DataStatus } from "~/libs/enums/enums.js";

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const authDataStatus = useAppSelector(({ auth }) => {
		return auth.dataStatus;
	});

	const isLoading = authDataStatus === DataStatus.PENDING;

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	return (
		<div className={styles["page-layout"]}>
			<Header menuItems={MENU_ITEMS} user={user} isLoading={isLoading} />
			<main className={styles["main-container"]}>
				<RouterOutlet />
			</main>
			<Footer />
		</div>
	);
};

export { App };
