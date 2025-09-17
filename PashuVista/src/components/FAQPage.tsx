import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
const m: any = motion;


// Space Grotesk font import (add to index.html for global use)
// <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">

const faqData = [
  {
    category: 'Basics',
    questions: [
      {
        q: 'What is this project?',
        a: 'This is an AI-powered system that identifies Indian bovines by type (cattle or buffalo) and breed using deep learning models.'
      },
      {
        q: 'What problem does it solve?',
        a: 'It eliminates manual, error-prone breed identification by providing a fast and accurate automated solution.'
      },
      {
        q: 'Why is it important?',
        a: 'Accurate identification helps in breeding, dairy management, and disease monitoring, supporting farmers and researchers.'
      }
    ]
  },
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How is the dataset prepared?',
        a: 'Images are collected breed-wise and organized into folders, with careful cleaning to remove duplicates or unclear photos.'
      },
      {
        q: 'How are images preprocessed?',
        a: 'They are resized to 224×224 pixels, normalized, and augmented with rotations, flips, and brightness changes.'
      },
      {
        q: 'Why use data augmentation?',
        a: 'It improves robustness by teaching the model to handle variations like angle, lighting, and orientation.'
      }
    ]
  },
  {
    category: 'Tweaking Model',
    questions: [
      {
        q: 'Which CNN architectures are used?',
        a: 'ResNet50, InceptionV3, and EfficientNet are commonly used as base models for transfer learning.'
      },
      {
        q: 'What is transfer learning?',
        a: 'It means reusing pre-trained models on large datasets like ImageNet and fine-tuning them for cattle/buffalo classification.'
      },
      {
        q: 'How is fine-tuning done?',
        a: 'The last layers are retrained with bovine images, while earlier layers are frozen to keep learned features.'
      }
    ]
  },
  {
    category: 'Saving & Exporting',
    questions: [
      {
        q: 'How is the model saved?',
        a: 'The model is saved in HDF5 or ONNX format for easy reuse.'
      },
      {
        q: 'Can it be exported to apps?',
        a: 'Yes, the model can be integrated into mobile apps and web apps using TensorFlow Lite or ONNX.'
      },
      {
        q: 'How are updates managed?',
        a: 'New data can be added, and the model retrained periodically to improve accuracy.'
      }
    ]
  },
  {
    category: 'Diving Deeper',
    questions: [
      {
        q: 'What challenges are expected?',
        a: 'Challenges include background noise in images, low-quality photos, and similarity between breeds.'
      },
      {
        q: 'How is accuracy measured?',
        a: 'Metrics like precision, recall, and F1-score are used in addition to overall accuracy.'
      },
      {
        q: 'What future improvements are possible?',
        a: 'Larger datasets, multimodal learning (images + metadata), and real-time classification apps.'
      }
    ]
  },
  {
    category: 'Deployment',
    questions: [
      {
        q: 'Can this run offline?',
        a: 'Yes, lightweight versions of the model can run offline on devices using TensorFlow Lite.'
      },
      {
        q: 'What about mobile support?',
        a: 'The system can be deployed as an Android/iOS app for farmers.'
      },
      {
        q: 'How scalable is it?',
        a: 'It can scale to large datasets and many users by hosting on cloud platforms with GPU/TPU support.'
      }
    ]
  },
  {
    category: 'Support & Community',
    questions: [
      {
        q: 'Where can I report issues?',
        a: 'Issues can be reported on the project’s GitHub repository or community forum.'
      },
      {
        q: 'Is there a user community?',
        a: 'Yes, an open community exists where developers, researchers, and farmers collaborate.'
      },
      {
        q: 'How can others contribute?',
        a: 'Contributions can include adding datasets, improving model accuracy, or developing user-friendly apps.'
      }
    ]
  }
];

