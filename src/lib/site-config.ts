import heroIllustration from "@/assets/hero-illustration.png";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import { z } from "zod";

export const siteIconKeys = [
  "Users",
  "Printer",
  "Zap",
  "Truck",
  "Laptop",
  "Gift",
  "FileText",
  "Settings",
  "Sparkles",
] as const;

export type SiteIconKey = (typeof siteIconKeys)[number];

const iconSchema = z.enum(siteIconKeys);

export const siteConfigSchema = z.object({
  brand: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  theme: z.object({
    background: z.string().min(1),
    foreground: z.string().min(1),
    primary: z.string().min(1),
    accent: z.string().min(1),
    secondary: z.string().min(1),
    muted: z.string().min(1),
    border: z.string().min(1),
  }),
  nav: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    }),
  ),
  hero: z.object({
    badge: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    primaryCta: z.string().min(1),
    secondaryCta: z.string().min(1),
    location: z.string().min(1),
    illustrationSrc: z.string().min(1),
    illustrationAlt: z.string().min(1),
    turnaroundLabel: z.string().min(1),
    turnaroundValue: z.string().min(1),
    ratingLabel: z.string().min(1),
    ratingValue: z.string().min(1),
  }),
  stats: z.array(
    z.object({
      value: z.string().min(1),
      label: z.string().min(1),
      icon: iconSchema,
    }),
  ),
  sections: z.object({
    services: z.object({
      eyebrow: z.string().min(1),
      titlePrefix: z.string().min(1),
      titleAccent: z.string().min(1),
      description: z.string().min(1),
    }),
    pricing: z.object({
      eyebrow: z.string().min(1),
      titlePrefix: z.string().min(1),
      titleAccent: z.string().min(1),
      description: z.string().min(1),
    }),
    promo: z.object({
      eyebrow: z.string().min(1),
      titlePrefix: z.string().min(1),
      titleAccent: z.string().min(1),
      description: z.string().min(1),
      cta: z.string().min(1),
    }),
    howItWorks: z.object({
      eyebrow: z.string().min(1),
      titlePrefix: z.string().min(1),
      titleAccent: z.string().min(1),
      description: z.string().min(1),
    }),
    gallery: z.object({
      eyebrow: z.string().min(1),
      titlePrefix: z.string().min(1),
      titleAccent: z.string().min(1),
      description: z.string().min(1),
    }),
    reviews: z.object({
      eyebrow: z.string().min(1),
      titlePrefix: z.string().min(1),
      titleAccent: z.string().min(1),
      description: z.string().min(1),
    }),
    faq: z.object({
      eyebrow: z.string().min(1),
      titlePrefix: z.string().min(1),
      titleAccent: z.string().min(1),
      description: z.string().min(1),
    }),
    contact: z.object({
      eyebrow: z.string().min(1),
      titlePrefix: z.string().min(1),
      titleAccent: z.string().min(1),
      description: z.string().min(1),
    }),
  }),
  services: z.array(
    z.object({
      icon: iconSchema,
      title: z.string().min(1),
      desc: z.string().min(1),
      items: z.array(z.string().min(1)).min(1),
    }),
  ),
  pricing: z.array(
    z.object({
      name: z.string().min(1),
      price: z.string().min(1),
      unit: z.string().min(1),
      features: z.array(z.string().min(1)).min(1),
      highlight: z.boolean(),
      badge: z.string().min(1).optional(),
    }),
  ),
  promo: z.object({
    badge: z.string().min(1),
    titlePrefix: z.string().min(1),
    titleAccent: z.string().min(1),
    description: z.string().min(1),
    cta: z.string().min(1),
  }),
  steps: z.array(
    z.object({
      n: z.string().min(1),
      title: z.string().min(1),
      desc: z.string().min(1),
    }),
  ),
  gallery: z.array(
    z.object({
      src: z.string().min(1),
      alt: z.string().min(1),
      tall: z.boolean().optional(),
    }),
  ),
  reviews: z.array(
    z.object({
      name: z.string().min(1),
      role: z.string().min(1),
      text: z.string().min(1),
    }),
  ),
  faqs: z.array(
    z.object({
      q: z.string().min(1),
      a: z.string().min(1),
    }),
  ),
  contact: z.object({
    businessName: z.string().min(1),
    address: z.string().min(1),
    phoneDisplay: z.string().min(1),
    phoneLink: z.string().min(1),
    whatsappLink: z.string().min(1),
    email: z.string().email(),
    hours: z.string().min(1),
    mapQuery: z.string().min(1),
    mapEmbed: z.string().min(1),
  }),
  footer: z.object({
    description: z.string().min(1),
    copyright: z.string().min(1),
    crafted: z.string().min(1),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const defaultSiteConfig: SiteConfig = {
  brand: {
    name: "AR Digital Spot",
    tagline: "One-Stop Solution Hub",
  },
  seo: {
    title: "AR Digital Spot — Printing & Digital Services in Naihati",
    description:
      "Fast, affordable printing, Xerox, DTF & vinyl, and online digital services in Naihati. From ₹1/page prints to customized gifts — your one-stop solution hub.",
  },
  theme: {
    background: "oklch(1 0 0)",
    foreground: "oklch(0.19 0.04 265)",
    primary: "oklch(0.55 0.22 265)",
    accent: "oklch(0.62 0.24 295)",
    secondary: "oklch(0.97 0.01 260)",
    muted: "oklch(0.97 0.01 260)",
    border: "oklch(0.93 0.01 260)",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    badge: "Naihati, West Bengal",
    title: "Your Trusted Partner for Printing & Digital Services",
    description:
      "From ₹1 printing and Xerox to customized DTF, Vinyl printing and online services, AR Digital Spot delivers fast and affordable solutions.",
    primaryCta: "Order Now",
    secondaryCta: "Explore Services",
    location: "AR DIGITAL SPOT, Gowala Fatak uttar para, Bada chatal, Naihati, West Bengal 743166",
    illustrationSrc: heroIllustration,
    illustrationAlt: "AR Digital Spot printing and digital services illustration",
    turnaroundLabel: "Turnaround",
    turnaroundValue: "Under 10 min",
    ratingLabel: "Rated by",
    ratingValue: "1000+ locals",
  },
  stats: [
    { value: "1000+", label: "Happy Customers", icon: "Users" },
    { value: "₹1", label: "Per Page Printing", icon: "Printer" },
    { value: "Fast", label: "Turnaround", icon: "Zap" },
    { value: "Free", label: "Delivery 100+ pages", icon: "Truck" },
  ],
  sections: {
    services: {
      eyebrow: "Our Services",
      titlePrefix: "Everything You Need",
      titleAccent: "Under One Roof",
      description:
        "Walk in with a task, walk out with it done. Printing, digital paperwork, custom products, and tech help — all in one place.",
    },
    pricing: {
      eyebrow: "Simple Pricing",
      titlePrefix: "Transparent Rates.",
      titleAccent: "No Surprises.",
      description:
        "Straightforward pricing on our most-requested services. Ask us for a custom quote on anything else.",
    },
    promo: {
      eyebrow: "Limited Offer",
      titlePrefix: "Print More,",
      titleAccent: "Save More.",
      description:
        "Get FREE HOME DELIVERY in Naihati on all orders above 100 pages. Perfect for students, offices, and bulk projects.",
      cta: "Contact Now",
    },
    howItWorks: {
      eyebrow: "How It Works",
      titlePrefix: "From Request to",
      titleAccent: "Delivery",
      description: "A simple, transparent 4-step process — the way it should be.",
    },
    gallery: {
      eyebrow: "Our Work",
      titlePrefix: "Recent",
      titleAccent: "Projects & Prints",
      description:
        "A glimpse of the printing, customization, and gifts we've delivered for happy customers.",
    },
    reviews: {
      eyebrow: "Reviews",
      titlePrefix: "Loved by",
      titleAccent: "Locals",
      description: "Real feedback from students, professionals, and businesses in Naihati.",
    },
    faq: {
      eyebrow: "FAQ",
      titlePrefix: "Questions?",
      titleAccent: "Answered.",
      description: "",
    },
    contact: {
      eyebrow: "Get in Touch",
      titlePrefix: "Visit, Call, or",
      titleAccent: "WhatsApp Us",
      description: "Drop by our shop in Naihati or reach us instantly — we're happy to help.",
    },
  },
  services: [
    {
      icon: "Printer",
      title: "Printing & Xerox",
      desc: "High-quality prints for every need — from single pages to bulk orders.",
      items: ["Black & White Printing", "Color Printing", "Xerox Copies", "Bulk Printing"],
    },
    {
      icon: "Laptop",
      title: "Digital Services",
      desc: "Skip the queue. Get your online work done fast and correctly.",
      items: ["Online Forms", "College Admission", "IGNOU Admission", "Online Challan"],
    },
    {
      icon: "Gift",
      title: "Customized Printing",
      desc: "Turn ideas into memorable products with vibrant, durable prints.",
      items: ["DTF Printing", "Vinyl Printing", "Sublimation Gifts", "Personalized Mugs"],
    },
    {
      icon: "FileText",
      title: "Documentation",
      desc: "Get essential documents prepared without the hassle.",
      items: ["PAN Card", "Resume / CV", "Document Scanning", "Scholarship Assistance"],
    },
    {
      icon: "Settings",
      title: "Technical Services",
      desc: "Reliable tech help when you need it most.",
      items: ["Computer Repair", "Software Installation", "Data Recovery", "Printer Setup"],
    },
    {
      icon: "Sparkles",
      title: "And Much More",
      desc: "Whatever you need — walk in and we'll figure it out together.",
      items: ["Photo Printing", "Lamination", "ID Cards", "Custom Requests"],
    },
  ],
  pricing: [
    {
      name: "Black & White Print",
      price: "₹1",
      unit: "/page",
      features: ["Standard A4 paper", "Single-side print", "Instant service", "Bulk discounts"],
      highlight: false,
    },
    {
      name: "Xerox Copies",
      price: "₹1",
      unit: "/copy",
      features: ["Crisp reproduction", "Any document size", "Fast turnaround", "Volume pricing"],
      highlight: true,
      badge: "Most Popular",
    },
    {
      name: "Color Printing",
      price: "₹5",
      unit: "/page onwards",
      features: [
        "Vivid color output",
        "Premium paper options",
        "Photo-quality prints",
        "Same-day delivery",
      ],
      highlight: false,
    },
  ],
  promo: {
    badge: "Limited Offer",
    titlePrefix: "Print More,",
    titleAccent: "Save More.",
    description:
      "Get FREE HOME DELIVERY in Naihati on all orders above 100 pages. Perfect for students, offices, and bulk projects.",
    cta: "Contact Now",
  },
  steps: [
    {
      n: "01",
      title: "Send Requirement",
      desc: "Share your file, request, or query via call, WhatsApp, or visit.",
    },
    {
      n: "02",
      title: "Confirm Order",
      desc: "We review it, share a quick quote, and confirm the details with you.",
    },
    {
      n: "03",
      title: "Printing Process",
      desc: "Your order is prepared with care on premium paper and machines.",
    },
    {
      n: "04",
      title: "Delivery / Pickup",
      desc: "Pick it up in-store or get free home delivery on 100+ page orders.",
    },
  ],
  gallery: [
    { src: gallery1, alt: "Custom DTF printed t-shirts", tall: true },
    { src: gallery2, alt: "Digital color printing in progress" },
    { src: gallery3, alt: "Personalized photo mugs" },
    { src: gallery4, alt: "Freshly printed documents and brochures" },
    { src: gallery5, alt: "Vinyl printed sticker sheets", tall: true },
    { src: gallery6, alt: "Sublimation photo frame gift" },
  ],
  reviews: [
    {
      name: "Rahul S.",
      role: "Student, Naihati",
      text: "Excellent printing quality and unbeatable pricing. Got my project printed in under an hour.",
    },
    {
      name: "Priya D.",
      role: "College Applicant",
      text: "They helped me fill my IGNOU form and printed everything. Super helpful staff.",
    },
    {
      name: "Amit K.",
      role: "Small Business Owner",
      text: "Got DTF t-shirts printed for my team — colors are vivid and the fabric feels premium.",
    },
  ],
  faqs: [
    {
      q: "What is the price of Xerox?",
      a: "Our Xerox and B/W prints start from just ₹1 per page. Color and specialty prints are priced based on paper, size, and quantity — always transparent.",
    },
    {
      q: "Do you provide home delivery?",
      a: "Yes! We offer FREE home delivery within Naihati on all orders above 100 pages. Smaller orders can be picked up in-store.",
    },
    {
      q: "What services do you offer?",
      a: "Printing, Xerox, DTF & vinyl printing, sublimation gifts, online form filling (admissions, challans, PAN), document scanning, resumes, and basic computer repair.",
    },
    {
      q: "Do you accept bulk orders?",
      a: "Absolutely. We regularly handle large printing orders for students, offices, and events with special bulk pricing. Contact us for a quick quote.",
    },
    {
      q: "How fast can I get my order?",
      a: "Most walk-in prints are ready in minutes. Larger jobs and customized products (like DTF shirts or mugs) usually take a few hours to a day.",
    },
  ],
  contact: {
    businessName: "AR Digital Spot",
    address: "AR DIGITAL SPOT, Gowala Fatak uttar para, Bada chatal, Naihati, West Bengal 743166",
    phoneDisplay: "86978 32373",
    phoneLink: "tel:+918697832373",
    whatsappLink: "https://wa.me/918697832373",
    email: "shaw74757@gmail.com",
    hours: "Monday to Sunday: 10:30 AM – 2:00 PM · 5:30 PM – 9:30 PM",
    mapQuery: "AR DIGITAL SPOT, Gowala Fatak uttar para, Bada chatal, Naihati, West Bengal 743166",
    mapEmbed:
      "https://www.google.com/maps?q=AR+DIGITAL+SPOT%2C+Gowala+Fatak+uttar+para%2C+Bada+chatal%2C+Naihati%2C+West+Bengal+743166&output=embed",
  },
  footer: {
    description:
      "Fast, affordable printing and digital services in Naihati. Trusted by 1000+ customers.",
    copyright: "© 2026 AR Digital Spot. All Rights Reserved.",
    crafted:
      "Crafted with care at AR DIGITAL SPOT, Gowala Fatak uttar para, Bada chatal, Naihati, West Bengal 743166.",
  },
};

export function siteConfigToCssVars(theme: SiteConfig["theme"]): Record<string, string> {
  return {
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--primary": theme.primary,
    "--accent": theme.accent,
    "--secondary": theme.secondary,
    "--muted": theme.muted,
    "--border": theme.border,
    "--brand-start": theme.primary,
    "--brand-end": theme.accent,
  };
}
