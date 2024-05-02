import { z } from "zod";
import { FormValidationMessage } from "../enums/enums.js";

type CarValidationDto = {
	childASeat: z.ZodString;
	additionalInsurance: z.ZodBoolean;
	ownDriver: z.ZodBoolean;
};

const formCarParameters = z
	.object<CarValidationDto>({
		childASeat: z.string().regex(/^(?:[0-3]|)$/, {
			message: FormValidationMessage.INVALID_NUMBER,
		}),
		additionalInsurance: z.boolean(),
		ownDriver: z.boolean(),
	})
	.required();

export { formCarParameters };
