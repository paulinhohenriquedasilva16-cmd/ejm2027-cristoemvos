import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Bus, MessageCircle, User } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_URLS } from "@/lib/checkout";

const teamMembers = [
  { id: 1, name: "Yasmin Guedes", role: "Atendimento Geral", phone: "5515997966682", image: "/team/yasmin.jpg", title: "irmã" },
  { id: 2, name: "Samuel Vitorino", role: "Atendimento Geral", phone: "5515997480233", image: "/team/samuel.jpg", title: "irmão" },
  { id: 3, name: "Paulo Henrique", role: "Atendimento Jovens", phone: "5515991842834", image: "/team/paulo.jpg", title: "irmão" },
  { id: 4, name: "Daniel Santos", role: "Atendimento Jovens", phone: "5515981327232", image: "/team/daniel.jpg", title: "irmão" },
  { id: 5, name: "Lauany Vitorino", role: "Atendimento Famílias", phone: "5519982784676", image: "/team/launny.jpg", title: "irmã" },
  { id: 6, name: "Sillas Pereira", role: "Atendimento Famílias", phone: "5515996498979", image: "/team/sillas.jpg", title: "irmão" },
  { id: 7, name: "Ana Cristina", role: "Atendimento Geral", phone: "5515996183439", image: "/team/ana.jpg", title: "irmã" },
  { id: 8, name: "Natanael Vitorino", role: "Atendimento Geral", phone: "5515997624048", image: "/team/natanael.jpg", title: "irmão" },
];

const SupportTeamSection = () => {
  return (
    <section id="suporte" className="section-padding scroll-mt-20 overflow-x-clip bg-background">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
        >
          <h2 className="mb-4 font-display text-2xl text-foreground md:text-4xl">
            Nossa Equipe de <span className="gradient-text">Atendimento</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground sm:text-base md:text-lg">
            Ficou com alguma dúvida sobre o encontro, caravanas, famílias ou pagamentos?
            Nossa equipe de voluntários está pronta para te ajudar. Chame no WhatsApp!
          </p>
        </motion.div>

        {/* Dedicated Caravans Shortcut (eliminates choice overload for group leaders) */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-muted/60 p-5 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3.5 font-body">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-bg text-primary-foreground">
              <Bus className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">
                Atendimento de Caravanas e Grupos de Igreja
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Vai trazer um grupo ou quer alinhar quartos juntos? Fale direto no canal de caravanas.
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_URLS.caravans}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { channel: "caravans" })}
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-full gradient-bg px-5 py-2.5 font-body text-xs font-bold text-primary-foreground transition-opacity hover:opacity-95 sm:w-auto sm:text-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Falar sobre Caravanas
          </a>
        </div>

        <div className="mx-auto max-w-5xl md:px-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            aria-label="Equipe de atendimento no WhatsApp"
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {teamMembers.map((member) => {
                const message = `Deus abençoe, ${member.title} ${member.name.split(" ")[0]}! Vim pelo site do EJM 2027 e gostaria de tirar algumas dúvidas.`;
                const whatsappHref = `https://wa.me/${member.phone}?text=${encodeURIComponent(message)}`;

                return (
                  <CarouselItem
                    key={member.id}
                    className="basis-[82%] pl-3 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4"
                  >
                    <Card className="h-full border-border/70 transition-colors hover:border-primary/50">
                      <CardContent className="flex h-full flex-col items-center p-6 text-center">
                        <div className="mb-4 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/25 bg-secondary/20">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              width={96}
                              height={96}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover object-top"
                            />
                          ) : (
                            <User className="h-10 w-10 text-primary-ink" aria-hidden="true" />
                          )}
                        </div>
                        <h3 className="mb-1 flex min-h-[2.75rem] items-center justify-center font-body text-base font-bold leading-tight text-foreground">
                          {member.name}
                        </h3>
                        <p className="mb-4 font-body text-xs text-muted-foreground sm:text-sm">
                          {member.role}
                        </p>

                        <Button
                          asChild
                          className="mt-auto min-h-[44px] w-full rounded-full gradient-bg font-body font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEvent("whatsapp_click", {
                                channel: "support_team",
                                attendant_name: member.name,
                                attendant_role: member.role,
                              })
                            }
                          >
                            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                            Chamar
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
              <CarouselPrevious className="static h-11 w-11 translate-y-0" />
              <CarouselNext className="static h-11 w-11 translate-y-0" />
            </div>
            <div className="hidden md:block">
              <CarouselPrevious className="h-11 w-11" />
              <CarouselNext className="h-11 w-11" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SupportTeamSection;
