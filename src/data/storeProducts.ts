import camisetaImg from "@/assets/camiseta-ejm.jpg";

export interface StoreProduct {
  id: string;
  name: string;
  badge: string;
  shortDescription: string;
  price: number;
  image: string;
  imageAlt: string;
  sizes?: readonly string[];
  pickupNote: string;
  status: "available" | "coming_soon";
}

export const STORE_PIX_KEY = "177.965.118.09";
export const STORE_PIX_NAME = "Pedro Vitorino";
export const STORE_WHATSAPP = "5515996183439";

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "camiseta-ejm-2027",
    name: "Camiseta Oficial EJM 2027",
    badge: "Camiseta Oficial",
    shortDescription:
      "Modelagem unissex preta (PP ao XG) com estampa frente e costas (Efésios 5:18). Retirada no credenciamento do evento.",
    price: 70,
    image: camisetaImg,
    imageAlt:
      "Camiseta oficial EJM 2027 preta com estampa frente e costas, Enchei-vos do Espírito Santo",
    sizes: ["PP", "P", "M", "G", "GG", "XG"] as const,
    pickupNote: "Reserva + Pix sem taxa · Retirada no evento",
    status: "available",
  },
];
