const conn = require("../config/dbConn");
const { generateJwtToken } = require('../middleware/jwtToken')
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
	const { name, userName, password } = req.body;
	if (!name || !userName || !password ) {
		let msg = "Pls enter the all fields";
		res.status(400).json({ message: msg, status: "fail" });
	}else{
		await conn.connect(async (err) => {
			let sql = `SELECT * FROM login WHERE email='${userName}'`;
			await conn.query(sql, async (err, result) => {
				if (err) throw err;
				if (result != "") {
					let msg = "User Already Exist. Please Login";
					return res.status(400).json({
					message: msg,
					status: "fail",
					});
				} else {
					// if (password === confirmPassword) {
					const salt = await bcrypt.genSalt(10);
					const hashedPassword = await bcrypt.hash(password, salt);
					const token = generateJwtToken({ username: userName });
					const insert = `INSERT INTO login (name,password,email,role) VALUES ('${name}','${hashedPassword}','${userName}', 'admin')`;
					if (await conn.query(insert)) {
						return res.status(200).json({
							token: token,
							message: "ok",
							status: "success",
						});
					}
				}
			});
		});
	}
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
	await conn.connect(async (err) => {
  	let sql = `SELECT * FROM login WHERE email='${userName}'`
  	await conn.query(sql, async (err,result) =>{
  	  if (err) throw err;
  	  if(!result.length){
		let msg = "Miss Matched Password";
		return res.status(400).json({
		  message: msg,
		  status: "fail",
		});
  	  }else{
  		let pwd;
  		result.map(value => {
  		  pwd = value.password;
  	  })
  	//   console.log(pwd);
  		let validPassword = await bcrypt.compare(password,pwd);
  		if(!validPassword){
			let msg = "Miss Matched Password";
			return res.status(400).json({
			  message: msg,
			  status: "fail",
			});
  		}else{
  			const token = generateJwtToken({ username: userName })
  			if(token){
			return res.status(200).json({
				  token: token,
				  message: "ok",
				  status: "success",
				});
  			}
  		}
  	  }
  	})
	})
  } catch (error) {
	console.log(error);
  }
};

const users = async (req, res) => {
  await conn.connect(async (err) => {
	let sql = `SELECT * FROM login`;
	await conn.query(sql, (err, result) => {
	  if (err) throw err;
	  if (!result.length) {
		let msg = "Users Empty";
		return res.status(404).json({
		  message: msg,
		  status: "fail",
		});
	  } else {
		return res.json({
			WS : result,
		  message: "ok",
		  status: "success",
		});
	  }
	});
  });
	// res.status(200).json(req.users)
};

module.exports = {
  register,
  login,
  users,
};
