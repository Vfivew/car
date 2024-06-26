import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type UserSex } from "./libs/enums/enums.js";
import { UserModel } from "./user.model.js";

class UserDetailsModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			user: {
				join: {
					from: `${DatabaseTableName.USER_DETAILS}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public firstName!: string;

	public lastName!: string;

	public phoneNumber!: null | string;

	public sex!: ValueOf<typeof UserSex> | null;

	public subscriptionId!: null | number;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.USER_DETAILS;
	}
}

export { UserDetailsModel };
