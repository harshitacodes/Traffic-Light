import React, { useState, useEffect } from 'react';
import './TrafficLight.css';

function TrafficLight() {
    const [redLight, setRedLight] = useState(true);
    const [yellowLight, setYellowLight] = useState(false);
    const [greenLight, setGreenLight] = useState(false);

    useEffect(() => {
        const runTrafficLight = () => {
            // Red light (4000ms)
            setRedLight(true);
            setYellowLight(false);
            setGreenLight(false);

            const greenTimer = setTimeout(() => {
                // Green light (3000ms)
                setRedLight(false);
                setYellowLight(false);
                setGreenLight(true);

                const yellowTimer = setTimeout(() => {
                    // Yellow light (500ms)
                    setRedLight(false);
                    setYellowLight(true);
                    setGreenLight(false);

                    const redTimer = setTimeout(() => {
                        runTrafficLight(); // Restart the cycle
                    }, 500);

                    return () => clearTimeout(redTimer);
                }, 3000);

                return () => clearTimeout(yellowTimer);
            }, 4000);

            return () => clearTimeout(greenTimer);
        };

        const cleanup = runTrafficLight();
        return () => cleanup();
    }, []);

    return (
        <div className="traffic-light">
            <div className={`light red ${redLight ? 'active' : ''}`} />
            <div className={`light yellow ${yellowLight ? 'active' : ''}`} />
            <div className={`light green ${greenLight ? 'active' : ''}`} />
        </div>
    );
}

export default TrafficLight;