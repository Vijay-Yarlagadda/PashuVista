import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const m: any = motion;
import { MicrophoneIcon, PlusIcon, CameraIcon, PhotoIcon, ArrowLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const suggestionTags = [
  'Breed Identification',
  'Cattle Care Tips',
  'How PashuVista Works',
];

const placeholderVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' } },
};

const GetStartedPage: React.FC = () => {
  // Webcam modal state and refs
  const [showWebcam, setShowWebcam] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect desktop vs mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Open webcam modal for desktop, file input for mobile
  const handleCamera = async () => {
    if (isMobile) {
      if (fileInputRef.current) {
        fileInputRef.current.accept = 'image/*';
        fileInputRef.current.capture = 'environment';
        fileInputRef.current.click();
      }
    } else {
      setShowWebcam(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setWebcamStream(stream);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        }, 100);
      } catch (err) {
        alert('Could not access webcam.');
        setShowWebcam(false);
      }
    }
  };

  // Capture image from webcam
  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL('image/png'));
        setShowPreview(true);
      }
    }
    handleCloseWebcam();
  };

  // Close webcam and stop stream
  const handleCloseWebcam = () => {
    setShowWebcam(false);
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
  };
  // 1. Create a ref to get a reference to the input element (fileInputRef)
  const [image, setImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // ...existing code...

  // Handle clicking outside the dropdown to close it
  // Remove dropdown/plus logic

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setShowPreview(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImage(e.target.files[0]);
    }
  };

  // (removed duplicate handleCamera, now only async version above)

  const handleGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const handleSend = () => {
    if (image) {
      // Send image to backend
      console.log('Sending image:', image);
      setImage(null);
      setShowPreview(false);
    }
  };

  const canSend = !!image;

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-all duration-500 ease-in-out">
      {/* Header */}
      <header className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm dark:shadow-gray-900/20 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">PashuVista</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-gray-900/20 p-6 flex flex-col items-center transition-all duration-300">
          <div className="flex gap-8 justify-center items-center w-full mb-6">
            {/* Visual button to trigger the camera */}
            <button
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-300 shadow"
              onClick={handleCamera}
              aria-label="Take a photo"
            >
              <CameraIcon className="w-10 h-10 text-blue-500 mb-2" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Camera</span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-300 shadow"
              onClick={handleGallery}
              aria-label="Upload from gallery"
            >
              <PhotoIcon className="w-10 h-10 text-blue-500 mb-2" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Gallery</span>
            </button>
            {/* Hidden file input that opens the camera or gallery (mobile only) */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </div>
          {/* Webcam Modal for desktop */}
          {showWebcam && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col items-center">
                <video ref={videoRef} autoPlay playsInline className="rounded-xl mb-4 max-w-xs w-full" />
                <div className="flex gap-4">
                  <button
                    className="px-6 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
                    onClick={handleCapture}
                  >Capture</button>
                  <button
                    className="px-6 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold hover:bg-gray-400 dark:hover:bg-gray-800 transition-colors"
                    onClick={handleCloseWebcam}
                  >Cancel</button>
                </div>
              </div>
            </div>
          )}
          {/* Image Preview */}
          {showPreview && image && (
            <div className="w-full flex flex-col items-center mb-4">
              <div className="relative">
                <img src={image} alt="Preview" className="rounded-xl shadow-lg max-h-64 object-contain" />
                <button 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors" 
                  onClick={() => setShowPreview(false)}
                >
                  ×
                </button>
              </div>
            </div>
          )}
          {/* Send Button */}
          {canSend && (
            <button
              className="w-full py-3 rounded-xl bg-blue-500 dark:bg-blue-600 text-white font-bold text-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
              onClick={handleSend}
              aria-label="Send image"
            >
              Send
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default GetStartedPage;
