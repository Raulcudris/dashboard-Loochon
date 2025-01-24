import { NewCoordenate } from "@/interface/coordenatesInterface";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
// **Interfaz para una coordenada** (estructura esperada de la API)

export const defaultNewCoordenate: NewCoordenate = {
  sisCodproSipr: "", // Código de la provincia
  sisCodmunSimu: "", // Código del municipio
  sisIdedptSidp: "", // ID del departamento
  sisCodpaiSipa: "", // Código del país
  sisNombreSipr: "", // Nombre de la provincia
  sisCodposSipr: "", // Código postal
  sisCapitaSipr: "", // Indicador de capital
  sisProclaSipr: "", // Clase de la provincia
  sisGeolatSipr: "", // Latitud geográfica
  sisGeolonSipr: "", // Longitud geográfica
  sisCountaRkey: "", // Contador A
  sisEstregSipr: "", // Estado de registro

  // Información del estado (departamento)
  state: "", // Estado asociado a la coordenada

  // Información de la ciudad (municipio)
  city: "" // Ciudad asociada a la coordenada
};
