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
  { key: 'about', label: 'About Pashuvista', to: '/', Icon: InformationCircleIcon },
  { key: 'faq', label: 'FAQ', to: '/faq', Icon: QuestionMarkCircleIcon },
  { key: 'breed', label: 'Breed Recognition', to: '/breedrecognition', Icon: CameraIcon },
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
          onClick={onBackdropClick}
          aria-hidden={false}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Pashuvista menu"
            ref={panelRef}
            className="relative z-50 bg-white h-full shadow-2xl overflow-y-auto"
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
            <div className="flex items-center gap-3 px-4 py-4 border-b">
              <Bars3Icon className="h-6 w-6 text-black" />
                <div className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, Arial, sans-serif', color: '#2563eb', fontWeight: 700, fontStyle: 'normal' }}>PashuVista</div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="ml-auto p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="sr-only">Close</span>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-black"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
            <nav className="px-2 py-4">
              <ul className="flex flex-col">
                {menu.map((mitem) => {
                  const active = isActive(mitem.to);
                  return (
                    <li key={mitem.key} className="px-2">
                      <button
                        onClick={() => onNavigate(mitem.to)}
                        className={`w-full text-left flex items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          active
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-800 hover:bg-gray-50 hover:text-black'
                        }`}
                        aria-current={active ? 'page' : undefined}
                        style={{ fontFamily: 'Google Sans, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 14, color: active ? '#1E3A8A' : '#000000' }}
                      >
                        <mitem.Icon className={`h-6 w-6 ${active ? 'text-blue-700' : 'text-gray-600'}`} />
                        <span className="flex-1 text-sm md:text-base">{mitem.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto px-4 py-6 border-t text-sm text-gray-600" style={{ fontFamily: 'Google Sans, Helvetica, Arial, sans-serif', fontWeight: 500 }}>
              <div className="font-medium">Version</div>
              <div className="text-xs">Pashuvista alpha</div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;