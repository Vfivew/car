import { FormCar} from "./form-car.type.js";
import { FormDate } from "./form-date.type.js";
import { Form } from "./form.type.js";

type FormRequestDto = FormDate & FormCar & Form;

export { FormRequestDto };
