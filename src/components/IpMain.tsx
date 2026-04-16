import { useState } from "react";
import type { IpInfo } from "../types";
import { CopyNotification } from "./CopyNotification";

interface IpMainProps {
  ipData: IpInfo;
  isp: string;
  fetchIpData: () => void;
}

export function IpMain({ ipData, isp, fetchIpData }: IpMainProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(null as any), 2000);
  };

  return (
    <main className="size-full">
      <div className="flex flex-col items-center justify-between w-full h-full px-4 pt-8 pb-4 relative">
        <CopyNotification show={isCopied} />
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--accent)] font-mono text-[11px] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]"></span>
          TU IP PÚBLICA
        </div>

        <div className="flex flex-col items-center gap-6">
          <h1
            className="text-5xl tracking-tighter my-8 text-[var(--text-h)] drop-shadow-sm cursor-pointer hover:scale-105 transition-transform select-none"
            onClick={() => handleCopy(ipData.ip)}
            title="Haz clic para copiar"
          >
            {ipData.ip}
          </h1>

          {ipData.ipv6 && ipData.ipv6 !== ipData.ip && (
            <div className="flex flex-col items-center">
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
          <p className="text-sm opacity-80 max-w-2xl text-center leading-relaxed">
            Conectado desde{" "}
            <strong className="text-[var(--text-h)] font-semibold">
              {ipData.city}, {ipData.country}
            </strong>{" "}
            a través de la red de{" "}
            <strong className="text-[var(--text-h)] font-semibold">
              {isp}
            </strong>
            .
          </p>
          {ipData.hostname && (
            <div className="mt-2 text-[13px] font-mono uppercase tracking-widest text-center">
              HOST: {ipData.hostname}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
