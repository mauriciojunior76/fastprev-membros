// GERADO AUTOMATICAMENTE por a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto). NAO EDITAR A MAO.
// Fonte: templates/design-tokens/brands/*.json (fonte unica de marca do AIOS).
// Regenerar apos qualquer mudanca de cor de marca:
//   a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto)
import { BrandConfig } from "../../../brand/types";

export const BRAND_EXEMPLO_1: BrandConfig = {
  "client": "exemplo-1",
  "style": "dark",
  "colors": {
    "primary": "#d4a08a",
    "secondary": "#b8887a",
    "accent": "#f0c8b0",
    "bg": "#0a0806",
    "text": "#f0e0d8",
    "text_secondary": "rgba(220,180,160,0.55)",
    "highlight": "#f0c8b0"
  },
  "typography": {
    "display": "'Inter', -apple-system, sans-serif",
    "body": "'DM Sans', sans-serif",
    "weight_display": 700,
    "weight_body": 400
  },
  "motion_preset": "elegant",
  "icon_style": "line",
  "design_system": true,
  "design_system_path": "templates/design-tokens/brands/exemplo-1.json"
};

export const BRAND_EXEMPLO_2: BrandConfig = {
  "client": "exemplo-2",
  "style": "dark",
  "colors": {
    "primary": "#C4785A",
    "secondary": "#7B3A28",
    "accent": "#F0C8B0",
    "bg": "#0a0806",
    "text": "#f0e0d8",
    "text_secondary": "rgba(220,180,160,0.55)",
    "highlight": "#F0C8B0"
  },
  "typography": {
    "display": "'Inter', -apple-system, sans-serif",
    "body": "'DM Sans', sans-serif",
    "weight_display": 700,
    "weight_body": 400
  },
  "motion_preset": "bold",
  "icon_style": "line",
  "design_system": true,
  "design_system_path": "templates/design-tokens/brands/exemplo-2.json"
};

export const BRAND_ZEUS: BrandConfig = {
  "client": "zeus",
  "style": "minimal",
  "colors": {
    "primary": "#ffffff",
    "secondary": "rgba(255,255,255,0.55)",
    "accent": "#ffffff",
    "bg": "#000000",
    "text": "#ffffff",
    "text_secondary": "rgba(255,255,255,0.55)",
    "highlight": "#ffffff"
  },
  "typography": {
    "display": "'Inter', -apple-system, sans-serif",
    "body": "'Inter', -apple-system, sans-serif",
    "weight_display": 700,
    "weight_body": 400
  },
  "motion_preset": "smooth",
  "icon_style": "line",
  "design_system": true,
  "design_system_path": "templates/design-tokens/brands/zeus.json"
};

// BRAND_FASTPREV adicionada à mão em 2026-09-09: a ferramenta de sincronização de
// marca não vem incluída no pacote (ver comentário no topo deste arquivo), então
// esta entrada foi transcrita manualmente de templates/design-tokens/brands/fastprev.json,
// seguindo o mesmo formato que a ferramenta geraria.
export const BRAND_FASTPREV: BrandConfig = {
  "client": "fastprev",
  "style": "dark",
  "colors": {
    "primary": "#6CB33F",
    "secondary": "#2B5C1A",
    "accent": "#A8D87A",
    "bg": "#030805",
    "text": "#E8F4EC",
    "text_secondary": "#7A9A80",
    "highlight": "#A8D87A"
  },
  "typography": {
    "display": "'Inter', system-ui, sans-serif",
    "body": "'Inter', system-ui, sans-serif",
    "weight_display": 800,
    "weight_body": 500
  },
  "motion_preset": "elegant",
  "icon_style": "line",
  "design_system": true,
  "design_system_path": "templates/design-tokens/brands/fastprev.json"
};

export const DESIGN_CORE_BRANDS: Record<string, BrandConfig> = {
  "exemplo-1": BRAND_EXEMPLO_1,
  "exemplo-2": BRAND_EXEMPLO_2,
  "zeus": BRAND_ZEUS,
  "fastprev": BRAND_FASTPREV,
};
