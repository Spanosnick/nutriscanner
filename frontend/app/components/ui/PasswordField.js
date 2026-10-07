'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FormField, { inputClass } from './FormField';

export default function PasswordField({ label, name, ...inputProps }) {
    const [visible, setVisible] = useState(false);
    const Icon = visible ? EyeOff : Eye;

    return (
        <FormField label={label} name={name}>
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={visible ? 'text' : 'password'}
                    className={`${inputClass} pr-10`}
                    {...inputProps}
                />
                <button
                    type="button"
                    onClick={() => setVisible((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={visible ? 'Hide password' : 'Show password'}
                >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                </button>
            </div>
        </FormField>
    );
}
