import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { MessageCircle, User } from "lucide-react";

// Dados da equipe de atendimento
const teamMembers = [
  { id: 1, name: "Yasmin Guedes", role: "Atendimento Geral", phone: "5515997966682", image: "/team/yasmin.jpg", title: "irmã" },
  { id: 2, name: "Samuel Vitorino", role: "Atendimento Geral", phone: "5515997480233", image: "/team/samuel.jpg", title: "irmão" },
  { id: 3, name: "Paulo Henrique", role: "Atendimento Jovens", phone: "5515991842834", image: "/team/paulo.jpg", title: "irmão" },
  { id: 4, name: "Daniel Santos", role: "Atendimento Jovens", phone: "5515981327232", image: "/team/daniel.jpg", title: "irmão" },
  { id: 5, name: "Lauany Vitorino", role: "Atendimento Famílias", phone: "5519982784676", image: "/team/launny.jpg", title: "irmã" },
  { id: 6, name: "Sillas Pereira", role: "Atendimento Famílias", phone: "5515996498979", image: "/team/sillas.jpg", title: "irmão" },
  { id: 7, name: "Ana Cristina", role: "Atendimento Geral", phone: "5515996183439", image: "/team/ana.jpg", title: "irmã" },
  { id: 8, name: "Natanael Vitoino", role: "Atendimento Geral", phone: "5515997624048", image: "/team/natanael.jpg", title: "irmão" },
];

const SupportTeamSection = () => {
  return (
    <section id="suporte" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            Nossa Equipe de Atendimento
          </h2>
          <p className="text-muted-foreground text-lg">
            Ficou com alguma dúvida sobre o encontro, caravanas ou pagamentos? 
            Nossa equipe de voluntários está pronta para te ajudar. Chame no WhatsApp!
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-8 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {teamMembers.map((member) => (
                <CarouselItem key={member.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card className="h-full border-border/50 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6 h-full flex flex-col items-center text-center">
                      <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-primary/20 flex-shrink-0">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                        ) : (
                          <User className="w-10 h-10 text-primary" />
                        )}
                      </div>
                      <h3 className="font-bold text-base mb-1 min-h-[3rem] flex items-center justify-center leading-tight">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                      
                      <Button 
                        className="w-full mt-auto gradient-bg text-primary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity"
                        onClick={() => {
                          const message = `Deus abençoe, ${member.title} ${member.name.split(' ')[0]}! Vim pelo site do EJM 2027 e gostaria de tirar algumas dúvidas.`;
                          window.open(`https://wa.me/${member.phone}?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chamar
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SupportTeamSection;
