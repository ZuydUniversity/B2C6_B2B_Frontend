import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import { Link } from 'react-router-dom';

const leftSettings = [
  'Dashboard Omgeving',
  'Via e-mail',
  'Push op bureaublad',
  'Via sms',
  'Aanvraag afspraak',
  'Aankomende afspraak',
  'Bevestiging wijzigingen',
  'Bevestiging afspraak',
];

const rightSettingsInitial = [
  'Geluid & Vastpinnen melding',
  'Geluid',
  'Vastpinnen melding',
  'Mode: Day',
  'Gemaakte wijziging door collega',
  'Foutmelding',
  'Aankomende updates dashboard',
  'Uitgevoerde updates dashboard',
];

const Settings = ({ closePopup, sendAppointmentReminders, setSendAppointmentReminders, sendConfirmationNotifications, setSendConfirmationNotifications }) => {
  const [leftSettingsState, setLeftSettingsState] = useState(
    Array(leftSettings.length).fill(false)
  );

  const [rightSettingsState, setRightSettingsState] = useState(
    Array(rightSettingsInitial.length).fill(false)
  );

  const [rightSettings, setRightSettings] = useState(rightSettingsInitial);
  const [volume, setVolume] = useState(50); // Volume state

  const handleToggleLeft = (index) => {
    const newSettingsState = [...leftSettingsState];
    newSettingsState[index] = !newSettingsState[index];
    setLeftSettingsState(newSettingsState);
    console.log(`${leftSettings[index]} is ${newSettingsState[index] ? 'ON' : 'OFF'}`);

    // Add logic to set state for sending reminders or notifications
    if (index === 5) { // Aankomende afspraak
      setSendAppointmentReminders(newSettingsState[index]);
    }

    if (index === 7) { // Bevestiging afspraak
      setSendConfirmationNotifications(newSettingsState[index]);
    }
  };

  const handleToggleRight = (index) => {
    const newSettingsState = [...rightSettingsState];
    const newRightSettings = [...rightSettings];

    if (index === 0) { // "Geluid & Vastpinnen melding"
      const value = !newSettingsState[index];
      newSettingsState[0] = value;
      newSettingsState[1] = value; // Geluid
      newSettingsState[2] = value; // Vastpinnen melding
    } else if (index === 3) { // Mode: Day/Night
      newSettingsState[index] = !newSettingsState[index];
      newRightSettings[index] = newSettingsState[index] ? 'Mode: Night' : 'Mode: Day';
    } else {
      newSettingsState[index] = !newSettingsState[index];
      if (newSettingsState[1] === false || newSettingsState[2] === false) {
        newSettingsState[0] = false; // Zet "Geluid & Vastpinnen melding" uit als een van de individuele uit staat
      } else if (newSettingsState[1] && newSettingsState[2]) {
        newSettingsState[0] = true; // Zet "Geluid & Vastpinnen melding" aan als beide individueel aan staan
      }
    }

    setRightSettingsState(newSettingsState);
    setRightSettings(newRightSettings);
    console.log(`${rightSettings[index]} is ${newSettingsState[index] ? 'AAN' : 'UIT'}`);
  };

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('sendAppointmentReminders', JSON.stringify(sendAppointmentReminders));
    localStorage.setItem('sendConfirmationNotifications', JSON.stringify(sendConfirmationNotifications));
  }, [sendAppointmentReminders, sendConfirmationNotifications]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedSendAppointmentReminders = localStorage.getItem('sendAppointmentReminders');
    const storedSendConfirmationNotifications = localStorage.getItem('sendConfirmationNotifications');

    if (storedSendAppointmentReminders !== null && storedSendAppointmentReminders !== "undefined") {
      setSendAppointmentReminders(JSON.parse(storedSendAppointmentReminders));
    }
    if (storedSendConfirmationNotifications !== null && storedSendConfirmationNotifications !== "undefined") {
      setSendConfirmationNotifications(JSON.parse(storedSendConfirmationNotifications));
    }
  }, [setSendAppointmentReminders, setSendConfirmationNotifications]);

  return (
    <div className={styles.settingsPage}>
      <div className={styles.logoTopWrapper}>
        <Link to="/Dashboard">
          <img src="JDB-logo.png" alt="JBD Logo" className={styles.jbdLogoTop} />
        </Link>
      </div>
      <h1 className={styles.title}>Instellingen</h1>
      <div className={styles.content}>
        <div className={`${styles.settingsBlock} ${styles.leftBlock}`}>
          {leftSettings.map((setting, index) => (
            <div className={styles.settingItem} key={index}>
              <span className={styles.settingText}>{setting}</span>
              <div className={styles.sliderContainer}>
                <input
                  type="checkbox"
                  id={`slider-left-${index}`}
                  className={styles.slider}
                  checked={leftSettingsState[index]}
                  onChange={() => handleToggleLeft(index)}
                />
                <label htmlFor={`slider-left-${index}`} className={styles.sliderLabel}></label>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.logoWrapper}>
          <img src="UMCUtrechtLogo.png" alt="UMC Utrecht Logo" className={styles.umcLogo} />
          <p className={styles.logoText}>Mede mogelijk gemaakt door</p>
          <img src="JDB-logo.png" alt="JBD Logo" className={styles.jbdLogo} />
        </div>

        <div className={`${styles.settingsBlock} ${styles.rightBlock}`}>
          {rightSettings.map((setting, index) => (
            <div className={styles.settingItem} key={index}>
              <span className={styles.settingText}>{setting}</span>
              <div className={styles.sliderContainer}>
                <input
                  type="checkbox"
                  id={`slider-right-${index}`}
                  className={styles.slider}
                  checked={rightSettingsState[index]}
                  onChange={() => handleToggleRight(index)}
                />
                <label htmlFor={`slider-right-${index}`} className={styles.sliderLabel}></label>
              </div>
            </div>
          ))}
        </div>
      </div>
      {rightSettingsState[1] && ( // Display volume slider if "Geluid" is on
        <div className={styles.volumeControl}>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            className={styles.volumeSlider}
            onChange={(e) => setVolume(e.target.value)}
          />
          <span className={styles.volumePercentage}>{volume}%</span>
        </div>
      )}
    </div>
  );
};

export default Settings;
