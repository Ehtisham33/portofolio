"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code, Rocket, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  const stats = [
    { icon: Code, label: "Projects Delivered", value: "40+" },
    { icon: Rocket, label: "Years Experience", value: "4+" },
    { icon: Users, label: "Global Clients", value: "20+" },
    { icon: Award, label: "Upwork Rating", value: "Top Rated" },
  ];

  function TypewriterText({
    text,
    className,
    delay = 0,
    shouldStart = true,
    infinite = false,
  }: {
    text: string;
    className?: string;
    delay?: number;
    shouldStart?: boolean;
    infinite?: boolean;
  }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      if (!shouldStart) return;

      let timeoutId: NodeJS.Timeout;
      let currentIndex = 0;
      let isTyping = false;

      const startTyping = () => {
        isTyping = true;
        const type = () => {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
            timeoutId = setTimeout(type, 30); // Adjust speed here (lower = faster)
          } else {
            setIsComplete(true);
            if (infinite) {
              // Wait 2 seconds before restarting
              timeoutId = setTimeout(() => {
                setDisplayedText("");
                setIsComplete(false);
                currentIndex = 0;
                isTyping = false;
                startTyping();
              }, 2000);
            }
          }
        };
        type();
      };

      const delayTimeout = setTimeout(startTyping, delay);

      return () => {
        clearTimeout(delayTimeout);
        clearTimeout(timeoutId);
      };
    }, [text, delay, shouldStart, infinite]);

    return (
      <p className={className}>
        {displayedText}
        {!isComplete && shouldStart && (
          <span className="inline-block w-0.5 h-4 bg-primary ml-1 animate-pulse" />
        )}
      </p>
    );
  }

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-border/50">
              <TypewriterText
                text={`I’m a Python Full Stack & AI Developer with 4+ years of experience building scalable web applications, intelligent AI chatbots, and backend systems for startups and growing businesses. I design end-to-end solutions — from robust backend APIs and modern frontends to AI-powered chatbots, automation, and production-ready deployments using Django, FastAPI, React, LangChain, and LangGraph. I build intelligent AI agents that reason, remember context, integrate with databases and APIs, and automate real business workflows, delivering secure, scalable systems that create real business value.`}
                className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line"
                shouldStart={isInView}
                infinite={false}
              />
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
              >
                <Card className="p-4 md:p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors h-full flex flex-col justify-center">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 md:mb-4 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

