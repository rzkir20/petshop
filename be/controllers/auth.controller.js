const jwt = require("jsonwebtoken");

const Accounts = require("../models/Accounts");

const { hashPassword } = require("../utils/password");

async function signup(req, res) {
  try {
    const { name, email, password, pictures } = req.body || {};

    await Accounts.ensureIndexes();

    const existing = await Accounts.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const avatar =
      pictures ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        String(name).trim(),
      )}`;

    const account = await Accounts.createAccount({
      name,
      email,
      password: hashPassword(password),
      pictures: avatar,
    });

    const publicUser = Accounts.toPublic(account);

    const secret = process.env.JWT_SECRET;
    const token = secret
      ? jwt.sign(
          {
            sub: publicUser._id,
            email: publicUser.email,
            name: publicUser.name,
          },
          secret,
          { expiresIn: "7d" },
        )
      : null;

    return res.status(201).json({
      message: "Signup successful",
      user: publicUser,
      token,
    });
  } catch (err) {
    // Duplicate key error (unique email)
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { signup };
