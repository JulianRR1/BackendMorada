import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ajusta según tu modelo
import bcrypt from "bcryptjs"; // Si tus contraseñas están hasheadas


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log("Usuario encontrado:", user);

    if (!user || user.rol !== "ADMIN") {
      return res.status(401).json({ message: "Usuario no autorizado" });
    }

    const passwordValid = await bcrypt.compare(password, user.password); // Si usas bcrypt
    console.log("Contraseña ingresada:", password);
    console.log("Contraseña hasheada:", user.password);

    console.log("Contraseña válida:", passwordValid);
    if (!passwordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password, rol } = req.body;

  try {
    // Verifica si ya existe el correo
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      rol: rol || "USER" // Por defecto USER
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente." });
  } catch (err) {
    console.error("Error al registrar:", err);
    res.status(500).json({ message: "Error al registrar usuario." });
  }
};