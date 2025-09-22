import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  CameraIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

type MenuItem = {
  key: string;
  label: string;
  to: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const menu: MenuItem[] = [
  { key: 'about', label: 'About PashuVista', to: '/', Icon: InformationCircleIcon },
  { key: 'faq', label: 'FAQ', to: '/faq', Icon: QuestionMarkCircleIcon },
  { key: 'breed', label: 'Breed Recognition', to: '/get-started', Icon: CameraIcon },
  { key: 'resources', label: 'Resources', to: '/resources', Icon: BookOpenIcon },
  { key: 'feedback', label: 'Feedback', to: '/feedback', Icon: ChatBubbleBottomCenterTextIcon },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const first = panelRef.current?.querySelectorAll(focusableSelector)[0] as HTMLElement | undefined;
        if (first) first.focus();
      }, 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const onKeyDownTrap = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const onNavigate = (to: string) => {
    navigate(to);
    onClose();
  };

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={false}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onBackdropClick}
            style={{ cursor: 'pointer' }}
          />

          {/* Panel */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="PashuVista menu"
              ref={panelRef}
              className="relative z-50 h-full shadow-2xl dark:shadow-gray-900/20 overflow-y-auto transition-all duration-300 bg-[#fdf8f3] dark:bg-[#2a2420] text-black"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onKeyDown={onKeyDownTrap}
              style={{
                width: 'min(320px, 92vw)',
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
                fontFamily: 'Google Sans, Helvetica, Arial, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                color: '#000000',
                lineHeight: 'normal'
              }}
          >
            {/* Header inside panel */}
              <div className="flex items-center gap-3 px-4 py-4 border-b dark:border-gray-600 transition-colors duration-300 bg-[#fdf8f3] dark:bg-[#2a2420] text-black">
              <Bars3Icon className="h-6 w-6 text-black dark:text-white transition-colors duration-300" />
                <div className="text-2xl font-bold text-green-900 dark:text-green-400 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, Arial, sans-serif', fontWeight: 700, fontStyle: 'normal' }}>PashuVista</div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="ml-auto p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900 dark:focus:ring-green-400"
              >
                <span className="sr-only">Close</span>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-black dark:text-white transition-colors duration-300"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
              <nav className="px-2 py-4 bg-[#fdf8f3] dark:bg-[#2a2420] text-black">
              <ul className="flex flex-col">
                {menu.map((mitem) => {
                  const active = isActive(mitem.to);
                  return (
                    <li key={mitem.key} className="px-2">
                      <button
                        onClick={() => onNavigate(mitem.to)}
                        className={`w-full text-left flex items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-900 dark:focus:ring-green-400 ${
                          active
                            ? 'bg-green-100 dark:bg-green-900/30 text-black dark:text-green-300'
                            : 'text-black dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white'
                        }`}
                        aria-current={active ? 'page' : undefined}
                        style={{ fontFamily: 'Google Sans, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 14 }}
                      >
                        <mitem.Icon className={`h-6 w-6 transition-colors duration-300 ${active ? 'text-green-900 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`} />
                        <span className="flex-1 text-sm md:text-base">{mitem.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;