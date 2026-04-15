import type { IpInfo } from "../types";

interface IpDetailsProps {
  ipData: IpInfo;
  asn: string;
  isp: string;
  flagUrl: string;
}

export function IpDetails({ ipData, asn, isp, flagUrl }: IpDetailsProps) {
  const getOS = () => {
    const ua = window.navigator.userAgent;
    if (ua.indexOf("Win") !== -1) return "Windows";
    if (ua.indexOf("Mac") !== -1) return "macOS";
    if (ua.indexOf("Linux") !== -1) return "Linux";
    if (ua.indexOf("Android") !== -1) return "Android";
    if (ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) return "iOS";
    return "Desconocido";
  };

  const os = getOS();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border-y border-[var(--border)] shadow-sm">
      <div className="bg-[var(--bg)] p-8 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
        <div className="size-12 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="size-6 text-[var(--accent)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">
          Ubicación
        </h2>
        <p className="text-base font-semibold text-white leading-tight">
          {ipData.city}
        </p>
        <p className="opacity-70 text-sm mt-1">{ipData.region}</p>
        {flagUrl && (
          <img
            src={flagUrl}
            alt={ipData.country}
            className="h-6 w-auto object-cover mt-4 rounded shadow-[0_1px_3px_rgba(0,0,0,0.1)] ring-1 ring-[var(--border)]"
          />
        )}
      </div>

      <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
        <div className="size-12 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="size-6 text-[var(--accent)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
          Proveedor (ISP)
        </h2>
        <p className="text-xl font-semibold text-[var(--text-h)] leading-tight font-mono">
          {isp}
        </p>
        {asn && (
          <p className="opacity-70 text-sm mt-2 font-mono bg-[var(--code-bg)] px-2 py-0.5 rounded">
            ASN: {asn}
          </p>
        )}
      </div>

      <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
        <div className="size-12 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="size-6 text-[var(--accent)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="12" y1="16" x2="12" y2="16" />
            <line x1="16" y1="16" x2="16" y2="16" />
          </svg>
        </div>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
          Name Address
        </h2>
        <p className="text-lg font-semibold text-[var(--text-h)] leading-tight font-mono break-all px-4">
          {ipData.hostname || "N/A"}
        </p>
        <div className="mt-4 px-3 py-1 bg-[var(--code-bg)] rounded-full text-xs font-medium border border-[var(--border)] opacity-60">
          REVERSE DNS
        </div>
      </div>

      <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
        <div className="size-12 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="size-6 text-[var(--accent)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
          Sistema Operativo
        </h2>
        <p className="text-2xl font-bold text-[var(--text-h)] leading-tight font-mono">
          {os}
        </p>
        <div className="mt-4 px-3 py-1 bg-[var(--code-bg)] rounded-full text-xs font-medium border border-[var(--border)] uppercase opacity-80">
          Browser Platform
        </div>
      </div>
    </div>
  );
}
