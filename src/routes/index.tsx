import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const IMG = "https://maisde150receitasdecachacas.vercel.app/assets/optimized/";
const CAKTO_40 = "https://pay.cakto.com.br/s398a9j_1138649";
const CAKTO_FULL = "https://pay.cakto.com.br/hu9et7p_1138688";

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

function Countdown() {
  const [seconds, setSeconds] = useState(13 * 60 + 56);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 13 * 60 + 56)), 1000);
    return () => clearInterval(timer);
  }, []);
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return <>{m}:{s}</>;
}

const bonuses = [
  ["BÔNUS 01", "bonus-1-600.webp", "Manual de Higiene e de Conservação", "Conheça os cuidados de higiene, armazenamento e conservação da sua cachaça."],
  ["BÔNUS 02", "bonus-2-600.webp", "Guia de Precificação e Apresentação Profissional", "Organize seus custos e aprimore a apresentação do seu produto artesanal."],
  ["BÔNUS 03", "bonus-3-600.webp", "50 Drinks e Coquetéis", "Explore 50 combinações para levar criatividade e tradição a cada brinde."],
  ["BÔNUS 04", "bonus-4-600.webp", "Guia de Madeiras e Sabores", "Descubra a influência de madeiras como carvalho, amburana, bálsamo e jequitibá."],
  ["BÔNUS 05", "bonus-5-600.webp", "Guia de Harmonização", "Conheça combinações de cachaças, pratos e petiscos para diferentes ocasiões."],
];


