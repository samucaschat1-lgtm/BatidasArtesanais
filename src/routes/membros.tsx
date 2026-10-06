import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/membros")({
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap",
      },
    ],
    meta: [
      { title: "Área de Membros | +5.000 Proyectos" },
      {
        name: "description",
        content: "Biblioteca de proyectos para fabricar, estudiar y vender.",
      },
    ],
  }),
  component: MembersArea,
});

const projects = [
  { id: 1, title: "Parrilla Argentina Profesional", category: "Parrillas", tag: "POPULAR", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=75" },
  { id: 2, title: "Carretilla de Carga Reforzada", category: "Carretillas", tag: "NUEVO", image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=900&q=75" },
  { id: 3, title: "Mesa Industrial con Perfil Metálico", category: "Muebles", tag: "DESTACADO", image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?auto=format&fit=crop&w=900&q=75" },
  { id: 4, title: "Estantería Metálica Modular", category: "Muebles", tag: "POPULAR", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=900&q=75" },
  { id: 5, title: "Portón Corredizo Moderno", category: "Portones", tag: "NUEVO", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=75" },
  { id: 6, title: "Banco de Trabajo para Taller", category: "Taller", tag: "DESTACADO", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=75" },
  { id: 7, title: "Soporte para Herramientas", category: "Taller", tag: "POPULAR", image: "https://images.unsplash.com/photo-1581147036324-c17ac41d8e0f?auto=format&fit=crop&w=900&q=75" },
  { id: 8, title: "Barbacoa con Acabado Premium", category: "Parrillas", tag: "NUEVO", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=75" },
];

const categories = ["Todos", "Parrillas", "Carretillas", "Muebles", "Portones", "Taller"];

function MembersArea() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "Todos" || project.category === activeCategory;
      const matchesSearch = !term || project.title.toLowerCase().includes(term) || project.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="members-page">
      <header className="members-header">
        <button className="members-menu" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Abrir menú">☰</button>
        <a className="members-brand" href="/membros">
          <span className="members-brand-mark">⚒</span>
          <span><b>+5.000</b> PROYECTOS</span>
        </a>
        <div className="members-header-search">
          <span>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar proyectos..." />
        </div>
        <div className="members-user">
          <div className="members-avatar">U</div>
          <div><strong>Mi cuenta</strong><small>Miembro activo</small></div>
          <span>⌄</span>
        </div>
      </header>

      <div className={`members-shell ${sidebarOpen ? "sidebar-open" : ""}`}>
        <aside className="members-sidebar">
          <nav>
            <a className="active" href="#inicio">⌂ <span>Inicio</span></a>
            <a href="#proyectos">▦ <span>Todos los proyectos</span></a>
            <a href="#favoritos">♡ <span>Mis favoritos</span></a>
            <a href="#recientes">◷ <span>Vistos recientemente</span></a>
          </nav>
          <div className="members-sidebar-title">CATEGORÍAS</div>
          {categories.slice(1).map((category) => (
            <button key={category} className={activeCategory === category ? "category-active" : ""} onClick={() => { setActiveCategory(category); setSidebarOpen(false); }}>
              <span>•</span>{category}
            </button>
          ))}
          <div className="members-help">
            <strong>¿Necesitas ayuda?</strong>
            <p>Encuentra tu próximo proyecto y empieza a fabricar.</p>
            <a href="#soporte">Contactar soporte →</a>
          </div>
        </aside>

        <section className="members-content" id="inicio">
          <div className="members-welcome">
            <div>
              <span className="members-kicker">BIBLIOTECA DIGITAL</span>
              <h1>Hola, ¡bienvenido a tu área de miembros! 👋</h1>
              <p>Explora miles de proyectos organizados para ayudarte a encontrar ideas, fabricar y ampliar el catálogo de tu taller.</p>
            </div>
            <div className="members-counter"><strong>+5.000</strong><span>proyectos disponibles</span></div>
          </div>

          <div className="members-toolbar" id="proyectos">
            <div>
              <h2>Explora los proyectos</h2>
              <p>{filtered.length} proyectos encontrados</p>
            </div>
            <div className="members-categories">
              {categories.map((category) => (
                <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>
              ))}
            </div>
          </div>

          <div className="members-grid">
            {filtered.map((project) => (
              <article className="member-project-card" key={project.id}>
                <div className="member-project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span>{project.tag}</span>
                  <button aria-label="Agregar a favoritos">♡</button>
                </div>
                <div className="member-project-info">
                  <small>{project.category}</small>
                  <h3>{project.title}</h3>
                  <p>Planos, medidas y referencias para fabricar.</p>
                  <button className="member-open-project">VER PROYECTO →</button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="members-empty">
              <strong>No encontramos proyectos</strong>
              <p>Prueba otra búsqueda o selecciona una categoría diferente.</p>
            </div>
          )}

          <footer className="members-footer">
            <span>© 2026 +5.000 Proyectos para Fabricar y Vender</span>
            <div><a href="#soporte">Soporte</a><a href="#terminos">Términos</a><a href="#privacidad">Privacidad</a></div>
          </footer>
        </section>
      </div>
    </main>
  );
}
