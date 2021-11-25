const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const USERmodel = require("../models/users.model");
const config = require("../../config");

module.exports = {
	signUp,
	signIn,
};

async function signUp(req, res) {
	const user = new USERmodel();

	const { name, username, email, password, repeatPassword } = req.body;
	user.name = name;
	user.username = username;
	user.email = email.toLowerCase();

	// Validación: nos llega password y repeatPassword
	if (!password || !repeatPassword) {
		return res.status(404).send({ message: "Las contraseñas son obligatorias" });
	}

	// Validación: password y repeatPassword han de coincidir
	if (password !== repeatPassword) {
		return res.status(404).send({ message: "Las contraseñas tienen que ser iguales." });
	}

	// Validación: el correo electrónico no debe estar ya registrado en la BD
	let userEmailExists = await USERmodel.findOne({ email: user.email });
	if (!!userEmailExists) {
		return res.status(404).send({ message: "El correo electrónico ya se encuentra registrado." });
	}

	// Validación: el usename no debe estar ya registrado en la BD
	let userUsernameExists = await USERmodel.findOne({ username: user.username });
	if (!!userUsernameExists) {
		return res.status(404).send({ message: "El username ya se encuentra registrado." });
	}

	// Pasadas las validaciones: ciframos la clave y guardamos el nuevo usuario en la BD
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(password, salt, function (err, hash) {
			if (err) {
				return res.status(500).send({ message: "Error al encriptar la contraseña" });
			}

			user.password = hash;
			user.save((err, userStored) => {
				if (err) {
					return res.status(500).send({ message: "Error al crear el usuario: " + err });
				}

				if (!userStored) {
					return res.status(404).send({ message: "No se ha podido crear el usuario." });
				} else {
					return res.status(200).send({ user: userStored });
				}
			});
		});
	});
	const {} = req.body;
}

async function signIn(req, res) {
	let { email, password } = req.body;

	email = email.toLowerCase();

	try {
		const userDB = await USERmodel.findOne({ email: req.body.email });
	} catch (erro) {
		return res.status(500).json(erro);
	}

	// Verifica que exista un usuario con el mail escrito por el usuario.
	if (!userDB) {
		return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
	}

	bcrypt.compare(password, userDB.password, function (err, result) {
		// if passwords do not match => handle error
		if (err) {
			return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
		}

		// if passwords match
		if (result) {
			// Genera el token de autenticación
			let token = jwt.sign({ usuario: userDB.name, email: userDB.email }, config.SECRET_KEY);

			res.json({
				token,
			});
		} else {
			// response is OutgoingMessage object that server response http request
			return res.json({ success: false, message: "passwords do not match" });
		}
	});
}
