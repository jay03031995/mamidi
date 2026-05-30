import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MessageCircle, X, Send } from "lucide-react";
import { WHATSAPP_NUMBER, whatsappLink } from "../constants/site";

/**
 * Knowledge base for the Madhubani bot. Each topic is matched by keyword;
 * tapping a suggestion chip sends its label. Answers are kept short and warm.
 */
const TOPICS = [
  {
    id: "what",
    label: "What is Madhubani?",
    keywords: ["what", "madhubani", "mithila", "about", "art form", "meaning"],
    answer:
      "Madhubani — also called Mithila art — is a centuries-old folk painting tradition from the Mithila region of Bihar, India. It's known for intricate line work, double-line borders, and nature-and-mythology motifs, with almost no empty space left on the surface.",
  },
  {
    id: "history",
    label: "Its history & origin",
    keywords: ["history", "origin", "old", "ancient", "started", "begin"],
    answer:
      "Traditionally painted by women on the mud walls and floors of homes for weddings, festivals and rituals. Legend traces it to King Janaka, who commissioned paintings for Sita's wedding. It moved onto paper in the 1960s — giving artists a livelihood — and now carries a GI (Geographical Indication) tag.",
  },
  {
    id: "motifs",
    label: "Motifs & their meaning",
    keywords: ["motif", "symbol", "fish", "peacock", "lotus", "meaning", "design", "pattern"],
    answer:
      "Every motif carries meaning: 🐟 fish = prosperity & fertility, 🦚 peacock = love, 🪷 lotus = purity, 🌞 sun & moon = life, and the Tree of Life = growth. Borders are doubled and the background is filled with flowers, vines and geometric patterns.",
  },
  {
    id: "colors",
    label: "Colours & materials",
    keywords: ["colour", "color", "material", "paint", "dye", "natural", "pigment"],
    answer:
      "Classic Madhubani uses natural pigments — turmeric for yellow, indigo for blue, soot/lampblack for black, rice paste for white — applied with twigs, fine brushes, nibs and even fingers. The result is bright yet earthy.",
  },
  {
    id: "products",
    label: "Mamidi products",
    keywords: ["product", "buy", "calendar", "calender", "keepsake", "envelope", "bag", "pouch", "shop", "sell"],
    answer:
      "Mamidi turns Madhubani art into everyday joy: hand-painted calendars, keepsakes, paper envelopes, jute bags and pouches — each piece painted by hand. Browse them on the Shop page!",
  },
  {
    id: "order",
    label: "How do I order?",
    keywords: ["order", "checkout", "cart", "pay", "payment", "delivery", "ship"],
    answer:
      "Add a piece to your cart, go to checkout, fill your details, and tap “Send on WhatsApp”. We confirm the order and share payment details (UPI / bank transfer / cash on delivery) — no online payment needed.",
  },
];

const GREETING =
  "Namaste! 🪷 I'm Mira, the Mamidi guide. Ask me about Madhubani (Mithila) folk art, our handmade pieces, or how to order.";

const FALLBACK =
  "I'd love to help with that! Tap a topic below, or chat with our team directly on WhatsApp.";

const findAnswer = (text) => {
  const q = text.toLowerCase();
  const hit = TOPICS.find((t) => t.keywords.some((k) => q.includes(k)));
  return hit ? hit.answer : FALLBACK;
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from: "bot", text: GREETING }]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (text) => {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: value },
      { from: "bot", text: findAnswer(value) },
    ]);
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* CHAT PANEL */}
      {open && (
        <div className="flex h-[60vh] max-h-[520px] w-[88vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-[#E2DDC9] bg-[#FDFCF6] shadow-[0_20px_60px_rgba(26,44,8,0.22)]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-[#1A2C08] px-4 py-3 text-[#FDFCF5]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8A020]/20 text-lg">
              🪷
            </span>
            <div className="flex-1">
              <p className="font-headline text-base leading-tight">Mira · Mamidi Guide</p>
              <p className="text-[11px] text-white/55">Ask about Madhubani art</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3.5 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-6 ${
                    m.from === "user"
                      ? "rounded-br-sm bg-[#1A2C08] text-[#FDFCF5]"
                      : "rounded-bl-sm bg-[#EDEAD9] text-[#2A3818]"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => send(t.label)}
                  className="rounded-full border border-[#D8DEC4] bg-white px-3 py-1.5 text-[11px] font-medium text-[#4A5E30] transition hover:border-[#C8A020] hover:text-[#A88018]"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsappLink("Hi Mamidi! I have a question about your Madhubani art.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-t border-[#E2DDC9] bg-[#25D366]/10 py-2.5 text-[12px] font-semibold text-[#1f7a45] transition hover:bg-[#25D366]/20"
          >
            <FaWhatsapp /> Chat with us on WhatsApp
          </a>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#E2DDC9] p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Madhubani…"
              className="flex-1 rounded-full border border-[#D8DEC4] bg-white px-4 py-2 text-[13px] outline-none transition focus:border-[#C8A020]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1A2C08] text-[#FDFCF5] transition hover:bg-[#2e4a10]"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING BUTTONS */}
      <a
        href={whatsappLink("Hi Mamidi! 🪷")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition hover:scale-105"
      >
        <FaWhatsapp className="text-[28px]" />
      </a>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Madhubani guide" : "Open Madhubani guide"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A2C08] text-[#C8A020] shadow-[0_8px_24px_rgba(26,44,8,0.35)] transition hover:scale-105"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
