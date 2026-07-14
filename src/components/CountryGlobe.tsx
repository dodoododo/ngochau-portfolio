import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/content/i18n";
import { COUNTRY_META, COUNTRY_ORDER } from "@/content/countries-order";

type Coords = { lat: number; lng: number };

export function CountryGlobe({
  selected,
  onSelect,
}: {
  selected: keyof typeof COUNTRY_META;
  onSelect: (k: keyof typeof COUNTRY_META) => void;
}) {
  const { t } = useLocale();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);
  const [GlobeComp, setGlobeComp] = useState<any>(null);
  const [size, setSize] = useState({ w: 480, h: 480 });
  
  const [highlight, setHighlight] = useState(false);
  const [countriesData, setCountriesData] = useState<any[]>([]);

  // 1. Khai báo ref để theo dõi lần render đầu tiên
  const isFirstRender = useRef(true);

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 800);
    return () => clearTimeout(timer);
  }, [selected]);

  useEffect(() => {
    let mounted = true;
    
    // Tải component react-globe.gl
    import("react-globe.gl").then((mod) => {
      if (mounted) setGlobeComp(() => mod.default);
    });

    // TẢI DỮ LIỆU TỪ LOCAL - Tránh hoàn toàn lỗi 429 Too Many Requests
    fetch("/datasets/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setCountriesData(data.features);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu bản đồ:", err));

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(320, r.width), h: Math.max(320, r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const points = useMemo(
    () =>
      COUNTRY_ORDER.map((k) => ({
        key: k,
        lat: COUNTRY_META[k].lat,
        lng: COUNTRY_META[k].lng,
        selected: k === selected,
      })),
    [selected],
  );

  // 2. Logic xử lý zoom/bay đến quốc gia
  useEffect(() => {
    const g = globeRef.current;
    // Bắt buộc phải có g (bản đồ đã render xong) thì mới chạy tiếp
    if (!g) return; 
    
    const coords: Coords = {
      lat: COUNTRY_META[selected].lat,
      lng: COUNTRY_META[selected].lng,
    };
    
    if (isFirstRender.current) {
      // Cho nó thở 50ms để WebGL kịp paint lên màn hình rồi nhảy tức thời (0ms)
      setTimeout(() => {
        if (globeRef.current) {
          globeRef.current.pointOfView({ ...coords, altitude: 0.8 }, 0);
        }
      }, 50);
      isFirstRender.current = false;
    } else {
      g.pointOfView({ ...coords, altitude: 0.8 }, 1200); 
    }
    
  }, [selected, GlobeComp, countriesData.length]);

  const isSelectedPolygon = (d: any) => {
    const iso2 = d.properties.ISO_A2;
    const iso3 = d.properties.ISO_A3;
    const name = d.properties.NAME?.toLowerCase();
    const sel = selected.toLowerCase();
    return iso2 === selected || iso3 === selected || name === sel;
  };

  return (
  <div
    ref={wrapperRef}
    className={`relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 via-sky-50 to-white transition-all duration-500 ${
      highlight
        ? "shadow-[0_0_40px_rgba(249,115,22,.18)]"
        : "shadow-xl"
    }`}
  >
    {GlobeComp && countriesData.length > 0 ? (
      <GlobeComp
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        
        // SỬ DỤNG ẢNH LOCAL - Siêu nhanh, không phụ thuộc mạng ngoài
        globeImageUrl="/textures/earth_atmos_2048.jpg"
        bumpImageUrl="/textures/earth_normal_2048.jpg"

        polygonsData={countriesData}

        polygonAltitude={(d: any) =>
          isSelectedPolygon(d) ? 0.006 : 0.0015
        }

        polygonCapColor={(d: any) =>
          isSelectedPolygon(d)
            ? "rgba(34,197,94,.80)"
            : "rgba(255,255,255,.02)"
        }

        polygonSideColor={(d: any) =>
          isSelectedPolygon(d)
            ? "#15803d"
            : "rgba(255,255,255,.03)"
        }

        polygonStrokeColor={(d: any) =>
          isSelectedPolygon(d)
            ? "#14532d"
            : "#f1f5f9"
        }

        polygonHoverColor={() => "rgba(251,191,36,.9)"}

        polygonLabel={(d: any) => `
          <div
            style="
              background:rgba(255,255,255,.96);
              padding:10px 14px;
              font-family:Inter,sans-serif;
            "
          >
            <div
              style="
                font-weight:700;
                color:#0f172a;
                font-size:14px;
              "
            >
              ${d.properties.NAME || d.properties.ADMIN || "Unknown"}
            </div>
          </div>
        `}

        atmosphereColor="#60a5fa"
        atmosphereAltitude={0.18}

        onPolygonClick={(d: any) => {
          const iso = d.properties.ISO_A2 || d.properties.ISO_A3;

          if (iso && COUNTRY_META[iso as keyof typeof COUNTRY_META]) {
            onSelect(iso as keyof typeof COUNTRY_META);
          }
        }}

        animateIn={false}
      />
    ) : (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="size-64 animate-pulse rounded-full bg-slate-200" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Loading Map...
          </span>
        </div>
      </div>
    )}

    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-slate-200/70" />

    <div className="pointer-events-none absolute left-5 top-5 rounded-xl bg-white/85 px-4 py-2 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className={`text-xl fi fi-${t.countries[selected].flag}`}></span>

        <span className="font-semibold text-slate-800">
          {t.countries[selected].name}
        </span>
      </div>
    </div>
  </div>
);
}