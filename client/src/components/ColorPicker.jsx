import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';

const ColorPicker = ({ selectedColor, onChange }) => {
    // --- Configuration ---
    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Green", value: "#108981" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Teal", value: "#1488A6" },
        { name: "Pink", value: "#EC4899" },
        { name: "Gray", value: "#687280" },
        { name: "Black", value: "#1F2937" }
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='relative'>
            {/* --- Trigger Button --- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'
            >
                <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
            </button>

            {/* --- Selection Menu --- */}
            {isOpen && (
                <div className='grid grid-cols-4 w-60 gap-4 absolute top-full left-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-lg'>
                    {colors.map((color) => (
                        <div
                            key={color.value}
                            className='relative cursor-pointer group flex flex-col items-center'
                            onClick={() => {
                                onChange(color.value);
                                setIsOpen(false);
                            }}
                        >
                            <div
                                className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.value ? 'border-black' : 'border-transparent group-hover:border-gray-300'}`}
                                style={{ backgroundColor: color.value }}
                            >
                                {selectedColor === color.value && (
                                    <div className='flex items-center justify-center h-full'>
                                        <Check className="size-5 text-white" />
                                    </div>
                                )}
                            </div>
                            <p className='text-[10px] text-center mt-1 text-gray-500'>{color.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorPicker;