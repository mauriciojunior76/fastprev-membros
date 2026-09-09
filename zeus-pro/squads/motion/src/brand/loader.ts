import { BrandConfig } from "./types";
import { DESIGN_CORE_BRANDS } from "../core/themes/generated/design-core-brands";

// Universal Default — Apple Minimal
const UNIVERSAL_DEFAULT: BrandConfig = {
  client: "universal-default",
  style: "dark",
  colors: {
    primary: "#FFFFFF",
    secondary: "#888888",
    accent: "#FFFFFF",
    bg: "#000000",
    text: "#FFFFFF",
    text_secondary: "#888888",
    highlight: "#E5E5E5",
  },
  typography: {
    display: "Inter",
    body: "Inter",
    weight_display: 700,
    weight_body: 400,
  },
  motion_preset: "elegant",
  icon_style: "line",
  design_system: false,
};

// Registro de brands (adicionar aqui ao usar brand-intake)
// As marcas do design-core (exemplo-1, exemplo-2, zeus) entram automaticamente
// via DESIGN_CORE_BRANDS, gerado em build-time por a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto)
// a partir de templates/design-tokens/brands/*.json. Nao duplicar cor aqui: mudar
// a cor la, rodar o sync, o registry atualiza sozinho.
const BRAND_REGISTRY: Record<string, BrandConfig> = {
  "universal-default": UNIVERSAL_DEFAULT,
  ...DESIGN_CORE_BRANDS,
};

/**
 * Carrega a marca da peça. Marca desconhecida cai no neutro profissional
 * (preto e branco, Inter), NUNCA na marca de outra pessoa: identidade de um cliente
 * jamais vaza pra peça de outro.
 *
 * O fallback AVISA ALTO desde 27/08/2026 (Fase 5 da auditoria audiovisual). Antes ele
 * era silencioso, e um erro de digitação no nome da marca produzia um vídeo inteiro em
 * preto e branco sem ninguém perceber que a marca certa nunca tinha sido aplicada.
 * O aviso aparece no log do render, e `pre-render-validate.js` reprova ANTES de gastar
 * o render quando a composition referencia marca inexistente.
 */
export function loadBrand(clientId: string): BrandConfig {
  const brand = BRAND_REGISTRY[clientId];
  if (!brand) {
    console.warn(
      `[brand] AVISO: marca "${clientId}" nao existe no registry. Usando o neutro ` +
        `profissional (universal-default: preto, branco, Inter). Marcas disponiveis: ` +
        `${Object.keys(BRAND_REGISTRY).join(", ")}. Se a peca era pra ter identidade ` +
        `propria, ela vai sair SEM ela. Marca nova: criar o JSON em ` +
        `templates/design-tokens/brands/ e rodar a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto).`
    );
    return UNIVERSAL_DEFAULT;
  }
  return brand;
}

/** Nomes de marca conhecidos. Usado pelo pre-render-validate para reprovar marca inexistente. */
export function marcasDisponiveis(): string[] {
  return Object.keys(BRAND_REGISTRY);
}

export function registerBrand(config: BrandConfig): void {
  BRAND_REGISTRY[config.client] = config;
}

// ── PONTE M2 COM O DESIGN-CORE (reforma M0 21/07/2026, ponte fechada 26/08/2026) ──
// loadBrandFromDesignCore antigo lia templates/design-tokens/brands/*.json com fs/path
// em tempo de execução. Isso importava "fs"/"path" para dentro do bundle do
// browser e QUEBRAVA o bundle inteiro (falha de resolução do Webpack). Removido.
// A ponte correta é build-time: a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto) le os JSON do
// design-core e gera o snapshot estático DESIGN_CORE_BRANDS em
// src/core/themes/generated/design-core-brands.ts (zero fs no bundle), já
// mesclado ao BRAND_REGISTRY acima. Este wrapper existe só para quem ainda
// chama a função antiga: delega pro registry em vez de lançar erro.
export function loadBrandFromDesignCore(name: string): BrandConfig {
  const brand = DESIGN_CORE_BRANDS[name];
  if (!brand) {
    throw new Error(
      `loadBrandFromDesignCore("${name}"): marca não existe em DESIGN_CORE_BRANDS. ` +
        `Marcas disponíveis: ${Object.keys(DESIGN_CORE_BRANDS).join(", ")}. ` +
        `Marca nova? Criar o JSON em templates/design-tokens/brands/ e rodar a ferramenta de sincronizacao de marca (nao incluida: o arquivo ja vem pronto).`
    );
  }
  return brand;
}

export { UNIVERSAL_DEFAULT };
