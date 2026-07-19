import { useState, useEffect } from 'react';

export function ClockCell() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bento-cell bc-clock">
      <div className="bento-label">Location & Time</div>
      <div className="bento-h">Rawalpindi, Pakistan</div>
      <div className="clock-time">{time}</div>
      <div className="clock-tz">GMT+5 (PKT) — Ready to build</div>
    </div>
  );
}
