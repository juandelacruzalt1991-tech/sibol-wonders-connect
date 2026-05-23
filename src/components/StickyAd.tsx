import React from "react";

export function StickyAd() {
  return (
    <aside
      id="sticky-ad-box"
      className="fixed left-0 top-32 w-20 h-96 z-40 hidden lg:flex flex-col bg-white border-2 border-primary rounded-r-2xl shadow-soft"
      aria-label="Advertisement"
    >
      {/* Ad label at top */}
      <div className="pt-3 pb-2 text-center border-b border-border/40 w-full">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-secondary/80 px-2 py-0.5 rounded-full select-none">
          Ad
        </span>
      </div>

      {/* Placeholder space for ad content */}
      <div className="flex-1 p-2 flex flex-col items-center justify-center">
        <div className="w-full h-full rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 flex flex-col items-center justify-center text-center p-1 transition-all duration-300 hover:bg-muted/30 hover:border-muted-foreground/50">
          <span className="text-[10px] font-semibold text-muted-foreground/50 leading-tight tracking-wide select-none">
            Your
            <br />
            Ad
            <br />
            Here
          </span>
        </div>
      </div>
    </aside>
  );
}
