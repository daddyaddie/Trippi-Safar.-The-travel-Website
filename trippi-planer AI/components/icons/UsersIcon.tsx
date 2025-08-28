import React from 'react';

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.57-1.036 1.396-1.953 2.348-2.596M12 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-9 8.25h13.5A2.25 2.25 0 0 1 18 21a2.25 2.25 0 0 1-2.25-2.25H18m-7.5-2.962A4.5 4.5 0 0 0 6 15.75v-1.5" />
    </svg>
);

export default UsersIcon;