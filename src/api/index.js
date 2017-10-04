import { version } from '../../package.json';
import { Router } from 'express';
import resources from './resources';

export default ({ config, db }) => {
	let api = Router();
	
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	//other routes
	api.use('/resources', resources({ config, db }));
	
	return api;
}
