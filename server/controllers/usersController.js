const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const usernameCheck = await User.findOne({ userName });
    if (usernameCheck)
      return res.json({ msg: "Username already used!!", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used!!", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    delete user.password;
    await user.save();
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const member = await User.findOne({ userName });
    if (!member)
      return res.json({ msg: "Incorrect UserName!!", status: false });
    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password!!", status: false });

    delete member.password;
    return res.json({ status: true, member });
  } catch (err) {
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImageUrl = req.body.image;
    let user = await User.findOne({ _id: userId });
    console.log("This is my user", user);
    user.isAvatarImageSet = true;
    user.avatarImage = avatarImageUrl;
    user.save();
    return res.json({ image:user.avatarImage,status: true });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllusers = async (req, res, next) => {
  try {
    const users = await User.find({_id:{$ne:req.params.id}});
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
