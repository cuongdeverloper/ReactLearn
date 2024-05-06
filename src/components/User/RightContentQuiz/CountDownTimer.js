import React, { useEffect, useState } from "react";

const CountDownTimer = (props) => {
    const [count, setCount] = useState(100);
    useEffect(() => {
        if (count === 0) {
            setTimeout(() =>{
                props.onTimeUp();
            }, 1000)
            return; // Stop the countdown when count reaches 0
        }
        const timer = setInterval(() => {
            setCount(count => count - 1);
        }, 1000);
        return() => {clearInterval(timer)}
    }, [count]);

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num / 60) % 60;
        const seconds = sec_num % 60;

        return [hours, minutes, seconds]
            .map((v) => (v < 10 ? "0" + v : v))
            .filter((v, i) => v !== "00" || i > 0)
            .join(":");
    };

    return (
        <div className="countdowntimer-container">
            <div
                style={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "20px",
                    fontWeight: "700",
                }}
            >
                {toHHMMSS(count)}
            </div>
        </div>
    );
};

export default CountDownTimer;
