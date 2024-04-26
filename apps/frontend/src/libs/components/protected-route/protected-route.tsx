import { Loader, Navigate } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type PagePermissions, type ValueOf } from "~/libs/types/types.js";

type Properties = {
	component: React.ReactNode;
	pagePermissions?: PagePermissions;
	redirectTo?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
	redirectTo = AppRoute.SIGN_IN,
}: Properties) => {
	const { authDataStatus, user } = useAppSelector(({ auth }) => {
		return {
			authDataStatus: auth.dataStatus,
			user: auth.user,
		};
	});

	const hasUser = Boolean(user);

	if (
		authDataStatus === DataStatus.PENDING ||
		authDataStatus === DataStatus.IDLE
	) {
		return <Loader color="orange" size="large" />;
	}

	if (!hasUser) {
		return <Navigate replace to={redirectTo} />;
	}

	return null; // <AuthWrapper>{component}</AuthWrapper>  user={user as UserAuthResponseDto}
};

export { ProtectedRoute };
