export namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		PORT: number;
		DBURL: string;
		DBPASSWORD: string;
		JWT_SECRET: string;
		JWT_EXPIRES_IN: string;
		JWT_COOKIE_EXPIRES_IN: string;
		ADMIN_NAME: string;
		ADMIN_PASSWORD: string;
	}
}

export namespace Express {
	interface Request {
		student?: any
	}
}