import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	FormPrice,
	type Form,
	type FormCar,
	type FormDate,
	type FormCarAddons,
} from "~/modules/form/forms.js";

import { getPrice, createForm } from "./actions.js";

type State = {
	form: Form;
	car: FormCar;
	date: FormDate;
	addons: FormCarAddons;
	price: FormPrice;
	dataStatus: ValueOf<typeof DataStatus>;
	priceStatus: ValueOf<typeof DataStatus>;
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
		isRullesAccepted: false,
	},
	car: {
		carId: null,
		name: "",
		image: "",
		rentPrice: 0,
	},
	addons: {
		childSeat: 0,
		ownDriver: false,
		additionalInsurance: false,
	},
	date: {
		office: "",
		startDate: "",
		returnDate: "",
	},
	price: {
		price: 0,
	},
	dataStatus: DataStatus.IDLE,
	priceStatus: DataStatus.IDLE,
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
		updateCar: (state, action) => {
			console.log(action.payload);
			state.car = {
				carId: action.payload.id,
				name: action.payload.name,
				image: action.payload.image,
				rentPrice: action.payload.rentPrice,
			};
		},
		updateAddons: (state, action) => {
			state.addons = {
				...state.addons,
				...action.payload,
			};
		},
		resetDate: (state) => {
			state.date = initialState.date;
		},
		resetCar: (state) => {
			state.car = initialState.car;
		},
		resetForm: (state) => {
			state.form = initialState.form;
		},
		resetAddons: (state) => {
			state.addons = initialState.addons;
		},
	},
	extraReducers(builder) {
		builder.addCase(getPrice.fulfilled, (state, action) => {
			state.price = action.payload;
			state.priceStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getPrice.pending, (state) => {
			state.priceStatus = DataStatus.PENDING;
		});
		builder.addCase(getPrice.rejected, (state) => {
			state.priceStatus = DataStatus.REJECTED;
		});
		builder.addCase(createForm.fulfilled, (state) => {
			state.form = initialState.form;
			state.car = initialState.car;
			state.date = initialState.date;
			state.addons = initialState.addons;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(createForm.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(createForm.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "form",
});

export { actions, name, reducer };
