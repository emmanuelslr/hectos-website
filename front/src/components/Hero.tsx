'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
export default function Hero() {
  return (
    <div className="Hero relative min-h-screen flex justify-center overflow-hidden">
      {/* Video Background with gradient overlay */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) contrast(1.1)' }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto flex flex-col items-center min-h-[calc(100vh-96px)] mt-24"
        >
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-4xl md:text-6xl lg:text-[82px] font-[350] tracking-tighter leading-none text-white text-center mx-auto px-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="block mb-2"
              >
                Investissons dans l'Avenir
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="inline-block"
              >
                de l'Immobilier Résidentiel
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-2xl text-white/90 text-center mt-6 font-light tracking-wide mx-auto px-4 whitespace-nowrap"
            >
              L'investissement stratégique aux côtés de professionnels immobiliers
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 px-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 bg-white text-[#1E2124] rounded-lg text-base font-medium hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Nous Contacter
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="ml-1">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              <motion.a
                href="#expertise"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 border-2 border-white text-white rounded-lg text-base font-medium hover:bg-white/10 transition-all duration-300 text-center"
              >
                Notre Expertise
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
