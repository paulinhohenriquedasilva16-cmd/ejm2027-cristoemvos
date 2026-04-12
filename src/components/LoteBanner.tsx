import { Bell } from "lucide-react";

const LoteBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 gradient-bg py-2 px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-primary-foreground font-body text-xs sm:text-sm">
        <Bell className="w-4 h-4 animate-pulse" />
        <span className="font-semibold">1º LOTE ENCERRADO</span>
        <span className="hidden sm:inline">—</span>
        <span>2º Lote em breve! Fique atento.</span>
      </div>
    </div>
  );
};

export default LoteBanner;
