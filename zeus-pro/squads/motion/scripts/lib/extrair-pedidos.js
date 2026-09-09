/**
 * extrair-pedidos.js — tira da fala do o dono do canal os elementos que ele nomeou.
 *
 * Lição `letras-jornada`, cinco repetições: "agora pela 5 vez eu to te falando
 * tem que ter uma letra A bem grande e a letra B bem grande e a animação da
 * seta". Eu interpretava o pedido em vez de executar o literal, e o que ele
 * nomeou não chegava à tela.
 *
 * O conserto foi registrar cada elemento pedido como item conferível. Isso já
 * funciona, mas dependia de eu lembrar de registrar. Aqui a leitura da mensagem
 * dele vira lista sozinha: substantivo concreto de coisa que aparece na tela,
 * junto de um verbo de pedido.
 *
 * NÃO decide nada: sugere. Quem confirma cada item sou eu, e a prova no código
 * continua sendo escrita à mão. Sugerir a mais custa uma linha na lista; não
 * sugerir custa uma quinta rodada.
 */

/** Coisas que aparecem na tela e que ele costuma nomear. */
const COISAS = [
  "letra", "seta", "retângulo", "quadrado", "círculo", "linha", "traço",
  "tabela", "tabelinha", "grade", "jogo da velha", "gráfico",
  "logo", "logotipo", "ícone", "símbolo", "selo", "check",
  "foto", "imagem", "rosto", "contorno", "borda", "moldura", "fundo",
  "card", "cartão", "título", "texto", "legenda", "número", "pill", "badge",
  "bloco", "coluna", "barra", "botão", "mockup", "celular", "tela",
];

/** Verbos de pedido: o que vem depois deles é o que ele quer ver. */
// Atenção à raiz de cada verbo: "colocar" vira "coloque" com Q, não com C.
// Escrever `coloc(?:ue)` não casa nada, e a primeira versão perdia em silêncio
// todo pedido que ele escrevia como "coloque".
const PEDIDO = /(tem que ter|tem que|precisa (?:ter|de)|colo(?:ca|car|que|quem)|po(?:e|nha)|põe|adicion(?:a|ar|e)|falta|faltou|quero|queria|era pra (?:ter|ser)|deveria ter|bot(?:a|ar|e)|deveria)/i;

/** Palavras que seguem o substantivo sem qualificar nada. */
const LIGACAO = new Set(
  ("ou e de do da dos das em no na por para pra com sem que se quando como isso isto " +
   "esse essa aquele aquela tu voce eu ele ela nos mais menos ja so tambem bem mal " +
   "ao aos as os um uma uns umas ta esta e nao sim la ali aqui tem ter era foi vai").split(/\s+/)
);

const semAcento = (t) =>
  String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * As frases da mensagem que contêm um pedido e nomeiam uma coisa da tela.
 * Uma sugestão por frase, com cada coisa nomeada.
 */
function extrairPedidos(mensagem) {
  const frases = String(mensagem)
    .split(/(?:[.!?\n]|\bmas\b|\be tamb[ée]m\b)/i)
    .map((f) => f.trim())
    .filter((f) => f.length > 8);

  const achados = [];
  for (const frase of frases) {
    const sem = semAcento(frase);
    if (!PEDIDO.test(frase)) continue;

    // dedupe pelo texto sem acento, e uma entrada por OCORRÊNCIA: ele pediu a
    // letra A e a letra B, e listar só uma repete o erro que gerou esta lição.
    const vistos = new Set();
    const coisas = [];
    for (const c of COISAS) {
      const chave = semAcento(c);
      if (vistos.has(chave) || !sem.includes(chave)) continue;
      vistos.add(chave);
      const re = new RegExp(chave + "\\s+([a-z0-9]{1,12})", "g");
      let m;
      let achou = false;
      while ((m = re.exec(sem)) !== null) {
        // A palavra seguinte só entra se qualificar o elemento ("letra A",
        // "número 12"). Ligação e pronome não qualificam nada, e virariam
        // itens como "retangulo ou" na lista que eu tenho que conferir depois.
        if (LIGACAO.has(m[1])) continue;
        coisas.push(`${c} ${m[1]}`);
        achou = true;
      }
      if (!achou) coisas.push(c);
    }
    if (!coisas.length) continue;

    achados.push({
      frase: frase.length > 110 ? frase.slice(0, 107) + "..." : frase,
      coisas: [...new Set(coisas)],
    });
  }
  return achados;
}

module.exports = { extrairPedidos, COISAS };
