/**
 * core/index.ts — porta única da biblioteca central de motion (M1+)
 *
 * Toda composition NOVA importa daqui: import { ci, MOVES, CURVES, ... } from "../../core";
 * As compositions antigas migram por demanda (ver estratégia de migração no plano).
 */

export * from "./tokens";
export * from "./springs";
export * from "./rand";
export * from "./curves";
export * from "./primitives";
export * from "./moves";
export * from "./layout";
export * from "./scales";
export * from "./LucideGlyph";
export * from "./gestoDoIcone";
export * from "./AnelFoco";
export * from "./AcentoDePassagem";
export * from "./OpticalBox";
export * from "./sfx";
export * from "./choreo";
export * from "./choreo-runtime";

/**
 * MANUAL DE MOTION v3.0 (08/09/2026) — exportado como NAMESPACE, nao com
 * `export *`, de proposito: o vocabulario v3 repete nomes que ja existem
 * aqui (enter, exit, draw, counter, tween, STEP, INTENSITY, SPRING) com
 * outro significado. Peca nova escreve `motionV3.tween(...)`,
 * `motionV3.cueFrom(tonic)`, `motionV3.validateScene(...)`, e fica claro
 * na leitura de qual sistema aquele movimento veio.
 */
export * as motionV3 from "./motion-spec";

/**
 * Estados de palco da direcao dinamica (formato vertical-mao, 08/09/2026).
 * Puro, sem remotion: o choreo-lint e os scripts calculam geometria e
 * alternancia sem montar o bundle. Regra em
 * squads/motion-apple/design-system/DIRECAO-DINAMICA.md.
 */
export * from "./palco";
