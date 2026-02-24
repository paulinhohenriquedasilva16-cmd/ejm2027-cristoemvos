import { Instagram, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo-ejm.png";

const Footer = () => {
  return (
    <footer className="bg-graphite section-padding pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="EJM" className="w-8 h-8 md:w-10 md:h-10 invert brightness-200 object-contain" />
            <div>
              <h4 className="font-display text-xs md:text-sm text-primary-foreground">EJM 2027</h4>
              <p className="font-body text-[10px] md:text-xs text-primary-foreground/50">Encontro de Jovens da Mensagem</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/cristo.emvos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            Organização: Pr. Pedro Vitorino · Igreja Cristo em Vós
          </p>
          <p className="font-body text-xs text-primary-foreground/30 mt-2">
            © 2027 Igreja Cristo em Vós – Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
