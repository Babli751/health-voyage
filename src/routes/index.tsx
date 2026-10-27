import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Award, BadgeCheck, CalendarCheck, Droplets, HeartPulse, Brain, Bone,
  Wind, Leaf, Sparkles, Stethoscope, ShieldCheck, Headphones, Plane, Star, MapPin,
  Search, MessageCircle, Phone, Mail, Menu, X, Quote, Activity, Baby, Flower2,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HealthVoyage — Health Resorts & Sanatoriums Abroad" },
      { name: "description", content: "Compare 62 trusted health resorts in 7 countries. Free consultation, transparent prices and full travel support." },
      { property: "og:title", content: "HealthVoyage — Health Resorts & Sanatoriums Abroad" },
      { property: "og:description", content: "Compare 62 trusted health resorts in 7 countries with free coordinator support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SITE = "https://healthvoyage.vercel.app";

const treatments = [
  { name: "Balneotherapy", count: 32, icon: Droplets },
  { name: "Cardiovascular", count: 17, icon: HeartPulse },
  { name: "Musculoskeletal & Joints", count: 49, icon: Bone },
  { name: "Nervous System", count: 24, icon: Brain },
  { name: "Respiratory", count: 14, icon: Wind },
  { name: "Naftalan Therapy", count: 15, icon: Sparkles },
  { name: "Rehabilitation", count: 25, icon: Activity },
  { name: "Digestive System", count: 26, icon: Stethoscope },
  { name: "Mud Therapy", count: 23, icon: Leaf },
  { name: "Gynecology", count: 15, icon: Baby },
  { name: "Spa & Wellness", count: 19, icon: Flower2 },
  { name: "Skin Conditions", count: 11, icon: ShieldCheck },
];

const resorts = [
  { name: "Lopota Lake Resort & Spa", loc: "Kakheti, Georgia", img: "/img/5793792.jpg", rating: 4.9, href: "/sanatoriums/lopota-lake-resort-and-spa-kakheti", tags: ["Spa & Wellness", "Rehabilitation"] },
  { name: "Alfa Radon Medical & Spa", loc: "Boroviki, Belarus", img: "/img/28518909.jpg", rating: 4.8, href: "/sanatoriums/alfa-radon-medical-and-spa-resort-boroviki", tags: ["Radon therapy", "Joints"] },
  { name: "Garabag Resort & Spa", loc: "Naftalan, Azerbaijan", img: "/img/9146381.jpg", rating: 4.9, href: "/sanatoriums/garabag-resort-and-spa-naftalan", tags: ["Naftalan", "Skin"] },
  { name: "Istochnik Sanatorium", loc: "Yessentuki, Russia", img: "/img/2259226.jpg", rating: 4.7, href: "/sanatoriums/istochnik-sanatorium-yessentuki", tags: ["Mineral water", "Digestive"] },
];

const countries = [
  { name: "Azerbaijan", flag: "🇦🇿", n: 23, slug: "azerbaijan" },
  { name: "Belarus", flag: "🇧🇾", n: 13, slug: "belarus" },
  { name: "Georgia", flag: "🇬🇪", n: 7, slug: "georgia" },
  { name: "Russia", flag: "🇷🇺", n: 6, slug: "russia" },
  { name: "Lithuania", flag: "🇱🇹", n: 5, slug: "lithuania" },
  { name: "Hungary", flag: "🇭🇺", n: 4, slug: "hungary" },
  { name: "Serbia", flag: "🇷🇸", n: 4, slug: "serbia" },
];

const steps = [
  { icon: Search, t: "Explore", d: "Browse resorts by destination or treatment and shortlist what fits your condition." },
  { icon: MessageCircle, t: "Consult", d: "Our coordinators confirm suitability, programs and pricing directly with the resort." },
  { icon: CalendarCheck, t: "Plan", d: "We arrange your program, dates, transfers and every document you need." },
  { icon: Plane, t: "Heal", d: "Travel and receive care, with support during your stay and after you return." },
];

const reviews = [
  { n: "Anna K.", c: "Germany", t: "Garabag Resort & Spa", q: "The coordinator answered every question within hours. My psoriasis improved more in 14 days of Naftalan than in years of creams." },
  { n: "Michael R.", c: "United Kingdom", t: "Premier Aqua, Serbia", q: "After knee surgery I needed serious rehab. The program was professional, the staff caring, and the price far below home." },
  { n: "Leyla M.", c: "Turkey", t: "Lopota Lake, Georgia", q: "Everything from the airport pickup to the doctor's schedule was handled. It felt like travelling with family." },
];

const faqs = [
  { q: "Is the consultation really free?", a: "Yes. Our coordinators help you compare resorts, programs and prices at no cost. You pay the resort directly for your stay." },
  { q: "How do I know which resort suits my condition?", a: "Share your diagnosis or medical notes. Our team checks suitability with the resort's doctors before you book." },
  { q: "Do you help with visas and transfers?", a: "We prepare invitation letters where required and can organize airport transfers and local transport." },
  { q: "How long is a typical treatment program?", a: "Most sanatorium programs run 10–21 days. Shorter wellness stays of 5–7 days are also available." },
];

const partners = ["Medical Tourism Association", "ISO 9001 Certified", "Ministry of Health Licensed", "Booking Verified", "TripAdvisor Excellence", "European Spas Association", "Thermal Spa Network"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = ["Sanatoriums", "Destinations", "Treatments", "About", "Contact"];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-card/90 shadow-soft backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant"><Stethoscope className="h-5 w-5" /></span>
          <span className={`text-xl font-extrabold tracking-tight ${scrolled ? "text-foreground" : "text-navy-foreground"}`}>Health<span className="text-primary-glow">Voyage</span></span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l} href={`${SITE}/${l.toLowerCase()}`} className={`group relative text-sm font-medium ${scrolled ? "text-foreground/80" : "text-navy-foreground/90"}`}>
              {l}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-glow transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+000" className={`flex items-center gap-2 text-sm font-semibold ${scrolled ? "text-foreground" : "text-navy-foreground"}`}><Phone className="h-4 w-4" /> 24/7 Support</a>
          <a href="#consult" className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:-translate-y-0.5">Free consultation</a>
        </div>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className={`lg:hidden ${scrolled ? "text-foreground" : "text-navy-foreground"}`}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="space-y-1 border-t border-border bg-card px-5 py-4 lg:hidden">
          {links.map((l) => <a key={l} href={`${SITE}/${l.toLowerCase()}`} className="block rounded-lg px-3 py-2 font-medium text-foreground hover:bg-muted">{l}</a>)}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <img src={hero} alt="Thermal spa resort pool in the mountains" width={1920} height={1088} className="absolute inset-0 -z-20 h-full w-full object-cover animate-ken-burns" />
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-16 pt-32">
        <div className="max-w-3xl">
          <span className="glass inline-flex animate-fade-up items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy-foreground">
            <BadgeCheck className="h-4 w-4 text-accent" /> Trusted by patients from 40+ countries
          </span>
          <h1 className="mt-6 animate-fade-up font-display text-5xl font-semibold leading-[1.05] text-navy-foreground [animation-delay:120ms] md:text-7xl">
            World-class treatment & recovery, <span className="text-gradient italic">close to home.</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg text-navy-foreground/85 [animation-delay:240ms]">
            Compare trusted sanatoriums, clinics and health resorts — from Naftalan oil therapy to thermal balneology and rehabilitation.
          </p>
        </div>

        <form action={`${SITE}/sanatoriums`} className="mt-10 grid max-w-4xl animate-fade-up gap-2 rounded-2xl bg-card p-2 shadow-elegant [animation-delay:360ms] md:grid-cols-[1fr_1fr_auto]">
          <label className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-muted">
            <Stethoscope className="h-5 w-5 text-primary" />
            <span className="flex-1">
              <span className="block text-xs font-semibold text-muted-foreground">Treatment</span>
              <select name="treatment" className="w-full bg-transparent font-medium text-foreground outline-none">
                <option>Any treatment</option>
                {treatments.map((t) => <option key={t.name}>{t.name}</option>)}
              </select>
            </span>
          </label>
          <label className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-muted md:border-l md:border-border">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="flex-1">
              <span className="block text-xs font-semibold text-muted-foreground">Destination</span>
              <select name="country" className="w-full bg-transparent font-medium text-foreground outline-none">
                <option>Any destination</option>
                {countries.map((c) => <option key={c.slug}>{c.flag} {c.name}</option>)}
              </select>
            </span>
          </label>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:shadow-elegant hover:brightness-110">
            <Search className="h-5 w-5" /> Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-2 animate-fade-up [animation-delay:480ms]">
          <span className="text-sm text-navy-foreground/70">Popular:</span>
          {["Naftalan Therapy", "Joints", "Rehabilitation", "Mud Therapy"].map((p) => (
            <a key={p} href={`${SITE}/treatments`} className="glass rounded-full px-3 py-1 text-sm text-navy-foreground transition-colors hover:bg-card/30">{p}</a>
          ))}
        </div>

        <div className="mt-14 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {[[62, "Health resorts", ""], [7, "Countries", ""], [16, "Treatment profiles", ""], [98, "Satisfaction", "%"]].map(([n, l, s], i) => (
            <div key={l as string} className="glass animate-float rounded-2xl p-4 text-navy-foreground" style={{ animationDelay: `${i * 0.6}s` }}>
              <div className="text-3xl font-extrabold"><Counter to={n as number} suffix={s as string} /></div>
              <div className="text-sm text-navy-foreground/75">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-card py-6">
      <div className="flex w-max animate-marquee gap-14">
        {[...partners, ...partners].map((p, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Award className="h-5 w-5 text-primary" /> {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, center }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`reveal mb-12 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
      <h2 className="mt-3 font-display text-4xl font-semibold text-foreground md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Treatments() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHead eyebrow="Treatment profiles" title="Find care for your condition" sub="Resorts specialised in 16 therapeutic areas, verified by our medical coordinators." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {treatments.map((t, i) => (
          <a key={t.name} href={`${SITE}/treatments`} className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-primary opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary transition-all duration-500 group-hover:bg-gradient-primary group-hover:text-primary-foreground group-hover:rotate-6">
              <t.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-bold text-foreground">{t.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">{t.count} resorts <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></p>
          </a>
        ))}
      </div>
    </section>
  );
}

function Resorts() {
  return (
    <section className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Premium resorts" title="Top-rated 5-star health resorts" sub="Hand-picked for medical quality, comfort and patient reviews." />
          <a href={`${SITE}/sanatoriums`} className="reveal mb-12 inline-flex items-center gap-2 font-semibold text-primary">View all 62 resorts <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resorts.map((r, i) => (
            <a key={r.name} href={SITE + r.href} className="reveal group overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="relative h-56 overflow-hidden">
                <img src={SITE + r.img} alt={r.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-foreground">★ Top choice</span>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs font-bold text-foreground backdrop-blur"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> {r.rating}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground">{r.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {r.loc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">{t}</span>)}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="text-muted-foreground">Free quote</span>
                  <span className="flex items-center gap-1 font-semibold text-primary">Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHead eyebrow="Destinations" title="Where would you like to heal?" sub="Seven countries with centuries-old traditions of therapeutic resorts." center />
      <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
        {countries.map((c, i) => (
          <a key={c.slug} href={`${SITE}/destinations/${c.slug}`} className={`reveal group relative overflow-hidden rounded-3xl ${i === 0 ? "col-span-2 row-span-2" : ""}`} style={{ transitionDelay: `${i * 60}ms` }}>
            <img src={`${SITE}/countries/${c.slug}.jpg`} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-navy-foreground">
              <div>
                <div className={`${i === 0 ? "text-3xl" : "text-xl"} font-bold`}>{c.flag} {c.name}</div>
                <div className="text-sm text-navy-foreground/80">{c.n} resorts</div>
              </div>
              <span className="glass grid h-10 w-10 place-items-center rounded-full transition-all group-hover:bg-primary"><ArrowRight className="h-4 w-4" /></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-navy-foreground">
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary opacity-30 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent opacity-20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="reveal mx-auto mb-16 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">How it works</span>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">From first question to full recovery</h2>
        </div>
        <div className="relative grid gap-8 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary-glow to-transparent md:block" />
          {steps.map((s, i) => (
            <div key={s.t} className="reveal relative text-center" style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary shadow-elegant animate-pulse-ring">
                <s.icon className="h-7 w-7" />
              </span>
              <div className="mt-2 text-xs font-bold text-accent">STEP 0{i + 1}</div>
              <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-navy-foreground/70">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: ShieldCheck, t: "Verified resorts only", d: "Every partner is licensed and medically reviewed." },
    { icon: Headphones, t: "Personal coordinator", d: "One person guides you, in your language, 24/7." },
    { icon: BadgeCheck, t: "Transparent pricing", d: "Direct resort prices with no hidden fees." },
    { icon: Plane, t: "Travel handled", d: "Invitations, transfers and scheduling arranged." },
  ];
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2">
      <div className="reveal relative">
        <img src={`${SITE}/img/32334284.jpg`} alt="Premier Aqua spa" loading="lazy" className="h-[520px] w-full rounded-3xl object-cover shadow-elegant" />
        <div className="absolute -bottom-6 -right-4 animate-float rounded-2xl bg-card p-5 shadow-elegant md:-right-8">
          <div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-gold text-gold" />)}</div>
          <div className="mt-1 text-2xl font-extrabold text-foreground">4.9 / 5</div>
          <div className="text-sm text-muted-foreground">from 1,200+ patient reviews</div>
        </div>
        <div className="absolute -left-4 top-8 animate-float rounded-2xl bg-card p-4 shadow-elegant [animation-delay:1.5s]">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-primary-foreground"><HeartPulse className="h-5 w-5" /></span>
            <div><div className="font-bold text-foreground">Free</div><div className="text-xs text-muted-foreground">Medical consultation</div></div>
          </div>
        </div>
      </div>
      <div>
        <SectionHead eyebrow="Why HealthVoyage" title="Your health journey, in safe hands" sub="We combine medical expertise with hospitality so you can focus on recovery." />
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((it, i) => (
            <div key={it.t} className="reveal flex gap-4" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><it.icon className="h-6 w-6" /></span>
              <div><h3 className="font-bold text-foreground">{it.t}</h3><p className="mt-1 text-sm text-muted-foreground">{it.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Patient stories" title="Real people, real recoveries" center />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure key={r.n} className="reveal relative rounded-3xl bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant" style={{ transitionDelay: `${i * 100}ms` }}>
              <Quote className="h-10 w-10 text-primary/20" />
              <div className="mt-2 flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-gold text-gold" />)}</div>
              <blockquote className="mt-4 text-foreground/90">"{r.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">{r.n[0]}</span>
                <div><div className="font-bold text-foreground">{r.n}</div><div className="text-xs text-muted-foreground">{r.c} · {r.t}</div></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Consult() {
  const [sent, setSent] = useState(false);
  return (
    <section id="consult" className="mx-auto max-w-7xl px-5 py-24">
      <div className="reveal relative grid overflow-hidden rounded-[2rem] bg-gradient-primary p-8 text-primary-foreground shadow-elegant md:p-14 lg:grid-cols-2 lg:gap-12">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent opacity-30 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Get a free personal treatment plan</h2>
          <p className="mt-4 text-primary-foreground/85">Tell us about your condition. A coordinator will reply within 24 hours with suitable resorts and prices.</p>
          <ul className="mt-8 space-y-3">
            {["No obligation, 100% free", "Reply within 24 hours", "Your data stays confidential"].map((x) => (
              <li key={x} className="flex items-center gap-3"><BadgeCheck className="h-5 w-5 text-accent" /> {x}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="relative mt-10 space-y-3 rounded-2xl bg-card p-6 text-foreground lg:mt-0">
          {sent ? (
            <div className="py-16 text-center"><BadgeCheck className="mx-auto h-14 w-14 text-primary" /><h3 className="mt-4 text-xl font-bold">Thank you!</h3><p className="text-muted-foreground">We'll be in touch shortly.</p></div>
          ) : (
            <>
              <input required placeholder="Full name" className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input required type="email" placeholder="Email" className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
                <input placeholder="Phone / WhatsApp" className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
              </div>
              <select className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary">
                <option>Treatment of interest</option>
                {treatments.map((t) => <option key={t.name}>{t.name}</option>)}
              </select>
              <textarea rows={3} placeholder="Describe your condition (optional)" className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-4 font-semibold text-primary-foreground transition-all hover:brightness-110">Request free plan <ArrowRight className="h-4 w-4" /></button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-24">
      <SectionHead eyebrow="FAQ" title="Questions, answered" center />
      <Accordion type="single" collapsible className="reveal space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`} className="rounded-2xl border border-border bg-card px-6">
            <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy pt-16 text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-4">
        <div>
          <div className="text-xl font-extrabold">Health<span className="text-primary-glow">Voyage</span></div>
          <p className="mt-3 text-sm text-navy-foreground/70">Connecting international patients with trusted health resorts since day one.</p>
        </div>
        {[["Explore", ["Sanatoriums", "Destinations", "Treatments"]], ["Company", ["About", "Contact"]]].map(([h, ls]) => (
          <div key={h as string}>
            <h4 className="font-bold">{h}</h4>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
              {(ls as string[]).map((l) => <li key={l}><a href={`${SITE}/${l.toLowerCase()}`} className="hover:text-primary-glow">{l}</a></li>)}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="font-bold">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@healthvoyage.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 24/7 patient support</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-navy-foreground/10 py-6 text-center text-sm text-navy-foreground/60">© {new Date().getFullYear()} HealthVoyage. All rights reserved.</div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main className="bg-background">
      <Nav />
      <Hero />
      <Marquee />
      <Treatments />
      <Resorts />
      <HowItWorks />
      <Destinations />
      <WhyUs />
      <Reviews />
      <Consult />
      <Faq />
      <Footer />
      <a href="#consult" aria-label="Chat with us" className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant animate-pulse-ring">
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
