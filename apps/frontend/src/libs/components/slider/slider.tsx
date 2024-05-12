import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import defaultAvatar from "~/assets/img/default-avatar.png";
import { useInView } from "~/libs/hooks/hooks.js";

import { Image } from "../image/image.js";
import { settings } from "./libs/config/setting.config.js";
import styles from "./styles.module.css";

type Properties = {
	data: { img: null | string; name: string; review: string }[];
};

const Carousel: React.FC<Properties> = ({ data }: Properties) => {
	const { inView, ref } = useInView({
		threshold: 0.05,
		triggerOnce: true,
	});

	return (
		<div
			className={`${styles["container"]} ${inView && styles["active"]}`}
			ref={ref}
		>
			<div className={styles["container-wrapper"]}>
				<Slider {...settings}>
					{data.map((item) => (
						<div className={styles["slider"]} key={item.name}>
							<div className={styles["image-wrapper"]}>
								<Image
									alt="avatar"
									className={styles["image"]}
									key={item.img ?? defaultAvatar}
									shape="circle"
									src={item.img ?? defaultAvatar}
								/>
							</div>

							<div className={styles["content-wrapper"]}>
								<p className={styles["title"]}>{item.name}</p>
								<p className={styles["text"]}>{item.review}</p>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export { Carousel };
