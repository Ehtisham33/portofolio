"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Reflexware",
      description:
        "AI-powered SaaS platform designed to automate business workflows and enhance productivity. Focused on scalable backend APIs, intelligent automation, and production-ready deployment.",
      tech: [
        "Python",
        "Django",
        "REST APIs",
        "AI Automation",
        "PostgreSQL",
        "AWS",
      ],
      liveUrl: "https://www.reflexware.com/",
      githubUrl: "#",
      image: "/images/r1.PNG",
    },
    {
      title: "Sports Replay Now",
      description:
        "Custom analytics and management platform for sports teams, featuring structured data handling, API-driven dashboards, and scalable backend architecture.",
      tech: [
        "Python",
        "Django",
        "REST APIs",
        "PostgreSQL",
        "Data Analytics",
      ],
      liveUrl: "https://app.sportsreplaynow.com",
      githubUrl: "#",
      image: "/images/a1.PNG",
    },
    {
      title: "Neumandate.de",
      description:
        "Modern full-stack web application with clean UI and backend integrations, focused on performance, scalability, and maintainable architecture.",
      tech: [
        "Next.js",
        "React",
        "API Integration",
        "TypeScript",
        "Tailwind CSS",
      ],
      liveUrl: "https://neumandate.de",
      githubUrl: "#",
      image: "/images/neu1.png",
    },
    {
      title: "Vintage LeftOver",
      description:
        "E-commerce platform with payment integration, order management, and secure checkout flows. Built with a focus on scalability and API-driven architecture.",
      tech: [
        "Python",
        "Django",
        "Stripe",
        "REST APIs",
        "PostgreSQL",
      ],
      liveUrl: "https://vintage-leftover.vercel.app",
      githubUrl: "#",
      image: "/images/vintage.png",
    },
    {
      title: "Chiisana labs",
      description:
        "Business management portal with secure authentication, role-based access, and backend-driven workflows for operational efficiency.",
      tech: [
        "Python",
        "Django",
        "JWT Authentication",
        "PostgreSQL",
        "REST APIs",
      ],
      liveUrl: "https://tiny-squirrel-88bdc9.netlify.app",
      githubUrl: "#",
      image: "/images/5.png",
    },
    {
      title: "Neu Appliances",
      description:
        "Full-stack e-commerce system with product management, payment processing, and scalable backend APIs designed for real-world business use.",
      tech: [
        "Python",
        "Django",
        "Stripe",
        "REST APIs",
        "PostgreSQL",
      ],
      liveUrl: "https://neu-appliance.vercel.app",
      githubUrl: "#",
      image: "/images/1.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of real-world projects highlighting AI solutions, 
            backend systems, SaaS platforms, and full-stack development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 group">
                <div className="relative h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-muted overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold text-primary/20">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 group/btn"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                        Live Demo
                      </a>
                    </Button>
                    {project.githubUrl !== "#" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group/btn"
                        asChild
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="group">
            View All Projects
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

