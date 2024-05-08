type Form = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	country?: string | null;
	city?: string | null;
	address?: string | null;
	driverLicense?: string | null;
	isRullesAccepted: boolean;
};

export { type Form };
