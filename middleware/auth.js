const { readOne } = require("../DL/controllers/userController");
const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_JWT, (err, verifyToken) => {
      if (err) {
        // return res.send({code: 403, message: "not authorized"});
        return res.code(403).send("not authorized");
      }
      req.id = verifyToken.id;
      console.log("req.id: ", req.id);
      console.log("auth: ", verifyToken);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const user = await readOne({ _id: req._id });
    if (user.permission === "admin"){
      next();
    } else{
      throw new Error(". only for admin");
      // throw new Error({code: 401, message: "error! only for admin"});
    }
  } catch (error) {
    res.status(401).send({message: error.name + error.message });
  }
};

module.exports = { authAdmin, authJWT };
