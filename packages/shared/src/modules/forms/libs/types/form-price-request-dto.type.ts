import { FormCar } from "./form-car.type.js";

type FormPriceRequestDto = {
	days: number;
	price: number;
	childSeat: number;
	additionalInsurance: boolean;
	ownDriver:boolean
};

export { type FormPriceRequestDto };
