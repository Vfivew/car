import { z } from "zod";
import { FormValidationMessage } from "../enums/enums.js";

type CarValidationDto = {
  childSeat: z.ZodNumber;
  additionalInsurance: z.ZodBoolean;
  ownDriver: z.ZodBoolean;
};

const formCarParameters = z
	.object<CarValidationDto>({
		childSeat: z
			.number()
			.min(0, {
				message: FormValidationMessage.INVALID_NUMBER,
			})
			.max(3, {
				message: FormValidationMessage.INVALID_NUMBER,
			}),
		additionalInsurance: z.boolean(),
		ownDriver: z.boolean(),
	})
	.required();

export { formCarParameters };
