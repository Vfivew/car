import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { FormApi } from "./forms-api.js";

const formApi = new FormApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export {
	type Form,
	type FormCar,
	type FormDate,
	type FormRequestDto,
	type FormResponseDto,
} from "./libs/types/types.js";
export { formApi };
export {
	formParametersValidationSchema,
	formCarParametersValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/form.js";
