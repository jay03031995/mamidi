import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Manages scroll position on navigation.
// - With a #hash (e.g. /#products), scrolls to that section so in-page anchor
//   links land on the right block.
// - Without a hash, resets to the top whenever the route changes. Without this,
//   react-router keeps the previous page's scroll offset, so on mobile a tap on
//   "Proceed to Checkout" leaves the user mid-page instead of at the shipping form.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // The target section may mount a tick after the route renders, so retry
      // on the next frame if it isn't in the DOM yet.
      const scrollToHash = () => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      if (!scrollToHash()) {
        const raf = requestAnimationFrame(scrollToHash);
        return () => cancelAnimationFrame(raf);
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
