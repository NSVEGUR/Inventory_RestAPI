import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './../config.env') });


interface ENV {
	NODE_ENV: string | undefined;
	PORT: number | undefined;
	DBURL: string | undefined;
	DBPASSWORD: string | undefined;
	JWT_SECRET: string | undefined;
	JWT_EXPIRES_IN: string | undefined;
	JWT_COOKIE_EXPIRES_IN: string | undefined;
	HEAD_NAME: string | undefined;
	HEAD_PASSWORD: string | undefined;
}


interface Config {
	NODE_ENV: string;
	PORT: number;
	DBURL: string;
	DBPASSWORD: string;
	JWT_SECRET: string;
	JWT_EXPIRES_IN: string;
	JWT_COOKIE_EXPIRES_IN: string;
	HEAD_NAME: string;
	HEAD_PASSWORD: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
	return {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
		DBURL: process.env.DBURL,
		DBPASSWORD: process.env.DBPASSWORD,
		JWT_SECRET: process.env.JWT_SECRET,
		JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
		JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
		HEAD_NAME: process.env.HEAD_NAME,
		HEAD_PASSWORD: process.env.HEAD_PASSWORD,
	};
};



const getSanitzedConfig = (config: ENV): Config => {
	for (const [key, value] of Object.entries(config)) {
		if (value === undefined) {
			throw new Error(`Missing key ${key} in config.env`);
		}
	}
	return config as Config;
};


const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;