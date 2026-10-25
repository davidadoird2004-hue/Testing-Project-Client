/*
  SUBJECT: Landing page for Chicken Croprotine (@croprotine), Algeria's first dried-chicken-breast
  protein chips. Audience: Algerian gym-goers, students, parents, snackers (Arabic, mobile-first).
  Single job: get the visitor to build a box (size + flavors) and send the order on WhatsApp.

  WORLD / SPINE: the brand's own kraft doypack with a clear window + hang-hole, inside a kraft box.
  Photos are framed as pouch windows (rounded die-cut + hang hole). The order form IS the box:
  a top-down kraft box whose slots fill with colored pouches as you pick flavors.

  TYPE: Alexandria 800 (statement, Arabic geometric) / IBM Plex Sans Arabic (reading, UI).
  COLOR: cocoa #1C120C (night bg, from their bokeh shots) · roast #2E1D14 · kraft #C79A62 ·
         chip amber #E07A1F (lead, the dried chicken itself) · cream #F6EEE2 · ink #2A1A11.
         Each flavor owns one bold color (collectible-card logic).
  SIGNATURE: the live box builder.
  MOTION: amber chips drifting slowly like warm dust in the hero; pouches drop into slots.
*/
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Shuffle, Trash2, ChevronDown, Play, Instagram, Check, ShieldCheck, Wheat, Candy, FlaskConical } from "lucide-react";
import { FLAVORS, SIZES, BOX_COLORS, WILAYAS, REVIEWS, UNIT_PRICE, BOX_PRICES, WHATSAPP_NUMBER, INSTAGRAM, TIKTOK } from "./data";
import dip from "./assets/dip.jpg";
import bag from "./assets/bag.jpg";
import boxes from "./assets/boxes.jpg";
import boxnight from "./assets/boxnight.jpg";
import movie from "./assets/movie.jpg";
import reel1 from "./assets/reel1.jpg";
import reel2 from "./assets/reel2.jpg";
import promoPoster from "./assets/promo-poster.jpg";
import unboxPoster from "./assets/unbox-poster.jpg";
import "./styles.css";

const fmt = (n) => Number(n).toLocaleString("en-US");

function Price({ amount, className = "", numClassName = "", unitClassName = "" }) {
  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      <span dir="ltr" className={`font-[Alexandria] font-extrabold tabular-nums ${numClassName}`}>
        {fmt(amount)}
      </span>
      <span className={unitClassName || "text-sm font-bold opacity-80"}>دج</span>
    </span>
  );
}

const flavorById = Object.fromEntries(FLAVORS.map((f) => [f.id, f]));

function WhatsAppIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.950L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.42 1.3-1.95 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.59.17.29.74 1.22 1.58 1.97 1.09.97 2 1.27 2.29 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.1 1.69.8 1.98.94.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
    </svg>
  );
}

