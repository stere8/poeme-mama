import React, { useEffect, useRef, useState } from "react";
import poem from "./poemData"; // Importing the poem data
import "./Poem.css"; // Import the CSS file for styling

// Import Avatars
import heAvatar from "./assets/HE.jpg";
import naAvatar from "./assets/NA.jpg";
import otAvatar from "./assets/OT.jpg";
import upcAvatar from "./assets/UPC.jpg";

const PoemPage = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      audioRef.current.play().catch(error => {
        console.log("Autoplay blocked: Waiting for user interaction", error);
      });
    };

    document.addEventListener("click", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="poem-container">
      {/* 🎶 Background Music */}
      <audio ref={audioRef} src="/media/background-music.mp3" loop />

      {/* 🎵 Play/Pause Button with Icons */}
      <div className="music-controls">
        <button
          onClick={togglePlay}
          className={`music-button ${isPlaying ? "pause" : ""}`}
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      </div>

      {/* Title & Subtitle */}
      <h1 className="poem-title">Pour Notre Chère et Tendre Maman ❤️</h1>
      <p className="poem-subtitle">Un hommage rempli d’amour et de gratitude.</p>

      {/* Poem Content */}
      <div className="poem">
        {poem.map((stanza, stanzaIndex) => (
          <div key={stanzaIndex} className="stanza">
            {/* Avatars Positioned Near Stanzas */}
            {stanzaIndex === 0 && <img src={heAvatar} alt="HE Avatar" className="avatar floating-avatar he" />}
            {stanzaIndex === 1 && <img src={naAvatar} alt="NA Avatar" className="avatar floating-avatar na" />}
            {stanzaIndex === 2 && <img src={otAvatar} alt="OT Avatar" className="avatar floating-avatar ot" />}
            {stanzaIndex === 3 && <img src={upcAvatar} alt="UPC Avatar" className="avatar floating-avatar upc" />}

            {stanza.map((line, lineIndex) => (
              <p key={lineIndex} className="line">
                <span className="first-letter">{line.charAt(0)}</span>
                {line.slice(1)}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoemPage;

