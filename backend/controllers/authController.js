const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 🔐 SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, adminId } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    if (role === "Admin" && adminId !== "ADMIN123") {
      return res.status(400).json("Invalid Admin ID");
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // 🔥 FIX: adminid (lowercase)
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashed,
          role,
          adminid: role === "Admin" ? adminId : null
        }
      ])
      .select()
      .single();

    if (error) {
      console.log("Signup Error:", error);
      return res.status(400).json(error.message);
    }

    res.json({
      message: "Signup successful",
      user: data
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};



// 🔐 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return res.status(400).json("User not found");
    }

    const match = await bcrypt.compare(password, data.password);

    if (!match) {
      return res.status(400).json("Wrong password");
    }

    const token = jwt.sign(
      { id: data.id, role: data.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: data.role,
      user: {
        id: data.id,
        name: data.name,
        email: data.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};