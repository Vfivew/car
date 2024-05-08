import styles from "./styles.module.css";
import {
	Button,
	Modal,
} from "~/libs/components/components.js";

import { AppRoute } from "~/libs/enums/enums.js";

type CardProps = {
	onClose: () => void;
	isOpen: boolean;
};

const ReservationInformationModal: React.FC<CardProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<Modal
			className={styles["edit-modal"]}
			isCentered
			isOpen={isOpen}
			onClose={onClose}
		>
			<section className={styles["container"]}>
				<h2 className={styles["title"]}>Thank you!</h2>
				<p className={styles["text"]}>
					We'll contact you as soon as possible!
				</p>
				<Button
					className={styles["button"]}
					label="Back to main"
					size="default"
					type="submit"
					href={AppRoute.ROOT}
				/>
			</section>
		</Modal>
	);
};

export { ReservationInformationModal };
