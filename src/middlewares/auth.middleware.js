const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = {
	authenticateToken,
	checkAuthUserValidity,
	isAdmin,
};

//  authentication middleware => cheks if user is logged
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

		// Cuando llegamos aquí: estamos  logueados
		// En dataStored tenemos los datos que guardamos dentro del token
		req.locals = { dataStored };

		next();
	});
}

/**
 * La función verifica que el usuario tiene permiso para realizar la
 * request. Tendrá permiso siempre que sea userRole==="admin" o
 * un userRole==="user" que realiza una operación sobre su misma id
 */
function checkAuthUserValidity(req, res, next) {
	const userRole = req.locals.dataStored.userRole;
	const userId = req.locals.dataStored.userId;

	// console.log(req);

	if (userRole === "user" && userId != req.params.id) {
		// console.log(userRole);
		// console.log(req.params.id);
		// console.log(userId);
		// console.log(req.params);
		return res.status(403).send({ msg: "El usuario carece de credenciales válidas para la petición realizada" });
	}

	next();
}

/**
 * La función verifica que el usuario tiene userRole==="admin"
 */
function isAdmin(req, res, next) {
	const userRole = req.locals.dataStored.userRole;

	if (userRole !== "admin") {
		return res.status(403).send("El usuario carece de credenciales válidas para la petición realizada");
	}

	next();
}
