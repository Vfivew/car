import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { CarModel } from "../cars/car.model.js";

class FormModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			car: {
				join: {
					from: `${DatabaseTableName.FORMS}.carId`,
					to: `${DatabaseTableName.CARS}.id`,
				},
				modelClass: CarModel,
				relation: Model.HasOneRelation,
			},
		};
	};

	public car!: CarModel;

	public firstName!: string;

	public lastName!: string;

	public phone!: string;

	public email!: string;

	public isRullesAccepted!: boolean;

	public city!: string;

	public country!: string;

	public address!: string;

	public driverLicense!: string;

	public carId!: number;

	public childSeat!: number;

	public ownDriver!: boolean;

	public additionalInsurance!: boolean;

	public office!: string;

	public startDate!: string;

	public returnDate!: string;

	public price!: number;

	public static override get tableName(): string {
		return DatabaseTableName.FORMS;
	}
}

export { FormModel };
