import { useState } from "react";
import type { IpInfo } from "../types";

interface IpMainProps {
  ipData: IpInfo;
  isp: string;
  fetchIpData: () => void;
}

export function IpMain({ ipData, isp, fetchIpData }: IpMainProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <main>
      <div className="flex flex-col items-center w-full px-4 pt-8 pb-4 relative">
        {/* Indicador flotante de copiado */}
        {copiedText && (
          <div className="absolute top-0 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce shadow-lg z-50">
            ¡Copiado al portapapeles!
          </div>
        )}

        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--accent)] font-mono text-[11px] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]"></span>
          TU IP PÚBLICA
        </div>

        <div className="flex flex-col items-center gap-5">
          <h1
            className="text-5xl tracking-tighter my-8 text-[var(--text-h)] drop-shadow-sm cursor-pointer hover:scale-105 transition-transform select-none"
            onClick={() => handleCopy(ipData.ip)}
            title="Haz clic para copiar"
          >
            {ipData.ip}
          </h1>

          {ipData.ipv6 && ipData.ipv6 !== ipData.ip && (
            <div className="mb-6 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1 font-mono">
                IPv6 Detectada
              </span>
              <span
                className="font-mono text-[var(--accent)] bg-[var(--accent-bg)] px-4 py-1 rounded-full border border-[var(--accent-border)] shadow-sm cursor-pointer hover:scale-105 transition-transform select-none"
                onClick={() => handleCopy(ipData.ipv6!)}
                title="Haz clic para copiar"
              >
                {ipData.ipv6}
              </span>
            </div>
          )}
        </div>

        <p className="text-sm opacity-80 max-w-2xl text-center mb-10 leading-relaxed">
          Conectado desde{" "}
          <strong className="text-[var(--text-h)] font-semibold">
            {ipData.city}, {ipData.country}
          </strong>{" "}
          a través de la red de{" "}
          <strong className="text-[var(--text-h)] font-semibold">{isp}</strong>.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            className="text-[11px] counter flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-sm group bg-[var(--code-bg)] px-4 py-2 rounded-lg border border-[var(--border)]"
            onClick={fetchIpData}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80 group-hover:rotate-180 transition-transform duration-500"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Refrescar
          </button>
        </div>
      </div>
    </main>
  );
}
