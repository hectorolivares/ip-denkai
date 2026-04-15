import { useState } from "react";
import type { IpInfo } from "../types";

interface IpMainProps {
  ipData: IpInfo;
  isp: string;
  fetchIpData: () => void;
}

export function IpMain({ ipData, isp, fetchIpData }: IpMainProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyIp = () => {
    if (ipData?.ip) {
      navigator.clipboard.writeText(ipData.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 pt-8 pb-4">
      <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--accent)] font-mono text-[14px] shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]"></span>
        TU IP PÚBLICA
      </div>

      <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 text-[var(--text-h)] drop-shadow-sm select-all font-mono">
        {ipData.ip}
      </h1>

      {ipData.ipv6 && ipData.ipv6 !== ipData.ip && (
        <div className="mb-6 flex flex-col items-center">
          <span className="text-[11px] font-bold uppercase tracking-widest opacity-40 mb-1 font-mono">IPv6 Detectada</span>
          <span className="text-[16px] md:text-[18px] font-mono text-[var(--accent)] bg-[var(--accent-bg)] px-4 py-1 rounded-full border border-[var(--accent-border)] select-all shadow-sm">
            {ipData.ipv6}
          </span>
        </div>
      )}

      <p className="text-[14px] opacity-80 max-w-2xl text-center mb-10 leading-relaxed">
        Conectado desde{" "}
        <strong className="text-[var(--text-h)] font-semibold">
          {ipData.city}, {ipData.country}
        </strong>{" "}
        a través de la red de{" "}
        <strong className="text-[var(--text-h)] font-semibold">{isp}</strong>.
      </p>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <button
          className="counter flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all text-[14px] shadow-sm"
          onClick={handleCopyIp}
        >
          {copied ? (
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
              className="text-green-500"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
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
              className="opacity-80"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          {copied ? "¡Copiado!" : "Copiar IP"}
        </button>

        <button
          className="counter flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all text-[14px] shadow-sm group"
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
          Actualizar Info
        </button>
      </div>
    </div>
  );
}
