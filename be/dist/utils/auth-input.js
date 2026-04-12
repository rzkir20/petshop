"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePasswordInput = normalizePasswordInput;
/** Trims ends so accidental spaces from paste/autofill do not break verification. */
function normalizePasswordInput(value) {
    return String(value ?? "").trim();
}
