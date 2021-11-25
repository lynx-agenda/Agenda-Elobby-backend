const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = {
	authenticateToken,
};

//  authentication middleware
function authenticateToken(req, res, next) {
	
  // Comprobamos que nos llega el token
  const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	// Error 401 - Unauthorized
	if (token == null) return res.sendStatus(401);

	// Si no hay error, la información se guarda en dataStored
	jwt.verify(token, config.SECRET_KEY, (err, dataStored) => {
		// Error 403 – Forbidden
		if (err) return res.sendStatus(403);

    // En dataStored tenemos los datos que guardamos dentro del token
		req.user = dataStored;
		next();
	});
}
