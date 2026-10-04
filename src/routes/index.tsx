import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const IMG = "https://maisde150receitasdecachacas.vercel.app/assets/optimized/";
const CHECKOUT_BASIC = "https://ggcheckout.app/checkout/v5/5SfdPOXyzhseBblYFSS4";
const CHECKOUT_PREMIUM = "https://ggcheckout.app/checkout/v5/EPvjTIozIE5MwFJWpL85";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: "/5116834A-F50E-4E6B-9B7E-8A5CE3A5CBB6.webp", fetchPriority: "high" },
      { rel: "preconnect", href: "https://maisde150receitasdecachacas.vercel.app" },
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

function Index() {

  return (
    <main className="cacha-page">
      <TodayOffer />

      <section className="hero">
        <div className="eyebrow">BIBLIOTECA DE CACHAÇAS ARTESANAIS</div>
        <h1><em>+200 Receitas de Batidas de Cachaça Artesanal</em> Para preparar na sua própria casa</h1>
        <img className="hero-mockup" src="/5116834A-F50E-4E6B-9B7E-8A5CE3A5CBB6.webp" width="800" height="800" fetchPriority="high" decoding="async" alt="Kit +200 Batidas de Cachaças Artesanais" />
        <p className="lead">Receitas passo a passo para preparar em casa, com sabores tradicionais, frutados e cremosos. Consulte o material pelo celular e escolha sua próxima receita.</p>
        <ul className="checks">
          <li>Batidas explicadas passo a passo</li><li>Infusões com frutas do Brasil</li><li>Drinks, licores e combinações variadas</li><li>Material digital para consultar no celular</li>
        </ul>
        <p className="lead"><strong>Plano Básico: R$10,00 • Pagamento único • Material digital</strong></p>
        <a className="cta" href={CHECKOUT_BASIC}>🥃 QUERO AS RECEITAS — R$10,00</a>
        <small className="cta-note">🔒 Pix ou cartão • Garantia de 7 dias</small>
        <p className="cta-note">Produto 100% digital. Acesso após a confirmação do pagamento. Não inclui garrafas ou livros físicos.</p>
        <p className="social-proof">Escolha o Básico por R$10,00 ou o Premium com 5 bônus por R$24,90.</p>
        <div className="micro trust-micro">
          <span><img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" aria-hidden="true" />WhatsApp</span>
          <span><img src="https://cdn.simpleicons.org/gmail/EA4335" alt="" aria-hidden="true" />E-mail</span>
          <span>Acesso imediato</span>
        </div>
      </section>

      <section className="dark-section preview" id="batidas">
        <div className="section-kicker">+200 BATIDAS NO MATERIAL COMPLETO</div>
        <h2>Tradição e sabores para inspirar suas batidas:</h2>
        <a className="text-link" href="#oferta">Ver batidas completas ↓</a>
        <div className="marquee"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["img-6-440.webp","img-9-440.webp","img-1-440.webp","img-4-440.webp","img-7-440.webp","img-2-440.webp","img-5-440.webp"].map((x,i)=><img key={"r"+set+i} src={IMG+x} alt={"Receita de cachaça "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <h2>Uma prévia do que você vai receber</h2>
        <div className="marquee marquee-reverse preview-large"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>["previa-set23-6-800.webp","previa-set23-8-800.webp","previa-set23-10-800.webp","previa-set23-3-800.webp","previa-set23-5-800.webp","previa-set23-7-800.webp"].map((x,i)=><img key={"p"+set+i} src={IMG+x} alt={"Prévia "+(i+1)} loading="lazy" decoding="async" />))}</div></div>
        <a className="cta" href={CHECKOUT_BASIC}>QUERO AS +200 BATIDAS POR R$10,00</a>
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
        <a className="cta" href={CHECKOUT_BASIC}>🥃 QUERO COMEÇAR AGORA — ACESSO IMEDIATO</a>
        <small className="cta-note">🔒 Checkout pela GG Checkout • Garantia de 7 dias</small>
      </section>

      <section className="testimonials section">
        <div className="section-kicker">RESULTADOS COMPARTILHADOS</div>
        <h2>Veja o que dizem sobre o material:</h2>
        <p>Confira os relatos sobre as batidas de cachaças artesanais.</p>
        <div className="testimonial-carousel">
          <div className="testimonial-track">
            {[3,5,2,4,1,3,5,2,4,1].map((n,i)=><article className="quote testimonial-image" key={i}>
              <img src={IMG + "depoimento-" + n + "-600.webp"} alt={"Depoimento " + n + " sobre as batidas de cachaças artesanais"} loading="lazy" decoding="async" />
            </article>)}
          </div>
        </div>
        <a className="cta" href={CHECKOUT_BASIC}>👉 QUERO RECEBER MEU ACESSO AGORA</a>
        <small className="cta-note">🔒 Compra segura • Acesso imediato após o pagamento</small>
      </section>

      <section className="bonus dark-section">
        <div className="section-kicker">5 BÔNUS EXCLUSIVOS DO PLANO PREMIUM</div>
        <h2>Vá além das receitas com o Plano Premium</h2>
        <p className="section-intro">Os cinco materiais abaixo acompanham somente o Plano Premium de R$24,90. O Básico de R$10 inclui as +200 receitas, sem estes bônus.</p>
        <div className="marquee bonus-marquee"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>bonuses.map(([tag,img,title],i)=><img key={"b"+set+i} src={IMG+img} alt={tag+" — "+title} loading="lazy" decoding="async" />))}</div></div>
        <div className="bonus-grid">
          {bonuses.map(([tag,img,title,desc])=><article className="bonus-card" key={img}><span>{tag}</span><img src={IMG+img} alt={"Capa do "+title} loading="lazy" decoding="async"/><h3>{title}</h3><p>{desc}</p><b>INCLUSO NO PREMIUM</b><div className="bonus-price"><s>R$18,00</s> <strong>POR R$0,00</strong></div><small>Exclusivo do Plano Premium</small></article>)}
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
          <article className="plan simple"><img className="basic-mockup" width="800" height="800" src="/5116834A-F50E-4E6B-9B7E-8A5CE3A5CBB6.webp" alt="+200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>PLANO BÁSICO — +200 RECEITAS</h3><ul className="checks"><li>Material 100% digital</li><li>Acesso imediato após a compra</li></ul><div className="price">R$10,00</div><a className="cta" href={CHECKOUT_BASIC}>QUERO O BÁSICO — R$10,00</a></article>
          <article className="plan featured"><div className="badge">⭐ MELHOR CUSTO-BENEFÍCIO</div><img width="800" height="800" src="/704AF2B4-946F-437D-B364-D4AB9BCAD364.webp" alt="Kit completo com mais de 200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>PLANO PREMIUM — +200 RECEITAS + 5 BÔNUS</h3><ul className="checks"><li>+200 batidas de cachaças artesanais</li><li>Manual de Higiene e de Conservação</li><li>Guia de Precificação e Apresentação Profissional</li><li>50 Drinks e Coquetéis</li><li>Guia de Madeiras e Sabores</li><li>Guia de Harmonização</li><li>Material 100% digital</li><li>Acesso imediato</li><li>Garantia de 7 dias</li></ul><s>R$97,00</s><div className="installments">5x de <strong>R$4,98</strong></div><div className="cash">ou <strong>R$24,90 à vista</strong></div><a className="cta" href={CHECKOUT_PREMIUM}>QUERO O PREMIUM — R$24,90</a><small>Pagamento único • Acesso imediato • Garantia de 7 dias</small></article>
        </div>
      </section>

      <section className="payment section">
        <h3>🔒 Formas de pagamento</h3>
        <p>Cartão de crédito em até 5x sem juros ou Pix aprovado na hora</p>
        <div className="pay-icons" aria-label="Formas de pagamento">
          <img src="https://cdn.simpleicons.org/visa/1434CB" alt="Visa" width="56" height="32" loading="lazy" decoding="async"/>
          <img src="https://cdn.simpleicons.org/mastercard/EB001B" alt="Mastercard" width="56" height="32" loading="lazy" decoding="async"/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/Logotipo_da_Elo.svg" alt="Elo" width="56" height="32" loading="lazy" decoding="async" />
          <img src="https://cdn.simpleicons.org/pix/32BCAD" alt="Pix" width="56" height="32" loading="lazy" decoding="async"/>
        </div>
        <img src={IMG+"selo-compra-segura-600.webp"} alt="Compra segura, satisfação garantida e privacidade protegida" className="seal" loading="lazy" decoding="async"/>
        <img src={IMG+"garantia-7-dias-risco-zero-420.webp"} alt="Selo de garantia de 7 dias com risco zero" loading="lazy" decoding="async" className="guarantee-img"/>
      </section>

      <section className="risk section"><div className="section-kicker">🛡️ VOCÊ COMPRA SEM RISCO</div><h2>Conheça o material por 7 dias</h2><p>Explore o material com tranquilidade. Se precisar solicitar o reembolso dentro do prazo, siga as condições da plataforma.</p><a className="cta" href={CHECKOUT_BASIC}>🔒 QUERO GARANTIR MEU ACESSO COM SEGURANÇA</a><small className="cta-note">Reembolso garantido em até 7 dias • Sem perguntas</small></section>

      <FAQ />
      <section className="final-cta"><h2>Leve a tradição e os sabores do Brasil para suas próprias batidas.</h2><a className="cta" href={CHECKOUT_BASIC}>🥃 QUERO ACESSO ÀS +200 BATIDAS</a><small className="cta-note">Compra segura • Pix ou cartão em até 5x</small></section>
      <footer>© 2026 — +200 Batidas de Cachaças Artesanais<br/><small>Material digital educacional destinado a maiores de 18 anos. Aprecie com moderação.</small></footer>

      <a className="fixed-buy-bar" href={CHECKOUT_BASIC} aria-label="Comprar o Kit +200 Batidas por R$10,00">
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
