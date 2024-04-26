const settings = {
	dots: true,
	infinite: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				dots: false,
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				dots: false,
				slidesToShow: 1,
			},
		},
	],
	slidesToScroll: 1,
	slidesToShow: 3,
	speed: 500,
};

export { settings };