/* A dried chicken chip: irregular translucent amber shard */
function Chip({ className = "", style, variant = 0 }) {
  const paths = [
    "M8 30 C 10 14, 30 4, 52 8 C 70 11, 86 22, 82 40 C 78 58, 54 66, 34 60 C 16 55, 6 44, 8 30 Z",
    "M6 22 C 18 6, 46 2, 70 12 C 88 20, 92 40, 74 52 C 58 62, 30 64, 16 50 C 6 40, 0 32, 6 22 Z",
    "M12 40 C 6 22, 24 6, 46 6 C 64 6, 80 18, 84 34 C 88 52, 70 64, 48 62 C 28 60, 16 54, 12 40 Z",
  ];
  const id = `g${variant}`;
  return (
    <svg viewBox="0 0 92 70" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7B15A" />
          <stop offset="0.55" stopColor="#D9701C" />
          <stop offset="1" stopColor="#9C4710" />
        </linearGradient>
      </defs>
      <path d={paths[variant % 3]} fill={`url(#${id})`} opacity="0.95" />
      <path d="M20 30 C 34 24, 50 26, 70 34 M24 42 C 38 38, 52 40, 64 46" stroke="#FCD9A5" strokeOpacity="0.45" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Photo framed like the brand's kraft pouch window: die-cut corners + hang hole */
function PouchFrame({ src, alt, className = "", holeBg = "#1C120C", tilt = 0 }) {
  return (
    <div className={`pouch ${className}`} style={{ transform: `rotate(${tilt}deg)` }}>
      <span className="pouch-hole" style={{ background: holeBg }} />
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#1C120C]/85 backdrop-blur-md border-b border-[#C79A62]/15 shadow-lg shadow-black/20 py-3"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-baseline gap-2 text-[#F6EEE2]" dir="ltr">
          <span className="font-[Alexandria] text-xl font-extrabold tracking-tight">Chicken</span>
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F9CA90]">CROPROTINE</span>
        </a>
        <a href="#order" className="rounded-full bg-[#E07A1F] px-5 py-2.5 text-sm font-bold text-[#1C120C] shadow-lg shadow-black/30 transition hover:bg-[#F08A2C]">
          اطلب البوكس
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const chips = [
    { top: "12%", right: "8%", w: 64, d: 0, v: 0, dur: 9 },
    { top: "28%", right: "86%", w: 46, d: 1.5, v: 1, dur: 11 },
    { top: "68%", right: "4%", w: 54, d: 3, v: 2, dur: 10 },
    { top: "82%", right: "70%", w: 38, d: 2, v: 0, dur: 12 },
    { top: "6%", right: "52%", w: 34, d: 4, v: 1, dur: 13 },
  ];
  return (
    <section id="top" className="relative overflow-hidden bg-[#1C120C] pb-16 pt-28 text-[#F6EEE2] sm:pt-32 lg:pb-24">
      <div className="hero-glow" />
      {chips.map((c, i) => (
        <Chip key={i} variant={c.v} className="drift absolute" style={{ top: c.top, right: c.right, width: c.w, animationDelay: `${c.d}s`, animationDuration: `${c.dur}s` }} />
      ))}
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C79A62]/30 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#F9CA90]">
            <span>🇩🇿</span> أول شيبس من صدر الدجاج المجفف في الجزائر
          </p>
          <h1 className="font-[Alexandria] text-[44px] font-extrabold leading-[1.15] sm:text-6xl lg:text-7xl">
            قرمشة الشيبس.
            <br />
            <span className="text-[#E07A1F]">بروتين الدجاج.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#F6EEE2]/75">
            صدر دجاج حقيقي، مجفف ومقرمش. سناك تاكلو بلا تأنيب ضمير.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#order" className="inline-flex items-center gap-2 rounded-full bg-[#E07A1F] px-7 py-4 text-base font-bold text-[#1C120C] transition hover:bg-[#F08A2C]">
              ركّب البوكس تاعك
            </a>
            <a href="#flavors" className="inline-flex items-center gap-2 rounded-full border border-[#F6EEE2]/20 px-6 py-4 text-base font-semibold text-[#F6EEE2] transition hover:bg-white/5">
              شوف الأذواق
            </a>
          </div>
          <div className="mt-10 flex items-end gap-4">
            <div className="font-[Alexandria] text-7xl font-extrabold leading-none text-[#F6EEE2] sm:text-8xl" dir="ltr">
              80<span className="text-[#E07A1F]">+</span>
            </div>
            <div className="pb-2 text-base leading-6 text-[#F6EEE2]/70">
              غرام بروتين
              <br />
              في كل 100غ
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[420px]">
          <PouchFrame src={dip} alt="شيبس دجاج كروبروتين مع صلصة كريمية" className="aspect-[4/5] w-full shadow-2xl shadow-black/60" />
          <div className="absolute -bottom-6 -right-4 w-36 sm:-right-10 sm:w-44">
            <PouchFrame src={boxnight} alt="بوكس كروبروتين" className="aspect-[3/4] w-full border-4 border-[#1C120C] shadow-xl" tilt={-6} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Promises() {
  const items = [
    { icon: FlaskConical, t: "بلا مواد حافظة" },
    { icon: Candy, t: "بلا سكر مضاف" },
    { icon: Wheat, t: "بلا غلوتين" },
    { icon: ShieldCheck, t: "صنع يدوي" },
  ];
  return (
    <section className="bg-[#E07A1F] text-[#1C120C]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 px-5 py-6 sm:grid-cols-4">
        {items.map(({ icon: Icon, t }) => (
          <div key={t} className="flex items-center justify-center gap-2.5 text-base font-bold">
            <Icon className="h-5 w-5 shrink-0" strokeWidth={2.2} />
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatIs() {
  return (
    <section className="bg-[#F6EEE2] text-[#2A1A11]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <PouchFrame src={reel1} alt="أكياس كروبروتين في البوكس" className="aspect-[3/4] w-full" holeBg="#F6EEE2" />
            <PouchFrame src={movie} alt="سهرة فيلم مع كروبروتين" className="mt-10 aspect-[3/4] w-full" holeBg="#F6EEE2" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm font-bold tracking-wide text-[#833C00]">واش هو Chicken Croprotine؟</p>
          <h2 className="mt-3 font-[Alexandria] text-4xl font-extrabold leading-tight sm:text-5xl">
            ماشي بطاطا.
            <br />
            دجاج.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#2A1A11]/75">
            شرائح رقيقة من صدر الدجاج، متبّلة ومجففة حتى تولي مقرمشة كيما الشيبس. البروتين كامل، والقرمشة كاملة.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              ["للرياضيين", "بروتين سريع بعد الحصة، بلا شيكر."],
              ["للطلبة والخدامين", "في الكرطابة، يشبّعك حتى للغدا."],
              ["لحساسية الغلوتين", "خيار آمن للي ما يقدرش ياكل القمح."],
            ].map(([a, b]) => (
              <li key={a} className="flex gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E07A1F]" />
                <span className="text-base leading-7">
                  <b className="font-bold">{a}: </b>
                  <span className="text-[#2A1A11]/75">{b}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Flavors({ onPick }) {
  return (
    <section id="flavors" className="bg-[#2E1D14] py-20 text-[#F6EEE2] lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#F9CA90]">5 أذواق</p>
            <h2 className="mt-3 font-[Alexandria] text-4xl font-extrabold sm:text-5xl">اختار مودك.</h2>
          </div>
          <p className="max-w-xs text-base text-[#F6EEE2]/60">نقر على أي ذوق باش تزيدو للبوكس تاعك.</p>
        </div>
        <div className="snap-row mt-10 flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {FLAVORS.map((f, i) => (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => onPick(f.id)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className="flavor-card group relative flex w-[220px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[28px] p-5 text-right lg:w-auto"
              style={{ background: f.color, color: f.ink }}
            >
              <span className="pouch-hole !top-3" style={{ background: "#2E1D14" }} />
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs font-bold tracking-[0.2em] opacity-90" dir="ltr">{f.fr.toUpperCase()}</span>
                <span className="text-xs font-bold opacity-80" dir="ltr">0{i + 1}</span>
              </div>
              <div className="relative my-6 h-24">
                <Chip variant={i} className="absolute right-2 top-0 w-24 rotate-12 drop-shadow-lg transition group-hover:rotate-3" />
                <Chip variant={i + 1} className="absolute left-4 top-8 w-16 -rotate-12 drop-shadow-lg transition group-hover:-rotate-3" />
                <span className="absolute bottom-0 left-0 grid h-9 w-9 place-items-center rounded-full" style={{ background: f.dot }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: f.color }} />
                </span>
              </div>
              <div>
                <h3 className="font-[Alexandria] text-3xl font-extrabold">{f.name}</h3>
                <p className="mt-1.5 text-sm font-medium leading-6 opacity-80">{f.note}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1.5 text-sm font-bold">
                  <Plus className="h-4 w-4" /> زيد للبوكس
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Videos() {
  const vids = [
    { id: "promo", poster: promoPoster, t: "من الكيس للقرمشة", s: "ريل من إنستغرام", href: "https://www.instagram.com/croprotine/reel/DWuP1lfDB6V/" },
    { id: "unbox", poster: unboxPoster, t: "كيفاش يوصلك البوكس", s: "تغليف بعناية، من اليد لليد", href: "https://www.instagram.com/croprotine/reel/DX42ikXsnbb/" },
  ];
  return (
    <section className="bg-[#1C120C] py-20 text-[#F6EEE2] lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl font-extrabold sm:text-5xl">شوف بعينيك.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.9fr]">
          {vids.map((v) => (
            <a key={v.id} href={v.href} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-[28px] bg-[#2E1D14]">
              <img src={v.poster} alt={v.t} className="aspect-[9/16] w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-6 text-right">
                <span className="absolute left-1/2 top-[40%] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#E07A1F]/95 text-[#1C120C] shadow-xl">
                  <Play className="h-7 w-7 translate-x-[-2px]" fill="currentColor" />
                </span>
                <span className="font-display text-2xl font-extrabold">{v.t}</span>
                <span className="mt-1 text-sm text-[#F6EEE2]/80">{v.s}</span>
              </span>
            </a>
          ))}
          <div className="flex flex-col justify-between rounded-[28px] border border-[#C79A62]/25 p-7 sm:col-span-2 lg:col-span-1">
            <div>
              <Instagram className="h-8 w-8 text-[#E07A1F]" />
              <p className="mt-5 font-display text-2xl font-extrabold leading-snug"><bdi dir="ltr">+8,600</bdi> متابع يتبعوا القصة على إنستغرام</p>
              <p className="mt-3 text-base leading-7 text-[#F6EEE2]/80">ريلز، آراء الزبائن، ونقاط البيع. الفيديو الأخير فيه أجوبة على أكثر 3 أسئلة يسقسيوها الناس.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="rounded-full bg-[#F6EEE2] px-5 py-3 text-sm font-bold text-[#1C120C]">@croprotine</a>
              <a href={TIKTOK} target="_blank" rel="noreferrer" className="rounded-full border border-[#F6EEE2]/25 px-5 py-3 text-sm font-bold">TikTok</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="bg-[#F6EEE2] py-20 text-[#2A1A11] lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-[Alexandria] text-4xl font-extrabold sm:text-5xl">سناك لكل لحظة.</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <figure className="col-span-2 row-span-2 overflow-hidden rounded-[28px]">
            <img src={boxes} alt="بوكسات كروبروتين" className="h-full w-full object-cover" />
          </figure>
          <figure className="relative overflow-hidden rounded-[28px]">
            <img src={bag} alt="كيس كروبروتين" className="h-full w-full object-cover" />
            <figcaption className="cap">هدية</figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-[28px]">
            <img src={movie} alt="سهرة فيلم" className="h-full w-full object-cover" />
            <figcaption className="cap">سهرة فيلم</figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-[28px]">
            <img src={dip} alt="مع الصلصة" className="h-full w-full object-cover" />
            <figcaption className="cap">مع الصلصة</figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-[28px]">
            <img src={reel2} alt="يتحضّر بيديه" className="h-full w-full object-cover" />
            <figcaption className="cap">يتحضّر بيديه</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
/* ---------------- Signature: the box builder ---------------- */
function BoxBuilder({ slots, setSlots, size, setSize, boxColor, setBoxColor }) {
  const counts = useMemo(() => {
    const c = {};
    slots.forEach((s) => s && (c[s] = (c[s] || 0) + 1));
    return c;
  }, [slots]);
  const filled = slots.filter(Boolean).length;

  const changeSize = (n) => {
    setSize(n);
    setSlots((prev) => {
      const kept = prev.filter(Boolean).slice(0, n);
      return [...kept, ...Array(n - kept.length).fill(null)];
    });
  };
  const add = (id) => setSlots((prev) => {
    const i = prev.indexOf(null);
    if (i === -1) return prev;
    const next = [...prev]; next[i] = id; return next;
  });
  const remove = (id) => setSlots((prev) => {
    const i = prev.lastIndexOf(id);
    if (i === -1) return prev;
    const next = prev.filter((_, k) => k !== i); next.push(null); return next;
  });
  const removeAt = (idx) => setSlots((prev) => {
    const next = prev.filter((_, k) => k !== idx);
    next.push(null);
    return next;
  });
  const mix = () => setSlots(Array.from({ length: size }, (_, i) => FLAVORS[i % FLAVORS.length].id));
  const clear = () => setSlots(Array(size).fill(null));

  const kraft = boxColor === "kraft";
  const cols = 5;

  return (
    <div>
      {/* step: size */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">1. حجم البوكس</h3>
        <span className="text-sm text-[#F6EEE2]/70">
          <Price amount={UNIT_PRICE} /> للكيس
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {SIZES.map((n) => {
          const p = BOX_PRICES[n] || n * UNIT_PRICE;
          return (
            <button
              key={n}
              type="button"
              onClick={() => changeSize(n)}
              aria-pressed={size === n}
              className={`rounded-2xl border px-2 py-3 text-center transition ${
                size === n
                  ? "border-[#E07A1F] bg-[#E07A1F] text-[#1C120C]"
                  : "border-[#F6EEE2]/15 bg-white/5 hover:border-[#F6EEE2]/40"
              }`}
            >
              <span className="block font-[Alexandria] text-2xl font-extrabold leading-none" dir="ltr">
                {n}
              </span>
              <span className="mt-1 block text-xs font-semibold opacity-90">
                <Price amount={p} numClassName="font-bold" unitClassName="text-[10px]" />
              </span>
            </button>
          );
        })}
      </div>

      {/* step: box color */}
      <h3 className="mt-7 text-lg font-bold">2. لون البوكس</h3>
      <div className="mt-3 flex gap-2">
        {BOX_COLORS.map((c) => (
          <button key={c.id} type="button" onClick={() => setBoxColor(c.id)} aria-pressed={boxColor === c.id}
            className={`flex flex-1 items-center justify-center gap-2.5 rounded-2xl border px-4 py-3 text-base font-semibold transition ${boxColor === c.id ? "border-[#E07A1F] bg-white/10" : "border-[#F6EEE2]/15 bg-white/5 hover:border-[#F6EEE2]/40"}`}>
            <span className="h-5 w-5 rounded-md border border-black/20" style={{ background: c.swatch }} />
            {c.name}
            {boxColor === c.id && <Check className="h-4 w-4 text-[#E07A1F]" />}
          </button>
        ))}
      </div>

      {/* step: fill */}
      <div className="mt-7 flex items-center justify-between">
        <h3 className="text-lg font-bold">3. عمّر البوكس</h3>
        <div className="flex gap-1">
          <button type="button" onClick={mix} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-[#F9CA90] hover:bg-white/5"><Shuffle className="h-4 w-4" /> مشكّل</button>
          <button type="button" onClick={clear} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-[#F6EEE2]/60 hover:bg-white/5"><Trash2 className="h-4 w-4" /> فرّغ</button>
        </div>
      </div>

      {/* the box */}
      <div className={`mt-3 rounded-[22px] p-3 sm:p-4 ${kraft ? "box-kraft" : "box-white"}`}>
        <div className="mb-2 flex items-center justify-between px-1">
          <span className={`text-[14px] font-extrabold tracking-tight ${kraft ? "text-[#4A2E18]" : "text-[#5A4636]"}`} dir="ltr">
            Chicken <span className="text-[11px] tracking-[0.25em]">CROPROTINE</span>
          </span>
          <span dir="ltr" className={`text-sm font-bold tabular-nums ${kraft ? "text-[#4A2E18]" : "text-[#5A4636]"}`}>
            {filled} / {size}
          </span>
        </div>
        <div className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
          {slots.map((s, i) => (
            <div key={i} className="slot relative aspect-[3/4] rounded-lg">
              <AnimatePresence>
                {s && (
                  <motion.button
                    type="button"
                    key={s + i}
                    onClick={() => removeAt(i)}
                    initial={{ y: -30, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                    className="mini-pouch absolute inset-0"
                    aria-label={`نحّي ${flavorById[s].name}`}
                  >
                    <span className="mini-window" />
                    <span className="mini-label" style={{ background: flavorById[s].color, color: flavorById[s].ink }}>{flavorById[s].name}</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* flavor counters */}
      <div className="mt-4 space-y-2">
        {FLAVORS.map((f) => (
          <div key={f.id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-2.5">
            <span className="flex items-center gap-3 text-base font-semibold">
              <span className="h-4 w-4 rounded-full" style={{ background: f.color, boxShadow: `0 0 0 3px ${f.dot}55` }} />
              {f.name}
            </span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => remove(f.id)} disabled={!counts[f.id]} className="grid h-9 w-9 place-items-center rounded-full border border-[#F6EEE2]/20 transition enabled:hover:bg-white/10 disabled:opacity-30" aria-label={`نقّص ${f.name}`}><Minus className="h-4 w-4" /></button>
              <span className="w-6 text-center font-[Alexandria] text-lg font-bold tabular-nums" dir="ltr">{counts[f.id] || 0}</span>
              <button type="button" onClick={() => add(f.id)} disabled={filled >= size} className="grid h-9 w-9 place-items-center rounded-full bg-[#E07A1F] text-[#1C120C] transition enabled:hover:bg-[#F08A2C] disabled:opacity-30" aria-label={`زيد ${f.name}`}><Plus className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



function OrderSection({ slots, setSlots, size, setSize, boxColor, setBoxColor, flash }) {
  const [form, setForm] = useState({ name: "", phone: "", wilaya: "", city: "", note: "" });
  const [boxes, setBoxes] = useState(1);
  const [tried, setTried] = useState(false);
  const filled = slots.filter(Boolean).length;
  const boxUnitPrice = BOX_PRICES[size] || size * UNIT_PRICE;
  const total = boxUnitPrice * boxes;
  const phoneClean = form.phone.replace(/[\s-]/g, "");
  const phoneOk = /^0?[567]\d{8}$/.test(phoneClean);
  const errors = {
    name: !form.name.trim() && "دخّل اسمك",
    phone: !phoneOk && "رقم هاتف جزائري صحيح (مثال: 0555123456)",
    wilaya: !form.wilaya && "اختار الولاية",
    box: filled < size && `باقي ${size - filled} أكياس باش يعمر البوكس (${filled} / ${size})`,
  };
  const ok = !Object.values(errors).some(Boolean);

  const counts = {};
  slots.forEach((s) => s && (counts[s] = (counts[s] || 0) + 1));

  const send = () => {
    setTried(true);
    if (!ok) return;
    const lines = [
      "سلام عليكم 👋 حاب نطلب Chicken Croprotine",
      "",
      `📦 الطلب: ${boxes} × بوكس (${size} أكياس) - لون ${BOX_COLORS.find((b) => b.id === boxColor).name}`,
      `💰 الحساب: ${boxes} × ${fmt(boxUnitPrice)} دج = ${fmt(total)} دج`,
      "",
      "الأذواق المختارة في البوكس:",
      ...FLAVORS.filter((f) => counts[f.id]).map((f) => `• ${f.name}: ${counts[f.id]} كيس`),
      "",
      `👤 الاسم: ${form.name.trim()}`,
      `📞 الهاتف: ${phoneClean}`,
      `📍 الولاية: ${form.wilaya}${form.city.trim() ? ` – ${form.city.trim()}` : ""}`,
      form.note.trim() ? `📝 ملاحظة: ${form.note.trim()}` : null,
      "",
      `المجموع النهائي: ${fmt(total)} دج (بدون احتساب التوصيل)`,
    ].filter((l) => l !== null);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const field = "w-full rounded-2xl border bg-white/5 px-4 py-3.5 text-base text-[#F6EEE2] placeholder:text-[#F6EEE2]/35 outline-none transition focus:border-[#E07A1F] focus:bg-white/10";
  const bad = (k) => (tried && errors[k] ? "border-[#E8553E]" : "border-[#F6EEE2]/15");

  return (
    <section id="order" className="relative bg-[#1C120C] py-20 text-[#F6EEE2] lg:py-28">
      <div className="hero-glow opacity-80" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="max-w-xl">
          <p className="text-sm font-bold text-[#F9CA90]">الطلب عبر واتساب</p>
          <h2 className="mt-3 font-[Alexandria] text-4xl font-extrabold sm:text-5xl">ركّب البوكس تاعك.</h2>
          <p className="mt-4 text-lg text-[#F6EEE2]/65">اختار، عمّر، وابعث. نأكدو معاك الطلب والتوصيل في واتساب.</p>
        </div>

        <AnimatePresence>
          {flash && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full bg-[#F6EEE2] px-5 py-2.5 text-sm font-bold text-[#1C120C] shadow-xl">
              {flash}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="rounded-[32px] border border-[#F6EEE2]/10 bg-[#2E1D14]/70 p-5 sm:p-8">
            <BoxBuilder slots={slots} setSlots={setSlots} size={size} setSize={setSize} boxColor={boxColor} setBoxColor={setBoxColor} />
          </div>

          <div className="rounded-[32px] border border-[#F6EEE2]/10 bg-[#2E1D14]/70 p-5 sm:p-8 lg:sticky lg:top-24 lg:self-start">
            <h3 className="text-lg font-bold">4. معلومات التوصيل</h3>
            <div className="mt-4 space-y-3">
              <div>
                <input className={`${field} ${bad("name")}`} placeholder="الاسم واللقب" value={form.name} onChange={set("name")} autoComplete="name" />
                {tried && errors.name && <p className="err">{errors.name}</p>}
              </div>
              <div>
                <input
                  dir="ltr"
                  className={`${field} ${bad("phone")} text-right placeholder:text-right font-mono tracking-wider`}
                  placeholder="05 / 06 / 07 XX XX XX XX"
                  inputMode="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                />
                {tried && errors.phone && <p className="err">{errors.phone}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select className={`${field} ${bad("wilaya")} appearance-none pl-10 ${form.wilaya ? "" : "text-[#F6EEE2]/35"}`} value={form.wilaya} onChange={set("wilaya")} aria-label="الولاية">
                    <option value="" className="text-[#2A1A11]">الولاية</option>
                    {WILAYAS.map((w, i) => (
                      <option key={w} value={w} className="text-[#2A1A11]">{String(i + 1).padStart(2, "0")} – {w}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F6EEE2]/50" />
                  {tried && errors.wilaya && <p className="err">{errors.wilaya}</p>}
                </div>
                <input className={`${field} border-[#F6EEE2]/15`} placeholder="البلدية / العنوان" value={form.city} onChange={set("city")} />
              </div>
              <textarea className={`${field} border-[#F6EEE2]/15 min-h-[84px] resize-none`} placeholder="ملاحظة (اختياري)" value={form.note} onChange={set("note")} />
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <div className="flex flex-col">
                <span className="text-base font-semibold">عدد البوكسات</span>
                <span className="text-xs text-[#F6EEE2]/60">
                  <Price amount={boxUnitPrice} /> للبوكس ({size} أكياس)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setBoxes((b) => Math.max(1, b - 1))} className="grid h-9 w-9 place-items-center rounded-full border border-[#F6EEE2]/20 transition hover:bg-white/10" aria-label="نقّص بوكس"><Minus className="h-4 w-4" /></button>
                <span className="w-6 text-center font-[Alexandria] text-lg font-bold tabular-nums" dir="ltr">{boxes}</span>
                <button type="button" onClick={() => setBoxes((b) => Math.min(20, b + 1))} className="grid h-9 w-9 place-items-center rounded-full border border-[#F6EEE2]/20 transition hover:bg-white/10" aria-label="زيد بوكس"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-dashed border-[#F6EEE2]/15 pt-5">
              <div className="flex items-center justify-between text-sm text-[#F6EEE2]/75">
                <span>سعر البوكس ({size} أكياس)</span>
                <Price amount={boxUnitPrice} />
              </div>
              <div className="flex items-center justify-between text-sm text-[#F6EEE2]/75">
                <span>الكمية</span>
                <span dir="ltr" className="font-semibold tabular-nums font-[Alexandria]">× {boxes}</span>
              </div>
              {boxes > 1 && (
                <div className="flex items-center justify-between text-sm text-[#F6EEE2]/75">
                  <span>المجموع الفرعي ({boxes} بوكسات)</span>
                  <Price amount={total} />
                </div>
              )}
              <div className="flex items-baseline justify-between pt-2 border-t border-[#F6EEE2]/10">
                <span className="text-lg font-bold text-[#F6EEE2]">المجموع الكلي</span>
                <Price
                  amount={total}
                  numClassName="text-3xl sm:text-4xl text-[#E07A1F]"
                  unitClassName="text-lg font-extrabold text-[#E07A1F]"
                />
              </div>
              <p className="mt-1 text-xs text-[#F6EEE2]/50">الدفع عند الاستلام · سعر التوصيل يتأكد معاك هاتفياً حسب الولاية.</p>
            </div>

            {tried && errors.box && <p className="err mt-4 !text-sm">{errors.box}</p>}

            <button type="button" onClick={send} className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-lg font-bold text-[#06301A] shadow-lg shadow-black/30 transition hover:brightness-105 active:scale-[0.99]">
              <WhatsAppIcon className="h-6 w-6" />
              ابعث الطلب في واتساب
            </button>
            <p className="mt-3 text-center text-sm text-[#F6EEE2]/45">الدفع عند الاستلام · الرسالة تتكتب وتتحسب وحدها</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-[#C79A62] py-20 text-[#2A1A11] lg:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-[Alexandria] text-4xl font-extrabold sm:text-5xl">جربوه وقالو.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.who} className="flex flex-col justify-between rounded-[28px] bg-[#F6EEE2] p-7">
              <blockquote>
                <p className="font-[Alexandria] text-xl font-bold leading-9">«{r.text}»</p>
                <p className="mt-3 text-sm italic text-[#514539]" dir="ltr">{r.orig}</p>
              </blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-[#514539]" dir="ltr">@{r.who} · Instagram</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    ["شحال فيه بروتين؟", "حسب الماركة، أكثر من 80 غرام بروتين في كل 100 غرام من الشيبس. الدجاج كي يتجفف يخرج منو الماء، والبروتين يتركّز."],
    ["فيه مواد حافظة ولا سكر؟", "لا. بلا مواد حافظة، بلا سكر مضاف، وبلا غلوتين."],
    ["كيفاش نطلب؟", "ركّب البوكس فوق، عمّر معلوماتك، ونقر على زر واتساب. الرسالة تتكتب وحدها، غير ابعثها."],
    ["توصلوا لولايتي؟", "ابعث الطلب ونأكدو معاك التوصيل والسعر حسب ولايتك."],
    ["نقدر نخلط الأذواق؟", "أكيد. كل كيس تختارلو ذوقو، وتقدر تختار بوكس كرافت ولا أبيض."],
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#F6EEE2] py-20 text-[#2A1A11] lg:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-[Alexandria] text-4xl font-extrabold sm:text-5xl">أسئلة تتعاود.</h2>
        <div className="mt-10 space-y-3">
          {qs.map(([q, a], i) => (
            <div key={q} className="overflow-hidden rounded-3xl bg-white/70">
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right">
                <span className="text-lg font-bold">{q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition ${open === i ? "rotate-180 text-[#833C00]" : "text-[#2A1A11]/40"}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-base leading-8 text-[#2A1A11]/70">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1C120C] pb-28 pt-16 text-[#F6EEE2] sm:pb-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-end">
        <div>
          <div dir="ltr" className="text-right sm:text-left">
            <span className="font-[Alexandria] text-4xl font-extrabold">Chicken</span>
            <span className="mr-2 text-sm font-semibold tracking-[0.3em] text-[#F9CA90]">CROPROTINE</span>
          </div>
          <p className="mt-3 text-base text-[#F6EEE2]/80">Wherever you go, take your protein with you.</p>
        </div>
        <div className="flex gap-3">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="rounded-full border border-[#F6EEE2]/20 px-5 py-3 text-sm font-bold hover:bg-white/5">Instagram</a>
          <a href={TIKTOK} target="_blank" rel="noreferrer" className="rounded-full border border-[#F6EEE2]/20 px-5 py-3 text-sm font-bold hover:bg-white/5">TikTok</a>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA({ filled, size }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const order = document.getElementById("order");
      const r = order?.getBoundingClientRect();
      const inOrder = r && r.top < window.innerHeight * 0.6 && r.bottom > 120;
      setShow(window.scrollY > 500 && !inOrder);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a href="#order" initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-full bg-[#E07A1F] py-3 pl-3 pr-6 text-[#1C120C] shadow-2xl shadow-black/50 sm:hidden">
          <span className="text-base font-bold">ركّب البوكس تاعك</span>
          <span className="rounded-full bg-[#1C120C] px-4 py-2 text-sm font-bold text-[#F6EEE2] flex items-center gap-1.5">
            {filled > 0 ? (
              <span dir="ltr" className="tabular-nums font-bold">
                {filled} / {size}
              </span>
            ) : (
              <>
                <span>من</span>
                <Price amount={BOX_PRICES[5] || 5 * UNIT_PRICE} numClassName="text-sm font-bold" unitClassName="text-xs" />
              </>
            )}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [size, setSize] = useState(5);
  const [slots, setSlots] = useState(Array(5).fill(null));
  const [boxColor, setBoxColor] = useState("kraft");
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(""), 1600);
    return () => clearTimeout(t);
  }, [flash]);

  const pickFromCard = (id) => {
    const i = slots.indexOf(null);
    if (i === -1) {
      setFlash("البوكس عامر، كبّر الحجم ولا نحّي كيس");
    } else {
      const next = [...slots]; next[i] = id; setSlots(next);
      setFlash(`+1 ${flavorById[id].name} في البوكس`);
    }
  };

  return (
    <div dir="rtl" lang="ar" className="font-body antialiased bg-[#1C120C] text-[#F6EEE2] min-h-screen selection:bg-[#E07A1F] selection:text-[#1C120C]">
      <Nav />
      <main>
        <Hero />
        <Promises />
        <WhatIs />
        <Flavors onPick={pickFromCard} />
        <Videos />
        <Gallery />
        <OrderSection
          slots={slots}
          setSlots={setSlots}
          size={size}
          setSize={setSize}
          boxColor={boxColor}
          setBoxColor={setBoxColor}
          flash={flash}
        />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA filled={slots.filter(Boolean).length} size={size} />
    </div>
  );
}