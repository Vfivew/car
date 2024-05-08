import { type CarRequestDto } from "@car/shared";

import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { FormEntity } from "./form.entity.js";
import { type FormModel } from "./form.model.js";
import { CarModel } from "../cars/cars.js";

class FormRepository {
	private formModel: typeof FormModel;
	private carModel: typeof CarModel;
	public constructor(carModel: typeof CarModel, formModel: typeof FormModel) {
		this.carModel = carModel;
		this.formModel = formModel;
	}

	public async create(entity: FormEntity): Promise<FormEntity> {
		const {
			firstName,
			lastName,
			phone,
			email,
			city,
			country,
			address,
			driverLicense,
			carId,
			childSeat,
			ownDriver,
			additionalInsurance,
			office,
			startDate,
			returnDate,
			price,
			isRullesAccepted,
		} = entity.toNewObject();

		const form = await this.formModel
			.query()
			.insert({
				firstName,
				lastName,
				phone,
				email,
				city,
				country,
				address,
				driverLicense,
				carId,
				childSeat,
				ownDriver,
				additionalInsurance,
				office,
				startDate,
				returnDate,
				price,
				isRullesAccepted,
			})
			.returning("*");

		return FormEntity.initialize({
			createdAt: form.createdAt,
			id: form.id,
			updatedAt: form.updatedAt,
			firstName: form.firstName,
			lastName: form.lastName,
			phone: form.phone,
			email: form.email,
			city: form.city,
			country: form.country,
			address: form.address,
			driverLicense: form.driverLicense,
			carId: form.carId,
			childSeat: form.childSeat,
			ownDriver: form.ownDriver,
			isRullesAccepted: form.isRullesAccepted,
			additionalInsurance: form.additionalInsurance,
			office: form.office,
			startDate: form.startDate,
			returnDate: form.returnDate,
			price: form.price,
		});
	}
}

export { FormRepository };
