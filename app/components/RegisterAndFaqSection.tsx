"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Icons matching Gravity UI
const ShoppingBag = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M4.5 4a3.5 3.5 0 0 1 7 0v1h1.75a.75.75 0 0 1 .74.634l.8 5.6A1.75 1.75 0 0 1 13.06 13H2.94a1.75 1.75 0 0 1-1.73-1.766l.8-5.6A.75.75 0 0 1 2.75 5H4.5V4Zm1.5 1h4V4a2 2 0 1 0-4 0v1Zm-3.14 6.786a.25.25 0 0 0 .24.214h10.12a.25.25 0 0 0 .24-.214l-.686-4.786H2.174l-.686 4.786Z" clipRule="evenodd"/>
  </svg>
);

const Receipt = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M2.5 2a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v11.667a.5.5 0 0 1-.789.412L10.5 12.4l-2.211 1.679a.5.5 0 0 1-.578 0L5.5 12.4l-2.211 1.679A.5.5 0 0 1 2.5 13.667V2Zm1 .5v9.845l1.711-1.299a.5.5 0 0 1 .578 0L8 12.725l2.211-1.679a.5.5 0 0 1 .578 0L12.5 12.345V2.5h-9ZM5 5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 5Zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 8Z" clipRule="evenodd"/>
  </svg>
);

const CreditCard = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M1 4.5A1.5 1.5 0 0 1 2.5 3h11A1.5 1.5 0 0 1 15 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 11.5v-7Zm1.5 0a.25.25 0 0 0-.25.25V5.5h11.5v-.75a.25.25 0 0 0-.25-.25h-11Zm11.25 2.5H2.25v4.5c0 .138.112.25.25.25h11a.25.25 0 0 0 .25-.25V7ZM4 9.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 4 9.5Z" clipRule="evenodd"/>
  </svg>
);

const Box = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M7.74.072a.75.75 0 0 1 .52 0l6.25 2.25a.75.75 0 0 1 .5.703v9a.75.75 0 0 1-.49.704l-6.25 2.344a.75.75 0 0 1-.52 0l-6.25-2.344A.75.75 0 0 1 1 12.025v-9a.75.75 0 0 1 .5-.703L7.74.072ZM8 1.492 2.7 3.4 8 5.308l5.3-1.908L8 1.492ZM2.5 4.67v6.655L7.25 13.11V6.38L2.5 4.67Zm6.25 8.44 4.75-1.785V4.67L8.75 6.38v6.73Z" clipRule="evenodd"/>
  </svg>
);

const PlanetEarth = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM2.5 8a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Zm6.25-4.24a.75.75 0 0 1 .75-.75 4.02 4.02 0 0 1 3.24 3.24.75.75 0 0 1-1.48.25 2.52 2.52 0 0 0-2.01-2.01.75.75 0 0 1-.5-.73Zm-4.99 4.25a.75.75 0 0 1 .74.74 2.52 2.52 0 0 0 2.01 2.01.75.75 0 1 1-.25 1.48 4.02 4.02 0 0 1-3.24-3.24.75.75 0 0 1 .74-.99Z" clipRule="evenodd"/>
  </svg>
);

const ArrowsRotateLeft = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M1.25 2.5a.75.75 0 0 1 .75.75v1.892A6.5 6.5 0 1 1 1.5 8a.75.75 0 0 1 1.5 0 5 5 0 1 0 1.464-3.536l1.328 1.328a.75.75 0 0 1-.53 1.28H1.25a.75.75 0 0 1-.75-.75V2.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd"/>
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
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <ShoppingBag />,
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: <Receipt />,
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: <CreditCard />,
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: <Box />,
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: <PlanetEarth />,
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: <ArrowsRotateLeft />,
    title: "How do I request a refund?",
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
