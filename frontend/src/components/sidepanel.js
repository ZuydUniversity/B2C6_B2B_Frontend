import React, { useState, useEffect, useCallback } from 'react';
import './Sidepanel.css';

const Sidepanel = ({ isOpen, onClose }) => {
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const [calendarHTML, setCalendarHTML] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [appointments, setAppointments] = useState({});
    const [appointmentName, setAppointmentName] = useState('');
    const [appointmentStartTime, setAppointmentStartTime] = useState('');
    const [appointmentEndTime, setAppointmentEndTime] = useState('');
    const [notes, setNotes] = useState('');

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const manipulate = useCallback(() => {
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
            lit += `<li class="${isToday}" data-day="${i}">${i}</li>`;
        }

        for (let i = dayend; i < 6; i++) {
            lit += `<li class="inactive">${i - dayend + 1}</li>`;
        }

        setCalendarHTML(lit);
    }, [year, month, date]);

    useEffect(() => {
        manipulate();
    }, [manipulate]);

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

    const handleDayClick = useCallback((day) => {
        setSelectedDate(new Date(year, month, parseInt(day, 10)));
        setIsPopupOpen(true);
    }, [year, month]);

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedDate(null);
        setAppointmentName('');
        setAppointmentStartTime('');
        setAppointmentEndTime('');
    };

    const notifyUser = (title, body) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        }
    };

    const scheduleReminder = (appointment, appointmentDate) => {
        const now = new Date();
        const appointmentTime = new Date(appointmentDate);
    
        const timeUntilAppointment = appointmentTime - now;
        console.log('Time until appointment:', timeUntilAppointment);
    
        const reminders = [
            { time: 24 * 60 * 60 * 1000, message: 'Je hebt een afspraak binnen 24 uur: ' },
            { time: 12 * 60 * 60 * 1000, message: 'Je hebt een afspraak binnen 12 uur: ' },
            { time: 1 * 60 * 60 * 1000, message: 'Je hebt een afspraak binnen 1 uur: ' }
        ];
    
        reminders.forEach(reminder => {
            if (timeUntilAppointment < reminder.time) {
                setTimeout(() => {
                    console.log('Scheduling reminder:', reminder.message, `${appointment.name} om ${appointment.startTime}`);
                    notifyUser('Herinnering', `${reminder.message}${appointment.name} om ${appointment.startTime}`);
                }, reminder.time - timeUntilAppointment);
            }
        });
    };
    

    const handleAddAppointment = () => {
        if (!appointmentName || !appointmentStartTime || !appointmentEndTime) {
            alert("Vul alle velden in.");
            return;
        }

        if (appointmentEndTime <= appointmentStartTime) {
            alert("De eindtijd moet later zijn dan de starttijd.");
            return;
        }

        const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
        const newAppointments = { ...appointments };

        if (!newAppointments[dateKey]) {
            newAppointments[dateKey] = [];
        }

        const appointment = {
            name: appointmentName,
            startTime: appointmentStartTime,
            endTime: appointmentEndTime
        };

        newAppointments[dateKey].push(appointment);

        setAppointments(newAppointments);
        setAppointmentName('');
        setAppointmentStartTime('');
        setAppointmentEndTime('');
        closePopup();

        notifyUser('Afspraak toegevoegd', `Je hebt een nieuwe afspraak: ${appointment.name} om ${appointment.startTime}`);

        const appointmentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), ...appointment.startTime.split(':'));
        scheduleReminder(appointment, appointmentDate);
    };

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        document.querySelectorAll('.calendar-dates li').forEach(day => {
            day.addEventListener('click', () => {
                if (!day.classList.contains('inactive')) {
                    handleDayClick(day.getAttribute('data-day'));
                }
            });
        });
    }, [calendarHTML, handleDayClick]);

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

            {isPopupOpen && (
                <div className='popup' onClick={closePopup}>
                    <div className='popup-content' onClick={e => e.stopPropagation()}>
                        <span className='close' onClick={closePopup}>&times;</span>
                        <h2>{`${selectedDate.getDate()} ${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}</h2>
                        <input
                            type="text"
                            value={appointmentName}
                            onChange={(e) => setAppointmentName(e.target.value)}
                            placeholder="Voer afspraaknaam in"
                        />
                        <input
                            type="time"
                            value={appointmentStartTime}
                            onChange={(e) => setAppointmentStartTime(e.target.value)}
                            placeholder="Starttijd"
                        />
                        <input
                            type="time"
                            value={appointmentEndTime}
                            onChange={(e) => setAppointmentEndTime(e.target.value)}
                            placeholder="Eindtijd"
                        />
                        <button onClick={handleAddAppointment}>Afspraken toevoegen</button>
                        <div>
                            <h3>Geplande afspraken</h3>
                            <ul>
                                {(appointments[`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`] || []).map((appt, index) => (
                                    <li key={index}>
                                        {appt.startTime} - {appt.endTime} : {appt.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className='notes'>
                <h2>Notities</h2>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Type hier je notities..."
                />
            </div>
        </div>
    );
};

export default Sidepanel;
