import React, { useState } from 'react';
import styles from './Settings.module.css'; // Import je CSS-module voor styling

const leftSettings = [
  'Dashboard Omgeving',
  'Via e-mail',
  'Push op bureaublad',
  'Via sms',
  'Aanvraag afspraak',
  'Aankomende afspraak',
  'Bevestiging wijzigen',
  'Bevestiging afspraak',
];

const rightSettings = [
  'Geluid & Vastpinnen melding',
  'Geluid',
  'Vastpinnen melding',
  'Mode: Day',
  'Gemaakte wijziging door collega',
  'Foutmelding',
  'Aankomende updates dashboard',
  'Uitgevoerde updates dashboard',
];

const Settings = () => {
  const [leftSettingsState, setLeftSettingsState] = useState(
    Array(leftSettings.length).fill(false)
  );

  const [rightSettingsState, setRightSettingsState] = useState(
    Array(rightSettings.length).fill(false)
  );

  const handleToggleLeft = (index) => {
    const newSettingsState = [...leftSettingsState];
    newSettingsState[index] = !newSettingsState[index];
    setLeftSettingsState(newSettingsState);
    console.log(`${leftSettings[index]} is ${newSettingsState[index] ? 'ON' : 'OFF'}`);
  };

  const handleToggleRight = (index) => {
    const newSettingsState = [...rightSettingsState];
    newSettingsState[index] = !newSettingsState[index];
    setRightSettingsState(newSettingsState);
    console.log(`${rightSettings[index]} is ${newSettingsState[index] ? 'ON' : 'OFF'}`);
  };

  return (
    <div className={styles.settingsPage}>
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

      <div className={styles.logoContainer}>
        {/* Placeholder for site logos */}
        <h1>Site Logos</h1>
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
  );
};

export default Settings;
