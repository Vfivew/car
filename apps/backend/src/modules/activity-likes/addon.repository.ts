import { type Repository } from "~/libs/types/types.js";

import { AddonEntity } from "./addon.entity.js";
import { type AddonModel } from "./addon.model.js";

class AddonRepository {
	private addonModel: typeof AddonModel;

	public constructor(addonModel: typeof AddonModel) {
		this.addonModel = addonModel;
	}

	public async findAll(): Promise<AddonEntity[]> {
		const addons = await this.addonModel.query().execute();

		return addons.map((addon) => {
			return AddonEntity.initialize({
				name: addon.name,
				createdAt: addon.createdAt,
				id: addon.id,
				updatedAt: addon.updatedAt,
				price: addon.price,
			});
		});
	}
}

export { AddonRepository };
