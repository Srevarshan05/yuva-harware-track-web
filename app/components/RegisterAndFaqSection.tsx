"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Icons matching Gravity UI
const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="4"/>
    <path d="M17 11a3 3 0 1 0 0-6"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    <path d="M17 15a4 4 0 0 1 4 4v2"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const AwardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const CpuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="16" x="4" y="4" rx="2"/>
    <rect width="6" height="6" x="9" y="9" rx="1"/>
    <path d="M15 2v2"/>
    <path d="M15 20v2"/>
    <path d="M2 15h2"/>
    <path d="M2 9h2"/>
    <path d="M20 15h2"/>
    <path d="M20 9h2"/>
    <path d="M9 2v2"/>
    <path d="M9 20v2"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M3.22 5.47a.75.75 0 0 1 1.06 0L8 9.19l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L3.22 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/>
  </svg>
);

// Custom Accordion matching HeroUI & Gravity UI design
const Accordion = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div data-custom="accordion" className={`flex flex-col space-y-3 ${className}`}>
      {children}
    </div>
  );
};

const AccordionItem = ({
  children,
  isOpen,
  onToggle,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      data-custom="item"
      className="rounded-xl border border-white/10 bg-[#0d0d12]/90 backdrop-blur-md overflow-hidden transition-colors duration-200 hover:border-white/20"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, onToggle });
        }
        return child;
      })}
    </div>
  );
};

const AccordionHeading = ({
  children,
  isOpen,
  onToggle,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}) => {
  return (
    <div data-custom="heading" className="w-full">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, onToggle });
        }
        return child;
      })}
    </div>
  );
};

const AccordionTrigger = ({
  children,
  isOpen,
  onToggle,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}) => {
  return (
    <button
      data-custom="trigger"
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-medium text-white/90 transition-colors hover:text-white cursor-pointer"
    >
      <div className="flex items-center gap-3">
        {React.Children.toArray(children).filter(
          (c) => !(React.isValidElement(c) && (c.type as any)?.name === "AccordionIndicator")
        )}
      </div>
      <AccordionIndicator isOpen={isOpen}>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </AccordionIndicator>
    </button>
  );
};

const AccordionIndicator = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
}) => {
  return (
    <span className="shrink-0 text-white/40 group-hover:text-white/80 transition-colors">
      {children}
    </span>
  );
};

const AccordionPanel = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          data-custom="panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AccordionBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-white/60">
      {children}
    </div>
  );
};

Accordion.Item = AccordionItem;
Accordion.Heading = AccordionHeading;
Accordion.Trigger = AccordionTrigger;
Accordion.Indicator = AccordionIndicator;
Accordion.Panel = AccordionPanel;
Accordion.Body = AccordionBody;

const items = [
  {
    icon: <UsersIcon />,
    title: "1. Who can participate in the hackathon?",
    content:
      "Students from various institutions across India can participate in Megathon and showcase their ideas, skills, and innovative solutions.",
  },
  {
    icon: <TeamIcon />,
    title: "2. What is the minimum or maximum team size?",
    content: "Teams can consist of 2–4 members.",
  },
  {
    icon: <CodeIcon />,
    title: "3. Can we use AI tools, APIs, GitHub, or open-source resources?",
    content:
      "Yes. Participants may use AI tools, APIs, GitHub repositories, and open-source hardware or software to build their solutions.",
  },
  {
    icon: <AwardIcon />,
    title: "4. What are the judging criteria?",
    content:
      "Projects will be evaluated based on innovation, technical implementation, functionality, impact, scalability, and overall presentation.",
  },
  {
    icon: <CpuIcon />,
    title: "5. Are there any restrictions on hardware components or project ideas?",
    content:
      "For the Hardware Track, pre-assembled prototypes are not allowed. The hardware and complete solution must be built and assembled on-site during the event.",
  },
  {
    icon: <HelpIcon />,
    title: "6. Who can we contact for technical or registration issues?",
    content: (
      <div className="space-y-3">
        <p>
          For technical, registration, or other event-related assistance, please reach out to the Megathon Organizing Team through the official contact details provided on the website.
        </p>
        <div className="pt-1 flex flex-wrap items-center gap-2.5">
          <a
            href="tel:+919606729608"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-xs font-mono font-medium transition-all shadow-sm group"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white transition-colors">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>Call: +91 96067 29608</span>
          </a>
          <a
            href="https://wa.me/919606729608?text=Hello%20Megathon%20Team%2C%20I%20have%20a%20query%20regarding%20the%20Hardware%20Track."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-xs font-mono font-medium transition-all shadow-sm group"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-white/60 group-hover:text-white transition-colors">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.22 1.28-1.74 1.34-.48.06-1.07.1-3.23-.8-2.62-1.09-4.29-3.79-4.42-3.96-.13-.18-1.05-1.39-1.05-2.66 0-1.26.66-1.88.89-2.14.24-.26.52-.33.7-.33.17 0 .35 0 .5.01.16.01.38-.06.59.45.23.55.78 1.9.85 2.04.07.15.11.32.02.51-.09.18-.14.3-.28.46-.14.16-.3.35-.43.47-.14.13-.29.28-.12.56.17.28.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.45.29.15.46.13.63-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.64-.15.26.1 1.66.78 1.94.92.29.15.48.22.55.34.07.13.07.72-.17 1.4z"/>
            </svg>
            <span>WhatsApp: 96067 29608</span>
          </a>
        </div>
      </div>
    ),
  },
];

export function RegisterAndFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative z-30 w-full px-4 sm:px-8 py-20 flex flex-col items-center overflow-hidden bg-transparent">
      {/* Indigo ambient glow — matches PptScreeningSection */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle 700px at 50% 40%, rgba(99,102,241,0.05), transparent 70%)",
        }}
      />

      {/* ── REGISTER NOW SECTION ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl flex flex-col items-center text-center mb-24 px-4"
      >

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-white leading-tight mb-4">
          You’re one step closer to securing your spot in this event.
        </h2>

        <p className="text-sm sm:text-base text-white/60 max-w-xl mb-8">
          Click the button below to register now through the official Unstop portal and claim your team’s slot.
        </p>

        {/* Unstop Registration Button — matches Initial Screening Round button */}
        <motion.a
          href="https://unstop.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-3 bg-white px-8 sm:px-10 py-3.5 text-black text-lg sm:text-xl font-normal tracking-[-0.01em] shadow-2xl transition-all duration-200"
        >
          {/* Unstop Logo */}
          <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
            <Image
              src="/logos/unstop-logo.png"
              alt="Unstop Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>

          <span className="text-black font-normal">Register Now on Unstop</span>

          {/* Arrow */}
          <svg
            className="w-5 h-5 text-black transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.a>
      </motion.div>

      {/* ── FAQ SECTION (HEROUI ACCORDION STYLE) ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl flex flex-col items-center"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <Accordion className="w-full">
          {items.map((item, index) => (
            <Accordion.Item
              key={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            >
              <Accordion.Heading>
                <Accordion.Trigger>
                  {item.icon ? (
                    <span className="me-3 size-4 shrink-0 text-white/50">{item.icon}</span>
                  ) : null}
                  <span className="text-sm sm:text-base font-normal text-white/90">
                    {item.title}
                  </span>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel isOpen={openIndex === index}>
                <Accordion.Body>{item.content}</Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
