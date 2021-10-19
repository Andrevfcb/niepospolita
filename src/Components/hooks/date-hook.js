import { useState, useCallback, useRef, useEffect } from 'react';

export const useDate = () => {

    const [today, setToday] = useState(false);
    const [dayId, setDayId] = useState(false);
    const [currentHour, setCurrentHour] = useState(false);
    const [currentMinute, setCurrentMinute] = useState(false);

    useEffect(() => {
    const date = new Date().getDay()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    setCurrentHour(hour)
    setCurrentMinute(minute)
        switch (date) {
            case 0: 
                setToday('Niedziela');
                setDayId("616866d188b1a5c67bdb3547")
                break;
            case 1: 
                setToday('Poniedziałek');
                setDayId("6168665588b1a5c67bdb3539")
                break;
            case 2: 
                setToday('Wtorek');
                setDayId("6168666588b1a5c67bdb353b")
                break;
            case 3: 
                setToday('Środa');
                setDayId("6168667c88b1a5c67bdb353d")
                break;
            case 4: 
                setToday('Czwartek');
                setDayId("6168669588b1a5c67bdb3540")
                break;
            case 5: 
                setToday('Piątek');
                setDayId("616866bd88b1a5c67bdb3543")
                break;
            case 6: 
                setToday('Sobota');
                setDayId("616866c888b1a5c67bdb3545")
                break;
            default:
                setToday('Niedziela');
                setDayId("616866d188b1a5c67bdb3547")
                break;
        }
    }, [])

  return { today, dayId, currentHour, currentMinute };
};
