// Usage: node scripts/hash-password.mjs YourPasswordHere
// Paste the output into ADMIN_PASSWORD_HASH in .env.local
import bcrypt from 'bcryptjs';

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs <password>');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 10);
console.log(hash);
