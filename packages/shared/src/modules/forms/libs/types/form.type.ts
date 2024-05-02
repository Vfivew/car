type Form = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	country?: string | null;
	city?: string | null;
	address?: string | null;
	driverLicense?: string | null;
	childSeat?: string | null;
	ownDriver?: string | null;
	additionalInsurance?: boolean;
};

export { type Form };
