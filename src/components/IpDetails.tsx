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

  const getBrowserData = () => {
    const ua = window.navigator.userAgent;
    let name = "N/A";
    let version = "";

    if (ua.indexOf("Edg") !== -1) {
      name = "Edge";
      version = ua.match(/Edg\/(\d+)/)?.[1] || "";
    } else if (ua.indexOf("Chrome") !== -1) {
      name = "Chrome";
      version = ua.match(/Chrome\/(\d+)/)?.[1] || "";
    } else if (ua.indexOf("Firefox") !== -1) {
      name = "Firefox";
      version = ua.match(/Firefox\/(\d+)/)?.[1] || "";
    } else if (ua.indexOf("Safari") !== -1) {
      name = "Safari";
      version = ua.match(/Version\/(\d+)/)?.[1] || "";
    }
    
    return { name, version };
  };

  const getHardwareInfo = () => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        (canvas.getContext("webgl") as any) ||
        (canvas.getContext("experimental-webgl") as any);
      if (!gl) return "X64 GENERIC";

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (!debugInfo) return "X64 GENERIC";

      const renderer = gl
        .getParameter(debugInfo.UNMASKED_RENDERER_ID)
        .toUpperCase();

      if (renderer.includes("APPLE")) return "ARM64 APPLE";
      if (renderer.includes("AMD") || renderer.includes("RYZEN"))
        return "X64 AMD";
      if (renderer.includes("INTEL")) return "X64 INTEL";
      if (renderer.includes("NVIDIA")) return "X64 NVIDIA";

      return "X64 / ARM";
    } catch {
      return "PLATFORM";
    }
  };

  const os = getOS();
  const { name: browser, version: browserVersion } = getBrowserData();
  const hardware = getHardwareInfo();
  const cores = navigator.hardwareConcurrency || "N/A";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border-y border-[var(--border)] shadow-sm">
      {/* Ubicación */}
      <div className="bg-[var(--bg)] min-h-[240px] hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center justify-between text-center group">
        <div className="pt-8 flex flex-col items-center">
          <div className="size-10 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="size-5 text-[var(--accent)]"
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
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
            Ubicación
          </h2>
        </div>

        <div className="px-4">
          <p className="text-lg font-semibold text-white leading-tight">
            {ipData.city}
          </p>
          <p className="opacity-60 text-xs mt-1">{ipData.region}</p>
        </div>

        <div className="pb-8">
          {flagUrl && (
            <img
              src={flagUrl}
              alt={ipData.country}
              className="h-5 w-auto object-cover rounded shadow-sm transition-all"
            />
          )}
        </div>
      </div>

      {/* Proveedor */}
      <div className="bg-[var(--bg)] min-h-[240px] hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center justify-between text-center group">
        <div className="pt-8 flex flex-col items-center">
          <div className="size-10 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="size-5 text-[var(--accent)]"
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
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
            Proveedor (ISP)
          </h2>
        </div>

        <div className="px-4">
          <p className="text-lg font-semibold text-[var(--text-h)] leading-tight">
            {isp}
          </p>
        </div>

        <div className="pb-8">
          {asn && (
            <span className="text-[13px] font-mono bg-[var(--code-bg)] px-2 py-1 rounded border border-[var(--border)]">
              {asn}
            </span>
          )}
        </div>
      </div>

      {/* Browser Info */}
      <div className="bg-[var(--bg)] min-h-[240px] hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center justify-between text-center group">
        <div className="pt-8 flex flex-col items-center">
          <div className="size-10 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="size-5 text-[var(--accent)]"
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
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
            Browser Info
          </h2>
        </div>

        <div className="px-4">
          <p className="text-xl font-medium text-[var(--text-h)] leading-tight">
            {browser}
          </p>
        </div>

        <div className="pb-8">
          <span className="text-[13px] font-mono bg-[var(--code-bg)] px-2 py-1 rounded border border-[var(--border)] uppercase">
            {browser} {browserVersion}
          </span>
        </div>
      </div>

      {/* OS */}
      <div className="bg-[var(--bg)] min-h-[240px] hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center justify-between text-center group">
        <div className="pt-8 flex flex-col items-center">
          <div className="size-10 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="size-5 text-[var(--accent)]"
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
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
            Sistema Operativo
          </h2>
        </div>

        <div className="px-4">
          <p className="text-xl font-medium text-[var(--text-h)] leading-tight">
            {os}
          </p>
        </div>

        <div className="pb-8">
          <span className="text-[13px] font-mono bg-[var(--code-bg)] px-2 py-1 rounded border border-[var(--border)] uppercase">
            {hardware} | {cores} CORES
          </span>
        </div>
      </div>
    </div>
  );
}
