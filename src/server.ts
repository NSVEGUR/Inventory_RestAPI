import mongoose from 'mongoose';
import { createSpinner, Spinner } from 'nanospinner';
import app from './app';
import config from './config';

//Spinner for dev env ;)
let serverSpinner: Spinner;
let dbSpinner: Spinner;

if (config.NODE_ENV === 'development') {
	serverSpinner = createSpinner('Starting the server ...');
	dbSpinner = createSpinner('Connecting to Mongo Database ...');
}
//Connecting to MongoDB
const db = config.DBURL.replace('<PASSWORD>', config.DBPASSWORD);


mongoose.connect(db).then(con => {
	if (config.NODE_ENV === 'development') {
		setTimeout(() => {
			dbSpinner.success({ text: 'Connected to MongoDB Successfully' });
		}, 1000);
	} else {
		console.log('Connected to MongoDB Successfully');
	}
}).catch(err => {
	if (config.NODE_ENV === 'development') {
		dbSpinner.error({ text: err.message ?? 'Unknown Error in DB Connection' });
	} else {
		console.log(err.message ?? 'Unknown Error in DB Connection');
	}
})


const port = config.PORT || 8000;


//Listening to the server
app.listen(port, () => {
	if (config.NODE_ENV === 'development') {
		serverSpinner.start();
		setTimeout(() => {
			serverSpinner.success({ text: `Vegur's server started successfully at port: ${port}` });
			dbSpinner.start();
		}, 700);
	} else {
		console.log(`Vegur's server started successfully at port: ${port}`);
	}
});
