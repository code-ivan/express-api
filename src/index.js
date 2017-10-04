import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || config.port;

let app = express();
app.server = http.createServer(app);

// logger
if(NODE_ENV==='development')
	app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {
	//show info on homepage
	app.get('/', (req, res) => {
		res.json({ 
			name: 'express API', 
			port: PORT,
			env: NODE_ENV,
			bodyLimit: config.bodyLimit });		
	});

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));	
	
	app.server.listen(PORT, () => {
		console.log(`Started on  http://localhost:${app.server.address().port}`);
	});
});

export default app;
