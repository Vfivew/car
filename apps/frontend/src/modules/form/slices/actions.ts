import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	FormPrice,
	FormPriceRequestDto,
	type FormResponseDto,
} from "~/modules/form/forms.js";

import { formApi } from "../forms.js";
import { name as sliceName } from "./form.slice.js";

const getAllForms = createAsyncThunk<
	FormResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-forms`, async () => {
	return await formApi.getAllForms();
});

// const forgotPassword = createAsyncThunk<
// 	boolean,
// 	AuthForgotPasswordRequestDto,
// 	AsyncThunkConfig
// >(`${sliceName}/forgot-password`, async (payload, { extra }) => {
// 	const { authApi } = extra;

// 	return await authApi.forgotPassword(payload);
// });

const getPrice = createAsyncThunk<
	FormPrice,
	FormPriceRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-price`, async (payload, { extra }) => {
	const { formApi } = extra;

	return await formApi.getPrice(payload);
});

export { getAllForms, getPrice };
