const jwt = require("jsonwebtoken");
const { sendWelcomeMail } = require("../utils/mailer");

// Fake DB
const users = [];

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = { id: users.length + 1, name, email, password };
    users.push(user);

    await sendWelcomeMail(email, name);

    res.status(201).json({ message: "Registered successfully" });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
};

exports.profile = (req, res) => {
    res.json({
        message: "Profile data",
        user: req.user,
    });
};

exports.contact = (req, res) => {
    const { name, email, message } = req.body;

    res.json({
        success: true,
        message: "Contact form submitted",
        data: { name, email, message },
    });
};
