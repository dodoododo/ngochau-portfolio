// Ordered list of countries in the Personal / travel-list section.
// Each entry has an ISO A3 code (for future geo-highlight support) and a
// latitude/longitude used to pan the globe camera.
export interface CountryEntry {
  key: keyof typeof COUNTRY_META;
  iso: string;
  lat: number;
  lng: number;
}

export const COUNTRY_META = {
  Turkey: { iso: "TUR", lat: 39.0, lng: 35.0 },
  Lebanon: { iso: "LBN", lat: 33.8547, lng: 35.8623 },
  Nepal: { iso: "NPL", lat: 28.3949, lng: 84.124 },
  Spain: { iso: "ESP", lat: 40.4637, lng: -3.7492 },
  Morocco: { iso: "MAR", lat: 31.7917, lng: -7.0926 },
  China: { iso: "CHN", lat: 35.8617, lng: 104.1954 },
  Georgia: { iso: "GEO", lat: 42.3154, lng: 43.3569 },
  Greece: { iso: "GRC", lat: 39.0742, lng: 21.8243 },
  Norway: { iso: "NOR", lat: 60.472, lng: 8.4689 },
  Iran: { iso: "IRN", lat: 32.4279, lng: 53.688 },
  India: { iso: "IND", lat: 20.5937, lng: 78.9629 },
  Malaysia: { iso: "MYS", lat: 4.2105, lng: 101.9758 },
  Japan: { iso: "JPN", lat: 36.2048, lng: 138.2529 },
  Mexico: { iso: "MEX", lat: 23.6345, lng: -102.5528 },
  Colombia: { iso: "COL", lat: 4.5709, lng: -74.2973 },
  Egypt: { iso: "EGY", lat: 26.8206, lng: 30.8025 },
  Russia: { iso: "RUS", lat: 61.524, lng: 105.3188 },
  Czechia: { iso: "CZE", lat: 49.8175, lng: 15.473 },
} as const;

export const COUNTRY_ORDER: Array<keyof typeof COUNTRY_META> = [
  "Turkey",
  "Lebanon",
  "Nepal",
  "Spain",
  "Morocco",
  "China",
  "Georgia",
  "Greece",
  "Norway",
  "Iran",
  "India",
  "Malaysia",
  "Japan",
  "Mexico",
  "Colombia",
  "Egypt",
  "Russia",
  "Czechia",
];
