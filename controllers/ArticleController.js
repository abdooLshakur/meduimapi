const article = require("../models/ArticleModel");
const User = require("../models/UserModel")



const CreateArticle = async (req, res) => {
  try {
    const { title, description, elements } = req.body;
    const id = req.params.id;

    const check_user = await User.findById(id).select("full_name avatar");
    if (!check_user) {
      return res.status(404).json({ success: false, message: "User ID does not exist" });
    }

    const parsedElements = JSON.parse(elements);

    const uploadedImages = req.files || [];  
    let fileIndex = 0;  

    const finalElements = parsedElements.map((element) => {
      if (element.type === "image") {
        if (fileIndex < uploadedImages.length) {
          const imageFile = uploadedImages[fileIndex];
          fileIndex++; 
          return {
            type: "image",
            content: imageFile.path, 
          };
        } else {
          return element;
        }
      }
      return element;
    });

    const newArticle = new article({
      user_id: check_user._id,
      user_name: check_user.full_name,
      user_avatar: check_user.avatar,
      title,
      description,
      elements: finalElements,
    });

    const savedArticle = await newArticle.save();
    res.status(200).json({
      success: true,
      message: "Article published successfully",
      data: savedArticle,
    });
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).json({
      success: false,
      message: "Failed to publish article",
      error: err.message,
    });
  }
};








const GetAllarticles = async (req, res) => {
    try {
        const articles = await article.find({});
        res.send({
            success: true,
            message: "All articles retrieved successfully",
            data: articles,
        });
    } catch (err) {
        res.send({
            success: false,
            message: "Failed to fetch articles",
            error: err.message,
        });
    }
    
};

const GetSinglearticle = async (req, res) => {
    try {
        const id = req.params.id;
        const checkIfArticleID = await article.findOne({ _id: id });
        if (!checkIfArticleID) {
          res.send({
            success: false,
            messae: "Invalid  Article ID",
          });
          return
        }

       
        const resp = await article.findOne({_id: id})
        res.send({
          success: true,
          message: "single artcle",
          data: resp,
        });
      } catch (err) {
        res.send({
          success: false,
          message: "Failed to Fetch article",
          error: err.massage,
        });
      }
};

const GetUsersarticles = async (req, res) => {
    try {
        const id = req.params.user_id;
        const checkIfUserID = await User.findOne({ _id: id });
        if (!checkIfUserID) {
          res.send({
            success: false,
            messae: "Invalid  User ID",
          });
          return
        }
      
        const resp = await article.find({ user_id: id });
        if (resp.length === 0) {
            return res.send({
                success: false,
                message: "No articles found for this user",
                data: [],
            });
        }

        res.send({
            success: true,
            message: "All articles for the user retrieved successfully",
            data: resp,
        });
    } catch (err) {
        res.send({
            success: false,
            message: "Failed to fetch articles",
            error: err.message,
        });
    }
};

const updateArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const imagePath = req.file ? req.file.path : null;

      const resp = await  article.findByIdAndUpdate(
            id,
            {
                title: req.body.name,
                paragraph: req.body.paragraph,
                description: req.body.description,
                image: imagePath,
                images: imagePath
            },
            { new: true }
        )

        if (!id) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.send({
            success: true,
            message: "Article Updated Successfully",
            data: resp,
        });
    } catch (err) {
        res.send({
            success: false,
            message: "Failed to Update Article",
            error: err.massage,
        });
    }



};

const deleteArticle = async (req, res) => {
  try {
      const id = req.params.id;

      // Check if the article exists
      const articleExists = await article.findById(id);
      // if (!articleExists) {
      //     return res.status(404).json({ success: false, message: "Article not found" });
      // }

      // Delete the article
      await article.findByIdAndDelete(id);

      res.status(200).json({
          success: true,
          message: "Article deleted successfully",
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: "Failed to delete article",
          error: err.message,
      });
  }
};





module.exports = {CreateArticle, GetSinglearticle,GetAllarticles, GetUsersarticles, updateArticle, deleteArticle} 