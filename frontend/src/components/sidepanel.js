import React from 'react'; // Import React
import './Sidepanel.css'; // Import CSS file for styling

const Sidepanel = ({ isOpen, onClose }) => {
    return (
        <div className='sidepanel'>
            {/* Sidepanel content here */}
            <p>This is the sidepanel content.</p>
            
        </div>
    );
};

export default Sidepanel; // Export the component
