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
      { name: "description", content: "Biblioteca de Cachaças Artesanais com mais de 200 batidas, infusões, drinks e materiais extras." },
      { property: "og:title", content: "+200 Batidas de Cachaça Artesanal" },
      { property: "og:description", content: "Para começar a produzir na sua própria casa." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const bonuses = [
  ["BÔNUS 01", "bonus-1-600.webp", "Manual de Higiene e de Conservação", "Conheça os cuidados de higiene, armazenamento e conservação da sua cachaça."],
  ["BÔNUS 02", "bonus-2-600.webp", "Guia de Precificação e Apresentação Profissional", "Organize seus custos e aprimore a apresentação do seu produto artesanal."],
  ["BÔNUS 03", "bonus-3-600.webp", "50 Drinks e Coquetéis", "Explore 50 combinações para levar criatividade e tradição a cada brinde."],
  ["BÔNUS 04", "bonus-4-600.webp", "Guia de Madeiras e Sabores", "Descubra a influência de madeiras como carvalho, amburana, bálsamo e jequitibá."],
  ["BÔNUS 05", "bonus-5-600.webp", "Guia de Harmonização", "Conheça combinações de cachaças, pratos e petiscos para diferentes ocasiões."],
];


function TodayOffer() {
  const [date, setDate] = useState("");
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
    });
    const updateDate = () => setDate(formatter.format(new Date()));
    updateDate();
    const timer = window.setInterval(updateDate, 30_000);
    document.addEventListener("visibilitychange", updateDate);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", updateDate);
    };
  }, []);
  return <div className="topbar">🥃 OFERTA DE HOJE{date ? `, ${date}` : ""} • +200 RECEITAS POR R$10</div>;
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
            <Dialog.Title className="upgrade-title">Leve o Premium por <span>apenas R$17,90</span></Dialog.Title>
            <Dialog.Description className="upgrade-description">Por mais R$7,90 em relação ao Básico, receba as +200 receitas e os cinco bônus para ir além do preparo.</Dialog.Description>
            <div className="upgrade-package">
              <OptimizedImage sizes="145px" src={IMG+"premium-800.webp"} width="800" height="800" alt="Kit digital Premium com receitas e cinco bônus" />
              <div className="upgrade-summary"><strong>+200 receitas<br />+ 5 bônus exclusivos</strong><span>Material 100% digital</span></div>
            </div>
            <ul className="upgrade-benefits">
              {bonuses.map(([, , title]) => <li key={title}><span aria-hidden="true">✓</span>{title}</li>)}
            </ul>
            <div className="upgrade-price"><span>Premium na página: <s>R$24,90</s></span><strong>R$17,90</strong><small>Valor total • Pagamento único</small></div>
            <a className="upgrade-accept" href={upgradeCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>QUERO O PREMIUM POR R$17,90 <span aria-hidden="true">→</span></a>
            <a className="upgrade-decline" href={basicCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>Continuar com o Básico por R$10,00</a>
            <p className="upgrade-trust">🔒 Compra segura · Acesso após o pagamento · Garantia de 7 dias</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <TodayOffer />

      <section className="hero">
        <div className="eyebrow">BIBLIOTECA DE CACHAÇAS ARTESANAIS</div>
        <h1><em>+200 Receitas de Batidas de Cachaça Artesanal</em> Para preparar na sua própria casa</h1>
        <OptimizedImage sizes="(max-width: 520px) 90vw, 560px" className="hero-mockup" src={IMG+"basic-800.webp"} width="800" height="800" fetchPriority="high" decoding="async" alt="Kit +200 Batidas de Cachaças Artesanais" />
        <p className="lead">Receitas passo a passo para preparar em casa, com sabores tradicionais, frutados e cremosos. Consulte o material pelo celular e escolha sua próxima receita.</p>
        <ul className="checks">
          <li>Batidas explicadas passo a passo</li><li>Infusões com frutas do Brasil</li><li>Drinks, licores e combinações variadas</li><li>Material digital para consultar no celular</li>
        </ul>
        <p className="lead"><strong>Plano Básico: R$10,00 • Pagamento único • Material digital</strong></p>
        <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🥃 QUERO AS RECEITAS — R$10,00</a>
        <small className="cta-note">🔒 Pix ou cartão • Garantia de 7 dias</small>
        <p className="cta-note">Produto 100% digital. Acesso após a confirmação do pagamento. Não inclui garrafas ou livros físicos.</p>
        <p className="social-proof">Escolha o Básico por R$10,00 ou o Premium com 5 bônus por R$24,90.</p>
        <div className="micro trust-micro">
          <span><OptimizedImage src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" aria-hidden="true" />WhatsApp</span>
          <span><OptimizedImage src="https://cdn.simpleicons.org/gmail/EA4335" alt="" aria-hidden="true" />E-mail</span>
          <span>Acesso imediato</span>
        </div>
      </section>

      <section className="dark-section preview" id="batidas">
        <div className="section-kicker">+200 BATIDAS NO MATERIAL COMPLETO</div>
        <h2>Tradição e sabores para inspirar suas batidas:</h2>
        <a className="text-link" href="#oferta">Ver batidas completas ↓</a>
        <div className="marquee"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["batida-out07-1-440.webp","batida-out07-2-440.webp","batida-out07-3-440.webp","batida-out07-4-440.webp","batida-out07-5-440.webp","batida-out07-6-440.webp","batida-out07-7-440.webp","batida-out07-8-440.webp"].map((x,i)=><OptimizedImage key={"r"+set+i} sizes="(max-width: 520px) 155px, 170px" src={IMG+x} alt={"Receita de cachaça "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <h2>Uma prévia do que você vai receber</h2>
        <div className="marquee marquee-reverse preview-large"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["previa-set23-6-800.webp","previa-set23-8-800.webp","previa-set23-10-800.webp","previa-set23-3-800.webp","previa-set23-5-800.webp","previa-set23-7-800.webp"].map((x,i)=><OptimizedImage key={"p"+set+i} sizes="(max-width: 520px) 210px, 280px" src={IMG+x} alt={"Prévia "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>QUERO AS +200 BATIDAS POR R$10,00</a>
      </section>

      <section className="how section">
        <div className="section-kicker">COMO FUNCIONA</div><h2>Funciona assim:</h2>
        <div className="steps">
          {[
            ["1","📩","Receba o acesso","Material digital disponível após a compra."],
            ["2","🥃","Escolha uma receita","Explore as batidas e escolha seu próximo sabor."],
            ["3","🍋","Prepare em casa","Separe os ingredientes e siga as orientações da receita."],
            ["4","📸","Fotografe","Registre os detalhes da sua criação artesanal."],
            ["5","💰","Compartilhe","Celebre os sabores brasileiros com responsabilidade."]
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
        <h2>Vá além das receitas com o Plano Premium</h2>
        <p className="section-intro">Os cinco materiais abaixo acompanham somente o Plano Premium de R$24,90. O Básico de R$10 inclui as +200 receitas, sem estes bônus.</p>
        <div className="marquee bonus-marquee"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>bonuses.map(([tag,img,title],i)=><OptimizedImage key={"b"+set+i} sizes="(max-width: 520px) 190px, 220px" src={IMG+img} alt={tag+" — "+title} loading="lazy" decoding="async" />))}</div></div>
        <div className="bonus-grid">
          {bonuses.map(([tag,img,title,desc])=><article className="bonus-card" key={img}><span>{tag}</span><OptimizedImage src={IMG+img} alt={"Capa do "+title} loading="lazy" decoding="async"/><h3>{title}</h3><p>{desc}</p><b>INCLUSO NO PREMIUM</b><div className="bonus-price"><s>R$18,00</s> <strong>POR R$0,00</strong></div><small>Exclusivo do Plano Premium</small></article>)}
        </div>
        <div className="bonus-total"><strong>+200 RECEITAS + 5 BÔNUS</strong><br/><b>Plano Premium: R$24,90</b><span>Prefere começar só com as receitas? Escolha o Básico de R$10,00 na comparação abaixo.</span></div>
        <a className="cta" href="#oferta">COMPARAR BÁSICO E PREMIUM</a>
        <small className="cta-note">Pagamento único • Acesso imediato • Garantia de 7 dias</small>
      </section>

      <section className="secure section">
        <div className="security-card"><h3>🔒 PAGAMENTO 100% SEGURO</h3><p>Confira o valor e os dados do recebedor no checkout antes de confirmar o pagamento.</p></div>
      </section>

      <section className="offer section" id="oferta">
        <div className="section-kicker">ESCOLHA SEU PLANO • PAGAMENTO ÚNICO</div>
        <h2>Escolha como quer começar hoje:</h2>
        <div className="plans">
          <article className="plan simple"><OptimizedImage sizes="(max-width: 520px) 90vw, 350px" className="basic-mockup" width="800" height="800" src={IMG+"basic-800.webp"} alt="+200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>PLANO BÁSICO — +200 RECEITAS</h3><ul className="checks"><li>Material 100% digital</li><li>Acesso imediato após a compra</li></ul><div className="price">R$10,00</div><a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>QUERO O BÁSICO — R$10,00</a></article>
          <article className="plan featured"><div className="badge">⭐ MELHOR CUSTO-BENEFÍCIO</div><OptimizedImage className="premium-mockup" sizes="(max-width: 520px) 90vw, 390px" width="800" height="800" src={IMG+"premium-800.webp"} alt="Kit completo com mais de 200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>PLANO PREMIUM — +200 RECEITAS + 5 BÔNUS</h3><ul className="checks"><li>+200 batidas de cachaças artesanais</li><li>Manual de Higiene e de Conservação</li><li>Guia de Precificação e Apresentação Profissional</li><li>50 Drinks e Coquetéis</li><li>Guia de Madeiras e Sabores</li><li>Guia de Harmonização</li><li>Material 100% digital</li><li>Acesso imediato</li><li>Garantia de 7 dias</li></ul><s>R$97,00</s><div className="installments">5x de <strong>R$5,71</strong></div><div className="cash">ou <strong>R$24,90 à vista</strong></div><a className="cta" href={premiumCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>QUERO O PREMIUM — R$24,90</a><small>Pagamento único • Acesso imediato • Garantia de 7 dias</small></article>
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
    ["Qual a diferença entre Básico e Premium?","O Básico de R$10 inclui as +200 receitas. O Premium de R$24,90 inclui as +200 receitas e os cinco bônus apresentados nesta página. Ambos são digitais e têm pagamento único."],
    ["Vou receber garrafas ou um livro físico?","Não. O produto é 100% digital."],
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
