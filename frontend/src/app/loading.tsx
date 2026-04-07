export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#1A1A2E] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Logo text */}
        <p className="text-[14px] tracking-[0.4em] text-white/40 uppercase font-light">
          Shinsegae Law
        </p>

        {/* Gold spinner */}
        <div className="relative w-8 h-8">
          <div
            className="absolute inset-0 rounded-full border-2 border-[#C9A84C]/20"
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#C9A84C]/70 animate-spin"
          />
        </div>
      </div>
    </div>
  );
}
