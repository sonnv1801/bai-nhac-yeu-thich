import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { audios } from "./audioFiles"; // Adjust the path if needed
import "./style.css";

const Video = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);

  const audioRef = useRef(null);
  const nameAudioRef = useRef(null);
  const playlistRef = useRef(null);

  const handleAudioEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % audios.length);
    setPlayedSeconds(0);
    setIsPlaying(true);
  };

  const handleAudioSelect = (index) => {
    if (index !== currentVideoIndex) {
      setCurrentVideoIndex(index);
      setIsPlaying(true);
      setPlayedSeconds(0);
      if (audioRef.current) {
        audioRef.current.seekTo(0, "seconds");
      }
    } else {
      setIsPlaying(!isPlaying);
    }
    if (nameAudioRef.current) {
      nameAudioRef.current.play();
    }
  };

  const handleAudioPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleAudioPause = () => {
    setIsVideoPlaying(false);
  };

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);
  };

  useEffect(() => {
    if (!isVideoPlaying) {
      setIsPlaying(false);
    }
  }, [isVideoPlaying]);

  useEffect(() => {
    localStorage.setItem(
      "currentVideoIndex",
      JSON.stringify(currentVideoIndex)
    );
    localStorage.setItem("playedSeconds", JSON.stringify(playedSeconds));
  }, [currentVideoIndex, playedSeconds]);

  useEffect(() => {
    const savedCurrentVideoIndex = JSON.parse(
      localStorage.getItem("currentVideoIndex")
    );
    const savedPlayedSeconds = JSON.parse(
      localStorage.getItem("playedSeconds")
    );
    if (savedCurrentVideoIndex !== null) {
      setCurrentVideoIndex(savedCurrentVideoIndex);
    }
    if (savedPlayedSeconds !== null) {
      setPlayedSeconds(savedPlayedSeconds);
    }
  }, []);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const handleMouseEnter = () => {
    setIsBlurred(false);
  };

  const handleMouseLeave = () => {
    setIsBlurred(true);
  };

  const handleMouseMove = () => {
    if (playlistRef.current) {
      setIsBlurred(false);
      clearTimeout(window.blurTimeout);
      window.blurTimeout = setTimeout(() => {
        setIsBlurred(true);
      }, 2000);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="audio-player">
        <div className="audio-container">
          <div
            className={`responsive-player ${showVideo ? "visible" : "hidden"}`}
          >
            <ReactPlayer
              ref={audioRef}
              url={audios[currentVideoIndex]?.url}
              playing={isPlaying}
              controls
              onEnded={handleAudioEnded}
              onPlay={handleAudioPlay}
              onPause={handleAudioPause}
              onProgress={handleProgress}
              progressInterval={1000}
              width="100%"
              height="100%"
            />
          </div>
          <button className="toggle-video-btn" onDoubleClick={toggleVideo}>
            {showVideo ? "Disposion" : "Feedback Type"}
          </button>
        </div>
        <div
          className={`playlist ${isBlurred ? "blurred" : ""}`}
          ref={playlistRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul>
            {audios.map((audio, index) => (
              <li
                key={index}
                className={index === currentVideoIndex ? "active" : ""}
                onClick={() => handleAudioSelect(index)}
              >
                <div className="audio-info">
                  <span>{audio.name}</span>
                </div>
                {index === currentVideoIndex && isPlaying && (
                  <motion.div
                    className="music-wave"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <BsFillVolumeUpFill size={24} color="blueviolet" />
                  </motion.div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Video;
