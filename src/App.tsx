import { useState, useEffect } from "react";
import "./App.css";
import type { IpInfo } from "./types";
import { IpMain } from "./components/IpMain";
import { IpDetails } from "./components/IpDetails";

import { LoadingStatus } from "./components/LoadingStatus";
import { ErrorStatus } from "./components/ErrorStatus";

function App() {
  const [ipData, setIpData] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIpData = () => {
    setLoading(true);
    setError("");
    // Utilizamos ipinfo.io que es super amigable con CORS y peticiones directas desde el frontend
    fetch("https://ipinfo.io/json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al conectar con la API");
        return res.json();
      })
      .then((data: IpInfo) => {
        setIpData(data);
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

  // Helpers para extraer información limpia de la data
  const getLatLong = () => {
    if (!ipData?.loc) return { lat: "N/A", lng: "N/A" };
    const [lat, lng] = ipData.loc.split(",");
    return { lat, lng };
  };

  const getAsnIsp = () => {
    if (!ipData?.org) return { asn: "N/A", isp: "Desconocido" };
    const spacePos = ipData.org.indexOf(" ");
    if (spacePos === -1) return { asn: "", isp: ipData.org };
    return {
      asn: ipData.org.substring(0, spacePos),
      isp: ipData.org.substring(spacePos + 1),
    };
  };

  const { lat, lng } = getLatLong();
  const { asn, isp } = getAsnIsp();
  const flagUrl = ipData?.country
    ? `https://flagcdn.com/h40/${ipData.country.toLowerCase()}.png`
    : "";

  return (
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
            lat={lat}
            lng={lng}
            asn={asn}
            isp={isp}
            flagUrl={flagUrl}
          />
        )}
      </section>

      <div className="ticks hidden lg:block"></div>
      <footer className="w-full text-center py-4 opacity-60 text-[11px] mt-auto font-mono uppercase">
        Built by Héctor Olivares
      </footer>
    </>
  );
}

export default App;
