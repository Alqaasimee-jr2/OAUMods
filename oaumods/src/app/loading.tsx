
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="flex flex-col items-center animate-pulse">
        <div className="w-16 h-16 border border-slate-200 bg-white p-2 mb-4 shadow-sm">
          <Image
            src="/oau-logo.png"
            alt="Loading..."
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="h-1.5 w-32 bg-slate-100 overflow-hidden">
          <div className="h-full bg-oau-navy animate-[progress_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
      <style>{`
        @keyframes progress {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
