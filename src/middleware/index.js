import { Router } from 'express';
import CryptoJS from 'crypto-js'

export default ({ config, db }) => {
	let routes = Router();

	routes.use(function(req, res, next) {
		
		  // check header or url paramemters or post parameters for token
			var token = req.body.token || req.query.token || req.headers['x-access-token'];
			
			// decode token
		  if (token) {
			var bytes  = CryptoJS.AES.decrypt(token, config.secretToken);
			var plaintoken = bytes.toString(CryptoJS.enc.Utf8);
			
			// verifies secret and checks exp
			  if (config.token != plaintoken) {					
					return res.json({ success: false, message: 'Failed to authenticate token.' });    
			  } else {
					// if everything is good, save to request for use in other routes
					next();
			  }
		
		  } else {
		
			// if there is no token
			// return an error
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		
		  }
		});

	return routes;
}
