import React, { useEffect, useState } from 'react';
import './Sidepanel.css';

const Sidepanel = ({ isOpen, onClose }) => {
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const [calendarHTML, setCalendarHTML] = useState('');

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const manipulate = () => {
        const dayone = new Date(year, month, 1).getDay();
        const lastdate = new Date(year, month + 1, 0).getDate();
        const dayend = new Date(year, month, lastdate).getDay();
        const monthlastdate = new Date(year, month, 0).getDate();

        let lit = "";

        for (let i = dayone; i > 0; i--) {
            lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
        }

        for (let i = 1; i <= lastdate; i++) {
            const isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "active" : "";
            lit += `<li class="${isToday}">${i}</li>`;
        }

        for (let i = dayend; i < 6; i++) {
            lit += `<li class="inactive">${i - dayend + 1}</li>`;
        }

        setCalendarHTML(lit);
    };

    useEffect(() => {
        manipulate();
    }, [year, month, date]);

    const handlePrevNextClick = (direction) => {
        let newMonth = direction === 'prev' ? month - 1 : month + 1;

        if (newMonth < 0 || newMonth > 11) {
            const newDate = new Date(year, newMonth, new Date().getDate());
            setDate(newDate);
            setYear(newDate.getFullYear());
            setMonth(newDate.getMonth());
        } else {
            setMonth(newMonth);
        }
    };

    return (
        <div className='sidepanel'>
            <div className='calendar'>
                <div className='calendar-navigation'>
                    <span id="calendar-prev" onClick={() => handlePrevNextClick('prev')}>Prev</span>
                    <span id="calendar-next" onClick={() => handlePrevNextClick('next')}>Next</span>
                </div>
                <div className='calendar-current-date'>
                    {months[month]} {year}
                </div>
                <ul className='calendar-dates' dangerouslySetInnerHTML={{ __html: calendarHTML }}></ul>
            </div>
        </div>
    );
};

export default Sidepanel;
