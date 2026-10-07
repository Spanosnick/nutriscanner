'use client';

import { useState } from 'react';

/**
 * Shared form state: one `values` object, one `handleChange` keyed by input
 * `name`, an optional `validate(values)` returning an error string, and
 * `error`/`loading` state wrapped around an async `onSubmit(values)`.
 */
export function useForm({ initialValues, validate, onSubmit }) {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const reset = () => {
        setValues(initialValues);
        setError('');
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setError('');

        const validationError = validate?.(values);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            await onSubmit(values);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { values, error, loading, handleChange, handleSubmit, reset };
}
