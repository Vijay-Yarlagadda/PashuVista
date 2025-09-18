import React, { useState, useRef } from 'react';
import { detectBreedFromFilename } from '../utils/breedMapping';
import { CameraIcon, PhotoIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// Suggestions (can be used later)
const suggestionTags = [
  'Breed Identification',
  'Cattle Care Tips',
  'How PashuVista Works',
];

const GetStartedPage: React.FC = () => {
  // Message type for chat history
  type Message =
    | { type: 'image'; image: string }
    | {
        type: 'breed';
        breed: string;
        confidence: number;
        origin: string;
        milkYield: string;
        milkAge: string;
        generationCapacity: string;
      };

  // Chat messages state
  const [messages, setMessages] = useState<Message[]>([]);

  const [imageFilename, setImageFilename] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

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

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL('image/png'));
        setImageFilename('camera_capture.png');
        setShowPreview(true);
      }
    }
    handleCloseWebcam();
  };

  const handleCloseWebcam = () => {
    setShowWebcam(false);
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      setWebcamStream(null);
    }
  };

  const [image, setImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setShowPreview(true);
      setImageFilename(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImage(e.target.files[0]);
    }
  };

  const handleGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const handleSend = () => {
    if (image && imageFilename) {
      setMessages((prev) => [...prev, { type: 'image', image }]);
      const result = detectBreedFromFilename(imageFilename);
      setMessages((prev) => [...prev, { type: 'breed', ...result }]);
      setImage(null);
      setShowPreview(false);
      setImageFilename('');
    }
  };

  const canSend = !!image;

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-all duration-500 ease-in-out">
      {/* Header */}
      <header className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">PashuVista</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 flex flex-col items-center">
          {/* Chat messages */}
          <div className="w-full flex flex-col gap-4 mb-6">
            {messages.map((msg, idx) =>
              msg.type === 'image' ? (
                <div key={idx} className="flex justify-end">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-xl p-2 max-w-[70%] shadow">
                    <img
                      src={msg.image}
                      alt="User upload"
                      className="rounded-lg max-h-40 object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex justify-end">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 max-w-[70%] shadow text-right">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {msg.breed}
                    </span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      ({msg.confidence}%)
                    </span>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <p><strong>Origin:</strong> {msg.origin}</p>
                      <p><strong>Milk Yield:</strong> {msg.milkYield}</p>
                      <p><strong>Milk Age:</strong> {msg.milkAge}</p>
                      <p><strong>Generation Capacity:</strong> {msg.generationCapacity}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex gap-8 justify-center items-center w-full mb-6">
            <button
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors shadow"
              onClick={handleCamera}
            >
              <CameraIcon className="w-10 h-10 text-blue-500 mb-2" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Camera</span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors shadow"
              onClick={handleGallery}
            >
              <PhotoIcon className="w-10 h-10 text-blue-500 mb-2" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Gallery</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </div>

          {/* Webcam Modal */}
          {showWebcam && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col items-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="rounded-xl mb-4 max-w-xs w-full"
                />
                <div className="flex gap-4">
                  <button
                    className="px-6 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600"
                    onClick={handleCapture}
                  >
                    Capture
                  </button>
                  <button
                    className="px-6 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold hover:bg-gray-400 dark:hover:bg-gray-800"
                    onClick={handleCloseWebcam}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {showPreview && image && (
            <div className="w-full flex flex-col items-center mb-4">
              <div className="relative">
                <img
                  src={image}
                  alt="Preview"
                  className="rounded-xl shadow-lg max-h-64 object-contain"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
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
              className="w-full py-3 rounded-xl bg-blue-500 dark:bg-blue-600 text-white font-bold text-lg hover:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleSend}
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
