export const EMPTY_PRODUCT = { name: '', categoryId: '', price: '', calories: '', description: '' };

export function validateProduct({ name, categoryId, price }) {
    if (!name.trim()) return 'Product name is required.';
    if (!categoryId) return 'Category is required.';
    if (!price || Number(price) <= 0) return 'Enter a valid price.';
    return '';
}

// Shape the raw form strings into the payload the API expects.
export function buildProductPayload({ name, categoryId, price, calories, description }) {
    return {
        name: name.trim(),
        categoryId,
        price,
        calories: calories || undefined,
        description: description.trim() || undefined,
    };
}
