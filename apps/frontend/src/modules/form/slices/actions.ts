import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type FormResponseDto } from "~/modules/form/forms.js";

import { formApi } from "../forms.js";
import { name as sliceName } from "./form.slice.js";

const getAllForms = createAsyncThunk<
	FormResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-forms`, async () => {
	return await formApi.getAllForms();
});

export { getAllForms };
