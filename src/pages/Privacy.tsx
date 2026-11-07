import { Link } from "react-router-dom";

const Privacy = () => (
  <main className="min-h-screen bg-background px-6 py-16 font-body">
    <div className="max-w-2xl mx-auto space-y-5 text-foreground">
      <Link to="/" className="text-primary underline text-sm">← Voltar</Link>
      <h1 className="font-display text-2xl md:text-3xl">Política de Privacidade</h1>
      <p>Este site do EJM 2027, mantido pela Igreja Cristo em Vós, usa o Meta Pixel, ferramenta da Meta Platforms (Facebook e Instagram).</p>
      <h2 className="font-display text-lg">Quais dados</h2>
      <p>Páginas visitadas, cliques nos botões de inscrição, informações do navegador e dispositivo, endereço IP e identificadores de cookies da Meta. Não enviamos nome, e-mail ou telefone.</p>
      <h2 className="font-display text-lg">Para quê</h2>
      <p>Medir o resultado dos nossos anúncios no Facebook e Instagram e mostrar anúncios a pessoas com mais chance de se interessar pelo evento.</p>
      <h2 className="font-display text-lg">Sua escolha</h2>
      <p>Em países que exigem consentimento (como União Europeia, Reino Unido e Suíça), o Pixel só funciona se você aceitar. Em qualquer país, você pode recusar ou retirar sua permissão a qualquer momento. O sinal Global Privacy Control do navegador também é respeitado.</p>
      <button onClick={() => window.dispatchEvent(new Event("ejm-open-cookie-settings"))} className="min-h-[44px] rounded-full gradient-bg text-primary-foreground font-semibold px-6">Alterar preferências de cookies</button>
      <p className="text-sm text-muted-foreground">Dúvidas: WhatsApp (15) 99762-4048.</p>
    </div>
  </main>
);

export default Privacy;
