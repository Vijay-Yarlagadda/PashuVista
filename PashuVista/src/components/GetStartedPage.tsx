import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [plusOpen, setPlusOpen] = useState(false);
  const [input, setInput] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);
  
  const placeholders = [
    'Ask about cattle breeds…',
    'Type your question…',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((idx) => (idx + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        plusButtonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !plusButtonRef.current.contains(event.target as Node)
      ) {
        setPlusOpen(false);
      }
    };

    if (plusOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [plusOpen]);

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

  const handleCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.capture = 'environment';
      fileInputRef.current.click();
    }
    setPlusOpen(false);
  };

  const handleGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
    setPlusOpen(false);
  };

  const handleSend = () => {
    if (input.trim() || image) {
      // Here you would typically send the message and image to your backend
      console.log('Sending message:', input);
      console.log('With image:', image);
      // Reset the form after sending
      setInput('');
      setImage(null);
      setShowPreview(false);
    }
  };

  const canSend = input.trim() || image;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-600">PashuVista</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        >
          {/* Input Bar */}
          <div className="w-full flex items-center gap-3 bg-gray-50 rounded-2xl px-6 py-4 shadow-inner mb-6">
            <div className="relative group">
              <MicrophoneIcon 
                className="w-7 h-7 text-blue-500 cursor-pointer hover:text-blue-600 transition-colors" 
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                Voice input
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
            <input
              className="flex-1 bg-transparent outline-none text-xl placeholder-gray-400"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={placeholders[placeholderIdx]}
              style={{ fontFamily: 'Google Sans, Arial, sans-serif' }}
            />
            <div className="flex items-center gap-2">
              <div className="relative group">
                <button
                  ref={plusButtonRef}
                  className="p-3 rounded-full hover:bg-blue-100 transition-colors"
                  onClick={() => setPlusOpen((v) => !v)}
                  aria-label="More options"
                >
                  <PlusIcon className="w-7 h-7 text-blue-500" />
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                  Add files and more
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
                <AnimatePresence>
                  {plusOpen && (
                    <motion.div
                      ref={dropdownRef}
                      className="absolute right-0 top-14 flex flex-col gap-2 bg-white rounded-xl shadow-lg p-3 border border-gray-100 z-10"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors text-left min-w-[140px]"
                        onClick={handleCamera}
                      >
                        <CameraIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Camera</span>
                      </button>
                      <button
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors text-left min-w-[140px]"
                        onClick={handleGallery}
                      >
                        <PhotoIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Upload</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
              
              {/* Send Button */}
              {canSend && (
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                    onClick={handleSend}
                    aria-label="Send message"
                  >
                    <PaperAirplaneIcon className="w-7 h-7 text-white" />
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                    Send message
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Suggestions */}
          <div className="w-full flex flex-wrap gap-3 justify-center mb-6">
            {suggestionTags.map((tag, i) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-blue-50 text-blue-600 text-base font-medium shadow-sm hover:bg-blue-100 transition-colors"
                style={{ fontFamily: 'Google Sans, Arial, sans-serif' }}
              >
                {tag}
              </motion.button>
            ))}
          </div>

          {/* Image Preview */}
          {showPreview && image && (
            <motion.div
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="relative">
                <img src={image} alt="Preview" className="rounded-xl shadow-lg max-h-64 object-contain" />
                <button 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors" 
                  onClick={() => setShowPreview(false)}
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Upload a photo of cattle or ask a question to get started with breed identification
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default GetStartedPage;
