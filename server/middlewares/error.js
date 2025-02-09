const error = {
	e401: (req, res, err) => {
		res.status(401).send({
			title: "Error 401 Authorization required",
			message: err.message,
		});
  	},
  	e403: (req, res, err) => {
		res.status(403).send({
			title: "Error 403 Forbidden",
			message: err.message,
		});
	},
	e404: (req, res) => {
		res.status(404).send({
			title: "Error 404 Not Found",
			message: "El recurso no existe",
		});
  	},
	e500: (req, res, err) => {
		res.status(500).send({
			title: "Error 500 Internal Server",
			message: err.message,
		});
	}
};

export default error;
