import React from 'react';

const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.66.538-1.192 1.2-1.192h.013c.662 0 1.2.533 1.2 1.192v.025c0 .66-.538 1.192-1.2 1.192h-.013c-.662 0-1.2-.533-1.2-1.192v-.025Zm-3.013 0c0-.66.538-1.192 1.2-1.192h.013c.662 0 1.2.533 1.2 1.192v.025c0 .66-.538 1.192-1.2 1.192h-.013c-.662 0-1.2-.533-1.2-1.192v-.025ZM9.75 21.75l3-4.5 3 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export default DiamondIcon;