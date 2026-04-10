"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}
function validateBody(schema) {
    return function validateBodyMiddleware(req, res, next) {
        const body = (req.body || {});
        for (const [field, rules] of Object.entries(schema || {})) {
            const value = body[field];
            if (rules.required &&
                (value === undefined || value === null || value === "")) {
                return res.status(400).json({ message: `${field} is required` });
            }
            if (value === undefined || value === null)
                continue;
            if (rules.minLen != null && String(value).length < rules.minLen) {
                return res
                    .status(400)
                    .json({ message: `${field} must be at least ${rules.minLen} characters` });
            }
            if (rules.email && !isEmail(value)) {
                return res.status(400).json({ message: `Valid ${field} is required` });
            }
            if (rules.pattern != null &&
                String(value).length > 0 &&
                !rules.pattern.test(String(value))) {
                return res.status(400).json({
                    message: rules.patternMessage || `${field} format is invalid`,
                });
            }
            if (rules.oneOf != null && rules.oneOf.length > 0) {
                if (!rules.oneOf.includes(String(value))) {
                    return res.status(400).json({
                        message: `${field} must be one of: ${rules.oneOf.join(", ")}`,
                    });
                }
            }
        }
        return next();
    };
}
