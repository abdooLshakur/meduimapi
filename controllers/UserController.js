const bcrypt = require('bcryptjs');
const Users = require("../models/UserModel")

const CreateUser = async (req, res) => {
  try {
    const { full_name, email, bio, pronounce, password } = req.body;
    const check_user = await Users.findOne({ email });
    if (check_user) {
      res.send({
        success: false,
        messae: "Email Already Exists",
      });
      return
    }
    const avatarPath = req.file ? req.file.path : null;
    const encrypt_password = await bcrypt.hash(password, 12);
    const New_member = { full_name, email, bio, pronounce, password: encrypt_password, avatar: avatarPath };
    const New_user = await new Users(New_member).save();
    res.send({
      success: true,
      message: "User created Successfully",
      data: New_user
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Failed to create user",
      error: err.message,
    })
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const checkExists = await Users.findOne({ email });
    if (!checkExists) {
        return res.status(404).json({
            success: false,
            message: "Email / user not found",
        });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, checkExists.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid password",
        });
    }

    // Remove password before sending response
    const userData = checkExists.toObject();
    delete userData.password;

    return res.status(200).json({
        success: true,
        message: "Login successful",
        data: userData, 
    });

} catch (err) {
    return res.status(500).json({
        success: false,
        error: err.message,
    });
}


}

const getAllUsers = async (req, res) => {
  Users.find({}, {})
    .then((resp) => {
      res.send({
        success: true,
        message: "All Users",
        data: resp,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Failed to Fetch users",
        error: err.massage,
      });
    });
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const avatarPath = req.file ? req.file.path : null;

    // Find user first
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields dynamically
    const updatedFields = {
      full_name: req.body.full_name,
      bio: req.body.bio,
      pronounce: req.body.pronounce,
      email: req.body.email, // Ensure email is updated
    };

    // Update avatar only if a new one is uploaded
    if (avatarPath) {
      updatedFields.avatar = avatarPath;
    }

    const updatedUser = await Users.findByIdAndUpdate(id, updatedFields, { new: true });

    res.json({
      success: true,
      message: "User Updated Successfully",
      user: updatedUser, // Send updated user back to frontend
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: err.message, // Fix incorrect property name
    });
  }
};


const updateAvatar = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if a new avatar was uploaded
    const avatarPath = req.file ? req.file.path : null;
    if (!avatarPath) {
      return res.status(400).json({ error: 'No avatar uploaded' });
    }

    // Find and update the user's avatar
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { avatar: avatarPath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Avatar updated successfully', Users: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = (res, req) => {
  const id = req.params.id;
  Users.findByIdAndDelete(id)
    .then(() => {
      res.send({
        success: true,
        message: "User Deleted Successfully",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Failed to Delete user",
        error: err.massage,
      });
    });
};

module.exports = {
  CreateUser,
  loginUser,
  getAllUsers,
  updateUser,
  updateAvatar,
  deleteUser
};