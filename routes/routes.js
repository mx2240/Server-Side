const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

function routes(router) {
    router.post("/register", authController.register);
    router.post("/login", authController.login);
    router.get("/profile", authMiddleware, authController.profile);
    router.post("/contact", authController.contact);

    return router;
}

module.exports = routes;
