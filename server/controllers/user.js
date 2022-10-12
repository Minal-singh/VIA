import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodeoutlook from "nodejs-nodemailer-outlook";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    if (existingUser.status != "Active") {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    res.status(200).json({ result: existingUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.status === "Pending")
        await User.findOneAndDelete({ email });
      else return res.status(400).json({ message: "User already exist." });
    }

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const encryptedPassword = await bcrypt.hash(password, 12);
    const confirmationCode = jwt.sign({ email }, process.env.JWT_SECRET);
    const name = `${firstName} ${lastName}`;

    await User.create({
      email,
      password: encryptedPassword,
      name,
      confirmationCode,
    });

    nodeoutlook.sendEmail({
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      from: process.env.USER,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for using VIA webapp. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
      onError: (e) => console.log("error", e),
    });

    return res.status(200).json({
      message: "User was registered successfully! Please check your email",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  const { confirmationCode: confirmationCode } = req.params;
  try {
    const user = await User.findOne({
      confirmationCode,
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    user.status = "Active";
    await user.save();
    return res.status(200).json({
      message: "Email verified successfully. Login to continue!",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "Active" }).select(
      "name _id email"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
