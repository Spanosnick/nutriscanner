export function validateProfile({ name }) {
    if (!name.trim()) return 'Store name is required.';
    return '';
}
