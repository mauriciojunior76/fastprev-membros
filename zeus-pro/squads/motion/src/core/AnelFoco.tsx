/**
 * AnelFoco — UM anel de espectro que MIGRA entre alvos.
 *
 * POR QUE EXISTE (05/09/2026, bronca do Allysson: "os traçados coloridos
 * tu inventou, não respeitou o padrão visual do design system"): o
 * Design System v2.1 é explícito sobre o anel, e eu tinha quebrado as
 * três regras de uma vez em `PropositosLista` e `InstagramGrid`:
 *
 *   1. "Anel · atenção · o assunto está aqui: UM ÚNICO indicador
 *      transferido entre alvos; segue bounds. EVITAR: anéis
 *      independentes." (painel do sistema, seção de gramática de motion)
 *      Eu tinha feito um anel por item, cada um acendendo e apagando.
 *   2. O espectro é `conic-gradient` (token `--z-spectrum`), nunca
 *      `linear-gradient` — o linear (`--z-spectrum-line`) é do TRAÇO
 *      sublinhado, outra peça. Eu tinha usado linear no anel.
 *   3. `--z-spectrum-opacity: .7`. Eu tinha usado opacidade cheia, que é
 *      o que fazia o anel parecer borda neon em vez de anel do sistema.
 *
 * Espessura pela tabela do §1: 3 até 48px, 4 de 49 a 100, 6 acima de 100
 * (medida do MAIOR lado do alvo). `espessuraDoAlvo` faz essa conta.
 *
 * Troca de foco: 24q `smoothInOut`, com x, y, largura, altura e raio
 * interpolando juntos — o anel desliza, não pisca.
 *
 * Como usar: montar a lista de alvos (um por item que pode receber foco,
 * com o quadro em que a fala o nomeia) e deixar o componente escolher o
 * alvo do frame. Alvo com `entra` no futuro = anel ainda não nasceu.
 */
import React from "react";
import { useCurrentFrame } from "remotion";
import { interpolate } from "remotion";
import { CURVES } from "./curves";

export type AlvoFoco = {
  /** quadro LOCAL em que a fala nomeia este alvo (o anel chega nele) */
  entra: number;
  x: number;
  y: number;
  largura: number;
  altura: number;
  /** raio do contêiner que ele contorna (círculo = metade do lado) */
  raio: number;
};

/** Tabela de espessura do §1, pelo maior lado do alvo. */
export const espessuraDoAlvo = (alvo: AlvoFoco): number => {
  const maior = Math.max(alvo.largura, alvo.altura);
  if (maior <= 48) return 3;
  if (maior <= 100) return 4;
  return 6;
};

/** Opacidade do token `--z-spectrum-opacity`. */
export const SPECTRUM_OPACITY = 0.7;

/** Duração da troca de foco (§2 do guia). */
const TROCA = 24;

type Props = {
  alvos: AlvoFoco[];
  /** paradas do espectro da marca, no formato "cor pos%" */
  paradas: readonly string[];
  /** quadro em que o anel sai de cena (opcional; sem isso ele fica) */
  saiEm?: number;
};

export const AnelFoco: React.FC<Props> = ({ alvos, paradas, saiEm }) => {
  const frame = useCurrentFrame();
  if (alvos.length === 0) return null;

  const ordenados = [...alvos].sort((a, b) => a.entra - b.entra);
  const primeiro = ordenados[0];

  // Antes do primeiro alvo ser nomeado, o anel ainda não existe.
  if (frame < primeiro.entra - TROCA) return null;

  // Índice do alvo atual e do próximo, para interpolar a migração.
  let indice = 0;
  for (let i = 0; i < ordenados.length; i++) {
    if (frame >= ordenados[i].entra) indice = i;
  }
  const atual = ordenados[indice];
  const anterior = indice > 0 ? ordenados[indice - 1] : null;

  // Migração: do alvo anterior para o atual, nos 24q a partir da palavra.
  const t = anterior ? interpolate(frame, [atual.entra, atual.entra + TROCA], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CURVES.smoothInOut,
  }) : 1;

  const entre = (de: number, para: number) => (anterior ? de + (para - de) * t : para);
  const x = entre(anterior?.x ?? atual.x, atual.x);
  const y = entre(anterior?.y ?? atual.y, atual.y);
  const largura = entre(anterior?.largura ?? atual.largura, atual.largura);
  const altura = entre(anterior?.altura ?? atual.altura, atual.altura);
  const raio = entre(anterior?.raio ?? atual.raio, atual.raio);
  const espessura = espessuraDoAlvo({ ...atual, largura, altura });

  // Nascimento do anel no primeiro alvo: opacity 0 -> .7, scale .96 -> 1
  // (linha do tempo do §7, "anel nasce"), nunca um pisca seco.
  const nasce = interpolate(frame, [primeiro.entra - 6, primeiro.entra + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CURVES.settleSoft,
  });
  const sai = saiEm === undefined
    ? 1
    : interpolate(frame, [saiEm, saiEm + TROCA], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: CURVES.easyEase,
      });
  const escala = 0.96 + 0.04 * nasce;
  const opacidade = SPECTRUM_OPACITY * nasce * sai;
  if (opacidade <= 0.01) return null;

  // Anel = moldura de conic-gradient com o miolo recortado por mask, para
  // o conteúdo do bloco continuar visível por dentro.
  const recorte = "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)";
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: largura,
        height: altura,
        borderRadius: raio,
        padding: espessura,
        boxSizing: "border-box",
        background: `conic-gradient(${paradas.join(", ")})`,
        opacity: opacidade,
        transform: `scale(${escala})`,
        WebkitMask: recorte,
        WebkitMaskComposite: "xor",
        mask: recorte,
        maskComposite: "exclude",
        pointerEvents: "none",
      }}
    />
  );
};
