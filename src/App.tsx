import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FluidBackground } from './components/FluidBackground';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { BottomDock } from './components/BottomDock';
import { ChatMessage } from './components/ChatMessage';
import { InfoModal } from './components/InfoModal';
import { generateAiResponse } from './utils/aiResponse';
import type { CategoryKey, ChatMessage as ChatMessageType } from './types';

export const App: React.FC = () => {
  const [isChatMode, setIsChatMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(timer);
  }, [messages]);


  const handleSelectCategory = (category: CategoryKey, prompt: string) => {
    setIsChatMode(true);
    setActiveCategory(category);

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date(),
    };

    const aiRes = generateAiResponse(prompt);
    const aiMsg: ChatMessageType = {
      id: `ai-${Date.now() + 1}`,
      sender: 'assistant',
      text: aiRes.text,
      timestamp: new Date(),
      viewType: category,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  const handleSubmitQuestion = (query: string) => {
    setIsChatMode(true);

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    const aiRes = generateAiResponse(query);
    const aiMsg: ChatMessageType = {
      id: `ai-${Date.now() + 1}`,
      sender: 'assistant',
      text: aiRes.text,
      timestamp: new Date(),
      viewType: aiRes.viewType,
    };

    if (aiRes.viewType && aiRes.viewType !== 'Resume') {
      setActiveCategory(aiRes.viewType as CategoryKey);
    }

    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  const handleOpenResume = () => {
    setIsChatMode(true);
    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: 'Can I see your resume?',
      timestamp: new Date(),
    };
    const aiMsg: ChatMessageType = {
      id: `ai-${Date.now() + 1}`,
      sender: 'assistant',
      text: 'Here is my verified resume covering my engineering internships, agentic RAG architectures, full tech stack, and achievements:',
      timestamp: new Date(),
      viewType: 'Resume',
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  const handleOpenContact = () => {
    setIsChatMode(true);
    setActiveCategory('Contact');
    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: 'How can I contact you?',
      timestamp: new Date(),
    };
    const aiMsg: ChatMessageType = {
      id: `ai-${Date.now() + 1}`,
      sender: 'assistant',
      text: "I'd love to connect! You can reach me directly via email or any of my social profiles below:",
      timestamp: new Date(),
      viewType: 'Contact',
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  const handleResetHome = () => {
    setIsChatMode(false);
    setActiveCategory(null);
  };

  const handleClearChat = () => {
    setMessages([]);
    setIsChatMode(false);
    setActiveCategory(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#110F10] text-neutral-100">
      {/* Interactive WebGL Fluid Canvas */}
      <FluidBackground />

      {/* Soft subtle ambient depth glow */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      {/* Top Floating Header */}

      <TopNav
        isChatMode={isChatMode}
        onResetHome={handleResetHome}
        onOpenInfo={() => setIsInfoOpen(true)}
        onOpenResume={handleOpenResume}
      />

      {/* Main Content Area */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {!isChatMode ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection
                onSelectCategory={handleSelectCategory}
                onSubmitQuestion={handleSubmitQuestion}
                onOpenAbout={() => handleSelectCategory('Me', 'Who are you? I want to know more about you.')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full min-h-screen flex flex-col items-center pt-20 pb-36 px-4 sm:px-6"
            >
              <div className="w-full max-w-4xl mx-auto flex flex-col space-y-4">
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    onOpenResume={handleOpenResume}
                    onOpenContact={handleOpenContact}
                    isLatest={index === messages.length - 1}
                  />
                ))}
                <div ref={bottomRef} className="h-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation Dock */}
      {isChatMode && (
        <BottomDock
          onSelectCategory={handleSelectCategory}
          onSubmitQuestion={handleSubmitQuestion}
          onResetHome={handleResetHome}
          onOpenResume={handleOpenResume}
          onClearChat={handleClearChat}
          activeCategory={activeCategory}
        />
      )}

      {/* Information Dialog Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        onOpenResume={handleOpenResume}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
};

export default App;
