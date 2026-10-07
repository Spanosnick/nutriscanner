export function validateLogin({ email, password }) {
    if (!email.trim() || !password) return 'Email and password are required.';
    return '';
}

export function validateRegister({ storeName, email, password, confirmPassword }) {
    if (!storeName.trim()) return 'Store name is required.';
    if (!email.trim()) return 'Email is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return '';
}
