const conn = require("../config/dbConn");
const getCategory = async (req, res) => {
  try {
    await conn.connect(async (err) => {
      const sql = `SELECT * FROM category `;
      await conn.query(sql, async (err, result) => {
        if (result.length) {
          res.json({
            WS: result,
            message: "Ok",
            status: "success",
          });
        } else {
          res
            .status(404)
            .json({ 
				  message: "No found category",
				  status: "fail" 
				});
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const createCategory = async (req, res) => {
  if (!req.body.name || !req.body.status) {
    res.status(400).json({
      message: "Pls Fill the value",
      status: "fail",
    });
  }
  const { name, status } = req.body;
  try {
    await conn.connect(async (err) => {
      const insert = `INSERT INTO category (name,status) VALUES ('${name}','${status}')`;
      await conn.query(insert, (err) => {
        if (err) throw err;
        res.json({
          message: "Ok",
          status: "success",
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const { name, status } = req.body;
  if (!name || !status) {
    res.status(400).json({
      message: "Pls Fill the value",
      status: "fail",
    });
  }
  try {
    await conn.connect(async (err) => {
      const update = `UPDATE category SET name='${name}',status='${status}' WHERE id='${id}'`;
      await conn.query(update, (err) => {
        if (err) throw err;
        res.json({
          message: "Ok",
          status: "success",
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await conn.connect(async (err) => {
      const sql = `DELETE FROM category WHERE id='${id}' `;
      await conn.query(sql, async (err) => {
        res.json({
          message: "Ok",
          status: "success",
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
