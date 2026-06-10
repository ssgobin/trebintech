import { useEffect, useState } from "react";
import { SplineScene } from "@/components/ui/splite";

const features = [
  ["01", "Desenvolvimento Sob Medida", "Cada projeto é criado de acordo com a necessidade do cliente."],
  ["02", "Foco em Resultado", "Tecnologia aplicada para gerar impacto real no negócio."],
  ["03", "Suporte Próximo", "Relacionamento transparente e acompanhamento contínuo."],
  ["04", "Arquitetura Escalável", "Projetos preparados para crescer junto com a operação."],
  ["05", "Tecnologia Moderna", "Firebase, Cloud, APIs, IA, automações e sistemas SaaS."],
  ["06", "Agilidade", "Processos rápidos, comunicação objetiva e entregas consistentes."],
];

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Firebase",
  "Java",
  "Spring Boot",
  "MySQL",
  "PostgreSQL",
  "Git",
  "Docker",
  "IA Generativa",
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(window.scrollY > 20);
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.add("aos-enabled");
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <div className="site-bg" aria-hidden="true">
        <div className="grid-layer" />
        <div className="orb orb--violet" />
        <div className="orb orb--black" />
        <div className="orb orb--soft" />
      </div>

      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`} data-header>
        <a className="brand" href="#inicio" aria-label="TrebinTech início">
          <img className="brand__logo" src="/logo_trebin.png" alt="TrebinTech" />
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={`site-nav ${isMenuOpen ? "is-open" : ""}`}>
          {["Início", "Sobre", "Cases", "Tecnologias", "Contato"].map((label) => (
            <a
              key={label}
              href={`#${label === "Início" ? "inicio" : label.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero section" id="inicio" aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="eyebrow">Startup de tecnologia sob medida</p>
            <h1 id="hero-title">Soluções inteligentes para problemas reais.</h1>
            <p className="hero__lead">
              Transformamos ideias, processos e desafios empresariais em tecnologia que gera resultados.
            </p>
            <div className="hero__actions">
              <a className="button button--primary magnetic" href="#cases">Conheça nossos projetos</a>
              <a className="button button--ghost magnetic" href="#contato">Solicitar orçamento</a>
            </div>
            <div className="hero__metrics" aria-label="Destaques da TrebinTech">
              <div>
                <strong><span className="metric-number">3</span> frentes</strong>
                <span>Web, SaaS e Apps</span>
              </div>
              <div>
                <strong><span className="metric-number">24</span>/7</strong>
                <span>Cloud, dados e automação</span>
              </div>
              <div>
                <strong><span className="metric-number">100</span>%</strong>
                <span>Do problema ao produto</span>
              </div>
            </div>
          </div>

          <div className="hero__visual hero__visual--spline">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="hero__spline"
              tintColor="#7c3aed"
            />
          </div>
        </section>

        <section className="section split" id="sobre" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">Quem somos</p>
            <h2 id="about-title">Tecnologia com propósito, clareza e impacto.</h2>
          </div>
          <div className="prose glass-panel">
            <p>A TrebinTech nasceu com um propósito simples: utilizar tecnologia para resolver dores reais.</p>
            <p>
              Criamos sistemas personalizados, plataformas web, aplicativos e soluções digitais capazes de automatizar
              processos, aumentar produtividade e gerar crescimento para empresas.
            </p>
            <p>
              Não vendemos apenas software. Entregamos soluções que fazem sentido para o negócio de cada cliente.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="diff-title">
          <div className="section-head">
            <p className="eyebrow">Diferenciais</p>
            <h2 id="diff-title">Um parceiro técnico para transformar operação em vantagem.</h2>
          </div>
          <div className="feature-grid">
            {features.map(([number, title, description]) => (
              <article className="feature-card" key={number}>
                <span className="icon">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section cases" id="cases" aria-labelledby="cases-title">
          <div className="section-head">
            <p className="eyebrow">Cases de sucesso</p>
            <h2 id="cases-title">Produtos digitais criados para resolver operações reais.</h2>
          </div>

          <div className="case-list">
            <article className="case-card">
              <div className="case-card__copy">
                <span className="case-index">Case 01</span>
                <h3>SponsorGo</h3>
                <p className="case-meta">CarMí · Publicidade Veicular</p>
                <p>Plataforma para gerenciamento de campanhas publicitárias em veículos de motoristas de aplicativo.</p>
                <ul>
                  <li>Gestão de campanhas</li>
                  <li>Controle de veículos</li>
                  <li>Gestão de anunciantes</li>
                  <li>Relatórios e monitoramento</li>
                </ul>
                <p className="result">Transformou a gestão operacional e permitiu escalar campanhas veiculares.</p>
              </div>
              <div className="mockup mockup--sponsor" aria-hidden="true">
                <div className="mockup__top" />
                <div className="mockup__map" />
                <div className="mockup__panel"><span /><span /><span /></div>
              </div>
            </article>

            <article className="case-card case-card--reverse">
              <div className="case-card__copy">
                <span className="case-index">Case 02</span>
                <h3>ACIA Nexus</h3>
                <p className="case-meta">Associação Comercial e Industrial de Americana · Sistema Corporativo</p>
                <p>Plataforma interna para centralizar comunicação, gestão e acompanhamento de processos da associação.</p>
                <ul>
                  <li>Chat em tempo real</li>
                  <li>Dashboard e indicadores</li>
                  <li>Gestão de informações</li>
                  <li>Comunicação interna</li>
                </ul>
                <p className="result">Centralização dos processos internos e aumento da eficiência operacional.</p>
              </div>
              <div className="mockup mockup--nexus" aria-hidden="true">
                <div className="mockup__sidebar" />
                <div className="mockup__chart" />
                <div className="mockup__messages"><span /><span /><span /></div>
              </div>
            </article>

            <article className="case-card">
              <div className="case-card__copy">
                <span className="case-index">Case 03</span>
                <h3>EventsGO</h3>
                <p className="case-meta">Organizadores de Eventos · Sistema de Eventos</p>
                <p>Plataforma completa para criação, gerenciamento e divulgação de eventos.</p>
                <ul>
                  <li>Criação de eventos</li>
                  <li>Convites digitais</li>
                  <li>Gestão de participantes</li>
                  <li>Painel administrativo</li>
                </ul>
                <p className="result">Mais organização, presença e profissionalização dos eventos.</p>
              </div>
              <div className="mockup mockup--events" aria-hidden="true">
                <div className="mockup__ticket" />
                <div className="mockup__calendar" />
                <div className="mockup__stats" />
              </div>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="process-title">
          <div className="section-head">
            <p className="eyebrow">Processo de trabalho</p>
            <h2 id="process-title">Da descoberta à evolução contínua.</h2>
          </div>
          <ol className="timeline">
            <li><span>01</span>Entendimento do problema</li>
            <li><span>02</span>Planejamento da solução</li>
            <li><span>03</span>Desenvolvimento</li>
            <li><span>04</span>Testes</li>
            <li><span>05</span>Implantação</li>
            <li><span>06</span>Evolução contínua</li>
          </ol>
        </section>

        <section className="section" id="tecnologias" aria-labelledby="tech-title">
          <div className="section-head">
            <p className="eyebrow">Tecnologias</p>
            <h2 id="tech-title">Stack moderna para produtos confiáveis.</h2>
          </div>
          <div className="tech-cloud">
            {technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </section>

        <section className="section testimonials" aria-labelledby="testimonials-title">
          <div className="section-head">
            <p className="eyebrow">Depoimentos</p>
            <h2 id="testimonials-title">Espaço preparado para histórias dos próximos clientes.</h2>
          </div>
          <div className="testimonial-grid">
            <article className="testimonial-card">
              <p>"A TrebinTech conectou tecnologia, operação e estratégia em uma solução feita para crescer."</p>
              <span>Cliente parceiro · em breve</span>
            </article>
            <article className="testimonial-card">
              <p>"Processos mais claros, dados acessíveis e uma experiência digital profissional."</p>
              <span>Gestor de projeto · em breve</span>
            </article>
            <article className="testimonial-card">
              <p>"Uma entrega próxima, técnica e alinhada ao que o negócio realmente precisava."</p>
              <span>Operação atendida · em breve</span>
            </article>
          </div>
        </section>

        <section className="cta section" id="contato" aria-labelledby="cta-title">
          <div className="cta__inner">
            <p className="eyebrow">Contato</p>
            <h2 id="cta-title">Vamos transformar sua ideia em realidade?</h2>
            <p>Converse conosco e descubra como a tecnologia pode impulsionar seu negócio.</p>
            <div className="hero__actions">
              <a className="button button--light magnetic" href="mailto:dev.ssgobin@gmail.com?subject=Or%C3%A7amento%20TrebinTech">
                Solicitar orçamento
              </a>
              <a className="button button--ghost-light magnetic" href="https://wa.me/5519994004912" target="_blank" rel="noreferrer">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a className="brand" href="#inicio" aria-label="TrebinTech início">
            <img className="brand__logo" src="/logo_trebin.png" alt="TrebinTech" />
          </a>
          <p>Soluções inteligentes para problemas reais.</p>
        </div>
        <nav aria-label="Links do rodapé">
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#cases">Cases</a>
          <a href="#tecnologias">Tecnologias</a>
          <a href="#contato">Contato</a>
        </nav>
        <a href="mailto:dev.ssgobin@gmail.com">dev.ssgobin@gmail.com</a>
      </footer>
    </>
  );
}

export default App;