const FAQPage: React.FC = () => {
  // openIndexes: { [category]: index of open question or null }
  const [openIndexes, setOpenIndexes] = useState<{ [key: string]: number | null }>({});
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      setIsScrolling(true);
      setActiveCategory(elementId);
      
      // Calculate the position with navbar offset
      const navbarHeight = 120; // Approximate navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      
      // Smooth scroll with easing
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      const duration = 800; // Animation duration in ms
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startPosition + distance * easeOut);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          setIsScrolling(false);
        }
      };
      
      requestAnimationFrame(animation);
    }
  };

  // Scroll to section if hash is present
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      setTimeout(() => {
        smoothScrollTo(elementId);
      }, 100);
    }
  }, [location]);

  // Track scroll position to update active category
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      
      const sections = faqData.map(cat => cat.category.replace(/\s+/g, ''));
      const scrollPosition = window.scrollY + 150; // Offset for navbar
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveCategory(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  // Always show scrolled navbar style on FAQ page
  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-all duration-500 ease-in-out" style={{ fontFamily: 'Space Grotesk, Arial, sans-serif', scrollBehavior: 'smooth' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-4 py-4 md:px-12 bg-white dark:bg-gray-800 rounded-b-2xl shadow-md dark:shadow-gray-900/20 transition-all duration-300" style={{ fontFamily: 'Space Grotesk, Arial, sans-serif' }}>
  <span className="text-2xl font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">PashuVista</span>
        <div className="hidden md:flex items-center space-x-8">
          <a href="/#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-lg md:text-xl transition-colors duration-300">About</a>
          <a href="/#faq" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium underline text-lg md:text-xl transition-colors duration-300">FAQ</a>
          <Link to="/get-started" className="bg-blue-600 dark:bg-blue-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">Get Started</Link>
        </div>
      </nav>

      {/* FAQ Section */}
      <section id="FAQSection" className="flex flex-col md:flex-row w-full max-w-6xl mx-auto pt-24 px-4 pb-16">
        {/* Sidebar */}
        <aside
          className="md:w-1/4 mb-8 md:mb-0 md:sticky flex flex-col justify-center font-sans"
          style={{ top: '8rem', minHeight: '60vh', alignSelf: 'flex-start' }}
        >
          <ul className="space-y-3 pt-16">
            {faqData.map((cat, index) => {
              const categoryId = cat.category.replace(/\s+/g, '');
              const isActive = activeCategory === categoryId;
              
              return (
                <m.li 
                  key={cat.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <m.button
                    onClick={() => smoothScrollTo(categoryId)}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium text-lg tracking-tight transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-md dark:shadow-gray-900/20 transform scale-105' 
                        : 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                    style={{ fontFamily: 'Google Sans, Arial, sans-serif', letterSpacing: '0.01em' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <m.span
                      className="relative"
                      animate={isActive ? { x: 5 } : { x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {cat.category}
                      {isActive && (
                        <m.div
                          className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-full"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </m.span>
                  </m.button>
                  </m.li>
              );
            })}
          </ul>
        </aside>
        {/* All FAQ Sections */}
        <div className="md:w-3/4 md:pl-12 w-full">
          {faqData.map((cat, categoryIndex) => (
            <m.div 
              key={cat.category} 
              id={cat.category.replace(/\s+/g, '')} 
              className="mb-16" 
              style={{ scrollMarginTop: '8rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <m.h2 
                className="text-4xl font-semibold text-blue-600 dark:text-blue-400 mb-8 transition-colors duration-300" 
                style={{ fontFamily: 'Space Grotesk, Arial, sans-serif' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {cat.category}
              </m.h2>
              <div className="space-y-4">
                {cat.questions.map((item, idx) => {
                  const isOpen = openIndexes[cat.category] === idx;
                  return (
                    <m.div 
                      key={item.q} 
                      className="border-b last:border-b-0 bg-transparent" 
                      style={{ fontFamily: 'Space Grotesk, Arial, sans-serif' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <m.button
                        className={`w-full flex items-center justify-between px-0 py-5 text-2xl font-semibold transition-all duration-300 rounded-lg ${isOpen ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        onClick={() => setOpenIndexes({ ...openIndexes, [cat.category]: isOpen ? null : idx })}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <m.span
                          animate={isOpen ? { x: 5 } : { x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.q}
                        </m.span>
                        <m.svg
                          className={`w-7 h-7 text-gray-400`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? '#2563eb' : '#9ca3af' }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </m.svg>
                      </m.button>
                      <AnimatePresence>
                        {isOpen && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <m.div 
                              className="text-lg text-black dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg px-4 py-4 border border-blue-100 dark:border-gray-600 mt-2 shadow-sm dark:shadow-gray-900/20 transition-all duration-300"
                              style={{ fontFamily: 'Space Grotesk, Arial, sans-serif' }}
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                            >
                              {item.a}
                            </m.div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </m.div>
                  );
                })}
              </div>
            </m.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
