import { logger } from "~/libs/modules/logger/logger.js";

import { FormController } from "./form.controller.js";
import { FormRepository } from "./form.repository.js";
import { FormService } from "./form.service.js";
import { FormModel } from "./form.model.js";
import { CarModel } from "../cars/cars.js";
import { addonRepository } from "../activity-likes/addons.js";

const formRepository = new FormRepository(CarModel, FormModel);
const formService = new FormService(formRepository, addonRepository);
const formController = new FormController(logger, formService);

export { formController, formRepository, formService };
export { FormEntity } from "./form.entity.js";
export { type FormRepository } from "./form.repository.js";
export { type FormService } from "./form.service.js";
export { FormErrorMessage } from "./libs/enums/enums.js";
export { FormsApiPath } from "./libs/enums/enums.js";
export { FormError } from "./libs/exceptions/exceptions.js";
export {
	type FormResponseDto,
	type FormRequestDto,
} from "./libs/types/types.js";
export { formCarParametersValidationSchema, formParametersValidationSchema, formInformationParametersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
