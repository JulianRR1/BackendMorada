// Seed de administrador — vía oficial para crear el primer admin sin exponer
// el endpoint HTTP. Uso:
//   ADMIN_NAME="Nombre" ADMIN_EMAIL="correo@dominio.com" ADMIN_PASSWORD="..." node scripts/createAdmin.js
//
// Lee MONGO_URI de las variables de entorno (.env). Idempotente: si el correo
// ya existe, no lo duplica.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, MONGO_URI } = process.env;

const run = async () => {
  if (!MONGO_URI) throw new Error("Falta MONGO_URI");
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Faltan ADMIN_EMAIL y/o ADMIN_PASSWORD");
  }

  const email = ADMIN_EMAIL.trim().toLowerCase();
  await mongoose.connect(MONGO_URI);

  const exists = await User.findOne({ email });
  if (exists) {
    console.log(`ℹ️  Ya existe un usuario con ${email} (rol: ${exists.role}). No se crea.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({
    name: ADMIN_NAME || "Administrador",
    email,
    password: hashedPassword,
    role: "ADMIN",
  });

  console.log(`✅ Admin creado: ${email}`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
