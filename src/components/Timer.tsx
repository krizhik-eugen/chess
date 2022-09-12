import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from '../models/Player';
import {Colors} from '../models/Colors';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer() {
        setBlackTime(prevTime => prevTime - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prevTime => prevTime - 1)
    }

    function handleRestart() {
        setBlackTime(300);
        setWhiteTime(300)
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <h2>Timer for black: {blackTime}</h2>
            <h2>Timer for white: {whiteTime}</h2>
        </div>
    );
};

export default Timer;