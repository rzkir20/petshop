function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

function validateBody(schema) {
  return function validateBodyMiddleware(req, res, next) {
    const body = req.body || {}

    for (const [field, rules] of Object.entries(schema || {})) {
      const value = body[field]

      if (rules.required && (value === undefined || value === null || value === '')) {
        return res.status(400).json({ message: `${field} is required` })
      }

      if (value === undefined || value === null) continue

      if (rules.minLen != null && String(value).length < rules.minLen) {
        return res
          .status(400)
          .json({ message: `${field} must be at least ${rules.minLen} characters` })
      }

      if (rules.email && !isEmail(value)) {
        return res.status(400).json({ message: `Valid ${field} is required` })
      }
    }

    return next()
  }
}

module.exports = { validateBody }

