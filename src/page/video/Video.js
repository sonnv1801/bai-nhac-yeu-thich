import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { motion } from "framer-motion";
import "./style.css";

const Video = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);

  const audios = [
    {
      name: "list Son Tung M-TP",
      url: "https://youtu.be/h6VAQUws040?si=JfImfv0MIL2QrO3q",
    },
    {
      name: "ĐỪNG LÀM TRÁI TIM ANH ĐAU",
      url: "https://youtu.be/abPmZCZZrFA?si=oFxwcNl8SJmsHqrV",
    },
    {
      name: "list RONBOOGZ ",
      url: "https://youtu.be/jK9OJyRPeZw?si=bpKacSg8BPnr8BCU",
    },
    {
      name: "Không Thể Say",
      url: "https://youtu.be/i0nd3NPJ4MI?si=CcRZce55f_Pk5TZe",
    },
    {
      name: "Những Bản Nhạc Lofi ",
      url: "https://youtu.be/4BpxRJUQaYg?si=yhjD_gjnUKzG9d1l",
    },
    {
      name: "XÓA TÊN ANH ĐI",
      url: "https://youtu.be/mA-UxOle3YQ",
    },
    {
      name: "HẠ CÒN VƯƠNG NẮNG",
      url: "https://youtu.be/2YllmPaKhkY",
    },
    {
      name: "THU XA NGÚT NGÀN",
      url: "https://youtu.be/uNZ3JFLhE2I",
    },
    {
      name: "ANH TỆ",
      url: "https://youtu.be/jRVNXEayMLA",
    },
    {
      name: "Sống cho hết đời thanh xuân",
      url: "https://youtu.be/yyXHS2b-lCU?si=wYQ6M4J3ytC5MjDj",
    },
    {
      name: "Khúc Ca Vàng",
      url: "https://youtu.be/xTdg-SRZCQo",
    },
    {
      name: "ĐỪNG LÀM TRÁI TIM ANH ĐAU",
      url: "https://youtu.be/abPmZCZZrFA?si=oFxwcNl8SJmsHqrV",
    },
  ];

  const audioRef = useRef(null);
  const nameAudioRef = useRef(null);
  const playlistRef = useRef(null);

  const handleAudioEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % audios.length);
    setPlayedSeconds(0);
    setIsPlaying(true);
  };

  const handleAudioSelect = (index) => {
    if (index === currentVideoIndex) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentVideoIndex(index);
      setIsPlaying(true);
      setPlayedSeconds(0);
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
          <div className={`responsive-player ${showVideo ? "" : "hidden"}`}>
            <ReactPlayer
              ref={audioRef}
              url={audios[currentVideoIndex].url}
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
                  <audio
                    ref={index === currentVideoIndex ? nameAudioRef : null}
                    src={audio.nameAudio}
                  />
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

// import React, { useState, useRef, useEffect } from "react";
// import ReactPlayer from "react-player";
// import { BsFillVolumeUpFill } from "react-icons/bs";
// import { motion } from "framer-motion";
// import "./style.css";

// const Video = () => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(true);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [showVideo, setShowVideo] = useState(false);
//   const [isBlurred, setIsBlurred] = useState(true); // Start with blurred state
//   const [showPlaylist, setShowPlaylist] = useState(true); // State to control playlist visibility

//   const audios = [
//     {
//       name: "XÓA TÊN ANH ĐI",
//       url: "https://youtu.be/mA-UxOle3YQ",
//     },
//     {
//       name: "HẠ CÒN VƯƠNG NẮNG",
//       url: "https://youtu.be/2YllmPaKhkY",
//     },
//     {
//       name: "THU XA NGÚT NGÀN",
//       url: "https://youtu.be/uNZ3JFLhE2I",
//     },
//     {
//       name: "ANH TỆ",
//       url: "https://youtu.be/jRVNXEayMLA",
//     },
//     {
//       name: "Sống cho hết đời thanh xuân",
//       url: "https://youtu.be/yyXHS2b-lCU?si=wYQ6M4J3ytC5MjDj",
//     },
//     {
//       name: "Khúc Ca Vàng",
//       url: "https://youtu.be/xTdg-SRZCQo",
//     },
//     {
//       name: "ĐỪNG LÀM TRÁI TIM ANH ĐAU",
//       url: "https://youtu.be/abPmZCZZrFA?si=oFxwcNl8SJmsHqrV",
//     },
//   ];

//   const audioRef = useRef(null);
//   const nameAudioRef = useRef(null);
//   const playlistRef = useRef(null);

//   const handleAudioEnded = () => {
//     setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % audios.length);
//     setPlayedSeconds(0);
//     setIsPlaying(true);
//   };

//   const handleAudioSelect = (index) => {
//     if (index === currentVideoIndex) {
//       setIsPlaying(!isPlaying);
//     } else {
//       setCurrentVideoIndex(index);
//       setIsPlaying(true);
//       setPlayedSeconds(0);
//     }
//     if (nameAudioRef.current) {
//       nameAudioRef.current.play();
//     }
//   };

//   const handleAudioPlay = () => {
//     setIsVideoPlaying(true);
//   };

//   const handleAudioPause = () => {
//     setIsVideoPlaying(false);
//   };

//   const handleProgress = (progress) => {
//     setPlayedSeconds(progress.playedSeconds);
//   };

//   useEffect(() => {
//     if (!isVideoPlaying) {
//       setIsPlaying(false);
//     }
//   }, [isVideoPlaying]);

//   useEffect(() => {
//     localStorage.setItem(
//       "currentVideoIndex",
//       JSON.stringify(currentVideoIndex)
//     );
//     localStorage.setItem("playedSeconds", JSON.stringify(playedSeconds));
//   }, [currentVideoIndex, playedSeconds]);

//   useEffect(() => {
//     const savedCurrentVideoIndex = JSON.parse(
//       localStorage.getItem("currentVideoIndex")
//     );
//     const savedPlayedSeconds = JSON.parse(
//       localStorage.getItem("playedSeconds")
//     );
//     if (savedCurrentVideoIndex !== null) {
//       setCurrentVideoIndex(savedCurrentVideoIndex);
//     }
//     if (savedPlayedSeconds !== null) {
//       setPlayedSeconds(savedPlayedSeconds);
//     }
//   }, []);

//   const toggleVideo = () => {
//     setShowVideo(!showVideo);
//   };

//   const togglePlaylist = () => {
//     setShowPlaylist(!showPlaylist);
//   };

//   const handleMouseEnter = () => {
//     setIsBlurred(false);
//   };

//   const handleMouseLeave = () => {
//     setIsBlurred(true);
//   };

//   const handleMouseMove = () => {
//     if (playlistRef.current) {
//       setIsBlurred(false);
//       clearTimeout(window.blurTimeout);
//       window.blurTimeout = setTimeout(() => {
//         setIsBlurred(true);
//       }, 2000);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <>
//       <div className="audio-player">
//         <div className="audio-container">
//           <div className={`responsive-player ${showVideo ? "" : "hidden"}`}>
//             <ReactPlayer
//               ref={audioRef}
//               url={audios[currentVideoIndex].url}
//               playing={isPlaying}
//               controls
//               onEnded={handleAudioEnded}
//               onPlay={handleAudioPlay}
//               onPause={handleAudioPause}
//               onProgress={handleProgress}
//               progressInterval={1000}
//               width="100%"
//               height="100%"
//             />
//           </div>
//           <button className="toggle-video-btn" onDoubleClick={toggleVideo}>
//             {showVideo ? "Cơm" : "Áo"}
//           </button>
//         </div>
//         {/* Toggle playlist visibility */}
//         <button className="toggle-playlist-btn" onClick={togglePlaylist}>
//           {showPlaylist ? "Gạo" : "Tiền"}
//         </button>
//         {/* Conditionally render the playlist */}
//         {showPlaylist && (
//           <div
//             className={`playlist ${isBlurred ? "blurred" : ""}`}
//             ref={playlistRef}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <ul>
//               {audios.map((audio, index) => (
//                 <li
//                   key={index}
//                   className={index === currentVideoIndex ? "active" : ""}
//                   onClick={() => handleAudioSelect(index)}
//                 >
//                   <div className="audio-info">
//                     <span>{audio.name}</span>
//                     <audio
//                       ref={index === currentVideoIndex ? nameAudioRef : null}
//                       src={audio.url}
//                     />
//                   </div>
//                   {index === currentVideoIndex && isPlaying && (
//                     <motion.div
//                       className="music-wave"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <BsFillVolumeUpFill size={24} color="blueviolet" />
//                     </motion.div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Video;
