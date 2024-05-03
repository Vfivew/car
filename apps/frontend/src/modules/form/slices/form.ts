import { getAllForms, getPrice } from "./actions.js";
import { actions } from "./form.slice.js";

const allActions = {
	...actions,
	getPrice,
	getAllForms,
};

export { reducer } from "./form.slice.js";
export { allActions as actions };
