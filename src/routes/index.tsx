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
  ["BÔNUS 01", "bonus-1-600.webp", "Manual de Higiene e de Conservação", "Aprenda cuidados importantes de higiene e conservação para preparar e armazenar suas bebidas com mais segurança."],
  ["BÔNUS 02", "bonus-2-600.webp", "Guia de Precificação e Apresentação Profissional", "Entenda melhor os custos e veja formas de apresentar suas criações artesanais com mais capricho."],
  ["BÔNUS 03", "bonus-3-600.webp", "50 Drinks e Coquetéis", "Tenha mais 50 ideias de drinks e coquetéis para variar suas receitas e experimentar novas combinações."],
  ["BÔNUS 04", "bonus-4-600.webp", "Guia de Madeiras e Sabores", "Conheça como madeiras como carvalho, amburana, bálsamo e jequitibá influenciam aromas e sabores."],
  ["BÔNUS 05", "bonus-5-600.webp", "Guia de Harmonização", "Descubra sugestões de combinações com pratos e petiscos para servir em diferentes ocasiões."],
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
  return <div className="topbar">🥃 OFERTA DE HOJE{date ? `, ${date}` : ""} • BÁSICO R$10 • PREMIUM R$29,90</div>;
}

const CHECKOUT_PREMIUM_UPGRADE = "https://ggcheckout.app/checkout/v5/OUw0ZukdRUiMvA1DYVk2";

