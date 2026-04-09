const crypto = require('crypto')

function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const key = crypto.scryptSync(String(password), salt, 64)
  // Store as: scrypt$<saltB64>$<keyB64>
  return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`
}

module.exports = { hashPassword }

