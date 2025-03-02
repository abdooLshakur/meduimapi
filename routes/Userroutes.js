const express = require("express");
const router = express.Router();
const upload = require("../middleware/Fileuploads")
const {CreateUser, loginUser, updateUser} = require("../controllers/UserController")

router.post("/api/blog/register-user", upload.single('avatar'), CreateUser);
router.post("/api/blog/user-login", loginUser);
router.put('/update-user/:id', upload.single('avatar'), updateUser);

module.exports = router;