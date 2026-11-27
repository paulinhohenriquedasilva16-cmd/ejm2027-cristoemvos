import abracoAlegria from "@/assets/gallery/abraco-alegria.jpg";
import adoracaoLuzLaranja from "@/assets/gallery/adoracao-luz-laranja.jpg";
import oracaoAltar from "@/assets/gallery/oracao-altar.jpg";
import irmaosAbracam from "@/assets/gallery/irmaos-abracam.jpg";
import louvorMultidao from "@/assets/gallery/louvor-multidao.jpg";
import selfieGalera from "@/assets/gallery/selfie-galera.jpg";
import abracoLaranja from "@/assets/gallery/abraco-laranja.jpg";
import adoracaoMaosErguidas from "@/assets/gallery/adoracao-maos-erguidas.jpg";
import oracaoProfunda from "@/assets/gallery/oracao-profunda.jpg";
import pastorOraJovem from "@/assets/gallery/pastor-ora-jovem.jpg";
import oracaoEmGrupo from "@/assets/gallery/oracao-em-grupo.jpg";
import gincanaFantasias from "@/assets/gallery/gincana-fantasias.jpg";
import teatroJovens from "@/assets/gallery/teatro-jovens.jpg";
import adoracaoEmocao from "@/assets/gallery/adoracao-emocao.jpg";
import abracoOracao from "@/assets/gallery/abraco-oracao.jpg";

import auditorioLotado from "@/assets/gallery/auditorio-lotado.jpg";
import oracaoProstrados from "@/assets/gallery/oracao-prostrados.jpg";
import adoracaoOlhosFechados from "@/assets/gallery/adoracao-olhos-fechados.jpg";
import adoracaoBracosAbertos from "@/assets/gallery/adoracao-bracos-abertos.jpg";
import teatroAoArLivre from "@/assets/gallery/teatro-ao-ar-livre.jpg";
import teatroFantasiasBibl from "@/assets/gallery/teatro-fantasias-bibl.jpg";

export type MemoryVibe = "adoracao" | "comunhao" | "galera";

export interface Memory {
  id: string;
  src: string;
  vibe: MemoryVibe;
  caption: string;
  alt: string;
  width: number;
  height: number;
}

export const VIBE_FILTERS: { id: "todos" | MemoryVibe; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "adoracao", label: "Adoração" },
  { id: "comunhao", label: "Comunhão" },
  { id: "galera", label: "Gincanas e Companheirismo" },
];

export const MEMORIES: Memory[] = [
  { id: "abraco-alegria", src: abracoAlegria, vibe: "comunhao", caption: "Abraço que vale mais que mil palavras", alt: "Duas jovens se abraçando com alegria no EJM", width: 573, height: 812 },
  { id: "adoracao-luz-laranja", src: adoracaoLuzLaranja, vibe: "adoracao", caption: "Quando o louvor toca fundo", alt: "Jovem chorando em adoração diante de um telão laranja", width: 562, height: 795 },
  { id: "selfie-galera", src: selfieGalera, vibe: "galera", caption: "Foto da galera reunida", alt: "Grupo de jovens tirando foto juntos com camiseta do EJM", width: 668, height: 822 },
  { id: "louvor-multidao", src: louvorMultidao, vibe: "adoracao", caption: "Mãos erguidas, coração entregue", alt: "Multidão de jovens adorando com as mãos levantadas", width: 582, height: 747 },
  { id: "irmaos-abracam", src: irmaosAbracam, vibe: "comunhao", caption: "Ninguém caminha sozinho", alt: "Jovem sorrindo emocionado cercado por irmãos que o abraçam", width: 607, height: 855 },
  { id: "gincana-fantasias", src: gincanaFantasias, vibe: "galera", caption: "Gincana com fantasia bíblica", alt: "Jovens e pastor fantasiados em gincana bíblica", width: 858, height: 518 },
  { id: "oracao-altar", src: oracaoAltar, vibe: "adoracao", caption: "Momentos de quebrantamento", alt: "Oração emocionada no altar durante o culto", width: 611, height: 717 },
  { id: "abraco-laranja", src: abracoLaranja, vibe: "comunhao", caption: "Amizades que ficam para a vida", alt: "Abraço alegre entre jovens de camiseta laranja", width: 693, height: 852 },
  { id: "teatro-jovens", src: teatroJovens, vibe: "galera", caption: "Teatro, risada e muita criatividade", alt: "Jovens em dramatização com microfone", width: 802, height: 517 },
  { id: "adoracao-maos-erguidas", src: adoracaoMaosErguidas, vibe: "adoracao", caption: "Adoração sem pressa", alt: "Jovem adorando de mãos erguidas", width: 710, height: 712 },
  { id: "oracao-em-grupo", src: oracaoEmGrupo, vibe: "comunhao", caption: "Orar junto muda tudo", alt: "Grupo de jovens orando e se abraçando", width: 756, height: 542 },
  { id: "pastor-ora-jovem", src: pastorOraJovem, vibe: "adoracao", caption: "Cuidado pastoral de verdade", alt: "Pastor orando por um jovem emocionado", width: 802, height: 651 },
  { id: "adoracao-emocao", src: adoracaoEmocao, vibe: "adoracao", caption: "Presença que transforma", alt: "Jovem emocionado em adoração", width: 838, height: 857 },
  { id: "abraco-oracao", src: abracoOracao, vibe: "comunhao", caption: "Choramos e rimos juntos", alt: "Jovens se abraçando em oração", width: 825, height: 530 },
  { id: "auditorio-lotado", src: auditorioLotado, vibe: "comunhao", caption: "Auditório cheio de gente que ama a Deus", alt: "Auditório lotado de jovens e adultos de mãos dadas durante o culto", width: 860, height: 571 },
  { id: "oracao-prostrados", src: oracaoProstrados, vibe: "adoracao", caption: "Joelhos no chão, coração no céu", alt: "Pessoas se prostrando em oração durante o culto", width: 797, height: 551 },
  { id: "adoracao-olhos-fechados", src: adoracaoOlhosFechados, vibe: "adoracao", caption: "De braços abertos para Deus", alt: "Homem de olhos fechados e braços abertos em adoração", width: 792, height: 410 },
  { id: "adoracao-bracos-abertos", src: adoracaoBracosAbertos, vibe: "adoracao", caption: "Louvor que ecoa por todo o lugar", alt: "Homem de óculos com os braços erguidos em louvor", width: 815, height: 558 },
  { id: "teatro-ao-ar-livre", src: teatroAoArLivre, vibe: "galera", caption: "Teatro bíblico no meio da natureza", alt: "Jovens encenando uma peça bíblica ao ar livre com figurino", width: 606, height: 752 },
  { id: "teatro-fantasias-bibl", src: teatroFantasiasBibl, vibe: "galera", caption: "Figurino, criatividade e muita diversão", alt: "Jovens fantasiados de personagens bíblicos em dramatização", width: 578, height: 747 },
  { id: "oracao-profunda", src: oracaoProfunda, vibe: "adoracao", caption: "Um encontro que marca", alt: "Jovem em oração profunda com as mãos levantadas", width: 789, height: 652 },
];

export const STORY_IDS = [
  "selfie-galera",
  "adoracao-luz-laranja",
  "abraco-laranja",
  "gincana-fantasias",
  "louvor-multidao",
  "irmaos-abracam",
] as const;
