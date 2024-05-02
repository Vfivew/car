import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type Form,
	type FormCar,
	type FormDate,
} from "~/modules/form/forms.js";

import { getAllForms } from "./actions.js";
import { getDateToString } from "~/libs/helpers/helpers.js";

type State = {
	form: Form;
	car: FormCar;
	date: FormDate;
	dataStatus: ValueOf<typeof DataStatus>;
};
const currentDate = getDateToString(new Date());

const initialState: State = {
	form: {
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		country: null,
		city: null,
		address: null,
		driverLicense: null,
	},
	car: {
		carId: null,
		name: "",
		childSeat: null,
		ownDriver: false,
		additionalInsurance: false,
	},
	date: {
		office: "",
		startDate: currentDate,
		returnDate: "",
	},
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	reducers: {
		updateForm: (state, action) => {
			state.form = {
				...state.form,
				...action.payload,
			};
		},
		updateDate: (state, action) => {
			state.date = {
				...state.date,
				...action.payload,
			};
		},
		updateCarId: (state, action) => {
			// console.log(action, "ACTION");
			state.car = {
				...state.car,
				...action.payload,
			};
			// console.log(state.date, "STATE");
		},
		resetForm: (state) => {
			state.form = initialState.form;
		},
	},
	extraReducers(builder) {},
	initialState,
	name: "form",
});

export { actions, name, reducer };
