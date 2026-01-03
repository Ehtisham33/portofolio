"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ehtisham Yaqoob. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground">
            <a
              href="mailto:malik.ehtisham.188@gmail.com"
              className="hover:text-primary transition-colors"
            >
              malik.ehtisham.188@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

