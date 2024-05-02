import { z } from "zod";

import { FormValidationMessage } from "../enums/enums.js";

type FormParametersParametersValidationDto = {
	office: z.ZodString;
	startDate: z.ZodString;
	returnDate: z.ZodString;
};

const formParameters = z
	.object<FormParametersParametersValidationDto>({
		office: z
			.string()
			.min(1, { message: FormValidationMessage.INVALID_DATE })
			.trim(),
		startDate: z
			.string()
			.min(1, { message: FormValidationMessage.INVALID_DATE })
			.trim(),
		returnDate: z
			.string()
			.min(1, { message: FormValidationMessage.INVALID_OFFICE })
			.trim(),
	})
	.required();

export { formParameters };
