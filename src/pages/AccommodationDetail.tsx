import { Link } from "react-router-dom";

const AccommodationDetail = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-2xl text-foreground mb-4">Página não disponível</h1>
        <Link to="/#acomodacoes" className="gradient-text font-medium">Voltar ao início</Link>
      </div>
    </div>
  );
};

export default AccommodationDetail;
