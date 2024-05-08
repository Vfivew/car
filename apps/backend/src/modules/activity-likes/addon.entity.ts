import { type Entity } from "~/libs/types/types.js";

class AddonEntity implements Entity {
	public name: string;

	private createdAt: string;

	private id: null | number;

	private updatedAt: string;

	public price: number;

	private constructor({
		name,
		createdAt,
		id,
		updatedAt,
		price,
	}: {
		name: string;
		createdAt: string;
		id: null | number;
		updatedAt: string;
		price: number;
	}) {
		this.createdAt = createdAt;
		this.name = name;
		this.id = id;
		this.updatedAt = updatedAt;
		this.price = price;
	}

	public static initialize({
		price,
		createdAt,
		id,
		updatedAt,
		name,
	}: {
		price: number;
		createdAt: string;
		id: null | number;
		updatedAt: string;
		name: string;
	}): AddonEntity {
		return new AddonEntity({
			price,
			createdAt,
			id,
			updatedAt,
			name,
		});
	}

	public static initializeNew({
		price,
		name,
	}: {
		price: number;
		name: string;
	}): AddonEntity {
		return new AddonEntity({
			price,
			createdAt: "",
			id: null,
			updatedAt: "",
			name,
		});
	}

	public toNewObject(): {
		name: string;
		price: number;
	} {
		return {
			name: this.name,
			price: this.price,
		};
	}

	public toObject(): {
		name: string;
		id: number;
		price: number;
	} {
		return {
			name: this.name,
			id: this.id as number,
			price: this.price,
		};
	}

	public toPrice(): {
		price: number;
	} {
		return {
			price: this.price,
		};
	}
}

export { AddonEntity };
