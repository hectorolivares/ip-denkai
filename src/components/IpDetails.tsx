import type { IpInfo } from "../types";

interface IpDetailsProps {
  ipData: IpInfo;
  lat: string;
  lng: string;
  asn: string;
  isp: string;
  flagUrl: string;
}

export function IpDetails({
  ipData,
  lat,
  lng,
  asn,
  isp,
  flagUrl,
}: IpDetailsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border-y border-[var(--border)] shadow-sm">
      <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-8 h-8 text-[var(--accent)]"
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
        <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
          Ubicación
        </h2>
        <p className="text-[14px] font-semibold text-[var(--text-h)] leading-tight">
          {ipData.city}
        </p>
        <p className="opacity-70 text-[14px] mt-1">{ipData.region}</p>
        {flagUrl && (
          <img
            src={flagUrl}
            alt={ipData.country}
            className="h-6 w-auto object-cover mt-4 rounded shadow-[0_1px_3px_rgba(0,0,0,0.1)] ring-1 ring-[var(--border)]"
          />
        )}
      </div>

      <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-8 h-8 text-[var(--accent)]"
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
        <h2 className="text-[16px] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
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
        <div className="w-16 h-16 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-8 h-8 text-[var(--accent)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <h2 className="text-[16px] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
          Coordenadas
        </h2>
        <div className="font-mono text-[var(--text-h)] bg-[var(--code-bg)] px-3 py-1.5 rounded-md mb-4 text-center border border-[var(--border)]">
          <div className="text-sm border-b border-[var(--border)] pb-1 mb-1">
            LAT: {lat}
          </div>
          <div className="text-sm">LNG: {lng}</div>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noreferrer"
          className="mt-auto text-[14px] text-[var(--accent)] hover:underline inline-flex items-center gap-1.5 font-medium"
        >
          Abrir en Maps
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-8 h-8 text-[var(--accent)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <h2 className="text-[16px] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
          Zona Horaria
        </h2>
        <p className="text-lg font-semibold text-[var(--text-h)] leading-tight font-mono">
          {ipData.timezone}
        </p>
        <div className="mt-4 px-3 py-1 bg-[var(--code-bg)] rounded-full text-[14px] font-medium border border-[var(--border)]">
          {ipData.timezone && (
            <>
              Local:{" "}
              {new Date().toLocaleTimeString("es-ES", {
                timeZone: ipData.timezone,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
