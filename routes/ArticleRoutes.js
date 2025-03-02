const express = require("express");
const router = express.Router();
const uploads = require("../middleware/Fileuploads")
const {CreateArticle, GetAllarticles, GetSinglearticle, GetUsersarticles, updateArticle, deleteArticle,} = require("../controllers/ArticleController");

router.post("/api/blog/Writearticle/:id", uploads.array('elements'), CreateArticle);
router.get("/api/blog/all",GetAllarticles)
router.get("/api/blog/Singlearticle/:id",GetSinglearticle)
router.get("/api/blog/Userarticles/:user_id",GetUsersarticles)
router.put("/api/blog/update-userarticles/:id",  uploads.array('elements'),updateArticle)
router.delete("/api/blog/delete/:id",deleteArticle)

module.exports = router;