const User = require("../model/userModel");
const bcrypt = require("bcrypt");
console.log(User);
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
      const { userName , password } = req.body;
      const member = await User.findOne({ userName });
      if (!member)
        return res.json({ msg: "Incorrect UserName!!", status: false });
      const isPasswordValid = await bcrypt.compare(password,member.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Password!!", status: false });
      
      delete member.password;
      return res.json({ status: true, member });
    } catch (err) {
      next(err);
    }
  };
  