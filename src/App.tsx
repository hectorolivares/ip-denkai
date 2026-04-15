import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import "./App.css";
import type { IpInfo } from "./types";
import { IpMain } from "./components/IpMain";
import { IpDetails } from "./components/IpDetails";
import { Navbar } from "./components/Navbar";
import { LegalView } from "./components/LegalView";

import { LoadingStatus } from "./components/LoadingStatus";
import { ErrorStatus } from "./components/ErrorStatus";

function App() {
  const [ipData, setIpData] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIpData = () => {
    setLoading(true);
    setError("");
    fetch("https://ipinfo.io/json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al conectar con la API");
        return res.json();
      })
      .then((data: IpInfo) => {
        fetch("https://api6.ipify.org?format=json")
          .then(res => res.json())
          .then(v6Data => {
            setIpData({ ...data, ipv6: v6Data.ip });
          })
          .catch(() => {
            setIpData(data);
          });
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error al conectar con el servidor.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  const getAsnIsp = () => {
    if (!ipData?.org) return { asn: "N/A", isp: "Desconocido" };
    const spacePos = ipData.org.indexOf(" ");
    if (spacePos === -1) return { asn: "", isp: ipData.org };
    return {
      asn: ipData.org.substring(0, spacePos),
      isp: ipData.org.substring(spacePos + 1),
    };
  };

  const { asn, isp } = getAsnIsp();
  const flagUrl = ipData?.country
    ? `https://flagcdn.com/h40/${ipData.country.toLowerCase()}.png`
    : "";

  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <>
            <section id="center" className="min-h-[50svh] py-12">
              {loading ? (
                <LoadingStatus />
              ) : error ? (
                <ErrorStatus error={error} onRetry={fetchIpData} />
              ) : ipData ? (
                <IpMain ipData={ipData} isp={isp} fetchIpData={fetchIpData} />
              ) : null}
            </section>

            <div className="ticks"></div>

            <section className="w-full">
              {ipData && (
                <IpDetails
                  ipData={ipData}
                  asn={asn}
                  isp={isp}
                  flagUrl={flagUrl}
                />
              )}
            </section>

            <div className="ticks hidden lg:block"></div>
          </>
        } />
        
        <Route path="/info" element={<LegalView />} />
      </Routes>

      <footer className="w-full px-8 py-8 opacity-60 text-[10px] mt-auto font-mono uppercase">
        <div className="max-w-[1126px] mx-auto flex items-center justify-between">
          <span className="hidden sm:inline">Version 1.0.4</span>
          <span>© 2026 Built by Héctor Olivares</span>
          <Link 
            to="/info"
            className="hover:text-[var(--accent)] hover:underline cursor-pointer transition-colors"
          >
            License & Credits
          </Link>
        </div>
      </footer>
    </>
  );
}

export default App;
