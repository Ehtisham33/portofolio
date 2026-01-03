"use client";

import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Chat } from "@/components/sections/chat";
import { Contact } from "@/components/sections/contact";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ChatWidget } from "@/components/chatbot/chat-widget";
import { ChatProvider } from "@/components/chatbot/chat-context";

export default function Home() {
  return (
    <ChatProvider>
      <main className="min-h-screen bg-gradient-to-br from-[#e0e8f5] via-[#d4ddf0] to-[#bcc7e6]">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Chat />
        <Contact />
        <Footer />
        <ScrollToTop />
        <ChatWidget />
      </main>
    </ChatProvider>
  );
}
