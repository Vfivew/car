import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import {
	CarEntity,
	CarErrorMessage,
	type CarRepository,
} from "~/modules/cars/cars.js";

import { FormError } from "./libs/exceptions/exceptions.js";
import {
	type FormRequestDto,
	type FormResponseDto,
} from "./libs/types/types.js";
import { FormEntity } from "./form.entity.js";
import { type FormRepository } from "./forms.js";
import { FormErrorMessage, FormPrice, FormPriceRequestDto } from "@car/shared";
import { type AddonRepository } from "../activity-likes/addon.repository.js";
import { AddonEntity } from "../activity-likes/addon.entity.js";

class FormService {
	private formRepository: FormRepository;
	private addonRepository: AddonRepository;

	public constructor(
		formRepository: FormRepository,
		addonRepository: AddonRepository,
	) {
		this.formRepository = formRepository;
		this.addonRepository = addonRepository;
	}

	public async create(payload: FormRequestDto): Promise<FormResponseDto> {
		const form = await this.formRepository.create(
			FormEntity.initializeNew({
				firstName: payload.firstName,
				lastName: payload.lastName,
				phone: payload.phone,
				email: payload.email,
				city: payload.city || "",
				country: payload.country || "",
				address: payload.address || "",
				driverLicense: payload.driverLicense || "",
				carId: payload.carId as number,
				childSeat: payload.childSeat,
				ownDriver: payload.ownDriver,
				additionalInsurance: payload.additionalInsurance,
				office: payload.office,
				startDate: payload.startDate,
				returnDate: payload.returnDate,
				price: payload.price,
				isRullesAccepted: payload.isRullesAccepted,
			}),
		);

		return form.toObject();
	}

	public async getPrice(payload: FormPriceRequestDto): Promise<FormPrice> {
		const addons = await this.addonRepository.findAll();
		const days = payload.days;

		if (!addons) {
			throw new FormError({
				message: FormErrorMessage.ADDONS_PRICE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const childSeatPrice =
			addons.find((item: AddonEntity) => item.name === "child_seat")?.price ??
			0;
		const ownDriverPrice =
			addons.find((item: AddonEntity) => item.name === "own_driver")?.price ??
			0;
		const additionalInsurancePrice =
			addons.find((item: AddonEntity) => item.name === "additional_insurance")
				?.price ?? 0;

		const childSeat = payload.childSeat * days * childSeatPrice;
		const ownDriver = payload.ownDriver ? ownDriverPrice * payload.days : 0;
		const additionalInsurance = payload.additionalInsurance
			? additionalInsurancePrice
			: 0;

		const carPrice = payload.price * days;

		const sum = childSeat + ownDriver + additionalInsurance + carPrice;

		return { price: sum };
	}
}

export { FormService };
