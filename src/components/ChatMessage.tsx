import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType } from '../types';
import { ProjectsCarousel } from './views/ProjectsCarousel';
import { SkillsView } from './views/SkillsView';
import { AboutView } from './views/AboutView';
import { FunView } from './views/FunView';
import { ContactView } from './views/ContactView';
import { ResumeCard } from './views/ResumeCard';

interface ChatMessageProps {
  message: ChatMessageType;
  onOpenResume?: () => void;
  onOpenContact?: () => void;
  isLatest?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onOpenResume,
  onOpenContact,
  isLatest = false,
}) => {
  const isUser = message.sender === 'user';
  const [displayedText, setDisplayedText] = useState(isUser || !isLatest ? message.text : '');
  const [isTypingDone, setIsTypingDone] = useState(isUser || !isLatest);

  // Typewriter streaming effect for assistant
  useEffect(() => {
    if (isUser || !isLatest) {
      setDisplayedText(message.text);
      setIsTypingDone(true);
      return;
    }

    let i = 0;
    const fullText = message.text;
    setDisplayedText('');
    setIsTypingDone(false);

    const speed = Math.max(8, Math.min(22, 1000 / fullText.length));
    const timer = setInterval(() => {
      i += 2;
      if (i >= fullText.length) {
        setDisplayedText(fullText);
        setIsTypingDone(true);
        clearInterval(timer);
      } else {
        setDisplayedText(fullText.slice(0, i));
      }
    }, speed);

    return () => clearInterval(timer);
  }, [message.text, isUser, isLatest]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full flex flex-col ${isUser ? 'items-end' : 'items-start'} my-3`}
    >
      <div className={`flex items-start gap-2.5 max-w-2xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700 bg-neutral-900 shadow-sm mt-0.5">
            <video
              src="/ronaldo-idle.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-[2.2] translate-y-1.5"
            />
          </div>
        )}


        <div
          className={`rounded-2xl px-5 py-3.5 text-base sm:text-lg leading-relaxed tracking-wide ${
            isUser
              ? 'bg-[#0171E3] text-white rounded-br-sm shadow-md font-semibold'
              : 'border border-neutral-200 bg-white text-neutral-950 font-bold rounded-bl-sm shadow-xl'
          }`}
        >
          {displayedText}
          {!isTypingDone && !isUser && (
            <span className="inline-block w-1.5 h-4.5 ml-1 bg-blue-600 animate-pulse align-middle" />
          )}
        </div>
      </div>

      {/* Attached Generative UI Card */}
      {message.viewType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-full mt-3"
        >
          {message.viewType === 'Projects' && <ProjectsCarousel />}
          {message.viewType === 'Skills' && <SkillsView />}
          {message.viewType === 'Me' && (
            <AboutView
              onOpenResume={onOpenResume}
              onOpenContact={onOpenContact}
            />
          )}
          {message.viewType === 'Fun' && <FunView />}
          {message.viewType === 'Contact' && <ContactView />}
          {message.viewType === 'Resume' && <ResumeCard />}
        </motion.div>
      )}
    </motion.div>
  );
};
