import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { ThemeProvider } from "./theme/ThemeContext";

const QuotePage = lazy(() => import("./pages/QuotePage"));

/** Scrolls to top on route change, or to the anchored section on hash change. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Wait a tick so the target section is mounted, then smooth-scroll.
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0 });
        }
      }, 80);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollManager />
        <div id="top" className="min-h-screen bg-bg text-ink">
          <Header />
          <main>
            <Suspense
              fallback={
                <div className="flex min-h-svh items-center justify-center bg-bg">
                  <p className="font-grotesk text-sm tracking-[0.3em] text-muted uppercase">
                    Loading…
                  </p>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quote" element={<QuotePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
