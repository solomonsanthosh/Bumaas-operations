const db = require('../database');

exports.getOrders = (req, res) => {
	const { status } = req.params;
	console.log(status);
	db.query(
		`SELECT * FROM forecast WHERE status = ?`,
		[status],
		(err, results) => {
			if (err) console.log(err);
			console.log(results);
			res.json(results);
		}
	);
};


exports.getOrderDetails = (req, res) => {
	const { project_name } = req.params;

	db.query(
		`SELECT * from project_master WHERE project_name = ?`,
		[project_name],
		(err, results) => {
			if (err) console.log(err);
			console.log(results);
			res.json(results);
		}
	);
};

exports.updateOrderStatus = (req, res) => {
	const { project_name, status } = req.params;
	db.query(
		`UPDATE forecast SET status = ? WHERE project_name = ?`,
		[status, project_name],
		(err, results) => {
			if (err) console.log(err);
			console.log(results);
			res.json(results);
		}
	);
};
