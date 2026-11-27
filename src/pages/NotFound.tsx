import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { applyRouteSeo } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    applyRouteSeo("not_found");
    console.error("404 Error: Rota inexistente acessada:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-6 font-body">
      <div className="max-w-md text-center">
        <p className="mb-2 font-display text-5xl text-primary-ink">404</p>
        <h1 className="mb-3 font-display text-xl text-foreground sm:text-2xl">
          Página não encontrada
        </h1>
        <p className="mb-6 text-sm text-muted-foreground sm:text-base">
          O endereço que você acessou não existe ou foi movido. Volte para a página oficial do EJM 2027.
        </p>
        <Link
          to="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full gradient-bg px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-95"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
