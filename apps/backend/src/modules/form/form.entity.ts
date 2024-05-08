import { type Entity } from "~/libs/types/types.js";

class FormEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private carId: number;

	public updatedAt: string;

	public firstName!: string;

	public lastName!: string;

	public phone!: string;

	public email!: string;

	public isRullesAccepted: boolean;

	public city!: string;

	public country!: string;

	public address!: string;

	public driverLicense!: string;

	public childSeat!: number;

	public ownDriver!: boolean;

	public additionalInsurance!: boolean;

	public office!: string;

	public startDate!: string;

	public returnDate!: string;

	public price!: number;
	private constructor({
		createdAt,
		id,
		updatedAt,
		firstName,
		lastName,
		phone,
		email,
		city,
		country,
		address,
		isRullesAccepted,
		driverLicense,
		carId,
		childSeat,
		ownDriver,
		additionalInsurance,
		office,
		startDate,
		returnDate,
		price,
	}: {
		createdAt: string;
		id: null | number;
		updatedAt: string;
		firstName: string;
		lastName: string;
		phone: string;
		isRullesAccepted: boolean;
		email: string;
		city: string;
		country: string;
		address: string;
		driverLicense: string;
		carId: number;
		childSeat: number;
		ownDriver: boolean;
		additionalInsurance: boolean;
		office: string;
		startDate: string;
		returnDate: string;
		price: number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.updatedAt = updatedAt;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.email = email;
		this.city = city;
		this.country = country;
		this.address = address;
		this.driverLicense = driverLicense;
		this.isRullesAccepted = isRullesAccepted;
		this.carId = carId;
		this.childSeat = childSeat;
		this.ownDriver = ownDriver;
		this.additionalInsurance = additionalInsurance;
		this.office = office;
		this.startDate = startDate;
		this.returnDate = returnDate;
		this.price = price;
	}

	public static initialize({
		id,
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
		createdAt,
		returnDate,
		isRullesAccepted,
		updatedAt,
		price,
	}: {
		createdAt: string;
		updatedAt: string;
		id: null | number;
		firstName: string;
		lastName: string;
		phone: string;
		email: string;
		city: string;
		country: string;
		address: string;
		driverLicense: string;
		isRullesAccepted: boolean;
		carId: number;
		childSeat: number;
		ownDriver: boolean;
		additionalInsurance: boolean;
		office: string;
		startDate: string;
		returnDate: string;
		price: number;
	}): FormEntity {
		return new FormEntity({
			id,
			firstName,
			lastName,
			phone,
			email,
			city,
			country,
			address,
			driverLicense,
			carId,
			isRullesAccepted,
			childSeat,
			ownDriver,
			additionalInsurance,
			office,
			startDate,
			returnDate,
			price,
			createdAt,
			updatedAt,
		});
	}

	public static initializeNew({
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
		isRullesAccepted,
		returnDate,
		price,
	}: {
		firstName: string;
		lastName: string;
		phone: string;
		email: string;
		city: string;
		country: string;
		address: string;
		driverLicense: string;
		isRullesAccepted: boolean;
		carId: number;
		childSeat: number;
		ownDriver: boolean;
		additionalInsurance: boolean;
		office: string;
		startDate: string;
		returnDate: string;
		price: number;
	}): FormEntity {
		return new FormEntity({
			createdAt: "",
			id: null,
			updatedAt: "",
			firstName,
			lastName,
			phone,
			email,
			city,
			country,
			address,
			driverLicense,
			isRullesAccepted,
			carId,
			childSeat,
			ownDriver,
			additionalInsurance,
			office,
			startDate,
			returnDate,
			price,
		});
	}

	public toNewObject(): {
		carId: number;
		childSeat: number;
		ownDriver: boolean;
		additionalInsurance: boolean;
		office: string;
		startDate: string;
		returnDate: string;
		city: string;
		country: string;
		address: string;
		isRullesAccepted: boolean;
		driverLicense: string;
		price: number;
		email: string;
		phone: string;
		firstName: string;
		lastName: string;
	} {
		return {
			carId: this.carId,
			childSeat: this.childSeat,
			ownDriver: this.ownDriver,
			additionalInsurance: this.additionalInsurance,
			office: this.office,
			startDate: this.startDate,
			returnDate: this.returnDate,
			price: this.price,
			email: this.email,
			isRullesAccepted: this.isRullesAccepted,
			phone: this.phone,
			firstName: this.firstName,
			lastName: this.lastName,
			city: this.city,
			country: this.country,
			address: this.address,
			driverLicense: this.driverLicense,
		};
	}

	public toObject(): {
		carId: number;
		childSeat: number;
		ownDriver: boolean;
		additionalInsurance: boolean;
		office: string;
		startDate: string;
		returnDate: string;
		price: number;
		createdAt: string;
		id: number;
		updatedAt: string;
		email: string;
		phone: string;
		firstName: string;
		isRullesAccepted: boolean;
		lastName: string;
		city: string;
		country: string;
		address: string;
		driverLicense: string;
	} {
		return {
			carId: this.carId,
			childSeat: this.childSeat,
			ownDriver: this.ownDriver,
			additionalInsurance: this.additionalInsurance,
			office: this.office,
			startDate: this.startDate,
			returnDate: this.returnDate,
			price: this.price,
			createdAt: this.createdAt,
			isRullesAccepted: this.isRullesAccepted,
			id: this.id as number,
			updatedAt: this.updatedAt,
			email: this.email,
			phone: this.phone,
			firstName: this.firstName,
			lastName: this.lastName,
			city: this.city,
			country: this.country,
			address: this.address,
			driverLicense: this.driverLicense,
		};
	}
}

export { FormEntity };
