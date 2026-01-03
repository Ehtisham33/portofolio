"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { UpworkIcon } from "@/components/icons/upwork-icon";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Get all sections
      const sections = ["about", "skills", "projects", "chat", "contact"];
      const scrollPosition = window.scrollY + 150; // Offset for better detection

      // Find the current active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      
      // If at the top, set hero as active (or no active section)
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Chat", href: "#chat" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent cursor-pointer"
          >
            EY
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://github.com/Ehtisham33"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ehtisham-yaqoob-b02645388/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </motion.a>
            <motion.a
              href="mailto:malik.ehtisham.188@gmail.com"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </motion.a>
            <motion.a
              href="https://www.upwork.com/freelancers/~01196455c48564f62b"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <UpworkIcon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 bg-background border-b border-border shadow-2xl z-50 md:hidden"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    EY
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="py-4 space-y-1">
                  {navItems.map((item) => {
                    const sectionId = item.href.replace("#", "");
                    const isActive = activeSection === sectionId;
                    
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                          isActive
                            ? "text-primary font-semibold bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </nav>

                {/* Social Links */}
                <div className="py-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-3 font-medium">
                    Connect with me
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.a
                      href="https://github.com/Hassan1823"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Github className="w-5 h-5 text-foreground" />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/hsnzaib/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-foreground" />
                    </motion.a>
                    <motion.a
                      href="mailto:hassan.zaib223@gmail.com"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-foreground" />
                    </motion.a>
                    <motion.a
                      href="https://www.upwork.com/freelancers/hsnzaib"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <UpworkIcon className="w-5 h-5 text-foreground" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
}

