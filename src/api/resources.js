import { Router } from 'express'
import * as Db from '../db.js'; // database

export default ({ config, db }) => {
	let router = Router();

	router.get('/', (req, res) => {
		Db.getResources(req.query).exec(function (err,result) {
			res.send(result);
		})
	});
	

	return router;
}