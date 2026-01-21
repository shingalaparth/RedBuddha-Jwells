
import dotenv from 'dotenv';
dotenv.config();

console.log("--- DEBUGGING CLOUDINARY CREDENTIALS ---");

const name = process.env.CLOUDINARY_NAME || "";
const key = process.env.CLOUDINARY_API_KEY || "";
const secret = process.env.CLOUDINARY_SECRET_KEY || "";

console.log(`Cloud Name: '${name}' (Length: ${name.length})`);
console.log(`API Key:    '${key}' (Length: ${key.length})`);
console.log(`API Secret: '${secret.substring(0, 4)}...${secret.substring(secret.length - 4)}' (Total Length: ${secret.length})`);

if (name.trim() !== name) console.log("⚠️  WARNING: Cloud Name has leading/trailing spaces!");
if (key.trim() !== key) console.log("⚠️  WARNING: API Key has leading/trailing spaces!");
if (secret.trim() !== secret) console.log("⚠️  WARNING: API Secret has leading/trailing spaces!");

if (!name || !key || !secret) {
    console.log("❌ ERROR: One or more values are missing.");
} else {
    console.log("✅ Format check passed (no visible spaces). If this fails, the values themselves are wrong.");
}
