import { useState, useRef } from "react";
const WebcamUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const streamRef = useRef(null); 
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream; 
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Webcam access denied. Please allow camera permissions.");
    }
  };
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop()); 
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center space-y-4 relative w-full md:w-auto">
      <button 
        className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-800 text-white text-lg md:text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        onClick={() => { 
          if (isWebcamOn) {
            stopWebcam(); 
          } else {
            startWebcam();
          }
          setIsWebcamOn(!isWebcamOn);
        }}
      >
        <img src="/Gifs/webcam.gif" alt="Webcam" className="w-6 md:w-8 h-6 md:h-8 mr-2" />
        {isWebcamOn ? "Stop Webcam" : "Start Webcam"}
      </button>
      {isWebcamOn && (
        <video ref={videoRef} autoPlay className="border-4 border-white w-48 md:w-64 h-36 md:h-48 shadow-xl rounded-lg"></video>
      )}
      <label className="cursor-pointer flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white text-lg md:text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
        <img src="/Gifs/upload.gif" alt="Upload" className="w-6 md:w-8 h-6 md:h-8 mr-2" />
        Upload File
        <input 
          type="file" 
          className="hidden"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </label>
      {selectedFile && (
        <p className="text-lg font-semibold text-white bg-green-500 px-4 py-2 rounded-lg shadow-md mt-2 text-center">
          ✅ {selectedFile.name}
        </p>
      )}
    </div>
  );
};
export default WebcamUpload;
