"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { UpworkIcon } from "@/components/icons/upwork-icon";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "malik.ehtisham.188@gmail.com",
      href: "mailto:malik.ehtisham.188@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 314 5533280",
      href: "tel:+923145533280",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Islamabad, Pakistan",
      href: "https://www.google.com/maps/place/Islamabad",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ehtisham-yaqoob-b02645388/",
      color: "hover:text-[#0077b5]",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Ehtisham33",
      color: "hover:text-foreground",
    },
    {
      icon: UpworkIcon,
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/~01196455c48564f62b",
      color: "hover:text-[#457bc1]",
    },
  ];

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

  return (
    <section
      id="contact"
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
            Let’s Work Together
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Have a project in mind? Let's collaborate and bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group"
                  >
                    <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {info.label}
                      </div>
                      <div className="font-medium text-sm">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="text-xs text-muted-foreground mb-4 text-center">
                  Let’s connect
                </div>
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors ${social.color}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

