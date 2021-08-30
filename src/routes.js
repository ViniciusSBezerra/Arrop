const routes = require("express").Router();

const userController = require("./controllers/userController");
const login = require("./middlewares/login");
const authentication = require("./middlewares/authentication");

routes.post("/createUser", userController.createUser);
routes.get("/listUser", authentication.authentication, userController.listUser);
routes.put("/updateUser/:id", userController.updateUser);
routes.delete("/deleteUser/:id", userController.deleteUser);


routes.post("/login", login.login);

module.exports = routes;