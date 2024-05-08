import { FormCarAddons } from "./form-car-addons.type.js";
import { FormCar} from "./form-car.type.js";
import { FormDate } from "./form-date.type.js";
import { FormPrice } from "./form-price.type.js";
import { Form } from "./form.type.js";

type FormRequestDto = FormDate & FormCar & FormCarAddons & Form & FormPrice;

export { FormRequestDto };
