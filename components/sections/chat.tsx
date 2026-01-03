"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chat() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [messages, setMessages] = useState<Message[]>([
    {
    role: "assistant",
    content:
      "Hi! I’m Ehtisham’s AI assistant 🤖\n\nI can help you explore his AI chatbot projects, backend & full-stack experience, technologies like Django, FastAPI, LangChain, LangGraph, and how you can work with him.\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const messagesContainer = messagesEndRef.current.parentElement;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
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
      // Refocus input after sending
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      sendMessage();
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sendMessage();
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
    <section
      id="chat"
      ref={sectionRef}
      className="py-4 md:py-6 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-6"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
            <Bot className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Chat with My AI Assistant
            </h2>
          </div>
          <div className="w-20 md:w-24 h-0.5 md:h-1 bg-primary mx-auto rounded-full mb-2 md:mb-3" />
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Ask me anything about Ehtisham’s AI chatbots, backend systems, full-stack projects, or how to work with him
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl p-0">
            <div className="h-[calc(100vh-200px)] md:h-[calc(100vh-240px)] max-h-[600px] md:max-h-[700px] flex flex-col overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-2 md:px-3 pt-4 pb-0 space-y-2 md:space-y-3 bg-gradient-to-b from-gray-50/50 to-transparent">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-3 md:gap-4 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] md:max-w-[75%] rounded-lg p-2 md:p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-white text-foreground shadow-sm border border-border rounded-bl-sm"
                      }`}
                    >
                      <p className="text-xs md:text-sm whitespace-pre-wrap break-words leading-relaxed">
                        {renderMessageWithLinks(message.content, message.role === "user")}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 md:gap-4 justify-start"
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-white text-foreground shadow-sm border border-border rounded-lg rounded-bl-sm p-2 md:p-3">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="px-2 md:px-3 pt-2 pb-2 border-t border-border bg-card/30 flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3 items-center">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        // Auto-resize textarea
                        e.target.style.height = "auto";
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me about AI chatbots, backend, projects, or hiring…"
                      rows={1}
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none max-h-[120px] bg-background min-h-[36px] md:min-h-[40px]"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      sendMessage();
                    }}
                    disabled={!input.trim() || isLoading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 h-9 md:h-10 w-9 md:w-auto px-3 md:px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-1 text-center pb-0">
                  Try: “What AI chatbots has he built?” • “Does he use LangChain?” • “How can I hire him?”
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

