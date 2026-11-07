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
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" },
      { rel: "preconnect", href: "https://ggcheckout.app", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://ggcheckout.app" },
      { rel: "preload", as: "image", type: "image/avif", imageSrcSet: [320, 480, 640, 800].map(width => `${IMG}basic-${width}.avif ${width}w`).join(", "), imageSizes: "(max-width: 520px) 90vw, 560px", fetchPriority: "high" },
    ],
    meta: [
      { title: "+300 Batidas de Cachaça Artesanal" },
      { name: "description", content: "Mais de 300 receitas de batidas de cachaça artesanal. Básico com 80 videoaulas; Premium com 200 videoaulas e cinco bônus exclusivos." },
      { property: "og:title", content: "+300 Batidas de Cachaça Artesanal" },
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
    const timer = window.setInterval(updateDate, 60_000);
    document.addEventListener("visibilitychange", updateDate);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", updateDate);
    };
  }, []);
  return <div className="topbar">🥃 OFERTA ESPECIAL APENAS PARA HOJE{date ? `, ${date}` : ""}</div>;
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
            <Dialog.Description className="upgrade-description">Por mais R$9,90 em relação ao Básico, receba as +300 receitas, 200 videoaulas passo a passo — 120 aulas a mais que o Básico — e cinco bônus exclusivos.</Dialog.Description>
            <div className="upgrade-package">
              <OptimizedImage sizes="145px" src={IMG+"premium-800.webp"} width="800" height="800" alt="Kit digital Premium com mais de 300 receitas, 200 videoaulas e cinco bônus" />
              <div className="upgrade-summary"><strong>+300 receitas<br />200 videoaulas<br />+ 5 bônus exclusivos</strong><span>Material 100% digital</span></div>
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
        <h1><em>+300 Receitas de Batidas de Cachaça Artesanal</em> <span>para preparar em casa</span></h1>
        <OptimizedImage sizes="(max-width: 520px) 90vw, 560px" className="hero-mockup" src="/cachacas-artesanais-300-receitas-200-videoaulas.webp" width="1254" height="1254" fetchPriority="high" decoding="async" alt="Kit +300 Batidas de Cachaças Artesanais" />
        <p className="lead"><strong>+300 receitas prontas para imprimir ou consultar no celular.</strong> No Premium, você ainda recebe <strong>200 videoaulas para acompanhar cada passo do preparo</strong> e <strong>5 bônus exclusivos</strong>.</p>
        <ul className="checks">
          <li>Batidas de cachaça com frutas e sabores variados</li><li>Receitas artesanais para preparar e servir em casa</li><li>Drinks, licores e combinações com cachaça</li><li>Material digital para consultar no celular ou imprimir</li>
        </ul>
        
          <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🥃 QUERO ACESSAR AGORA</a>
          <p className="social-proof">Das batidas tradicionais às combinações com frutas: descubra receitas para preparar em casa e compartilhar nos churrascos e encontros com amigos.</p>
          <div className="micro trust-micro">
            <span>📱 Digital no celular</span>
            <span>🍓 Receitas variadas</span>
            <span>🥃 Ideal para churrascos e encontros</span>
          </div>
      </section>

      <section className="dark-section preview" id="batidas">
        <div className="section-kicker">+300 BATIDAS NO MATERIAL COMPLETO</div>
        <h2>Tradição e sabores para inspirar suas batidas:</h2>
        <a className="text-link" href="#oferta">Ver batidas completas ↓</a>
        <div className="marquee carousel-cachacas"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["carrossel-novo-1.webp","carrossel-novo-2.webp","carrossel-novo-3.webp","carrossel-novo-4.webp","carrossel-novo-5.webp","carrossel-novo-6.webp","carrossel-novo-7.webp"].map((photo,i)=><OptimizedImage key={"r"+set+i} sizes="(max-width: 520px) 190px, 260px" src={IMG+photo} alt={"Cachaça artesanal — foto "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <h2>Uma prévia do que você vai receber</h2>
        <div className="marquee marquee-reverse preview-large"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["previa-set23-6-800.webp","previa-set23-8-800.webp","previa-set23-10-800.webp","previa-set23-3-800.webp","previa-set23-5-800.webp","previa-set23-7-800.webp"].map((x,i)=><OptimizedImage key={"p"+set+i} sizes="(max-width: 520px) 210px, 280px" src={IMG+x} alt={"Prévia "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>QUERO AS +300 BATIDAS POR R$10,00</a>
      </section>

      <section className="how section">
        <div className="section-kicker">SABORES COM CACHAÇA</div><h2>Receitas para todos os gostos</h2>
        <div className="steps">
          {[
            ["batida-out07-1-440.webp","Cachaças com frutas","Combinações com kiwi, morango, maracujá e outras frutas."],
            ["batida-out07-3-440.webp","Batidas cremosas","Cachaça com coco, frutas e combinações cheias de cremosidade."],
            ["batida-out07-2-440.webp","Caipirinhas de cachaça","Do limão tradicional às versões com frutas variadas."],
            ["batida-out07-4-440.webp","Licores com cachaça","Sabores doces e artesanais para servir em diferentes ocasiões."],
            ["batida-out07-5-440.webp","Infusões artesanais","Frutas e especiarias para explorar novos aromas e sabores."]
          ].map(([photo,title,text])=><article key={title}><OptimizedImage className="step-photo" src={IMG + photo} alt={title} sizes="(max-width: 850px) 108px, 96px" loading="lazy" decoding="async" /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="preview section" aria-label="Receitas com frutas variadas">
        <div className="marquee marquee-reverse preview-large" aria-label="Demonstração de receitas com frutas variadas">
          <div className="marquee-track">
            {[0, 1].flatMap(set => ([
              ["banana-canela", "Banana com Canela"],
              ["cambuci", "Cambuci"],
              ["uvaia", "Uvaia"],
              ["grumixama", "Grumixama"],
              ["araca-boi", "Araçá-boi"],
              ["cambuca", "Cambucá"],
              ["bacuri", "Bacuri"],
              ["abiu", "Abiu"],
             ] as const).map(([file, name]) => <OptimizedImage key={set + file} src={IMG + "receita-frutas-" + file + ".webp"} alt={set === 0 ? "Receita de cachaça de " + name : ""} aria-hidden={set === 1 ? true : undefined} sizes="(max-width: 520px) 232px, 329px" loading="lazy" decoding="async" />))}
          </div>
        </div>
        <a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🥃 QUERO COMEÇAR AGORA — ACESSO IMEDIATO</a>
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
      </section>

      <section className="bonus dark-section bonus-luxe" id="bonus-premium" aria-labelledby="bonus-luxe-title">
        <div className="bonus-luxe__wrap">
          <header className="bonus-luxe__header">
            <div className="bonus-luxe__eyebrow"><span aria-hidden="true">✦</span> EXCLUSIVO DO PLANO PREMIUM <span aria-hidden="true">✦</span></div>
            <h2 id="bonus-luxe-title">5 bônus para aproveitar ainda mais suas batidas</h2>
            <p>Mais ideias, cuidados e técnicas para preparar tudo em casa.</p>
          </header>
          <div className="bonus-luxe__grid">
            {bonuses.map(([tag, img, title, desc], index) => (
              <article className="bonus-luxe__card" key={img}>
                <div className="bonus-luxe__visual">
                  <span className="bonus-luxe__number">{tag}</span>
                  <OptimizedImage src={IMG + img} alt={"Capa do " + title} sizes="(max-width: 680px) 112px, 220px" loading="lazy" decoding="async" />
                </div>
                <div className="bonus-luxe__body">
                  <h3><span aria-hidden="true">{["🛡️", "💰", "🍹", "🪵", "🧀"][index]}</span> {title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="bonus-luxe__footer">
            <div className="bonus-luxe__footer-copy">
              <span className="bonus-luxe__gift" aria-hidden="true">🎁</span>
              <div><strong>Os 5 bônus já estão no Premium</strong><span>Conteúdo extra para deixar seu kit mais completo.</span></div>
            </div>
            <a className="cta bonus-luxe__cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🥃 QUERO ACESSAR AGORA</a>
          </div>
        </div>
      </section>

      <section className="offer section offer-plans-refresh" id="oferta">
        <div className="section-kicker">ESCOLHA SUA VERSÃO</div>
        <h2>Escolha o plano que combina com você</h2>
        <p className="offer-intro">Os dois planos incluem mais de 300 receitas de batidas de cachaça para consultar no celular ou imprimir. Escolha o que prefere.</p>
        <div className="plans">
          <article className="plan featured" id="premium" aria-label="Plano Premium por R$29,90">
            <div className="badge">⭐ MAIS VANTAJOSO • PREMIUM COMPLETO</div>
            <div className="hero-visual premium-plan-art">
              <OptimizedImage className="premium-plan-art__image" sizes="(max-width: 520px) calc(100vw - 72px), 500px" width="1254" height="1254" src="/cachacas-artesanais-300-receitas-200-videoaulas.webp" alt="Kit Premium de batidas de cachaça com receitas e cinco bônus" loading="lazy" decoding="async"/>
            </div>
            <h3>PLANO PREMIUM</h3>
            <p className="plan-subtitle">+300 receitas, 200 videoaulas e 5 bônus exclusivos</p>
            <div className="plan-premium-benefit">🎁 5 BÔNUS EXCLUSIVOS INCLUSOS</div>
            <ul className="checks">
              <li><strong>Mais de 300 receitas</strong> para acessar no celular ou imprimir</li>
              <li><strong>200 videoaulas</strong> passo a passo — 120 aulas a mais que o Básico</li>
              <li><strong>5 bônus exclusivos:</strong> higiene e conservação, precificação, drinks, madeiras e harmonização. <a className="plan-bonus-link" href="#bonus-premium">Ver todos os bônus</a></li>
              <li>Todo o conteúdo do Plano Básico</li>
              <li>Material 100% digital e garantia de 7 dias</li>
            </ul>
            <div className="price">R$29,90</div>
            <a className="cta plan-choice-cta" href={premiumCheckout} onClickCapture={prepareCheckout} onAuxClickCapture={prepareCheckout}>🎁 QUERO O PREMIUM POR R$29,90</a>
          </article>
          <article className="plan simple" id="basico" aria-label="Plano Básico por R$10,00">
            <h3>PLANO BÁSICO</h3>
            <p className="plan-subtitle">+300 receitas e 80 videoaulas passo a passo</p>
            <ul className="checks">
              <li><strong>Mais de 300 receitas</strong> com ingredientes e modo de preparo</li>
              <li><strong>80 videoaulas</strong> passo a passo</li>
              <li>Batidas, infusões e combinações com cachaça</li>
              <li>Receitas para acessar no celular ou imprimir</li>
              <li>Material 100% digital</li>
            </ul>
            <div className="price">R$10,00</div>
            <a className="cta plan-choice-cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🥃 QUERO O BÁSICO POR R$10</a>
          </article>
        </div>
      </section>


      <section className="risk section"><div className="section-kicker">SIMPLES DE ACESSAR E DE PREPARAR</div><h2>Assista, escolha a receita e prepare do seu jeito</h2><p>Use o celular para consultar as receitas e videoaulas ou imprima suas favoritas para acompanhar ingredientes e preparo na cozinha.</p><a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🍹 QUERO COMEÇAR AGORA</a></section>

      <FAQ />
      <section className="final-cta"><h2>Leve a tradição e os sabores do Brasil para suas próprias batidas.</h2><a className="cta" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout}>🥃 QUERO ACESSO ÀS +300 BATIDAS</a><small className="cta-note">Compra segura • Pix ou cartão em até 5x</small></section>
      <footer>© 2026 — +300 Batidas de Cachaças Artesanais<br/><small>Material digital educacional destinado a maiores de 18 anos. Aprecie com moderação.</small></footer>

      <a className="fixed-buy-bar" href={basicCheckout} onClickCapture={offerPremium} onAuxClickCapture={prepareCheckout} aria-label="Comprar o Kit +300 Batidas por R$10,00">
        <span className="fixed-buy-label">🥃 QUERO O BÁSICO — R$10</span>
        <small>Pagamento único • Pix ou cartão</small>
      </a>
    </main>
  );
}

function FAQ() {
  const items = [
    ["Preciso ter experiência para acompanhar?","Não. As receitas e as videoaulas passo a passo ajudam você a acompanhar o preparo, mesmo começando do zero."],
    ["Quais sabores vou encontrar?","Você encontrará combinações variadas, infusões com frutas, licores, drinks e outras sugestões."],
    ["Qual a diferença entre Básico e Premium?","O Básico de R$10 inclui mais de 300 receitas e 80 videoaulas passo a passo. O Premium de R$29,90 inclui as mesmas receitas, 200 videoaulas no total e cinco bônus exclusivos. Ambos são digitais e têm pagamento único."],
    ["Vou receber garrafas ou um livro físico?","Não. O produto é 100% digital."],
    ["Como recebo o material?","Após a confirmação da compra, o acesso ao material é disponibilizado digitalmente."],
    ["Funciona no celular?","Sim. Você pode consultar as receitas e assistir às videoaulas pelo celular. As receitas também podem ser impressas."],
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
