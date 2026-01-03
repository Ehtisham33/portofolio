"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "./chat-context";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const { isOpen, setIsOpen } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I’m Ehtisham’s AI assistant 🤖\n\nI can help you learn about his AI chatbots, backend systems, full-stack projects, and how to work with him.\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tip, setTip] = useState<{ title: string; code: string } | null>(null);
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [tipsDisabled, setTipsDisabled] = useState(false);
  const [nextTipCountdown, setNextTipCountdown] = useState(15);
  const [isMounted, setIsMounted] = useState(false);
  const [isChatSectionVisible, setIsChatSectionVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if chat section is visible
  useEffect(() => {
    const checkChatSectionVisibility = () => {
      const chatSection = document.getElementById('chat');
      if (chatSection) {
        const rect = chatSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsChatSectionVisible(isVisible);
      }
    };

    // Check on mount and scroll
    checkChatSectionVisibility();
    window.addEventListener('scroll', checkChatSectionVisibility);
    window.addEventListener('resize', checkChatSectionVisibility);

    return () => {
      window.removeEventListener('scroll', checkChatSectionVisibility);
      window.removeEventListener('resize', checkChatSectionVisibility);
    };
  }, []);

  // Load tips disabled preference from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatbot-tips-disabled');
      if (saved === 'true') {
        setTipsDisabled(true);
      }
    }
  }, []);

  // Fetch programming tips when widget is closed
  useEffect(() => {
    if (!isOpen && !tipsDisabled) {
      let countdown = 15;
      
      const fetchTip = async () => {
        setIsLoadingTip(true);
        try {
          const response = await fetch('/api/tip');
          const data = await response.json();
          if (data.title && data.code) {
            setTip({ title: data.title, code: data.code });
            countdown = 15;
            setNextTipCountdown(15);
          }
        } catch (error) {
          console.error('Error fetching tip:', error);
        } finally {
          setIsLoadingTip(false);
        }
      };

      // Fetch initial tip
      fetchTip();

      // Countdown timer
      const countdownInterval = setInterval(() => {
        countdown -= 1;
        setNextTipCountdown(countdown);
        
        if (countdown <= 0) {
          countdown = 15;
          fetchTip();
        }
      }, 1000);

      // Also fetch tip every 15 seconds as backup
      const tipInterval = setInterval(fetchTip, 15000);

      return () => {
        clearInterval(countdownInterval);
        clearInterval(tipInterval);
      };
    } else {
      // Clear tip when widget opens or tips are disabled
      setTip(null);
      setNextTipCountdown(15);
    }
  }, [isOpen, tipsDisabled]);

  const handleCloseTips = () => {
    setTipsDisabled(true);
    setTip(null);
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatbot-tips-disabled', 'true');
    }
  };

  const handleReenableTips = () => {
    if (tipsDisabled) {
      setTipsDisabled(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('chatbot-tips-disabled');
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversation_history: conversationHistory,
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } else {
        throw new Error("No response from API");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Function to render text with clickable links
  const renderMessageWithLinks = (text: string, isUser: boolean): React.ReactNode => {
    // URL regex pattern - matches http://, https://, and www. links
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    
    // Reset regex
    const regex = new RegExp(urlRegex.source, urlRegex.flags);
    
    while ((match = regex.exec(text)) !== null) {
      // Add text before the URL
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add the URL as a clickable link
      const url = match[0].startsWith('http') ? match[0] : `https://${match[0]}`;
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline hover:opacity-80 transition-opacity break-all ${
            isUser ? "text-primary-foreground" : "text-primary"
          }`}
        >
          {match[0]}
        </a>
      );
      
      lastIndex = regex.lastIndex;
    }
    
    // Add remaining text after the last URL
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    // If no URLs found, return the original text
    if (parts.length === 0) {
      return text;
    }
    
    return parts.map((part, index) => 
      typeof part === 'string' ? <span key={index}>{part}</span> : part
    );
  };

  return (
    <>
      {/* Floating Chat Button with Waving Avatar */}
      <AnimatePresence>
        {!isOpen && !isChatSectionVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50"
          >
            <div className="relative">
              {/* Programming Tip Callout */}
              {isMounted && tip && (
                <motion.div
                  initial={{ opacity: 0, x: 120, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 120, scale: 0.8 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="absolute right-full mr-2 md:mr-4 bottom-0 mb-0 z-0 max-w-[calc(100vw-8rem)] md:max-w-none"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-lg shadow-xl border border-gray-200 p-2 md:p-2.5 w-[180px] max-w-[180px] md:min-w-[280px] md:max-w-[320px] relative max-h-[140px] md:max-h-[200px] overflow-hidden flex flex-col"
                  >
                    {/* Callout arrow pointing to button */}
                    <div className="absolute right-0 top-1/2 translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-white border-b-8 border-b-transparent"></div>
                    <div className="absolute right-0 top-1/2 translate-y-1/2 translate-x-[calc(100%-1px)] w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-gray-200 border-b-8 border-b-transparent"></div>
                    
                    {/* Top bar with countdown and close button */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-[9px] md:text-[10px] text-gray-500 font-medium">
                        Next tip: {nextTipCountdown}s
                      </div>
                      <button
                        onClick={handleCloseTips}
                        className="text-[9px] md:text-[10px] text-gray-600 hover:text-gray-800 font-semibold uppercase tracking-wide transition-colors"
                        aria-label="Close tips"
                      >
                        CLOSE
                      </button>
                    </div>
                    
                    <div className="flex items-start gap-2.5 flex-1 min-h-0">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <span className="text-xs">💡</span>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        {isLoadingTip ? (
                          <div className="inline-flex items-center gap-1 py-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                          </div>
                        ) : (
                          <>
                            <h4 className="text-[9px] md:text-xs font-semibold text-gray-800 leading-tight line-clamp-1">
                              {tip.title}
                            </h4>
                            <pre className="text-[8px] md:text-xs text-gray-700 font-mono leading-tight whitespace-pre-wrap break-words bg-gray-50 rounded px-1.5 py-1 md:px-2 md:py-1.5 border border-gray-100 overflow-auto flex-1 min-h-0 max-h-[80px] md:max-h-none">
                              <code className="text-[8px] md:text-xs">{tip.code}</code>
                            </pre>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Waving Avatar appearing from button and moving to top */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  x: 0
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 -translate-x-1/2 -top-10 md:-top-12 z-0"
              >
                <motion.button
                  onClick={handleReenableTips}
                  animate={{
                    rotate: [0, 12, -8, 12, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                  className={`bg-white rounded-full p-1 md:p-2 shadow-md border border-gray-200 text-sm md:text-base lg:text-lg transition-transform active:scale-95 ${
                    tipsDisabled 
                      ? 'hover:scale-110 cursor-pointer hover:shadow-lg' 
                      : 'cursor-default'
                  }`}
                  aria-label={tipsDisabled ? "Click to re-enable tips" : "Waving emoji"}
                  title={tipsDisabled ? "Click to re-enable tips" : ""}
                >
                  👋
                </motion.button>
              </motion.div>
              
            <Button
              onClick={() => setIsOpen(true)}
              size="icon"
                className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative z-10 border-2 border-[#e0e8f5]"
              aria-label="Open chat"
            >
                <Bot className="w-7 h-7 md:w-8 md:h-8" />
            </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 right-4 left-4 md:right-8 md:left-auto z-50 w-[calc(100%-2rem)] md:w-96 max-w-[calc(100vw-2rem)] md:max-w-none h-[calc(100vh-8rem)] md:h-[600px] max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-3 md:p-4 rounded-t-lg flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 md:w-5 md:h-5" />
                <h3 className="font-semibold text-sm md:text-base">AI Assistant</h3>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20 h-7 w-7 md:h-8 md:w-8"
                aria-label="Close chat"
              >
                <X className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50 min-h-0">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 md:gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Bot className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] md:max-w-[80%] rounded-lg p-2.5 md:p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    <p className="text-xs md:text-sm whitespace-pre-wrap break-words">
                      {renderMessageWithLinks(message.content, message.role === "user")}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                      <User className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 md:gap-3 justify-start">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-white text-gray-800 shadow-sm rounded-lg p-2.5 md:p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 md:p-4 border-t border-gray-200 bg-white rounded-b-lg flex-shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Ehtisham, AI chatbots, or backend projects..."
                  className="flex-1 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}