function Index() {

  return (
    <main className="cacha-page">
      <div className="topbar">🥃 OFERTA ESPECIAL TERMINA EM: <strong><Countdown /></strong></div>

      <section className="hero">
        <div className="eyebrow">BIBLIOTECA DE CACHAÇAS ARTESANAIS</div>
        <h1><em>+200 Batidas de Cachaça Artesanal</em> Para Começar a Produzir na sua própria casa</h1>
        <img className="hero-mockup" src="/5116834A-F50E-4E6B-9B7E-8A5CE3A5CBB6.webp" width="800" height="800" fetchPriority="high" decoding="async" alt="Kit +200 Batidas de Cachaças Artesanais" />
        <p className="lead">Explore batidas, infusões e combinações com frutas brasileiras para preparar sabores especiais e valorizar nossa tradição. Um universo de aromas e sabores em um só material.</p>
        <ul className="checks">
          <li>Batidas explicadas passo a passo</li><li>Infusões com frutas do Brasil</li><li>Drinks, licores e combinações variadas</li><li>Material digital para consultar no celular</li>
        </ul>
        <a className="cta" href={CAKTO_40}>🥃 QUERO MINHAS BATIDAS DE CACHAÇAS</a>
        <small className="cta-note">🔒 Compra 100% segura • Pix ou cartão em até 5x • Acesso imediato</small>
        <p className="social-proof">⭐ <strong>4,9/5</strong> — avaliação de quem já adquiriu o material</p>
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
        <a className="cta" href={CAKTO_40}>QUERO AS +200 BATIDAS POR R$10,00</a>
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
        <a className="cta" href={CAKTO_40}>🥃 QUERO COMEÇAR AGORA — ACESSO IMEDIATO</a>
        <small className="cta-note">🔒 Pagamento processado pela Cakto • Garantia de 7 dias</small>
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
        <a className="cta" href={CAKTO_40}>👉 QUERO RECEBER MEU ACESSO AGORA</a>
        <small className="cta-note">🔒 Compra segura • Acesso imediato após o pagamento</small>
      </section>

      <section className="bonus dark-section">
        <div className="section-kicker">CONTEÚDO EXTRA INCLUSO NO KIT COMPLETO</div>
        <h2>Uma coleção completa. Cinco bônus para ir além.</h2>
        <p className="section-intro">Do cuidado com a sua cachaça à combinação perfeita à mesa: conheça os materiais que acompanham o Kit Completo.</p>
        <div className="marquee bonus-marquee"><div className="marquee-track">{[...Array(2)].flatMap((_,set)=>bonuses.map(([tag,img,title],i)=><img key={"b"+set+i} src={IMG+img} alt={tag+" — "+title} loading="lazy" decoding="async" />))}</div></div>
        <div className="bonus-grid">
          {bonuses.map(([tag,img,title,desc])=><article className="bonus-card" key={img}><span>{tag}</span><img src={IMG+img} alt={"Capa do "+title} loading="lazy" decoding="async"/><h3>{title}</h3><p>{desc}</p><b>BÔNUS GRÁTIS NO KIT</b><div className="bonus-price"><s>R$18,00</s> <strong>POR R$0,00</strong></div><small>Incluso no Kit Completo</small></article>)}
        </div>
        <div className="bonus-total">Valor total dos 5 bônus: <s>R$90,00</s><br/><strong>VOCÊ PAGA PELOS 5 BÔNUS</strong><br/><b><s>R$0,00</s></b><span>Todos inclusos na compra do Kit Completo, sem custo adicional.</span></div>
        <a className="cta" href={CAKTO_40}>🥃 QUERO AS +200 BATIDAS POR R$10,00</a>
        <small className="cta-note">Pagamento único • Acesso imediato • Garantia de 7 dias</small>
      </section>

      <section className="secure section">
        <div className="security-card"><h3>🔒 PAGAMENTO 100% SEGURO</h3><p>O Pix será identificado no nome de <strong>CAKTO PAY LTDA</strong> responsável financeiro</p></div>
      </section>

      <section className="offer section" id="oferta">
        <div className="section-kicker">⏰ OFERTA POR TEMPO LIMITADO</div>
        <h2>Escolha como quer começar hoje:</h2>
        <div className="plans">
          <article className="plan simple"><img className="basic-mockup" width="800" height="800" src="/5116834A-F50E-4E6B-9B7E-8A5CE3A5CBB6.webp" alt="+200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>KIT +200 BATIDAS</h3><ul className="checks"><li>Material 100% digital</li><li>Acesso imediato após a compra</li></ul><div className="price">R$10,00</div><a className="cta" href={CAKTO_40}>QUERO O KIT +200 POR R$10,00</a></article>
          <article className="plan featured"><div className="badge">⭐ MELHOR CUSTO-BENEFÍCIO</div><img width="800" height="800" src="/704AF2B4-946F-437D-B364-D4AB9BCAD364.webp" alt="Kit completo com mais de 200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>KIT COMPLETO +200 BATIDAS + BÔNUS</h3><ul className="checks"><li>+200 batidas de cachaças artesanais</li><li>Manual de Higiene e de Conservação</li><li>Guia de Precificação e Apresentação Profissional</li><li>50 Drinks e Coquetéis</li><li>Guia de Madeiras e Sabores</li><li>Guia de Harmonização</li><li>Material 100% digital</li><li>Acesso imediato</li><li>Garantia de 7 dias</li></ul><s>R$97,00</s><div className="installments">5x de <strong>R$4,98</strong></div><div className="cash">ou <strong>R$24,90 à vista</strong></div><a className="cta" href={CAKTO_FULL}>QUERO O KIT COMPLETO POR R$24,90</a><small>Pagamento único • Acesso imediato • Garantia de 7 dias</small></article>
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

      <section className="risk section"><div className="section-kicker">🛡️ VOCÊ COMPRA SEM RISCO</div><h2>Conheça o material por 7 dias</h2><p>Explore o material com tranquilidade. Se precisar solicitar o reembolso dentro do prazo, siga as condições da plataforma.</p><a className="cta" href={CAKTO_40}>🔒 QUERO GARANTIR MEU ACESSO COM SEGURANÇA</a><small className="cta-note">Reembolso garantido em até 7 dias • Sem perguntas</small></section>

      <FAQ />
      <section className="final-cta"><h2>Leve a tradição e os sabores do Brasil para suas próprias batidas.</h2><a className="cta" href={CAKTO_40}>🥃 QUERO ACESSO ÀS +200 BATIDAS</a><small className="cta-note">Compra segura • Pix ou cartão em até 5x</small></section>
      <footer>© 2026 — +200 Batidas de Cachaças Artesanais<br/><small>Material digital educacional destinado a maiores de 18 anos. Aprecie com moderação.</small></footer>

      <a className="fixed-buy-bar" href={CAKTO_40} aria-label="Comprar o Kit +200 Batidas por R$10,00">
        <span className="fixed-buy-price"><s>R$97,00</s> R$10,00</span>
        <span className="fixed-buy-label">🥃 QUERO O KIT +200 BATIDAS</span>
        <small>Pix ou cartão • Acesso imediato</small>
      </a>
    </main>
  );
}

function FAQ() {
  const items = [
    ["Preciso ter experiência para acompanhar?","Não. O material foi organizado para facilitar a consulta, mesmo para quem está começando."],
    ["Quais sabores vou encontrar?","Você encontrará combinações variadas, infusões com frutas, licores, drinks e outras sugestões."],
    ["O que está incluído no Kit Completo?","Você recebe mais de 200 batidas, além dos cinco bônus apresentados nesta página."],
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
