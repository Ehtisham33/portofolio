"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      category: "AI & Chatbot Development",
      items: [
        "LLMs (GPT-4, Claude, Llama)",
        "AI Chatbots",
        "LangChain",
        "LangGraph",
        "Retrieval-Augmented Generation (RAG)",
        "Prompt Engineering",
        "Vector Search",
        "OpenAI API",
        "Chatbot Automation",
      ],
      color: "bg-[#9333EA]/10 text-[#9333EA] border-[#9333EA]/20",
    },
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "JavaScript / TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
      color: "bg-[#457bc1]/10 text-[#457bc1] border-[#457bc1]/20",
    },
    {
      category: "Backend & APIs",
      items: [
        "Python",
        "Django",
        "Django REST Framework",
        "FastAPI",
        "REST APIs",
        "JWT Authentication",
        "WebSockets",
        "Celery & Background Tasks",
      ],
      color: "bg-[#47586e]/10 text-[#47586e] border-[#47586e]/20",
    },
    {
      category: "Database",
      items: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
      ],
      color: "bg-[#5BA3F5]/10 text-[#5BA3F5] border-[#5BA3F5]/20",
    },
    {
      category: "DevOps & Tools",
      items: [
        "Docker",
        "Git & GitHub",
        "CI/CD Pipelines",
        "AWS",
        "Linux Servers",
        "VPS Deployment",
      ],
      color: "bg-[#3D7BC8]/10 text-[#3D7BC8] border-[#3D7BC8]/20",
    },
    {
      category: "SaaS & System Design",
      items: [
        "Multi-tenancy",
        "Payment Integration",
        "Subscription Management",
        "API Design",
        "Microservices",
      ],
      color: "bg-[#457bc1]/10 text-[#457bc1] border-[#457bc1]/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-5 h-full bg-card/60 backdrop-blur-sm border border-border/60 hover:border-primary/60 hover:shadow-md transition-all duration-300 group">
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant="outline"
                        className={`${skill.color} text-xs px-2 py-0.5 hover:scale-105 transition-all cursor-default font-medium`}
                      >
                        {item}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

