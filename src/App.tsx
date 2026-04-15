import { useState, useEffect } from 'react'
import './App.css'

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

function App() {
  const [ipData, setIpData] = useState<IpInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchIpData = () => {
    setLoading(true)
    setError('')
    // Utilizamos ipinfo.io que es super amigable con CORS y peticiones directas desde el frontend
    fetch('https://ipinfo.io/json')
      .then(res => {
        if (!res.ok) throw new Error('Error al conectar con la API')
        return res.json()
      })
      .then((data: IpInfo) => {
        setIpData(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Ocurrió un error al conectar con el servidor.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchIpData();
  }, [])

  // Helpers para extraer información limpia de la data
  const getLatLong = () => {
    if (!ipData?.loc) return { lat: 'N/A', lng: 'N/A' };
    const [lat, lng] = ipData.loc.split(',');
    return { lat, lng };
  }

  const getAsnIsp = () => {
    if (!ipData?.org) return { asn: 'N/A', isp: 'Desconocido' };
    const spacePos = ipData.org.indexOf(' ');
    if (spacePos === -1) return { asn: '', isp: ipData.org };
    return {
      asn: ipData.org.substring(0, spacePos),
      isp: ipData.org.substring(spacePos + 1)
    };
  }

  const { lat, lng } = getLatLong();
  const { asn, isp } = getAsnIsp();
  const flagUrl = ipData?.country ? `https://flagcdn.com/h40/${ipData.country.toLowerCase()}.png` : '';

  return (
    <>
      <section id="center" className="min-h-[50svh] py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-6 flex-grow min-h-[300px]">
             <div className="w-14 h-14 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
            <h2 className="animate-pulse opacity-80 text-xl">Rastreando dirección IP...</h2>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center space-y-4 flex-grow min-h-[300px]">
             <div className="text-red-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
             </div>
            <h1 className="text-4xl text-red-500 font-bold tracking-tight">Error de Conexión</h1>
            <p className="opacity-80 text-lg">{error}</p>
            <button className="counter mt-6 !text-lg !px-6 !py-3" onClick={fetchIpData}>Reintentar</button>
          </div>
        ) : ipData ? (
          <div className="flex flex-col items-center w-full px-4 pt-8 pb-4">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--accent)] font-mono text-sm shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]"></span>
              TU IP PÚBLICA
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-[var(--text-h)] drop-shadow-sm select-all">
              {ipData.ip}
            </h1>
            
            <p className="text-lg md:text-xl opacity-80 max-w-2xl text-center mb-10 leading-relaxed">
              Conectado desde <strong className="text-[var(--text-h)] font-semibold">{ipData.city}, {ipData.country}</strong> a través de la red de <strong className="text-[var(--text-h)] font-semibold">{isp}</strong>.
            </p>
            
            <button
              className="counter flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all text-base shadow-sm"
              onClick={fetchIpData}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:rotate-180 transition-transform duration-500"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Actualizar Info
            </button>
          </div>
        ) : null}
      </section>

      <div className="ticks"></div>

      <section className="w-full">
        {ipData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border-y border-[var(--border)] shadow-sm">
            
            <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-[var(--accent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-3">Ubicación</h2>
              <p className="text-xl font-semibold text-[var(--text-h)] leading-tight">{ipData.city}</p>
              <p className="opacity-70 text-sm mt-1">{ipData.region}</p>
              {flagUrl && (
                <img src={flagUrl} alt={ipData.country} className="h-6 w-auto object-cover mt-4 rounded shadow-[0_1px_3px_rgba(0,0,0,0.1)] ring-1 ring-[var(--border)]" />
              )}
            </div>

            <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-[var(--accent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-3">Proveedor (ISP)</h2>
              <p className="text-xl font-semibold text-[var(--text-h)] leading-tight">{isp}</p>
              {asn && <p className="opacity-70 text-sm mt-2 font-mono bg-[var(--code-bg)] px-2 py-0.5 rounded">ASN: {asn}</p>}
            </div>

            <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-[var(--accent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-3">Coordenadas</h2>
              <div className="font-mono text-[var(--text-h)] bg-[var(--code-bg)] px-3 py-1.5 rounded-md mb-4 text-center border border-[var(--border)]">
                <div className="text-sm border-b border-[var(--border)] pb-1 mb-1">LAT: {lat}</div>
                <div className="text-sm">LNG: {lng}</div>
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} 
                target="_blank" 
                rel="noreferrer"
                className="mt-auto text-sm text-[var(--accent)] hover:underline inline-flex items-center gap-1.5 font-medium"
              >
                Abrir en Maps
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>

            <div className="bg-[var(--bg)] p-8 md:p-10 hover:bg-[var(--code-bg)] transition-colors duration-300 flex flex-col items-center text-center group">
               <div className="w-16 h-16 rounded-full bg-[var(--accent-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-[var(--accent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-3">Zona Horaria</h2>
              <p className="text-lg font-semibold text-[var(--text-h)] leading-tight">{ipData.timezone}</p>
              <div className="mt-4 px-3 py-1 bg-[var(--code-bg)] rounded-full text-xs font-medium border border-[var(--border)]">
                {ipData.timezone && (
                  <>Local: {new Date().toLocaleTimeString('es-ES', { timeZone: ipData.timezone, hour: '2-digit', minute:'2-digit' })}</>
                )}
              </div>
            </div>

          </div>
        )}
      </section>

      <div className="ticks hidden lg:block"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

