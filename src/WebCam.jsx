import { useState, useRef } from "react";
import Upload from "./upload.gif"; 
import WebcamIcon from "./webcam.gif"; 
const WebcamUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Webcam access denied. Please allow camera permissions.");
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center space-y-4">
      <button 
        className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-800 text-white text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        onClick={() => { setIsWebcamOn(!isWebcamOn); if (!isWebcamOn) startWebcam(); }}
      >
        <img src={WebcamIcon} alt="Webcam" className="w-8 h-8 mr-2" />
        {isWebcamOn ? "Stop Webcam" : "Start Webcam"}
      </button>

      {isWebcamOn && (
        <video ref={videoRef} autoPlay className="border-4 border-white w-64 h-48 shadow-xl rounded-lg"></video>
      )}
      <label className="cursor-pointer flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
        <img src={Upload} alt="Upload" className="w-8 h-8 mr-2" />
        Upload File
        <input 
          type="file" 
          className="hidden"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </label>
      {selectedFile && (
        <p className="text-lg font-semibold text-white bg-green-500 px-4 py-2 rounded-lg shadow-md mt-2">
          ✅ {selectedFile.name}
        </p>
      )}

    </div>
  );
};

export default WebcamUpload;
