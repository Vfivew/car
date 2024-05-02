import { getAllForms } from "./actions.js";
import { actions } from "./form.slice.js";

const allActions = {
	...actions,
	getAllForms,
};

export { reducer } from "./form.slice.js";
export { allActions as actions };
