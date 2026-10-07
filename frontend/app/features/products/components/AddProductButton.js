import { Plus } from 'lucide-react';

const SIZES = {
    sm: 'h-10 px-[18px] text-sm',
    lg: 'h-11 px-[22px] text-[15px]',
};

export default function AddProductButton({ onClick, size = 'sm' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-2 rounded-[10px] bg-accent font-semibold text-white transition-colors hover:bg-[#0B5A6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${SIZES[size]}`}
        >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add product
        </button>
    );
}
