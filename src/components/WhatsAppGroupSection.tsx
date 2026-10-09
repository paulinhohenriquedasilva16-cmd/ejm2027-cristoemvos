import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppGroupSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="w-16 h-16 gradient-bg text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Entre no Grupo Oficial do EJM 2027
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Para não perder nenhum aviso importante, viradas de lote, informações sobre acomodações e novidades exclusivas, faça parte do nosso grupo de comunicação no WhatsApp!
          </p>
          
          <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
            (O grupo é fechado para mensagens, apenas os administradores enviam os comunicados para não sobrecarregar seu celular).
          </p>

          <Button 
            size="lg"
            className="gradient-bg text-primary-foreground hover:opacity-90 font-bold px-8 py-6 rounded-full text-lg w-full sm:w-auto"
            onClick={() => window.open("https://chat.whatsapp.com/K05xBp2nu1x2AiazbsoHLa?mode=gi_t", "_blank")}
          >
            <MessageCircle className="w-5 h-5 mr-2 fill-current" />
            ENTRAR NO GRUPO OFICIAL
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppGroupSection;

