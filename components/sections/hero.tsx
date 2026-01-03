"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Hero() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Profile Picture */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 lg:mb-0"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent z-10" />
              <Image
                src="/images/dp.jpg"
                alt="Ehtisham Yaqoob"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
              />
              <motion.div
                className="absolute inset-0 border-4 border-primary/30 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(69, 123, 193, 0.4)",
                    "0 0 0 20px rgba(69, 123, 193, 0)",
                    "0 0 0 0 rgba(69, 123, 193, 0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: [0.6, -0.05, 0.01, 0.99] as const,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left flex-1 max-w-2xl">
            <motion.div 
              variants={itemVariants} 
              className="mb-6 flex justify-center lg:justify-start"
            >
              <motion.a
                href="https://www.upwork.com/freelancers/~01196455c48564f62b"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className="relative inline-block cursor-pointer"
              >
                {/* Multiple pulse rings for ripple effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: [0.6, -0.05, 0.01, 0.99] as const,
                  }}
                  className="absolute inset-0 rounded-full bg-primary/20 blur-sm"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: 0.3,
                    ease: [0.6, -0.05, 0.01, 0.99] as const,
                  }}
                  className="absolute inset-0 rounded-full bg-primary/15 blur-sm"
                />
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(69, 123, 193, 0.5), 0 0 20px rgba(69, 123, 193, 0.3)",
                      "0 0 0 8px rgba(69, 123, 193, 0), 0 0 30px rgba(69, 123, 193, 0.1)",
                      "0 0 0 0 rgba(69, 123, 193, 0.5), 0 0 20px rgba(69, 123, 193, 0.3)",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: [0.6, -0.05, 0.01, 0.99] as const,
                  }}
                  className="absolute inset-0 rounded-full"
                />
                <Badge className="relative z-10 bg-[#e0e8f5] text-primary border-2 border-primary/30 hover:bg-[#d4ddf0] hover:border-primary/50 px-5 py-2.5 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                    className="inline-block mr-2"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  Available on Upwork
                </Badge>
              </motion.a>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight"
            >
              Ehtisham Y
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-medium"
            >
              Python Full Stack & AI Developer
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              I build scalable backend systems, intelligent AI chatbots, and modern full-stack applications using Django, FastAPI, React, LangChain, and LangGraph.
              I help startups and businesses turn ideas into secure, production-ready solutions.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center mb-12 w-full sm:w-auto"
            >
              <Button
                size="lg"
                asChild
                className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
              >
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    const projectsSection = document.getElementById("projects");
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View My Work
                    <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                  />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg border-2 hover:bg-muted hover:text-foreground w-full sm:w-auto"
              >
                <a
                  href="https://drive.google.com/file/d/1qTs9vQb3V0nfG2BlUXVNFJLwI2tT6ZFU/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-8"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

