import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { OptimizedImage } from "../components/optimized-image";
import * as Dialog from "@radix-ui/react-dialog";
import { getTrackedCheckoutUrl } from "../lib/checkout-tracking";

const IMG = "/assets/optimized-v1/";
const CHECKOUT_BASIC = "https://ggcheckout.app/checkout/v5/5SfdPOXyzhseBblYFSS4";
const CHECKOUT_PREMIUM = "https://ggcheckout.app/checkout/v5/EPvjTIozIE5MwFJWpL85";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://ggcheckout.app", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://ggcheckout.app" },
      { rel: "preload", as: "image", type: "image/avif", imageSrcSet: [320, 480, 640, 800].map(width => `${IMG}basic-${width}.avif ${width}w`).join(", "), imageSizes: "(max-width: 520px) 90vw, 560px", fetchPriority: "high" },
    ],
    meta: [
      { title: "+200 Batidas de Cachaça Artesanal" },
      { name: "description", content: "+200 receitas de batidas artesanais para preparar em casa, com videoaulas passo a passo. Básico ou Premium com 5 bônus." },
      { property: "og:title", content: "+200 Batidas de Cachaça Artesanal" },
      { property: "og:description", content: "Receitas com ingredientes, quantidades e videoaulas passo a passo para preparar em casa." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const bonuses = [
  ["BÔNUS 01", "bonus-1-600.webp", "Manual de Higiene e de Conservação", "Aprenda cuidados de higiene e armazenamento para conservar suas bebidas artesanais."],
  ["BÔNUS 02", "bonus-2-600.webp", "Guia de Precificação e Apresentação Profissional", "Organize ingredientes, custos e dicas para caprichar na apresentação das receitas."],
  ["BÔNUS 03", "bonus-3-600.webp", "50 Drinks e Coquetéis", "Amplie seu repertório com 50 opções para variar além das batidas tradicionais."],
  ["BÔNUS 04", "bonus-4-600.webp", "Guia de Madeiras e Sabores", "Entenda como carvalho, amburana e outras madeiras influenciam aromas e sabores."],
  ["BÔNUS 05", "bonus-5-600.webp", "Guia de Harmonização", "Encontre combinações de bebidas com pratos e petiscos para diferentes encontros."],
];

const premiumDifferentials = [
  ["▶", "+100 videoaulas extras", "200 no Premium, contra 100 no Básico."],
  ["✦", "50 combinações especiais de sabores", "Mais opções para variar e descobrir novas misturas."],
  ["✓", "Guias de preparo exclusivos", "Cremosidade perfeita, substituições de ingredientes e tabela de medidas."],
] as const;

function PremiumDifferentials({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "premium-differentials premium-differentials-compact" : "premium-differentials"} aria-label="O que o Premium oferece a mais">
      <strong className="premium-differentials-heading">✦ O QUE VOCÊ LEVA A MAIS NO PREMIUM</strong>
      <div className="premium-differentials-list">
        {premiumDifferentials.map(([icon, title, description]) => (
          <div className="premium-difference" key={title}>
            <span className="premium-difference-icon" aria-hidden="true">{icon}</span>
            <div><strong>{title}</strong><small>{description}</small></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TodayOffer() {
  return <div className="topbar">🥃 +200 RECEITAS + VIDEOAULAS • PLANOS A PARTIR DE R$10</div>;
}

const CHECKOUT_PREMIUM_UPGRADE = "https://ggcheckout.app/checkout/v5/OUw0ZukdRUiMvA1DYVk2";

function Index() {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [basicCheckout, setBasicCheckout] = useState(CHECKOUT_BASIC);

  const [premiumCheckout, setPremiumCheckout] = useState(CHECKOUT_PREMIUM);
  const [upgradeCheckout, setUpgradeCheckout] = useState(CHECKOUT_PREMIUM_UPGRADE);

  useEffect(() => {
    setBasicCheckout(getTrackedCheckoutUrl(CHECKOUT_BASIC));
    setPremiumCheckout(getTrackedCheckoutUrl(CHECKOUT_PREMIUM));
    setUpgradeCheckout(getTrackedCheckoutUrl(CHECKOUT_PREMIUM_UPGRADE));
  }, []);

  function prepareCheckout(event: MouseEvent<HTMLAnchorElement>) {
    // Update before native checkout listeners run; retain normal link behavior.
    event.currentTarget.href = getTrackedCheckoutUrl(event.currentTarget.href, basicCheckout);
  }

  useEffect(() => {
    const carousels = Array.from(document.querySelectorAll<HTMLElement>(".marquee, .testimonial-carousel"));
    const visible = new Set<HTMLElement>();
    const update = () => carousels.forEach(element => {
      element.dataset["active"] = String(visible.has(element) && !document.hidden);
    });
    if (!("IntersectionObserver" in window)) {
      carousels.forEach(element => visible.add(element));
      update();
      document.addEventListener("visibilitychange", update);
      return () => document.removeEventListener("visibilitychange", update);
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(element); else visible.delete(element);
      });
      update();
    }, { rootMargin: "150px" });
    carousels.forEach(element => observer.observe(element));
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  function offerPremium(event: MouseEvent<HTMLAnchorElement>) {
    prepareCheckout(event);
    if (!CHECKOUT_PREMIUM_UPGRADE || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    // Capture the click before checkout pixels intercept it at the link.
    // Only the final checkout choice should be tracked as InitiateCheckout.
    event.stopPropagation();
    setBasicCheckout(event.currentTarget.href);
    setUpgradeCheckout(getTrackedCheckoutUrl(CHECKOUT_PREMIUM_UPGRADE, event.currentTarget.href));
    setUpgradeOpen(true);
  }

  return (
    <main className="cacha-page">
      <Dialog.Root open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="upgrade-overlay" />
          <Dialog.Content className="upgrade-modal">
            <Dialog.Close className="upgrade-close" aria-label="Fechar oferta">×</Dialog.Close>
            <div className="upgrade-kicker">✦ UMA OPÇÃO MAIS COMPLETA</div>
            <Dialog.Title className="upgrade-title">Leve o Premium por <span>apenas R$19,90</span></Dialog.Title>
            <Dialog.Description className="upgrade-description">Por mais R$9,90 em relação ao Básico, receba as +200 receitas, +200 videoaulas passo a passo e os cinco bônus exclusivos.</Dialog.Description>
            <div className="upgrade-package">
              <OptimizedImage sizes="145px" src={IMG+"premium-800.webp"} width="800" height="800" alt="Kit digital Premium com receitas e cinco bônus" />
              <div className="upgrade-summary"><strong>+200 receitas<br />+200 videoaulas<br />+ 5 bônus exclusivos</strong><span>Material 100% digital</span></div>
            </div>
            <PremiumDifferentials compact />
            <details className="upgrade-all-extras">
              <summary>Ver todos os 5 bônus e 6 materiais extras</summary>
              <ul className="upgrade-benefits">
                {bonuses.map(([, , title]) => <li key={title}><span aria-hidden="true">✓</span>{title}</li>)}
                {["50 Combinações Especiais de Sabores", "Guia de Cremosidade Perfeita", "Guia de Ingredientes e Substituições", "Tabela de Medidas e Quantidades", "Guia de Batidas em Grandes Quantidades", "20 Batidas Fáceis para Iniciantes"].map((title) => <li key={title}><span aria-hidden="true">✓</span>{title}</li>)}
              </ul>
            </details>
            <div className="upgrade-price"><span>Premium na página: <s>R$34,90</s></span><strong>R$19,90</strong><small>Valor total • Pagamento único</small></div>
            <a className="upgrade-accept" href={upgradeCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>QUERO O PREMIUM POR R$19,90 <span aria-hidden="true">→</span></a>
            <a className="upgrade-decline" href={basicCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>Continuar com o Básico por R$10,00</a>
            <p className="upgrade-trust">🔒 Compra segura · Acesso após o pagamento · Garantia de 7 dias</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <TodayOffer />

      <section className="hero">
        <div className="eyebrow">BIBLIOTECA DE CACHAÇAS ARTESANAIS</div>
        <h1><em>+200 Receitas e Video Aulas Prontas de Batidas de Cachaça Artesanal</em> Para preparar na sua própria casa</h1>
        <OptimizedImage sizes="(max-width: 520px) 90vw, 560px" className="hero-mockup" src={IMG+"basic-800.webp"} width="800" height="800" fetchPriority="high" decoding="async" alt="Kit +200 Batidas de Cachaças Artesanais" />
        <p className="lead"><strong>Chega de preparar sempre as mesmas bebidas.</strong> Tenha receitas com ingredientes, quantidades e modo de preparo organizados em um só lugar. Escolha o sabor, acompanhe as videoaulas e prepare no seu ritmo.</p>
        <ul className="checks">
          <li>+200 receitas com ingredientes e quantidades</li><li>Batidas cremosas, frutadas e tradicionais</li><li>Videoaulas com o preparo explicado</li><li>Consulte tudo pelo celular, quando quiser</li>
        </ul>
        <p className="lead"><strong>Plano Básico: R$10,00 • Pagamento único • Material digital</strong></p>
        <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🥃 QUERO AS RECEITAS — R$10,00</a>
        <small className="cta-note">🔒 Pix ou cartão • Garantia de 7 dias</small>
        <p className="cta-note">Produto 100% digital. Acesso após a confirmação do pagamento. Não inclui garrafas ou livros físicos.</p>
        <p className="social-proof"><strong>Quer um kit mais completo?</strong> O Premium inclui +200 videoaulas e 5 bônus exclusivos.</p>
        <div className="micro trust-micro">
          <span><OptimizedImage src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" aria-hidden="true" />WhatsApp</span>
          <span><OptimizedImage src="https://cdn.simpleicons.org/gmail/EA4335" alt="" aria-hidden="true" />E-mail</span>
          <span>Acesso imediato</span>
        </div>
      </section>

      <section className="dark-section preview" id="batidas">
        <div className="section-kicker">+200 BATIDAS NO MATERIAL COMPLETO</div>
        <h2>Do churrasco ao encontro em casa: mais opções para variar os sabores.</h2>
        <a className="text-link" href="#oferta">Ver batidas completas ↓</a>
        <div className="marquee"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["batida-out07-1-440.webp","batida-out07-2-440.webp","batida-out07-3-440.webp","batida-out07-4-440.webp","batida-out07-5-440.webp","batida-out07-6-440.webp","batida-out07-7-440.webp","batida-out07-8-440.webp"].map((x,i)=><OptimizedImage key={"r"+set+i} sizes="(max-width: 520px) 155px, 170px" src={IMG+x} alt={"Receita de cachaça "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <h2>Veja um pouco do material por dentro</h2>
        <div className="marquee marquee-reverse preview-large"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["previa-set23-6-800.webp","previa-set23-8-800.webp","previa-set23-10-800.webp","previa-set23-3-800.webp","previa-set23-5-800.webp","previa-set23-7-800.webp"].map((x,i)=><OptimizedImage key={"p"+set+i} sizes="(max-width: 520px) 210px, 280px" src={IMG+x} alt={"Prévia "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>QUERO AS +200 BATIDAS POR R$10,00</a>
      </section>

      <section className="lessons-highlight section" aria-labelledby="videoaulas-titulo">
        <div className="section-kicker">VIDEOAULAS INCLUSAS NOS DOIS PLANOS</div>
        <h2 id="videoaulas-titulo">Receitas para consultar. Videoaulas para acompanhar o preparo.</h2>
        <p className="section-intro">Em vez de ficar tentando adivinhar o preparo, acompanhe as orientações em vídeo e avance no seu ritmo.</p>
        <div className="lessons-comparison">
          <div className="lesson-option"><span className="lesson-eyebrow">PLANO BÁSICO</span><strong>+100 <small>videoaulas</small></strong><span>Acompanhe o preparo passo a passo</span></div>
          <div className="lesson-option lesson-option-premium"><span className="lesson-eyebrow">PREMIUM • MAIS COMPLETO</span><strong>+200 <small>videoaulas</small></strong><span>100 videoaulas extras + 5 bônus exclusivos</span><a className="lesson-premium-link" href="#oferta">Conhecer o kit Premium ↓</a></div>
        </div>
      </section>

      <section className="how section">
        <div className="section-kicker">SIMPLES DE COMEÇAR</div><h2>Escolha o sabor e siga o passo a passo</h2>
        <div className="steps">
          {[
            ["1","📩","Acesse a biblioteca","Receba o acesso digital após a confirmação do pagamento."],
            ["2","🥃","Escolha o sabor","Explore as receitas e separe os ingredientes indicados."],
            ["3","🍋","Acompanhe o preparo","Siga as instruções e consulte as videoaulas inclusas no plano."]
          ].map(([n,icon,title,text])=><article key={n}><span className="step-icon">{n}{icon}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🥃 QUERO COMEÇAR AGORA — ACESSO IMEDIATO</a>
        <small className="cta-note">🔒 Checkout pela GG Checkout • Garantia de 7 dias</small>
      </section>

      <section className="testimonials section">
        <div className="section-kicker">RESULTADOS COMPARTILHADOS</div>
        <h2>Veja o que dizem sobre o material:</h2>
        <p>Confira os relatos sobre as batidas de cachaças artesanais.</p>
        <div className="testimonial-carousel">
          <div className="testimonial-track">
            {[3,5,2,4,1,3,5,2,4,1].map((n,i)=><article className="quote testimonial-image" key={i}>
              <OptimizedImage src={IMG + "depoimento-atual-" + n + "-600.webp"} alt={"Depoimento " + n + " sobre as batidas de cachaças artesanais"} loading="lazy" decoding="async" />
            </article>)}
          </div>
        </div>
        <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>👉 QUERO RECEBER MEU ACESSO AGORA</a>
        <small className="cta-note">🔒 Compra segura • Acesso imediato após o pagamento</small>
      </section>

      <section className="bonus dark-section">
        <div className="section-kicker">5 BÔNUS EXCLUSIVOS DO PLANO PREMIUM</div>
        <h2>Gostou das batidas? O Premium leva seu repertório mais longe.</h2>
        <p className="section-intro">Além das receitas, leve 200 videoaulas e cinco guias extras para explorar novos drinks, combinações e formas de apresentação. Tudo no mesmo pacote digital.</p>
        <div className="marquee bonus-marquee"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>bonuses.map(([tag,img,title],i)=><OptimizedImage key={"b"+set+i} sizes="(max-width: 520px) 190px, 220px" src={IMG+img} alt={tag+" — "+title} loading="lazy" decoding="async" />))}</div></div>
        <div className="bonus-grid">
          {bonuses.map(([tag,img,title,desc])=><article className="bonus-card" key={img}><span>{tag}</span><OptimizedImage src={IMG+img} alt={"Capa do "+title} loading="lazy" decoding="async"/><h3>{title}</h3><p>{desc}</p><b>INCLUSO NO PREMIUM</b><div className="bonus-price"><strong>JÁ INCLUSO • SEM CUSTO EXTRA</strong></div><small>Exclusivo do Plano Premium</small></article>)}
        </div>
        <div className="bonus-total"><strong>UM KIT SÓ: +200 RECEITAS + 200 VIDEOAULAS + 5 BÔNUS</strong><br/><b>Premium por R$34,90 • Pagamento único</b><span>Mais aulas, mais ideias e materiais para aproveitar a biblioteca de forma completa.</span></div>
        <a className="cta" href="#oferta">COMPARAR BÁSICO E PREMIUM</a>
        <small className="cta-note">Pagamento único • Acesso imediato • Garantia de 7 dias</small>
      </section>

      <section className="secure section">
        <div className="security-card"><h3>🔒 PAGAMENTO 100% SEGURO</h3><p>Confira o valor e os dados do recebedor no checkout antes de confirmar o pagamento.</p></div>
      </section>

      <section className="offer section" id="oferta">
        <div className="section-kicker">ESCOLHA SEU PLANO • PAGAMENTO ÚNICO</div>
        <h2>Escolha o kit que combina com você</h2><p className="plans-intro">Quer começar com o essencial? Vá de Básico. Quer explorar muito mais combinações? O Premium traz 100 videoaulas adicionais e 5 bônus exclusivos.</p>
        <div className="plans">
          <article className="plan simple">
            <OptimizedImage sizes="(max-width: 520px) 90vw, 350px" className="basic-mockup" width="800" height="800" src={IMG+"basic-800.webp"} alt="+200 batidas de cachaças artesanais" loading="lazy" decoding="async"/>
            <h3>PLANO BÁSICO — +200 RECEITAS</h3>
            <div className="plan-video-box"><span className="plan-video-icon" aria-hidden="true">▶</span><div><strong>+100 VIDEOAULAS INCLUSAS</strong><small>Passo a passo explicado para acompanhar o preparo.</small></div></div>
            <ul className="checks"><li>+200 receitas de batidas artesanais</li><li>Guia de Batidas em Grandes Quantidades</li><li>20 Batidas Fáceis para Iniciantes</li><li>Material 100% digital</li><li>Acesso imediato após a compra</li></ul>
            <div className="price">R$10,00</div>
            <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>QUERO O BÁSICO — R$10,00</a>
          </article>
          <article className="plan featured">
            <div className="badge">⭐ MELHOR CUSTO-BENEFÍCIO</div>
            <OptimizedImage className="premium-mockup" sizes="(max-width: 520px) 90vw, 390px" width="800" height="800" src={IMG+"premium-800.webp"} alt="Kit completo com mais de 200 batidas de cachaças artesanais" loading="lazy" decoding="async"/>
            <h3>PLANO PREMIUM — +200 RECEITAS + 5 BÔNUS</h3>
            <div className="plan-video-box plan-video-premium"><span className="plan-video-icon" aria-hidden="true">▶</span><div><strong>+200 VIDEOAULAS INCLUSAS</strong><small>Passo a passo explicado • 100 aulas a mais que no Básico.</small></div></div>
            <PremiumDifferentials />
            <ul className="checks"><li>+200 batidas de cachaças artesanais</li><li>Manual de Higiene e de Conservação</li><li>Guia de Precificação e Apresentação Profissional</li><li>50 Drinks e Coquetéis</li><li>Guia de Madeiras e Sabores</li><li>Guia de Harmonização</li><li>50 Combinações Especiais de Sabores</li><li>Guia de Cremosidade Perfeita</li><li>Guia de Ingredientes e Substituições</li><li>Tabela de Medidas e Quantidades</li><li>Guia de Batidas em Grandes Quantidades</li><li>20 Batidas Fáceis para Iniciantes</li><li>Material 100% digital</li><li>Acesso imediato</li><li>Garantia de 7 dias</li></ul>
            <div className="premium-price-label">KIT COMPLETO • PAGAMENTO ÚNICO</div><div className="cash"><strong>R$34,90 à vista</strong></div>
            <a className="cta" href={premiumCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>SIM, QUERO O KIT COMPLETO — R$34,90</a><small>Pagamento único • Acesso imediato • Garantia de 7 dias</small>
          </article>
        </div>
      </section>

      <section className="payment section">
        <h3>🔒 Formas de pagamento</h3>
        <p>Cartão de crédito em até 5x ou Pix</p>
        <div className="pay-icons" aria-label="Formas de pagamento">
          <OptimizedImage src="https://cdn.simpleicons.org/visa/1434CB" alt="Visa" width="56" height="32" loading="lazy" decoding="async"/>
          <OptimizedImage src="https://cdn.simpleicons.org/mastercard/EB001B" alt="Mastercard" width="56" height="32" loading="lazy" decoding="async"/>
          <OptimizedImage src="https://upload.wikimedia.org/wikipedia/commons/1/14/Logotipo_da_Elo.svg" alt="Elo" width="56" height="32" loading="lazy" decoding="async" />
          <OptimizedImage src="https://cdn.simpleicons.org/pix/32BCAD" alt="Pix" width="56" height="32" loading="lazy" decoding="async"/>
        </div>
        <OptimizedImage src={IMG+"selo-compra-segura-600.webp"} alt="Compra segura, satisfação garantida e privacidade protegida" className="seal" loading="lazy" decoding="async"/>
        <OptimizedImage src={IMG+"garantia-7-dias-risco-zero-420.webp"} alt="Selo de garantia de 7 dias com risco zero" loading="lazy" decoding="async" className="guarantee-img"/>
      </section>

      <section className="risk section"><div className="section-kicker">🛡️ VOCÊ COMPRA SEM RISCO</div><h2>Conheça o material por 7 dias</h2><p>Explore o material com tranquilidade. Se precisar solicitar o reembolso dentro do prazo, siga as condições da plataforma.</p><a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🔒 QUERO GARANTIR MEU ACESSO COM SEGURANÇA</a><small className="cta-note">Reembolso garantido em até 7 dias • Sem perguntas</small></section>

      <FAQ />
      <section className="final-cta"><h2>Leve a tradição e os sabores do Brasil para suas próprias batidas.</h2><a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🥃 QUERO ACESSO ÀS +200 BATIDAS</a><small className="cta-note">Compra segura • Pix ou cartão em até 5x</small></section>
      <footer>© 2026 — +200 Batidas de Cachaças Artesanais<br/><small>Material digital educacional destinado a maiores de 18 anos. Aprecie com moderação.</small></footer>

      <a className="fixed-buy-bar" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout} aria-label="Comprar o Kit +200 Batidas por R$10,00">
        <span className="fixed-buy-label">🥃 QUERO O BÁSICO — R$10</span>
        <small>Pagamento único • Pix ou cartão</small>
      </a>
    </main>
  );
}

function FAQ() {
  const items = [
    ["Preciso ter experiência para acompanhar?","Não. O material foi organizado para facilitar a consulta, mesmo para quem está começando."],
    ["Quais sabores vou encontrar?","Você encontrará combinações variadas, infusões com frutas, licores, drinks e outras sugestões."],
    ["Qual a diferença entre Básico e Premium?","O Básico de R$10 inclui as +200 receitas e +100 videoaulas. O Premium de R$34,90 inclui as +200 receitas, +200 videoaulas e os cinco bônus apresentados nesta página. Ambos são digitais e têm pagamento único."],
    ["Vou receber garrafas ou um livro físico?","Não. O produto é 100% digital."],
    ["As videoaulas já estão incluídas?","Sim. O Básico inclui +100 videoaulas e o Premium inclui +200 videoaulas, com explicações passo a passo."],
    ["Como recebo o material?","Após a confirmação da compra, o acesso ao material é disponibilizado digitalmente."],
    ["Funciona no celular?","Sim. Por ser digital, você pode consultar o material pelo celular."],
    ["Tem garantia?","Sim. Você tem 7 dias para conhecer o material e solicitar o reembolso conforme as condições da plataforma."]
  ];
  return (
    <section className="faq section">
      <div className="section-kicker">DÚVIDAS FREQUENTES</div>
      <h2>Perguntas frequentes</h2>
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}<span>+</span></summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}
