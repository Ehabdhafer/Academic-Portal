const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/UserController");
const verify = require("../middlewares/authorizationJWT");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/getuser", verify.authorize([1, 2]), UserController.getUser);
router.put("/deleteuser", verify.authorize([1, 2]), UserController.deleteUser);

module.exports = router;
