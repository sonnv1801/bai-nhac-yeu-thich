import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { motion } from "framer-motion";
import "./style.css";

const Video = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0); // Thời gian đã phát của video

  const videos = [
    {
      name: "JACK - J97 | XÓA TÊN ANH ĐI | Official Music Video | [Album26]",
      url: "https://youtu.be/mA-UxOle3YQ",
      thumbnail: "https://i.ytimg.com/vi/mA-UxOle3YQ/maxresdefault.jpg",
    },
    {
      name: "HẠ CÒN VƯƠNG NẮNG | DATKAA x KIDO x Prod. QT BEATZ [OFFICIAL MUSIC VIDEO]",
      url: "https://youtu.be/2YllmPaKhkY",
      thumbnail: "https://i.ytimg.com/vi/2YllmPaKhkY/maxresdefault.jpg",
    },
    {
      name: "THU XA NGÚT NGÀN | DATKAA x Prod. QT BEATZ | OFFICIAL MUSIC VIDEO",
      url: "https://youtu.be/uNZ3JFLhE2I",
      thumbnail: "https://i.ytimg.com/vi/uNZ3JFLhE2I/maxresdefault.jpg",
    },
    {
      name: "ANH TỆ | DATKAA x Prod. QT BEATZ | OFFICIAL MUSIC VIDEO",
      url: "https://youtu.be/jRVNXEayMLA",
      thumbnail: "https://i.ytimg.com/vi/jRVNXEayMLA/maxresdefault.jpg",
    },
    {
      name: "Huỳnh Công Hiếu - Sống cho hết đời thanh xuân | Sự đẹp đẽ của vẻ đẹp ngôn từ",
      url: "https://youtu.be/mVKoJGMxHaA",
      thumbnail: "https://i.ytimg.com/vi/mVKoJGMxHaA/maxresdefault.jpg",
    },
    {
      name: "Khúc Ca Vàng - Mikelodic - Team Thái VG | Rap Việt 2023 [MV Lyrics]",
      url: "https://youtu.be/xTdg-SRZCQo",
      thumbnail: "https://i.ytimg.com/vi/xTdg-SRZCQo/maxresdefault.jpg",
    },
    // Thêm các đối tượng video khác vào danh sách
  ];

  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setPlayedSeconds(0); // Reset thời gian đã phát khi chuyển sang video mới
  };

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
    setPlayedSeconds(0); // Reset thời gian đã phát khi chuyển sang video mới
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
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
  const screenWidth = window.innerWidth;
  const youtubeWidth = screenWidth > 600 ? 900 : 450; // Adjust as needed
  const youtubeHeight = 500;

  // Lưu trạng thái vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem(
      "currentVideoIndex",
      JSON.stringify(currentVideoIndex)
    );
    localStorage.setItem("playedSeconds", JSON.stringify(playedSeconds));
  }, [currentVideoIndex, playedSeconds]);

  // Lấy trạng thái từ localStorage khi tải lại trang
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

  return (
    <div className="video-player">
      <div className="video-container">
        <ReactPlayer
          ref={videoRef}
          url={videos[currentVideoIndex].url}
          playing={isPlaying}
          controls
          onEnded={handleVideoEnded}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onProgress={handleProgress}
          progressInterval={1000} // Cập nhật progress mỗi giây
          playedSeconds={playedSeconds} // Set thời gian đã phát của video
          width={youtubeWidth}
          height={youtubeHeight}
        />
        <h1>{videos[currentVideoIndex].name}</h1>
      </div>
      <div className="playlist">
        <ul>
          {videos.map((video, index) => (
            <li
              key={index}
              className={index === currentVideoIndex ? "active" : ""}
              onClick={() => handleVideoSelect(index)}
            >
              <div className="video-info">
                <img src={video.thumbnail} alt={`Video ${index + 1}`} />
                <span>{video.name}</span>
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
  );
};

export default Video;
