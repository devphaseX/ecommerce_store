import { useState } from 'react';
import './style.css';
import { useEffect } from 'react';

const DAY_IN_MILLISEC = 1000 * 60 * 60 * 24;
const HOUR_IN_MILLISEC = 1000 * 60 * 60;
const MINUTE_IN_MILLISEC = 1000 * 60;

type CountDownClockProps = { date: Date | string | number };

const CountDownClock = ({ date }: CountDownClockProps) => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const destination = new Date('feb 10, 2023').getTime();
    const now = Date.now();
    if (destination < now) return;
    let offerPeriod = destination - now;
    let interval: ReturnType<typeof setTimeout>;

    let timeout = false;

    const updateTimer = () => {
      const different = offerPeriod - performance.now();
      if ((timeout = different <= 0)) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }
      const days = Math.trunc(different / DAY_IN_MILLISEC);
      const hours = Math.trunc(
        (different % DAY_IN_MILLISEC) / HOUR_IN_MILLISEC
      );
      const minutes = Math.trunc(
        (different % HOUR_IN_MILLISEC) / MINUTE_IN_MILLISEC
      );

      const seconds = Math.trunc((different % MINUTE_IN_MILLISEC) / 1000);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };

    const setTimeLoop = () =>
      (interval = setTimeout(() => {
        updateTimer();
        if (timeout) {
          interval = -1 as unknown as NodeJS.Timeout;
          return;
        }
        setTimeLoop();
      }, 900));

    setTimeLoop();
    return () => interval && clearTimeout(interval);
  }, [new Date(date).getTime()]);

  return (
    <div className="clock__wrapper">
      <TimeDisplay left={days} moment="day" />
      <TimeDisplay left={hours} moment="hour" />
      <TimeDisplay left={minutes} moment="minute" />
      <TimeDisplay left={seconds} moment="second" />
    </div>
  );
};

type TimeMoment = 'day' | 'hour' | 'minute' | 'second';

type TimeDisplayProps = { moment: TimeMoment; left: number };

const TimeDisplay = ({ left, moment }: TimeDisplayProps) => {
  return (
    <div className="clock__data">
      <div className="clock__info">
        <h1>{left}</h1>
        <h5>
          {moment}
          {left > 1 ? 's' : ''}
        </h5>
      </div>
      <span className="time-delimiter">:</span>
    </div>
  );
};

export { CountDownClock };
