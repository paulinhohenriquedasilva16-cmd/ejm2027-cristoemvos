import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { applyRouteSeo } from "@/lib/seo";

const Privacy = () => {
  useEffect(() => {
    applyRouteSeo("privacy");
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#conteudo-privacidade"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-full focus:bg-graphite focus:px-4 focus:py-3 focus:font-body focus:text-xs focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar alwaysSolid />

      <main id="conteudo-privacidade" className="px-6 pt-28 pb-16 font-body">
        <div className="mx-auto max-w-2xl space-y-5 text-foreground">
          <Link to="/" className="inline-flex min-h-[44px] items-center text-sm font-medium text-primary-ink underline">
            ← Voltar para a página inicial
          </Link>
          <h1 className="font-display text-2xl md:text-3xl">Política de Privacidade</h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Este site do EJM 2027, mantido pela <strong className="text-foreground">Igreja Cristo em Vós</strong>, utiliza ferramentas de medição e análise de navegação para melhorar a experiência de inscrição e a eficiência da divulgação do evento.
          </p>

          <h2 className="font-display text-lg">Ferramentas utilizadas</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground sm:text-base">
            <li>
              <strong className="text-foreground">Google Tag Manager e Google Analytics 4:</strong> gerenciam tags de medição e analisam origem de tráfego (incluindo parâmetros de campanha UTM) e interações na página de forma agregada, respeitando o Consent Mode v2.
            </li>
            <li>
              <strong className="text-foreground">Meta Pixel (Facebook e Instagram):</strong> mede visitas e cliques nos botões de inscrição e atendimento para otimizar anúncios do evento.
            </li>
            <li>
              <strong className="text-foreground">Microsoft Clarity:</strong> gera mapas de calor e estatísticas anônimas de usabilidade para corrigir dificuldades de navegação no celular e no computador.
            </li>
          </ul>

          <h2 className="font-display text-lg">Quais dados são coletados</h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Páginas visitadas, interações com botões e seções (como escolha de modalidade de ingresso), parâmetros de campanha (UTM, fbclid, gclid), informações técnicas do navegador/dispositivo, endereço IP e identificadores de cookies. Não coletamos nem enviamos nome, CPF, e-mail ou telefone automaticamente pelo site.
          </p>

          <h2 className="font-display text-lg">Sua escolha e direitos (LGPD / GDPR)</h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Em países que exigem consentimento prévio (como União Europeia, Reino Unido e Suíça), os cookies e scripts de medição só são ativados após o seu aceite explícito. Em qualquer país (incluindo Brasil), você pode recusar ou alterar suas preferências a qualquer momento. O sinal <strong className="text-foreground">Global Privacy Control (GPC)</strong> do navegador também é respeitado automaticamente.
          </p>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("ejm-open-cookie-settings"))}
            className="min-h-[48px] rounded-full gradient-bg px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-95"
          >
            Alterar preferências de cookies
          </button>

          <p className="text-sm text-muted-foreground">
            Dúvidas sobre privacidade ou inscrições: WhatsApp (15) 99762-4048 ou (15) 99816-2393.
          </p>
        </div>
      </main>

      <Footer hasMobileStickyBar={false} />
    </div>
  );
};

export default Privacy;
