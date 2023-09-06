import React, { useRef, useState } from "react";
import paragraphs from "./paragraph";
import { useEffect } from "react";
import "../css/play.css";
import WebFont from "webfontloader";
import axios from "axios";

WebFont.load({
  google: {
    families: ["Montserrat&display=swap"],
  },
});

export default function Play() {
  let countDown = 60,
    isTyping = 0,
    paraRef = useRef(null),
    inputRef = useRef(null);

  const [currInput, setCurrInput] = useState(""),
    [timer, setTimer] = useState(countDown),
    [charIndex, setCharIndex] = useState(0),
    [mistakes, setMistakes] = useState(0),
    [WPM, setWPM] = useState(0),
    [accuracy, setAccuracy] = useState(0),
    [isTimerRunning, setIsTimerRunning] = useState(false);

  let timeLeft = timer;

  const [statData, setStatData] = useState(
    {
      WPM: 0,
      accuracy: 0,
      mistakes: 0
    }
  )



  useEffect(() => {
    inputRef.current.disabled = true;
    generateParagraph();

    const sendStatData = async () => {
      const id = sessionStorage.getItem('id');
      try {
        const res = await axios.post(`http://localhost:3001/${id}/stat`, statData);
        if (!res) {
          console.log("something error")
        } else {
          console.log("Success")
        }

      } catch (err) {
        // Handle error if needed
      }
    };

    sendStatData();
  }, []);


  function handleTimer() {
    if (!isTimerRunning) {
      setIsTimerRunning(true);

      const timeInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(timeInterval);
            setIsTimerRunning(false);
            return 0;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
  }

  function generateParagraph() {
    const paraIndex = Math.floor(Math.random() * paragraphs.length);
    paraRef.current.innerHTML = paragraphs[paraIndex]
      .split("")
      .map((char, i) => `<span key=${i}>${char}</span>`)
      .join("");
  }

  const handleInputChange = (e) => {
    setCurrInput(e.target.value);
    console.log(e.target.value);
    const typedText = e.target.value.split("")[charIndex];
    const childSpans = paraRef.current.querySelectorAll("span");

    if (charIndex < childSpans.length - 1 && timeLeft > 0) {
      if (!isTyping) {
        isTyping = true;
      }
      if (typedText == null) {
        if (charIndex > 0) {
          setCharIndex(() => charIndex - 1);
          if (childSpans[charIndex].classList.contains("incorrect")) {
            setMistakes(() => mistakes - 1);
          }
          childSpans[charIndex].classList.contains("correct", "incorrect");
        }
      } else {
        if (childSpans[charIndex].innerText === typedText) {
          childSpans[charIndex].classList.add("correct");
        } else {
          setMistakes(() => mistakes + 1);
          childSpans[charIndex].classList.add("incorrect");
        }
        setCharIndex(() => charIndex + 1);
      }

      setWPM((WPM) => {
        WPM = (
          ((charIndex - mistakes) / 5 / (countDown - timeLeft)) *
          60
        ).toFixed(1);
        console.log(WPM);
        return (WPM = WPM < 0 || !WPM || WPM === Infinity ? 0 : WPM);
      });
      setAccuracy((accuracy) => {
        return (accuracy = (
          ((currInput.length - mistakes) / currInput.length) *
          100
        ).toFixed(1));
      });
    }
  };

  function handleClick() {
    setStatData({
      WPM: WPM,
      accuracy: accuracy,
      mistakes: mistakes,
    });
    inputRef.current.disabled = false;
    inputRef.current.focus();
    generateParagraph();
    handleTimer();
    setTimer(countDown);
    setCurrInput("");
    setMistakes(0);
    setAccuracy(0);
    setWPM(0);
    setCharIndex(0);

  }

  return (
    <div
      className="parentType"
      style={{ background: "black", color: "white", userSelect: "none" }}
    >
      <input
        type="text"
        onChange={handleInputChange}
        value={currInput}
        ref={inputRef}
        style={{ opacity: "0" }}
      />
      <div className="navBar">
        <ul
          style={{
            margin: "0",
            padding: "0",
            listStyle: "none",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <li>
            Time Left:
            <span>{timer}s</span>
          </li>
          <li>
            mistakes:
            <span>{mistakes}</span>
          </li>
          <li>
            WPM:
            <span>{WPM}</span>
          </li>
          <li>
            accuracy:
            <span>{accuracy}%</span>
          </li>
          <li>
            <button
              onClick={() => {
                handleClick();
              }}
              className="startBtn"
              style={{
                fontFamily: "Montserrat,sans-serif",
              }}
            >
              start
            </button>
          </li>
        </ul>
      </div>
      <div
        ref={paraRef}
        className="paraBox"
        style={{
          fontFamily: "Montserrat,sans-serif",
          letterSpacing: "1px",
        }}
      ></div>
    </div>
  );
}
