const routes = require("express").Router();

const authMiddleware = require("../middlewares/auth.middleware");

routes.use("/users", require("../routes/users.route"));
routes.use("/auth", require("../routes/auth.route"));
routes.use("/profile", authMiddleware, require("../routes/profile.route"));

module.exports = routes;