function Index() {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeShown, setUpgradeShown] = useState(false);
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
    if (!CHECKOUT_PREMIUM_UPGRADE || upgradeShown || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    // Capture the click before checkout pixels intercept it at the link.
    // Only the final checkout choice should be tracked as InitiateCheckout.
    event.stopPropagation();
    setBasicCheckout(event.currentTarget.href);
    setUpgradeCheckout(getTrackedCheckoutUrl(CHECKOUT_PREMIUM_UPGRADE, event.currentTarget.href));
    setUpgradeShown(true);
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
            <Dialog.Description className="upgrade-description">Por apenas R$9,90 a mais que o Básico, leve as +200 receitas e 5 guias para conservar, harmonizar e apresentar suas bebidas com mais recursos.</Dialog.Description>
            <div className="upgrade-package">
              <OptimizedImage sizes="145px" src={IMG+"premium-800.webp"} width="800" height="800" alt="Kit digital Premium com receitas e cinco bônus" />
              <div className="upgrade-summary"><strong>+200 receitas<br />+ 5 bônus exclusivos</strong><span>Material 100% digital</span></div>
            </div>
            <ul className="upgrade-benefits">
              {bonuses.map(([, , title]) => <li key={title}><span aria-hidden="true">✓</span>{title}</li>)}
            </ul>
            <div className="upgrade-price"><span>Premium na página: <s>R$29,90</s></span><strong>R$19,90</strong><small>Valor total • Pagamento único</small></div>
            <a className="upgrade-accept" href={upgradeCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>QUERO O PREMIUM POR R$19,90 <span aria-hidden="true">→</span></a>
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
        <p className="lead"><strong>Escolha entre o Básico com as receitas e o Premium com 5 guias especiais.</strong></p>
        <a className="cta" href="#comparar-planos">🥃 CONHECER O KIT COMPLETO</a>
        <small className="cta-note">🔒 Pix ou cartão • Garantia de 7 dias</small>
        <p className="cta-note">Produto 100% digital. Acesso após a confirmação do pagamento. Não inclui garrafas ou livros físicos.</p>
        <p className="social-proof">Premium com +200 receitas e 5 bônus, ou Básico para começar somente com as receitas.</p>
        <div className="micro trust-micro">
          <span><OptimizedImage src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" aria-hidden="true" />WhatsApp</span>
          <span><OptimizedImage src="https://cdn.simpleicons.org/gmail/EA4335" alt="" aria-hidden="true" />E-mail</span>
          <span>Acesso imediato</span>
        </div>
      </section>


      <section className="quick-compare section" id="comparar-planos" aria-labelledby="quick-compare-title">
        <div className="section-kicker">ESCOLHA O PACOTE IDEAL PARA VOCÊ</div>
        <h2 id="quick-compare-title">🥃 Você pode levar apenas as receitas... ou ter o kit completo!</h2>
        <p className="quick-compare-intro">Com o Plano Premium, além das +200 receitas, você recebe 5 guias especiais para aprender sobre conservação, novas combinações, harmonização, apresentação e muito mais.</p>
        <p className="quick-compare-difference">Tudo isso por apenas <strong>R$19,90 a mais</strong> que o Básico.</p>
        <p className="quick-compare-value-note">Você leva os 5 guias extras por uma diferença equivalente a <strong>R$3,98 por guia</strong>, além das receitas já incluídas.</p>
        <div className="quick-compare-grid">
          <article className="quick-plan quick-plan-premium">
            <span className="quick-plan-tag">⭐ KIT COMPLETO • 6 MATERIAIS DIGITAIS</span>
            <OptimizedImage className="quick-plan-image" src={IMG+"premium-800.webp"} sizes="(max-width: 767px) 180px, 210px" alt="Kit Premium com mais de 200 receitas e cinco guias extras" loading="lazy" decoding="async" />
            <h3>Plano Premium</h3>
            <p className="quick-plan-summary">Tudo do Básico e mais <strong>5 guias exclusivos</strong> para você aproveitar melhor cada receita.</p>
            <ul className="quick-premium-points">
              <li>Cuidados de higiene e conservação</li>
              <li>50 novas ideias de drinks e coquetéis</li>
              <li>Harmonização, sabores e apresentação</li>
            </ul>
            <div className="quick-plan-price">R$29,90</div>
            <p className="quick-plan-price-note">Somente R$19,90 a mais pelo kit completo</p>
            <a className="cta" href={premiumCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>QUERO O KIT COMPLETO</a>
            <small>Pagamento único • Acesso digital • Garantia de 7 dias</small>
          </article>
          <article className="quick-plan quick-plan-basic">
            <span className="quick-plan-label">OPÇÃO ESSENCIAL</span>
            <h3>Plano Básico</h3>
            <p className="quick-plan-summary">A biblioteca com mais de 200 receitas para preparar em casa, sem os 5 guias extras.</p>
            <div className="quick-plan-price">R$10,00</div>
            <a className="quick-basic-link" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>Quero somente as receitas por R$10,00 →</a>
            <small>Pagamento único • Acesso digital • Garantia de 7 dias</small>
          </article>
        </div>
        <a className="quick-compare-more" href="#oferta">Ver a comparação detalhada dos planos ↓</a>
      </section>

      <section className="dark-section preview" id="batidas">
        <div className="section-kicker">+200 BATIDAS NO MATERIAL COMPLETO</div>
        <h2>Tradição e sabores para inspirar suas batidas:</h2>
        <a className="text-link" href="#oferta">Ver batidas completas ↓</a>
        <div className="marquee"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["batida-out07-1-440.webp","batida-out07-2-440.webp","batida-out07-3-440.webp","batida-out07-4-440.webp","batida-out07-5-440.webp","batida-out07-6-440.webp","batida-out07-7-440.webp","batida-out07-8-440.webp"].map((x,i)=><OptimizedImage key={"r"+set+i} sizes="(max-width: 520px) 155px, 170px" src={IMG+x} alt={"Receita de cachaça "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <h2>Uma prévia do que você vai receber</h2>
        <div className="marquee marquee-reverse preview-large"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["previa-set23-6-800.webp","previa-set23-8-800.webp","previa-set23-10-800.webp","previa-set23-3-800.webp","previa-set23-5-800.webp","previa-set23-7-800.webp"].map((x,i)=><OptimizedImage key={"p"+set+i} sizes="(max-width: 520px) 210px, 280px" src={IMG+x} alt={"Prévia "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <a className="cta" href="#oferta">CONHECER O PREMIUM + 5 BÔNUS</a>
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
        <a className="cta" href="#oferta">COMPARAR OS PLANOS</a>
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
        <a className="cta" href="#oferta">CONHECER O KIT COMPLETO</a>
        <small className="cta-note">🔒 Compra segura • Acesso imediato após o pagamento</small>
      </section>

      <section className="bonus dark-section">
        <div className="section-kicker">5 BÔNUS EXCLUSIVOS DO PLANO PREMIUM</div>
        <h2>Com o Premium, você aproveita muito mais que as receitas</h2>
        <p className="section-intro">Aprenda cuidados de conservação, descubra novas combinações, organize custos e saiba como harmonizar suas criações. Esses cinco guias acompanham somente o Premium de R$29,90; o Básico de R$10 inclui as receitas.</p>
        <div className="marquee bonus-marquee"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>bonuses.map(([tag,img,title],i)=><OptimizedImage key={"b"+set+i} sizes="(max-width: 520px) 190px, 220px" src={IMG+img} alt={tag+" — "+title} loading="lazy" decoding="async" />))}</div></div>
        <div className="bonus-grid">
          {bonuses.map(([tag,img,title,desc])=><article className="bonus-card" key={img}><span>{tag}</span><OptimizedImage src={IMG+img} alt={"Capa do "+title} loading="lazy" decoding="async"/><h3>{title}</h3><p>{desc}</p><b>GUIA COMPLEMENTAR</b><div className="bonus-price"><strong>✓ INCLUSO NO PREMIUM</strong></div><small>Não incluso no Básico</small></article>)}
        </div>
        <div className="bonus-total"><strong>UMA BIBLIOTECA COMPLETA + 5 GUIAS PARA IR ALÉM</strong><br/><b>Premium: R$29,90</b><span>Por uma diferença de R$19,90 em relação ao Básico, leve os 5 guias extras — equivalente a R$3,98 por guia.</span><span>Prefere somente as receitas? O Básico de R$10,00 continua disponível.</span></div>
        <a className="cta" href="#oferta">COMPARAR BÁSICO E PREMIUM</a>
        <small className="cta-note">Pagamento único • Acesso imediato • Garantia de 7 dias</small>
      </section>

      <section className="secure section">
        <div className="security-card"><h3>🔒 PAGAMENTO 100% SEGURO</h3><p>Confira o valor e os dados do recebedor no checkout antes de confirmar o pagamento.</p></div>
      </section>

      <section className="offer section" id="oferta">
        <div className="section-kicker">ESCOLHA SEU PLANO • PAGAMENTO ÚNICO</div>
        <h2>Escolha como quer começar hoje:</h2><p className="offer-intro">🥃 Você pode levar apenas as receitas... ou ter o kit completo! O Premium traz os mesmos +200 preparos do Básico e cinco guias complementares para aproveitar ainda mais.</p><p className="offer-difference">Tudo isso por apenas <strong>R$19,90 a mais</strong> que o Básico — com os 5 guias extras já incluídos.</p>
        <div className="plans">
          <article className="plan simple"><OptimizedImage sizes="(max-width: 520px) 90vw, 350px" className="basic-mockup" width="800" height="800" src={IMG+"basic-800.webp"} alt="+200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>PLANO BÁSICO — +200 RECEITAS</h3><ul className="checks"><li>Material 100% digital</li><li>Acesso imediato após a compra</li></ul><div className="price">R$10,00</div><a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>QUERO O BÁSICO — R$10,00</a></article>
          <article className="plan featured"><div className="badge">⭐ PREMIUM • KIT MAIS COMPLETO</div><OptimizedImage className="premium-mockup" sizes="(max-width: 520px) 90vw, 390px" width="800" height="800" src={IMG+"premium-800.webp"} alt="Kit completo com mais de 200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>PLANO PREMIUM — +200 RECEITAS + 5 GUIAS EXCLUSIVOS</h3><ul className="checks"><li>+200 batidas de cachaças artesanais</li><li><strong>Higiene e Conservação:</strong> cuidados para armazenar suas bebidas</li><li><strong>Precificação e Apresentação:</strong> organize custos e capriche na apresentação</li><li><strong>50 Drinks e Coquetéis:</strong> mais opções para experimentar</li><li><strong>Madeiras e Sabores:</strong> entenda como os aromas podem mudar</li><li><strong>Harmonização:</strong> ideias para combinar com pratos e petiscos</li><li>Material 100% digital</li><li>Acesso imediato</li><li>Garantia de 7 dias</li></ul><div className="featured-value-note"><strong>Mais 5 guias no seu pacote</strong><span>A diferença para o Básico é de R$19,90 no total — equivalente a R$3,98 por guia extra.</span></div><div className="installments">5x de <strong>R$5,98</strong></div><div className="cash">ou <strong>R$29,90 à vista</strong></div><a className="cta" href={premiumCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>QUERO O PREMIUM — R$29,90</a><small>Pagamento único • Acesso imediato • Garantia de 7 dias</small></article>
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

      <section className="risk section"><div className="section-kicker">🛡️ VOCÊ COMPRA SEM RISCO</div><h2>Conheça o material por 7 dias</h2><p>Explore o material com tranquilidade. Se precisar solicitar o reembolso dentro do prazo, siga as condições da plataforma.</p><a className="cta" href="#oferta">🔒 ESCOLHER MEU PLANO COM SEGURANÇA</a><small className="cta-note">Reembolso garantido em até 7 dias • Sem perguntas</small></section>

      <FAQ />
      <section className="final-cta"><h2>Leve a tradição e os sabores do Brasil para suas próprias batidas.</h2><a className="cta" href="#oferta">🥃 CONHECER O KIT COMPLETO</a><small className="cta-note">Compra segura • Pix ou cartão em até 5x</small></section>
      <footer>© 2026 — +200 Batidas de Cachaças Artesanais<br/><small>Material digital educacional destinado a maiores de 18 anos. Aprecie com moderação.</small></footer>

      <a className="fixed-buy-bar" href="#comparar-planos" aria-label="Comparar o Plano Premium e o Plano Básico">
        <span className="fixed-buy-label">🥃 CONHECER O KIT COMPLETO</span>
        <small>Premium R$29,90 • Básico R$10,00</small>
      </a>
    </main>
  );
}

function FAQ() {
  const items = [
    ["Preciso ter experiência para acompanhar?","Não. O material foi organizado para facilitar a consulta, mesmo para quem está começando."],
    ["Quais sabores vou encontrar?","Você encontrará combinações variadas, infusões com frutas, licores, drinks e outras sugestões."],
    ["Qual a diferença entre Básico e Premium?","O Básico de R$10 inclui as +200 receitas. O Premium de R$29,90 inclui as +200 receitas e os cinco bônus apresentados nesta página. Ambos são digitais e têm pagamento único."],
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
