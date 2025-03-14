import React, { useEffect, useRef } from "react";
import poem from "./poemData"; // Importing the poem data
import "./Poem.css"; // Import the CSS file for styling

// Import Avatars
import heAvatar from "./assets/HE.jpg";
import naAvatar from "./assets/NA.jpg";
import otAvatar from "./assets/OT.jpg";
import upcAvatar from "./assets/UPC.jpg";

const PoemPage = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Try autoplay with volume max
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(error => {
        console.log("Autoplay blocked: Waiting for user interaction", error);
      });
    }

    // Add click event listener to start audio if blocked
    const enableAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play();
      }
    };

    document.addEventListener("click", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, []);

  // ✅ Fix togglePlay function
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="poem-container">
      {/* 🎶 Background Music (Auto-plays when page opens) */}
      <audio ref={audioRef} src="/media/background-music.mp3" loop />

      {/* Floating Decorations */}
      <div className="floating-decoration heart decoration-1"></div>
      <div className="floating-decoration flower decoration-2"></div>
      <div className="floating-decoration heart decoration-3"></div>
      <div className="floating-decoration flower decoration-4"></div>
      <div className="floating-decoration rosary decoration-5"></div>

      {/* 🎵 Background Music Controls */}
      <div className="music-controls">
        <button onClick={togglePlay} className="music-button">
          {audioRef.current && audioRef.current.paused ? "🎵 Play Music" : "⏸️ Pause Music"}
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
