import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	FormPrice,
	type Form,
	type FormCar,
	type FormDate,
} from "~/modules/form/forms.js";

import { getPrice } from "./actions.js";
import { getDateToString } from "~/libs/helpers/helpers.js";

type State = {
	form: Form;
	car: FormCar;
	date: FormDate;
	price: FormPrice
	dataStatus: ValueOf<typeof DataStatus>;
};

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
		childSeat: "0",
		ownDriver: false,
		additionalInsurance: false,
		image: "",
	},
	date: {
		office: "",
		startDate: "",
		returnDate: "",
	},
	price: {
		price:0
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
			state.car = {
				...state.car,
				...action.payload,
			};
		},
		resetDate: (state) => {
			state.date = initialState.date;
		},
		resetCarId: (state) => {
			state.car = initialState.car;
		},
		resetForm: (state) => {
			state.form = initialState.form;
		},
	},
	extraReducers(builder) {
		builder.addCase(getPrice.fulfilled, (state, action) => {
			state.price = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getPrice.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getPrice.rejected, (state) => {
			state.price = 0;
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "form",
});

export { actions, name, reducer };
