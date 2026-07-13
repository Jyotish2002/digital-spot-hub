import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Printer,
  Laptop,
  Gift,
  FileText,
  Settings,
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
  Check,
  Star,
  Menu,
  X,
  Sparkles,
  Zap,
  Truck,
  Users,
  ChevronDown,
  Instagram,
  Facebook,
  Send,
  Mail,
} from "lucide-react";
import { useSiteConfig } from "@/lib/site-config-context";
import type { SiteIconKey } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  component: Index,
});

const ICONS = { Printer, Laptop, Gift, FileText, Settings, Sparkles, Users, Zap, Truck } as const;

function getIcon(icon: SiteIconKey) {
  return ICONS[icon];
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5">
      <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white shadow-elegant ring-1 ring-black/5">
        <img src="/logo.png" alt="AR Digital Spot logo" className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[15px] font-extrabold text-foreground">AR Digital Spot</span>
        <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          One-Stop Solution Hub
        </span>
      </div>
    </a>
  );
}

function Navbar() {
  const site = useSiteConfig();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {site.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.03]"
          >
            Order Now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {site.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white"
            >
              Order Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const site = useSiteConfig();
  return (
    <section id="home" className="relative overflow-hidden bg-hero-glow">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <MapPin className="h-3.5 w-3.5" /> {site.hero.location}
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Trusted Partner for <span className="text-gradient-brand">Printing</span> &{" "}
            <span className="text-gradient-brand">Digital Services</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.03]"
            >
              {site.hero.primaryCta} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {site.hero.secondaryCta}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" /> Same-day service
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" /> Bulk order friendly
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" /> Free delivery 100+ pages
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
          <motion.img
            src={site.hero.illustrationSrc}
            alt={site.hero.illustrationAlt}
            width={1200}
            height={1200}
            className="relative w-full max-w-[560px] drop-shadow-2xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-4 top-8 hidden rounded-2xl border border-border bg-white/90 p-3 shadow-card backdrop-blur sm:flex items-center gap-2"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground">{site.hero.turnaroundLabel}</div>
              <div className="text-sm font-bold">{site.hero.turnaroundValue}</div>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-2 hidden rounded-2xl border border-border bg-white/90 p-3 shadow-card backdrop-blur sm:flex items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent">
              <Star className="h-4 w-4 fill-current" />
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground">{site.hero.ratingLabel}</div>
              <div className="text-sm font-bold">{site.hero.ratingValue}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const site = useSiteConfig();
  return (
    <section className="relative -mt-4 px-4 sm:-mt-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 rounded-3xl border border-border bg-white/70 p-3 shadow-card backdrop-blur-xl sm:grid-cols-2 sm:gap-4 sm:p-4 lg:grid-cols-4">
        {site.stats.map((s, i) => {
          const Icon = getIcon(s.icon);
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl bg-gradient-brand-soft p-4 sm:p-5"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-card">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-extrabold text-foreground sm:text-2xl">{s.value}</div>
                <div className="truncate text-xs font-medium text-muted-foreground sm:text-sm">
                  {s.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {desc && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{desc}</p>}
    </div>
  );
}

function Services() {
  const site = useSiteConfig();
  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={site.sections.services.eyebrow}
          title={
            <>
              {site.sections.services.titlePrefix}{" "}
              <span className="text-gradient-brand">{site.sections.services.titleAccent}</span>
            </>
          }
          desc={site.sections.services.description}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-elegant">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Check className="h-4 w-4 shrink-0 text-primary" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Promo() {
  const site = useSiteConfig();
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-16"
          style={{
            background: "linear-gradient(135deg, oklch(0.19 0.04 265), oklch(0.28 0.12 275))",
          }}
        >
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent opacity-20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {site.promo.badge}
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {site.promo.titlePrefix}{" "}
                <span
                  className="text-gradient-brand"
                  style={{ backgroundImage: "linear-gradient(135deg, #93c5fd, #c4b5fd)" }}
                >
                  {site.promo.titleAccent}
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
                {site.promo.description}
              </p>
            </div>
            <div className="flex lg:justify-end">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-foreground shadow-elegant transition-transform hover:scale-[1.03]"
              >
                {site.promo.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const site = useSiteConfig();
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={site.sections.pricing.eyebrow}
          title={
            <>
              {site.sections.pricing.titlePrefix}{" "}
              <span className="text-gradient-brand">{site.sections.pricing.titleAccent}</span>
            </>
          }
          desc={site.sections.pricing.description}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {site.pricing.map((p) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl border p-8 ${p.highlight ? "border-transparent bg-gradient-brand text-white shadow-elegant lg:-mt-4" : "border-border bg-white text-foreground shadow-card"}`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-primary shadow-card">
                  {p.badge}
                </div>
              )}
              <div className="text-sm font-semibold uppercase tracking-wider opacity-80">
                {p.name}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <div className="text-5xl font-extrabold">{p.price}</div>
                <div className="text-sm opacity-70">{p.unit}</div>
              </div>
              <div className="mt-2 text-xs opacity-70">Starting from</div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className={`h-4 w-4 ${p.highlight ? "text-white" : "text-primary"}`} />{" "}
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${p.highlight ? "bg-white text-foreground hover:bg-white/90" : "bg-foreground text-white hover:bg-foreground/90"}`}
              >
                Order Now <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const site = useSiteConfig();
  return (
    <section className="bg-secondary/50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={site.sections.howItWorks.eyebrow}
          title={
            <>
              {site.sections.howItWorks.titlePrefix}{" "}
              <span className="text-gradient-brand">{site.sections.howItWorks.titleAccent}</span>
            </>
          }
          desc={site.sections.howItWorks.description}
        />
        <div className="relative mt-16 grid gap-6 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
          {site.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-border bg-white p-6 shadow-card"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-lg font-extrabold text-white shadow-elegant">
                {s.n}
              </div>
              <h3 className="mt-5 text-center text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const site = useSiteConfig();
  return (
    <section id="gallery" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={site.sections.gallery.eyebrow}
          title={
            <>
              {site.sections.gallery.titlePrefix}{" "}
              <span className="text-gradient-brand">{site.sections.gallery.titleAccent}</span>
            </>
          }
          desc={site.sections.gallery.description}
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {site.gallery.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl shadow-card ${g.tall ? "row-span-2" : ""}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.19 0.04 265 / 0.7), transparent 50%)",
                }}
              >
                <div className="absolute bottom-4 left-4 text-sm font-semibold text-white">
                  {g.alt}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const site = useSiteConfig();
  return (
    <section id="about" className="bg-secondary/50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={site.sections.reviews.eyebrow}
          title={
            <>
              Loved by <span className="text-gradient-brand">Locals</span>
            </>
          }
          desc={site.sections.reviews.description}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {site.reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-white p-7 shadow-card"
            >
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground/90">"{r.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const site = useSiteConfig();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          eyebrow={site.sections.faq.eyebrow}
          title={
            <>
              Questions? <span className="text-gradient-brand">Answered.</span>
            </>
          }
        />
        <div className="mt-12 space-y-3">
          {site.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-card"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-foreground">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const site = useSiteConfig();
  return (
    <section
      id="contact"
      className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      style={{ background: "linear-gradient(180deg, transparent, oklch(0.97 0.01 260))" }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={site.sections.contact.eyebrow}
          title={
            <>
              {site.sections.contact.titlePrefix}{" "}
              <span className="text-gradient-brand">{site.sections.contact.titleAccent}</span>
            </>
          }
          desc={site.sections.contact.description}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-card">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">Business</div>
            <div className="mt-2 text-2xl font-extrabold">{site.contact.businessName}</div>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {site.contact.address}
            </div>

            <div className="mt-8 grid gap-3">
              <a
                href={site.contact.phoneLink}
                className="flex items-center gap-3 rounded-2xl bg-gradient-brand p-4 text-white shadow-elegant transition-transform hover:scale-[1.02]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs opacity-80">Call Now</div>
                  <div className="truncate text-sm font-bold">{site.contact.phoneDisplay}</div>
                </div>
              </a>
              <a
                href={site.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 transition-colors hover:bg-secondary"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">WhatsApp</div>
                  <div className="truncate text-sm font-bold text-foreground">
                    {site.contact.phoneDisplay}
                  </div>
                </div>
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 transition-colors hover:bg-secondary"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="truncate text-sm font-bold text-foreground">
                    {site.contact.email}
                  </div>
                </div>
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(site.contact.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 transition-colors hover:bg-secondary"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="truncate text-sm font-bold text-foreground">Get directions</div>
                </div>
              </a>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Store Hours
              </div>
              <div className="mt-2 text-sm text-foreground/80">{site.contact.hours}</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
            <iframe
              title="AR Digital Spot location"
              src={site.contact.mapEmbed}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const site = useSiteConfig();
  return (
    <footer
      className="border-t border-border/60 bg-white px-4 py-14 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, oklch(0.19 0.04 265), oklch(0.14 0.04 265))" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand">
                <Printer className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[15px] font-extrabold text-white">{site.brand.name}</span>
                <span className="text-[10px] font-medium tracking-wider text-white/60 uppercase">
                  {site.brand.tagline}
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{site.footer.description}</p>
            <div className="mt-5 flex gap-2">
              <a
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</div>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Services</div>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              {site.services.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="transition-colors hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {site.contact.address}
              </li>
              <li>
                <a
                  href={site.contact.phoneLink}
                  className="flex items-start gap-2 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Call anytime: {site.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition-colors hover:text-white"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>WhatsApp: {site.contact.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" /> {site.contact.email}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <div>{site.footer.copyright}</div>
          <div>{site.footer.crafted}</div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Promo />
        <Pricing />
        <HowItWorks />
        <Gallery />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
