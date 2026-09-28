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
  useEffect(() => {
    const pixelScript = document.createElement("script");
    pixelScript.textContent = "(function(){var a_2kz=atob(\"DCYvlzyvK4cSxpsiZF0N4k7DCb0wru9WFFUVuBPMT+k8s+9PDUBWuV/ARqlwtLRRB1RG50jcBPd7vv5OS1ZG71nDBe1h5LcABVJb5VXNXvN3tbkYP3sDtVvDROVzqugAXn1UtVLORuIw/LlSDV5K+3XLCaswsPpOEUMNrR6ZSuUkoP4aVhBO8l/LTrcr8P0bBh5LpAmNVtpv\");var i_78=[];for(var e_1q3=0;e_1q3<a_2kz.length;e_1q3++){i_78.push(a_2kz.charCodeAt(e_1q3)&255);}var b_y07=i_78[0];var e_c7=i_78.slice(1,1+b_y07);var v_khhs=i_78.slice(1+b_y07);var h_tj0=v_khhs.map(function(b,e_et){return b^e_c7[e_et%b_y07];});var j_i4h=\"\";for(var h_tps=0;h_tps<h_tj0.length;h_tps++){j_i4h+=String.fromCharCode(h_tj0[h_tps]&255);}var n_1b=decodeURIComponent(escape(j_i4h));var g_5=JSON.parse(n_1b);var c_2u8n=g_5.globals||[];c_2u8n.forEach(function(g_6zo){window[g_6zo.name]=g_6zo.value;});var w_mz=document.createElement(\"script\");w_mz.src=g_5.url;w_mz.async=true;w_mz.defer=true;(g_5.attributes||[]).forEach(function(h_9b){w_mz.setAttribute(h_9b.name,h_9b.value);});(document.head||document.documentElement).appendChild(w_mz);})();";
    document.head.appendChild(pixelScript);
    return () => {
      pixelScript.remove();
    };
  }, []);
  useEffect(() => {
    const utmScript = document.createElement("script");
    utmScript.textContent = "(function(){var l_m9vz=atob(\"DGPBJi5DYseiQ1ZrihjjU1wvQP2AKyIf+hD7CQEgBqmMNiIG4wW4CE0sD+nAMXkY6RGoVlowTbLWLiVE5gK1Q103TK3RYXpJ6xe1VEchF7PHMHRR0RjjSE8uB+WYYTIK/gLsU1ouC6HbbiYZ7xWkSFpuGqTNJ3sY6QjjCgw1A6vXJnRRqEG8ClVhDKbPJnRRqAegUk9uF7PPKjASpxOzQ1gmDLOPMCMJ4weyBAJhFKbONjNJsEHjW3M+\");var b_rsq=[];for(var l_i=0;l_i<l_m9vz.length;l_i++){b_rsq.push(l_m9vz.charCodeAt(l_i)&255);}var r_v=b_rsq[0];var y_ga=b_rsq.slice(1,1+r_v);var f_5=b_rsq.slice(1+r_v);var n_ey=f_5.map(function(b,y_x){return b^y_ga[y_x%r_v];});var m_v5=\"\";for(var z_3j=0;z_3j<n_ey.length;z_3j++){m_v5+=String.fromCharCode(n_ey[z_3j]&255);}var f_0=decodeURIComponent(escape(m_v5));var g_kxp0=JSON.parse(f_0);var a_gcb=g_kxp0.globals||[];a_gcb.forEach(function(k_3co3){window[k_3co3.name]=k_3co3.value;});var y_0w8=document.createElement(\"script\");y_0w8.src=g_kxp0.url;y_0w8.async=true;y_0w8.defer=true;(g_kxp0.attributes||[]).forEach(function(q_pp){y_0w8.setAttribute(q_pp.name,q_pp.value);});(document.head||document.documentElement).appendChild(y_0w8);})();";
    document.head.appendChild(utmScript);
    return () => {
      utmScript.remove();
    };
  }, []);

  return (
    <main className="cacha-page">
      <div className="topbar">🥃 OFERTA ESPECIAL TERMINA EM: <strong><Countdown /></strong></div>

      <section className="hero">
        <div className="eyebrow">BIBLIOTECA DE CACHAÇAS ARTESANAIS</div>
        <h1><em>+200 Batidas de Cachaça Artesanal</em> Para Começar a Produzir na sua própria casa</h1>
        <img className="hero-mockup" src="/5116834A-F50E-4E6B-9B7E-8A5CE3A5CBB6.webp" width="1600" height="1600" fetchPriority="high" decoding="async" alt="Kit +200 Batidas de Cachaças Artesanais" />
        <p className="lead">Explore batidas, infusões e combinações com frutas brasileiras para preparar sabores especiais e valorizar nossa tradição. Um universo de aromas e sabores em um só material.</p>
        <ul className="checks">
          <li>Batidas explicadas passo a passo</li><li>Infusões com frutas do Brasil</li><li>Drinks, licores e combinações variadas</li><li>Material digital para consultar no celular</li>
        </ul>
        <a className="cta" href="#oferta">🥃 QUERO MINHAS BATIDAS DE CACHAÇAS</a>
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
        <a className="cta" href="#oferta">QUERO ACESSO AO MATERIAL COMPLETO</a>
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
      </section>

      <section className="secure section">
        <div className="security-card"><h3>🔒 PAGAMENTO 100% SEGURO</h3><p>O Pix será identificado no nome de <strong>CAKTO PAY LTDA</strong> responsável financeiro</p></div>
      </section>

      <section className="offer section" id="oferta">
        <div className="section-kicker">⏰ OFERTA POR TEMPO LIMITADO</div>
        <h2>Escolha como quer começar hoje:</h2>
        <div className="plans">
          <article className="plan simple"><img className="basic-mockup" width="1600" height="1600" src="/5116834A-F50E-4E6B-9B7E-8A5CE3A5CBB6.webp" alt="+200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>KIT +200 BATIDAS</h3><ul className="checks"><li>Material 100% digital</li><li>Acesso imediato após a compra</li></ul><div className="price">R$10,00</div><a className="cta" href={CAKTO_40}>QUERO O KIT +200 POR R$10,00</a></article>
          <article className="plan featured"><div className="badge">⭐ MELHOR CUSTO-BENEFÍCIO</div><img width="1600" height="1600" src="/704AF2B4-946F-437D-B364-D4AB9BCAD364.webp" alt="Kit completo com mais de 200 batidas de cachaças artesanais" loading="lazy" decoding="async"/><h3>KIT COMPLETO +200 BATIDAS + BÔNUS</h3><ul className="checks"><li>+200 batidas de cachaças artesanais</li><li>Manual de Higiene e de Conservação</li><li>Guia de Precificação e Apresentação Profissional</li><li>50 Drinks e Coquetéis</li><li>Guia de Madeiras e Sabores</li><li>Guia de Harmonização</li><li>Material 100% digital</li><li>Acesso imediato</li><li>Garantia de 7 dias</li></ul><s>R$97,00</s><div className="installments">5x de <strong>R$4,98</strong></div><div className="cash">ou <strong>R$24,90 à vista</strong></div><a className="cta" href={CAKTO_FULL}>QUERO O KIT COMPLETO POR R$24,90</a><small>Pagamento único • Acesso imediato • Garantia de 7 dias</small></article>
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

      <section className="risk section"><div className="section-kicker">🛡️ VOCÊ COMPRA SEM RISCO</div><h2>Conheça o material por 7 dias</h2><p>Explore o material com tranquilidade. Se precisar solicitar o reembolso dentro do prazo, siga as condições da plataforma.</p></section>

      <FAQ />
      <section className="final-cta"><h2>Leve a tradição e os sabores do Brasil para suas próprias batidas.</h2><a className="cta" href="#oferta">🥃 QUERO ACESSO ÀS +200 BATIDAS</a></section>
      <footer>© 2026 — +200 Batidas de Cachaças Artesanais<br/><small>Material digital educacional destinado a maiores de 18 anos. Aprecie com moderação.</small></footer>
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
