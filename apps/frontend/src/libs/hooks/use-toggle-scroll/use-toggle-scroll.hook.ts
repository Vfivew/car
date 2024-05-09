import { useEffect } from "~/libs/hooks/hooks.js";

const useToggleScroll = (isOpen: boolean): void => {
	useEffect(() => {
		console.log(isOpen, "hook");
		document.body.classList.toggle("no-overflow", isOpen);
	}, [isOpen]);
};

export { useToggleScroll };
