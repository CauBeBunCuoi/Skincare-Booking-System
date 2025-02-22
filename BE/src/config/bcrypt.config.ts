// src/config/jwt.config.ts
export const BCRYPTConfig = {
    SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
