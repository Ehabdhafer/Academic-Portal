const bcrypt = require("bcrypt");
const User = require("../models/user_model");
const Joi = require("joi");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { use } = require("passport");
// const crypto = require("crypto");
// const secretKey1 = crypto.randomBytes(32).toString("hex");
// console.log(secretKey1);

exports.register = async (req, res) => {
  const { name, email, password, role_id } = req.body;

  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,30}$/))
        .required(),
    });
    const validate = schema.validate({
      name,
      email,
      password,
    });
    if (validate.error) {
      res.status(405).json({ error: validate.error.details });
    } else {
      const checkemail = await User.findOne({ where: { email } });
      if (checkemail) {
        return res.status(400).json({ error: "Email Already Exists" });
      } else {
        const hashedpass = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email,
          password: hashedpass,
          role_id,
        });

        const payload = {
          name: user.name,
          email: user.email,
          role_id: user.role_id,
          user_id: user.user_id,
        };

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: "12h" });

        res.status(201).json({
          message: "User Added Successfully",
          token: token,
        });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
