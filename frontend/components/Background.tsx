"use client";

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10" />

      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-gradient-to-br from-blue-400/30 to-cyan-400/20 rounded-full blur-3xl opacity-60 animate-[spin_45s_linear_infinite]" />

      <div className="absolute bottom-[-25%] right-[-15%] w-[520px] h-[520px] bg-gradient-to-tl from-fuchsia-400/25 to-purple-400/15 rounded-full blur-3xl opacity-50 animate-[spin_60s_linear_infinite_reverse]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-pink-400/10 to-transparent rounded-full blur-3xl opacity-40 animate-pulse" />
    </div>
  );
}
