import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	FormPrice,
	FormPriceRequestDto,
	FormRequestDto,
	type FormResponseDto,
} from "~/modules/form/forms.js";

import { formApi } from "../forms.js";
import { name as sliceName } from "./form.slice.js";

// const forgotPassword = createAsyncThunk<
// 	boolean,
// 	AuthForgotPasswordRequestDto,
// 	AsyncThunkConfig
// >(`${sliceName}/forgot-password`, async (payload, { extra }) => {
// 	const { authApi } = extra;

// 	return await authApi.forgotPassword(payload);
// });

const createForm = createAsyncThunk<any, FormRequestDto, AsyncThunkConfig>(
	`${sliceName}/create-form`,
	async (payload, { extra }) => {
		const { formApi } = extra;

		return await formApi.createForm(payload);
	},
);

const getPrice = createAsyncThunk<
	FormPrice,
	FormPriceRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-price`, async (payload, { extra }) => {
	const { formApi } = extra;

	return await formApi.getPrice(payload);
});

export { createForm, getPrice };
