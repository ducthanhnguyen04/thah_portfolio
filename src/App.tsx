import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Avatar from "./assets/thanhnguyen.jpeg";
type Route =
  | "home"
  | "blog"
  | "article"
  | "admin-login"
  | "admin-dashboard"
  | "admin-articles"
  | "admin-editor"
  | "admin-media";
type IconName =
  | "arrow"
  | "github"
  | "linkedin"
  | "mail"
  | "download"
  | "menu"
  | "close"
  | "search"
  | "clock"
  | "calendar"
  | "external"
  | "code"
  | "database"
  | "server"
  | "spark"
  | "tool"
  | "copy"
  | "check"
  | "chevron"
  | "plus"
  | "edit"
  | "trash"
  | "eye"
  | "file"
  | "image"
  | "settings"
  | "logout"
  | "home"
  | "tag"
  | "folder"
  | "bold"
  | "italic"
  | "link"
  | "quote"
  | "list"
  | "upload"
  | "share";

const iconPaths: Record<IconName, ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  github: (
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.5S18 0 15 1.8a13.4 13.4 0 0 0-7 0C5 .1 3.8.5 3.8.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <path d="M2 9h4v12H2z" />
      <path d="M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  external: (
    <>
      <path d="M15 4h5v5M10 14 20 4" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </>
  ),
  code: (
    <>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3z" />
      <path d="m5 15-.7 2.3L2 18l2.3.7L5 21l.7-2.3L8 18l-2.3-.7L5 15z" />
    </>
  ),
  tool: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0-5-5l2.1 2.1-2.4 2.4-2.1-2.1a4 4 0 0 0 5 5L20 16.4a2.1 2.1 0 0 1-3 3l-7.7-7.7" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  file: (
    <>
      <path d="M6 2h9l4 4v16H6z" />
      <path d="M14 2v5h5M9 12h6M9 16h6" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z" />
    </>
  ),
  logout: (
    <>
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v11h14V10M9 21v-7h6v7" />
    </>
  ),
  tag: (
    <>
      <path d="M20 13 11 22l-9-9V4h9z" />
      <circle cx="7" cy="9" r="1" />
    </>
  ),
  folder: <path d="M3 5h7l2 2h9v12H3z" />,
  bold: (
    <>
      <path d="M7 4h7a4 4 0 0 1 0 8H7zM7 12h8a4 4 0 0 1 0 8H7z" />
    </>
  ),
  italic: (
    <>
      <path d="M10 4h8M6 20h8M14 4 10 20" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1" />
    </>
  ),
  quote: (
    <>
      <path d="M4 7h6v6H6a4 4 0 0 1-2 4M14 7h6v6h-4a4 4 0 0 1-2 4" />
    </>
  ),
  list: (
    <>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
    </>
  ),
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

const articles = [
  {
    id: 1,
    category: "Backend",
    title: "Designing REST APIs That Stay Maintainable",
    excerpt:
      "A practical framework for structuring endpoints, handling errors, and keeping your API easy to evolve.",
    date: "Editable date",
    time: "8 min read",
    tags: ["Node.js", "API Design"],
    image:
      "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1200&h=700",
    featured: true,
  },
  {
    id: 2,
    category: "Database",
    title: "PostgreSQL Patterns I Keep Reusing",
    excerpt:
      "Notes on constraints, indexes, and data modeling decisions that make backend systems more reliable.",
    date: "Editable date",
    time: "6 min read",
    tags: ["PostgreSQL", "Database"],
    image: "",
    featured: false,
  },
  {
    id: 3,
    category: "AI/ML",
    title: "Adding AI Features Without Overengineering",
    excerpt:
      "A grounded approach to integrating language models into useful, maintainable product experiences.",
    date: "Editable date",
    time: "7 min read",
    tags: ["Gemini API", "AI"],
    image: "",
    featured: false,
  },
  {
    id: 4,
    category: "JavaScript/TypeScript",
    title: "TypeScript at the API Boundary",
    excerpt:
      "How validation and strong types work together to create safer services and clearer contracts.",
    date: "Editable date",
    time: "5 min read",
    tags: ["TypeScript", "Validation"],
    image: "",
    featured: false,
  },
  {
    id: 5,
    category: "Developer Journey",
    title: "Learning Backend Engineering by Building",
    excerpt:
      "Reflections on turning computer science foundations into practical product engineering skills.",
    date: "Editable date",
    time: "4 min read",
    tags: ["Journey", "Learning"],
    image: "",
    featured: false,
  },
  {
    id: 6,
    category: "Frontend",
    title: "A Backend Developer’s Guide to Better Interfaces",
    excerpt:
      "Simple frontend principles that help full-stack projects feel considered and cohesive.",
    date: "Editable date",
    time: "5 min read",
    tags: ["React", "UI"],
    image: "",
    featured: false,
  },
];

const projects = [
  {
    index: "01",
    title: "EasyTOCFL",
    type: "Learning platform",
    description:
      "A Chinese-learning platform for Vietnamese students in Taiwan, exploring vocabulary, grammar, examples, and AI-assisted learning.",
    tags: ["React", "Node.js", "Gemini API"],
    accent: "green",
  },
  {
    index: "02",
    title: "Thai House Heritage",
    type: "Hospitality website",
    description:
      "A mobile-first homestay booking website concept focused on clear discovery, local character, and an approachable guest experience.",
    tags: ["React", "Tailwind CSS", "Responsive"],
    accent: "purple",
  },
  {
    index: "03",
    title: "Backend API Lab",
    type: "API collection",
    description:
      "A growing collection of backend projects exploring REST APIs, authentication patterns, database design, and reliable CRUD workflows.",
    tags: ["TypeScript", "PostgreSQL", "REST APIs"],
    accent: "blue",
  },
];

function useRoute() {
  const parse = (): Route => {
    const path = window.location.hash.replace("#/", "");
    if (path.startsWith("blog/article")) return "article";
    if (path === "blog") return "blog";
    if (path === "admin/articles/new" || path.startsWith("admin/articles/edit"))
      return "admin-editor";
    if (path === "admin/articles") return "admin-articles";
    if (path === "admin/media") return "admin-media";
    if (path === "admin") return "admin-dashboard";
    if (path === "admin/login") return "admin-login";
    return "home";
  };
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => {
    const handler = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const go = (path: string) => {
    window.location.hash = `/${path}`;
  };
  return { route, go };
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: IconName;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} className={`button button-${variant}`} onClick={onClick}>
      {children}
      {icon && <Icon name={icon} />}
    </button>
  );
}

function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "green" | "purple" | "blue";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function SectionTitle({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <div className="toast">
      <Icon name="check" />
      <span>{message}</span>
    </div>
  );
}

function Navbar({ route, go }: { route: Route; go: (path: string) => void }) {
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Skills", "Projects", "Blog", "Experience", "Contact"];
  const handle = (label: string) => {
    setOpen(false);
    if (label === "Blog") return go("blog");
    if (route !== "home") {
      go(label === "Home" ? "" : `?section=${label.toLowerCase()}`);
      setTimeout(
        () => document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    } else if (label === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="navbar">
      <div className="nav-inner">
        <button className="brand" onClick={() => go("")} aria-label="Go home">
          <span className="brand-mark">&lt;/&gt;</span>Thah.dev
        </button>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <button
              key={link}
              className={
                (link === "Blog" && ["blog", "article"].includes(route)) ||
                  (link === "Home" && route === "home")
                  ? "active"
                  : ""
              }
              onClick={() => handle(link)}
            >
              {link}
            </button>
          ))}
          <div className="nav-mobile-actions">
            <button aria-label="GitHub placeholder">
              <Icon name="github" />
            </button>
            <button aria-label="LinkedIn placeholder">
              <Icon name="linkedin" />
            </button>
            <Button onClick={() => handle("Contact")}>Let’s Talk</Button>
          </div>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" aria-label="GitHub placeholder">
            <Icon name="github" />
          </button>
          <button className="icon-button" aria-label="LinkedIn placeholder">
            <Icon name="linkedin" />
          </button>
          <Button onClick={() => handle("Contact")}>Let’s Talk</Button>
        </div>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}

function Footer({ go }: { go: (path: string) => void }) {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <div className="brand">
            <span className="brand-mark">&lt;/&gt;</span>dev.thanh
          </div>
          <p>Welcome to Thah Portfolio</p>
        </div>
        <div className="footer-links">
          <button onClick={() => go("blog")}>Writing</button>
          <button onClick={() => go("admin/login")}>Admin demo</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top ↑
          </button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Designed &amp; Built by Thanh</span>
        <span>
          © <span className="placeholder">Editable year</span> Thanh Nguyen
        </span>
        <div>
          <button aria-label="GitHub placeholder">
            <Icon name="github" />
          </button>
          <button aria-label="LinkedIn placeholder">
            <Icon name="linkedin" />
          </button>
        </div>
      </div>
    </footer>
  );
}

function Hero({ go, notify }: { go: (path: string) => void; notify: (text: string) => void }) {
  return (
    <section className="hero container" id="home">
      <div className="hero-copy">
        <Badge tone="green">
          <span className="status-dot" />
          Available for Opportunities
        </Badge>
        <h1>
          Welcome <span>to</span> Thah Portfolio.
        </h1>
        <p className="hero-intro">
          Hi, I’m Thanh — a Software Engineer focused on Backend Development, scalable APIs, and
          practical AI-powered applications.
        </p>
        <div className="hero-actions">
          <Button
            icon="arrow"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore My Work
          </Button>
          <Button variant="secondary" onClick={() => go("blog")}>
            Read My Articles
          </Button>
          <Button
            variant="ghost"
            icon="download"
            onClick={() => notify("Resume link is an editable placeholder.")}
          >
            Download Resume
          </Button>
        </div>
        <div className="hero-meta">
          <span>
            Based in <b className="placeholder">Editable location</b>
          </span>
          <span className="divider" />
          <span>Open to backend &amp; full-stack roles</span>
        </div>
      </div>
      <div className="terminal-wrap">
        <div className="ambient" />
        <div className="terminal">
          <div className="terminal-bar">
            <div className="traffic">
              <i />
              <i />
              <i />
            </div>
            <span>thah.profile.ts</span>
            <span>⌘K</span>
          </div>
          <div className="terminal-tabs">
            <span className="active">profile.ts</span>
            <span>api.ts</span>
          </div>
          <div className="code-lines">
            <div>
              <i>1</i>
              <span className="pink">const</span> <span className="blue"> developer</span> = {"{"}
            </div>
            <div>
              <i>2</i>&nbsp;&nbsp;name: <span className="green">'Thanh Nguyen'</span>,
            </div>
            <div>
              <i>3</i>&nbsp;&nbsp;role: <span className="green">'Software Engineer'</span>,
            </div>
            <div>
              <i>4</i>&nbsp;&nbsp;specialty: <span className="green">'Backend Developer'</span>,
            </div>
            <div>
              <i>5</i>&nbsp;&nbsp;focus: [
            </div>
            <div>
              <i>6</i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="green">'Scalable APIs'</span>,
            </div>
            <div>
              <i>7</i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="green">'AI Integration'</span>
            </div>
            <div>
              <i>8</i>&nbsp;&nbsp;],
            </div>
            <div>
              <i>9</i>&nbsp;&nbsp;available: <span className="pink">true</span>
            </div>
            <div>
              <i>10</i>
              {"}"}
            </div>
          </div>
          <div className="terminal-output">
            <span>$ whoami</span>
            <strong>Thanh Nguyen</strong>
            <span>$ focus</span>
            <strong>Backend Engineering + AI Generater</strong>
            <b className="cursor" />
          </div>
        </div>
        <div className="floating-chip chip-one">
          <Icon name="server" /> Node.js
        </div>
        <div className="floating-chip chip-two">
          <Icon name="database" /> PostgreSQL
        </div>
        <div className="floating-chip chip-three">
          <Icon name="spark" /> AI APIs
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    ["[XX]+", "Projects built"],
    ["[XX]", "Technologies"],
    ["[X]+", "Years learning"],
  ];
  return (
    <section className="section container" id="about">
      <SectionTitle
        eyebrow="01 / About"
        title={
          <>
            Curious by nature.
            <br />
            Practical by choice.
          </>
        }
      />
      <div className="about-grid">
        <div className="about-visual">
          <div className="portrait-frame">
            <img src={Avatar}></img>
            <span>SOFTWARE ENGINEER</span>
          </div>
          <div className="location-card">
            <span className="status-dot" />
            <div>
              <b>Currently available</b>
              <small>For selected opportunities</small>
            </div>
          </div>
        </div>
        <div className="about-copy">
          <p className="lead">
            I enjoy turning complex technical problems into systems that feel simple, reliable, and
            useful.
          </p>
          <p>
            My journey in Computer Science has led me toward backend architecture, where thoughtful
            data models and clear API contracts create the foundation for great products.
          </p>
          <p>
            I’m especially interested in the practical side of AI: not adding it for novelty, but
            integrating it where it genuinely helps people learn, decide, or work more effectively.
          </p>
          <div className="stats">
            {stats.map(([num, label]) => (
              <div key={label}>
                <strong>{num}</strong>
                <span>{label}</span>
                <small>Editable placeholder</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const skillGroups = [
  {
    icon: "server" as IconName,
    title: "Backend",
    copy: "Building clear, scalable service layers.",
    skills: ["Node.js", "Express.js", "TypeScript", "REST APIs"],
    className: "skill-large",
  },
  {
    icon: "database" as IconName,
    title: "Database",
    copy: "Reliable data models and queries.",
    skills: ["Supabase", "PostgreSQL"],
    className: "",
  },
  {
    icon: "code" as IconName,
    title: "Frontend",
    copy: "Responsive interfaces that serve the product.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    className: "",
  },
  {
    icon: "spark" as IconName,
    title: "AI Integration",
    copy: "Practical AI features with purpose.",
    skills: ["Python", "Google Gemini API", "AI Integration"],
    className: "skill-wide",
  },
  {
    icon: "tool" as IconName,
    title: "Tools & Workflow",
    copy: "The everyday toolkit.",
    skills: ["Git", "GitHub", "Postman", "VS Code", "Docker"],
    className: "skill-wide",
  },
];

function Skills() {
  return (
    <section className="section section-surface" id="skills">
      <div className="container">
        <SectionTitle
          eyebrow="02 / Skills"
          title="Tools I use to build."
          copy="A focused toolkit for taking ideas from data model to production-ready interface."
        />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className={`skill-card ${group.className}`} key={group.title}>
              <div className="skill-icon">
                <Icon name={group.icon} />
              </div>
              <h3>{group.title}</h3>
              <p>{group.copy}</p>
              <div className="tag-row">
                {group.skills.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ notify }: { notify: (text: string) => void }) {
  return (
    <section className="section container" id="projects">
      <SectionTitle
        eyebrow="03 / Selected work"
        title="Products with a purpose."
        copy="A selection of learning platforms, digital experiences, and backend explorations."
        action={
          <button
            className="text-link"
            onClick={() => notify("GitHub profile is an editable placeholder.")}
          >
            View GitHub <Icon name="external" />
          </button>
        }
      />
      <div className="project-list">
        {projects.map((p, idx) => (
          <article className="project-card" key={p.title}>
            <div className={`project-preview project-${p.accent}`}>
              {idx === 0 && (
                <div className="mock-learning">
                  <div className="mock-nav">
                    EasyTOCFL <span>學習</span>
                  </div>
                  <div className="mock-body">
                    <small>DAILY LESSON</small>
                    <h4>今天你想學什麼？</h4>
                    <div className="mock-progress">
                      <i />
                    </div>
                    <div className="mock-words">
                      <span>
                        你好
                        <br />
                        <b>Xin chào</b>
                      </span>
                      <span>
                        學習
                        <br />
                        <b>Học tập</b>
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {idx === 1 && (
                <div className="mock-stay">
                  <img
                    src="https://images.unsplash.com/photo-1520583457224-aee11bad5112?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900&h=600"
                    alt="Dark creative workspace used as an editable project placeholder"
                  />
                  <div>
                    <small>THAI HOUSE HERITAGE</small>
                    <h4>A slower kind of stay.</h4>
                    <button>Explore homes</button>
                  </div>
                </div>
              )}
              {idx === 2 && (
                <div className="mock-api">
                  <div className="api-sidebar">
                    <span>API LAB</span>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="api-main">
                    <div>
                      <Badge tone="green">GET</Badge>
                      <code>/api/v1/resources</code>
                    </div>
                    <pre>{`{\n  "success": true,\n  "data": [...],\n  "meta": { "page": 1 }\n}`}</pre>
                  </div>
                </div>
              )}
            </div>
            <div className="project-content">
              <span className="project-index">{p.index}</span>
              <div>
                <span className="eyebrow">{p.type}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="tag-row">
                  {p.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <div className="project-links">
                  <button onClick={() => notify("Repository link is an editable placeholder.")}>
                    <Icon name="github" /> Code
                  </button>
                  <button onClick={() => notify("Live demo link is an editable placeholder.")}>
                    <Icon name="external" /> Live demo
                  </button>
                  <button onClick={() => notify("Case study content is an editable placeholder.")}>
                    Case study <Icon name="arrow" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  go,
}: {
  article: (typeof articles)[number];
  go: (path: string) => void;
}) {
  return (
    <article
      className="article-card"
      onClick={() => go("blog/article")}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && go("blog/article")}
    >
      <div className={`article-cover cover-${article.id}`}>
        {article.image && <img src={article.image} alt="Developer workspace" />}
        <span className="sample-label">Sample article · editable</span>
        <div className="cover-code">&lt;{article.category}/&gt;</div>
      </div>
      <div className="article-card-body">
        <Badge
          tone={
            article.category === "AI/ML"
              ? "purple"
              : article.category === "Database"
                ? "blue"
                : "green"
          }
        >
          {article.category}
        </Badge>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="article-meta">
          <span>
            <Icon name="calendar" />
            {article.date}
          </span>
          <span>
            <Icon name="clock" />
            {article.time}
          </span>
        </div>
        <div className="article-foot">
          <div>
            {article.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
          <Icon name="arrow" />
        </div>
      </div>
    </article>
  );
}

function LatestArticles({ go }: { go: (path: string) => void }) {
  return (
    <section className="section section-surface" id="blog">
      <div className="container">
        <SectionTitle
          eyebrow="04 / Writing"
          title="Notes from the build."
          copy="Practical ideas about backend engineering, product development, and learning in public."
          action={
            <Button variant="secondary" icon="arrow" onClick={() => go("blog")}>
              Explore All Articles
            </Button>
          }
        />
        <div className="article-grid">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.id} article={a} go={go} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const events = [
    [
      "Education",
      "Computer Science",
      "Editable institution",
      "Editable dates",
      "Add the confirmed degree, coursework, and academic focus here.",
    ],
    [
      "Experience",
      "Backend Developer Internship",
      "Editable company",
      "Editable dates",
      "Add confirmed responsibilities, tools, and outcomes from the internship here.",
    ],
    [
      "Projects",
      "Independent Product Development",
      "EasyTOCFL & other projects",
      "Editable dates",
      "Building practical products to deepen backend, database, and AI integration skills.",
    ],
    [
      "Competitions",
      "Technical Competitions",
      "Editable event details",
      "Editable dates",
      "Add only confirmed competition participation, role, and results here.",
    ],
  ];
  return (
    <section className="section container" id="experience">
      <SectionTitle
        eyebrow="05 / Journey"
        title="Learning by doing."
        copy="A timeline ready for confirmed education, experience, and milestones."
      />
      <div className="timeline">
        {events.map((e, i) => (
          <article key={e[1]}>
            <div className="timeline-marker">
              <span>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="timeline-content">
              <div className="timeline-top">
                <Badge>{e[0]}</Badge>
                <span>{e[3]}</span>
              </div>
              <h3>{e[1]}</h3>
              <h4>{e[2]}</h4>
              <p>{e[4]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ notify }: { notify: (text: string) => void }) {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    notify("Thanks — this prototype form is ready to connect to your email service.");
    (e.target as HTMLFormElement).reset();
  };
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">06 / Contact</span>
          <h2>
            Have an idea?
            <br />
            <span>Let’s build something great together.</span>
          </h2>
          <p>
            I’m open to thoughtful conversations about backend roles, product collaborations, and
            useful software.
          </p>
          <div className="contact-direct">
            <span>
              <Icon name="mail" />
            </span>
            <div>
              <small>Email</small>
              <b className="placeholder">your.email@example.com</b>
            </div>
          </div>
          <div className="social-buttons">
            <button>
              <Icon name="github" />
              GitHub <Icon name="external" />
            </button>
            <button>
              <Icon name="linkedin" />
              LinkedIn <Icon name="external" />
            </button>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="field-row">
            <label>
              Name
              <input required placeholder="Your name" />
            </label>
            <label>
              Email
              <input required type="email" placeholder="you@example.com" />
            </label>
          </div>
          <label>
            Subject
            <input required placeholder="What would you like to discuss?" />
          </label>
          <label>
            Message
            <textarea
              required
              rows={6}
              placeholder="Tell me a little about your idea or opportunity..."
            />
          </label>
          <div className="form-bottom">
            <small>Prototype form · no data is stored</small>
            <Button type="submit" icon="arrow">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function HomePage({ go, notify }: { go: (path: string) => void; notify: (t: string) => void }) {
  return (
    <>
      <Navbar route="home" go={go} />
      <main>
        <Hero go={go} notify={notify} />
        <About />
        <Skills />
        <Projects notify={notify} />
        <LatestArticles go={go} />
        <Experience />
        <Contact notify={notify} />
      </main>
      <Footer go={go} />
    </>
  );
}

function BlogPage({ go }: { go: (path: string) => void }) {
  const categories = [
    "All",
    "Backend",
    "JavaScript/TypeScript",
    "Database",
    "AI/ML",
    "Frontend",
    "Developer Journey",
  ];
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Newest");
  const [visible, setVisible] = useState(3);
  const filtered = useMemo(() => {
    const result = articles.filter(
      (a) =>
        (category === "All" || a.category === category) &&
        `${a.title} ${a.excerpt} ${a.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()),
    );
    return sort === "Oldest" ? [...result].reverse() : result;
  }, [category, query, sort]);
  return (
    <>
      <Navbar route="blog" go={go} />
      <main className="blog-page">
        <section className="blog-hero container">
          <Badge tone="green">THE DEV LOG</Badge>
          <h1>
            Writing &amp; Sharing
            <br />
            <span>Knowledge.</span>
          </h1>
          <p>
            Thoughts, notes, and practical guides on backend engineering, databases, AI integration,
            and the developer journey.
          </p>
          <div className="blog-count">
            <strong>{articles.length.toString().padStart(2, "0")}</strong>
            <span>
              Sample articles
              <br />
              ready to customize
            </span>
          </div>
        </section>
        <section className="container featured">
          <div className="featured-cover">
            <img src={articles[0].image} alt="Laptop showing code" />
            <span className="sample-label">Featured sample · editable</span>
          </div>
          <div className="featured-copy">
            <Badge tone="green">Featured · Backend</Badge>
            <h2>{articles[0].title}</h2>
            <p>{articles[0].excerpt}</p>
            <div className="article-meta">
              <span>
                <Icon name="calendar" />
                {articles[0].date}
              </span>
              <span>
                <Icon name="clock" />
                {articles[0].time}
              </span>
            </div>
            <Button icon="arrow" onClick={() => go("blog/article")}>
              Read Article
            </Button>
          </div>
        </section>
        <section className="container article-browser">
          <div className="browser-bar">
            <div className="search-box">
              <Icon name="search" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(3);
                }}
                placeholder="Search articles..."
                aria-label="Search articles"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort articles"
            >
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
          <div className="category-pills">
            {categories.map((c) => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => {
                  setCategory(c);
                  setVisible(3);
                }}
              >
                {c}
              </button>
            ))}
          </div>
          {filtered.length ? (
            <>
              <div className="article-grid">
                {filtered.slice(0, visible).map((a) => (
                  <ArticleCard key={a.id} article={a} go={go} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="load-more">
                  <Button variant="secondary" onClick={() => setVisible((v) => v + 3)}>
                    Load More Articles
                  </Button>
                  <span>
                    Showing {Math.min(visible, filtered.length)} of {filtered.length}
                  </span>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon="search"
              title="No articles found"
              copy="Try a different keyword or clear the active category filter."
              action={
                <Button
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          )}
        </section>
      </main>
      <Footer go={go} />
    </>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button className="copy-button" onClick={copy}>
      <Icon name={copied ? "check" : "copy"} />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ArticlePage({ go, notify }: { go: (path: string) => void; notify: (t: string) => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () =>
      setProgress(
        Math.min(
          100,
          (window.scrollY /
            Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) *
          100,
        ),
      );
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const code = `import express from 'express'\n\nconst app = express()\n\napp.get('/api/v1/articles/:slug', async (req, res) => {\n  const article = await repository.findBySlug(req.params.slug)\n\n  if (!article) {\n    return res.status(404).json({ error: 'Article not found' })\n  }\n\n  return res.json({ data: article })\n})`;
  return (
    <>
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <Navbar route="article" go={go} />
      <main className="article-page">
        <header className="article-header container-narrow">
          <button className="back-link" onClick={() => go("blog")}>
            ← Back to all articles
          </button>
          <Badge tone="green">Backend · Sample content</Badge>
          <h1>Designing REST APIs That Stay Maintainable</h1>
          <p className="article-deck">
            A practical framework for structuring endpoints, handling errors, and keeping your API
            easy to evolve as the product grows.
          </p>
          <div className="byline">
            <div className="author-avatar">TN</div>
            <div>
              <b>Thanh Nguyen</b>
              <span>Software Engineer · Backend Developer</span>
            </div>
            <div className="byline-meta">
              <span>Published: Editable date</span>
              <span>Updated: Editable date</span>
              <span>
                <Icon name="clock" />8 min read
              </span>
            </div>
          </div>
        </header>
        <div className="article-hero-image container">
          <img src={articles[0].image} alt="Laptop with code on screen" />
          <span>Photo by AltumCode · Unsplash</span>
        </div>
        <div className="article-layout container">
          <aside className="toc">
            <span>ON THIS PAGE</span>
            <a href="#start" className="active">
              Start with the contract
            </a>
            <a href="#structure">Choose a clear structure</a>
            <a href="#errors">Make errors predictable</a>
            <a href="#database">Let the database help</a>
            <a href="#closing">Closing thoughts</a>
            <div className="share">
              <span>SHARE</span>
              <button onClick={() => notify("Article link copied.")}>
                <Icon name="link" />
              </button>
              <button onClick={() => notify("Share link is a placeholder.")}>
                <Icon name="linkedin" />
              </button>
            </div>
          </aside>
          <article className="prose">
            <p className="editable-note">
              This is sample editorial content. Replace it with Thanh’s confirmed writing before
              publishing.
            </p>
            <p className="lead" id="start">
              A maintainable API is not the one with the cleverest abstraction. It is the one
              another developer can understand, change, and trust six months from now.
            </p>
            <p>
              When building a backend, it is tempting to focus on getting the first successful
              response. But an API is a long-lived agreement between systems. The shape of that
              agreement matters as much as the code behind it.
            </p>
            <h2 id="structure">Start with the contract</h2>
            <p>
              Before writing an endpoint, define what the caller needs and how the service should
              behave. Keep resource names consistent and let HTTP methods communicate intent.
            </p>
            <ul>
              <li>Use nouns for resources and predictable nesting.</li>
              <li>Return a stable response envelope where it helps clients.</li>
              <li>Validate input at the boundary, not deep in the service.</li>
              <li>Document failure cases alongside successful responses.</li>
            </ul>
            <blockquote>
              Good API design removes surprises. Every convention should help the next developer
              make a correct assumption.
            </blockquote>
            <h2 id="errors">Make errors predictable</h2>
            <p>
              Errors are part of the public interface. A clear status code and a small, consistent
              payload make failures easier to handle on every client.
            </p>
            <div className="code-block">
              <div className="code-head">
                <span>
                  <i />
                  TypeScript
                </span>
                <CopyButton value={code} />
              </div>
              <pre>
                <code>{code}</code>
              </pre>
            </div>
            <p>
              Notice that the route stays thin. Fetching is delegated to the repository, while the
              route translates the result into an HTTP response. That separation creates room for
              the codebase to evolve.
            </p>
            <h3 id="database">Let the database enforce truth</h3>
            <p>
              Application validation improves the user experience, but database constraints protect
              the system. Use both. Unique constraints, foreign keys, and transactions express rules
              that should never be optional.
            </p>
            <div className="code-block">
              <div className="code-head">
                <span>
                  <i />
                  SQL
                </span>
                <CopyButton value={"CREATE UNIQUE INDEX articles_slug_idx ON articles (slug);"} />
              </div>
              <pre>
                <code>
                  <span className="pink">CREATE UNIQUE INDEX</span> articles_slug_idx{"\n"}
                  <span className="pink">ON</span> articles (slug);
                </code>
              </pre>
            </div>
            <h2 id="closing">Closing thoughts</h2>
            <p>
              Maintainability comes from a series of modest, disciplined choices: predictable
              naming, explicit validation, narrow responsibilities, and useful documentation. Start
              simple, then add structure when the product earns it.
            </p>
          </article>
          <aside className="article-rail">
            <div className="rail-card">
              <span>ARTICLE</span>
              <b>8 min</b>
              <small>Estimated reading time</small>
            </div>
            <div className="rail-card">
              <span>TOPICS</span>
              {articles[0].tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </aside>
        </div>
        <section className="container-narrow article-end">
          <div className="author-box">
            <div className="author-avatar large">TN</div>
            <div>
              <span>WRITTEN BY</span>
              <h3>Thanh Nguyen</h3>
              <p>
                Software Engineer focused on backend systems, scalable APIs, and practical
                AI-powered applications.
              </p>
            </div>
          </div>
          <div className="post-nav">
            <button onClick={() => notify("Previous sample article placeholder.")}>
              <small>PREVIOUS ARTICLE</small>
              <b>TypeScript at the API Boundary</b>
            </button>
            <button onClick={() => notify("Next sample article placeholder.")}>
              <small>NEXT ARTICLE</small>
              <b>PostgreSQL Patterns I Keep Reusing</b>
            </button>
          </div>
        </section>
        <section className="related section-surface">
          <div className="container">
            <SectionTitle eyebrow="Keep reading" title="Related articles." />
            <div className="article-grid">
              {articles.slice(1, 4).map((a) => (
                <ArticleCard key={a.id} article={a} go={go} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer go={go} />
    </>
  );
}

function EmptyState({
  icon,
  title,
  copy,
  action,
}: {
  icon: IconName;
  title: string;
  copy: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span>
        <Icon name={icon} size={24} />
      </span>
      <h3>{title}</h3>
      <p>{copy}</p>
      {action}
    </div>
  );
}

const adminLinks = [
  ["admin", "home", "Overview"],
  ["admin/articles", "file", "Articles"],
  ["admin/articles/new", "plus", "New Article"],
  ["admin/categories", "folder", "Categories"],
  ["admin/tags", "tag", "Tags"],
  ["admin/media", "image", "Media Library"],
  ["admin/settings", "settings", "Settings"],
] as const;

function AdminSidebar({
  route,
  go,
  onLogout,
  open,
  close,
}: {
  route: Route;
  go: (p: string) => void;
  onLogout: () => void;
  open: boolean;
  close: () => void;
}) {
  const activePath =
    route === "admin-dashboard"
      ? "admin"
      : route === "admin-articles"
        ? "admin/articles"
        : route === "admin-editor"
          ? "admin/articles/new"
          : "admin/media";
  return (
    <aside className={`admin-sidebar ${open ? "open" : ""}`}>
      <div className="admin-brand">
        <span className="brand-mark">&lt;/&gt;</span>
        <div>
          <b>dev.thanh</b>
          <small>Content studio</small>
        </div>
        <button onClick={close}>
          <Icon name="close" />
        </button>
      </div>
      <nav>
        {adminLinks.map(([path, icon, label]) => (
          <button
            key={path}
            className={activePath === path ? "active" : ""}
            onClick={() => {
              if (path === "admin/categories" || path === "admin/tags" || path === "admin/settings")
                return;
              go(path);
              close();
            }}
          >
            <Icon name={icon as IconName} />
            {label}
            {["Categories", "Tags", "Settings"].includes(label) && <small>Soon</small>}
          </button>
        ))}
      </nav>
      <div className="admin-sidebar-foot">
        <button onClick={() => go("")}>
          <Icon name="external" />
          View Website
        </button>
        <button onClick={onLogout}>
          <Icon name="logout" />
          Logout
        </button>
        <div className="admin-user">
          <div>TN</div>
          <span>
            <b>Thanh Nguyen</b>
            <small>Administrator</small>
          </span>
        </div>
      </div>
    </aside>
  );
}

function AdminShell({
  route,
  go,
  onLogout,
  children,
  title,
  subtitle,
  actions,
}: {
  route: Route;
  go: (p: string) => void;
  onLogout: () => void;
  children: ReactNode;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  const [sideOpen, setSideOpen] = useState(false);
  return (
    <div className="admin-shell">
      <AdminSidebar
        route={route}
        go={go}
        onLogout={onLogout}
        open={sideOpen}
        close={() => setSideOpen(false)}
      />
      {sideOpen && (
        <button
          className="side-overlay"
          onClick={() => setSideOpen(false)}
          aria-label="Close sidebar"
        />
      )}
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu" onClick={() => setSideOpen(true)}>
            <Icon name="menu" />
          </button>
          <div>
            <span>CONTENT STUDIO / {title.toUpperCase()}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="admin-actions">
            {actions}
            <button className="admin-avatar">TN</button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

function AdminLogin({
  go,
  onLogin,
  notify,
}: {
  go: (p: string) => void;
  onLogin: () => void;
  notify: (t: string) => void;
}) {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onLogin();
    go("admin");
  };
  return (
    <div className="login-page">
      <button className="login-back" onClick={() => go("")}>
        <Icon name="arrow" />
        Back to website
      </button>
      <div className="login-glow" />
      <form className="login-card" onSubmit={submit}>
        <div className="brand">
          <span className="brand-mark">&lt;/&gt;</span>dev.thanh
        </div>
        <span className="eyebrow">Private content studio</span>
        <h1>Welcome back.</h1>
        <p>Sign in to manage articles, media, and publishing settings.</p>
        <label>
          Email
          <input type="email" required defaultValue="demo@placeholder.dev" />
        </label>
        <label>
          Password
          <div className="password-field">
            <input type="password" required defaultValue="demo-password" />
            <Icon name="eye" />
          </div>
        </label>
        <div className="login-row">
          <label className="check-label">
            <input type="checkbox" />
            Remember me
          </label>
          <button
            type="button"
            onClick={() => notify("Password recovery is a frontend placeholder.")}
          >
            Forgot password?
          </button>
        </div>
        <Button type="submit" icon="arrow">
          Sign in to Content Studio
        </Button>
        <small>Demo access only · Credentials are placeholders · No data is stored</small>
      </form>
    </div>
  );
}

const adminRows = [
  ["Designing REST APIs That Stay Maintainable", "Backend", "Published", "Editable date", "—"],
  ["PostgreSQL Patterns I Keep Reusing", "Database", "Draft", "Editable date", "—"],
  ["Adding AI Features Without Overengineering", "AI/ML", "Published", "Editable date", "—"],
  ["TypeScript at the API Boundary", "TypeScript", "Scheduled", "Editable date", "—"],
];

function MetricCard({
  label,
  value,
  icon,
  trend,
}: {
  label: string;
  value: string;
  icon: IconName;
  trend: string;
}) {
  return (
    <article className="metric-card">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{trend}</small>
      </div>
      <span className="metric-icon">
        <Icon name={icon} />
      </span>
    </article>
  );
}

function AdminDashboard({ go, onLogout }: { go: (p: string) => void; onLogout: () => void }) {
  return (
    <AdminShell
      route="admin-dashboard"
      go={go}
      onLogout={onLogout}
      title="Overview"
      subtitle="Here’s what’s happening with your content."
      actions={
        <Button icon="plus" onClick={() => go("admin/articles/new")}>
          New Article
        </Button>
      }
    >
      <div className="admin-content">
        <div className="demo-notice">
          <Icon name="spark" />
          <div>
            <b>Frontend prototype mode</b>
            <span>Connect a backend to persist edits, uploads, authentication, and analytics.</span>
          </div>
        </div>
        <section className="metric-grid">
          <MetricCard label="Total Articles" value="—" icon="file" trend="Editable placeholder" />
          <MetricCard label="Published" value="—" icon="check" trend="Editable placeholder" />
          <MetricCard label="Drafts" value="—" icon="edit" trend="Editable placeholder" />
          <MetricCard label="Total Views" value="—" icon="eye" trend="Analytics not connected" />
        </section>
        <div className="dashboard-grid">
          <section className="admin-panel recent-panel">
            <div className="panel-head">
              <div>
                <h2>Recent Articles</h2>
                <p>Your latest sample content</p>
              </div>
              <button onClick={() => go("admin/articles")}>
                View all <Icon name="arrow" />
              </button>
            </div>
            <AdminTable rows={adminRows.slice(0, 3)} go={go} compact />
          </section>
          <section className="admin-panel activity-panel">
            <div className="panel-head">
              <div>
                <h2>Publishing Activity</h2>
                <p>Sample timeline</p>
              </div>
            </div>
            <div className="activity-list">
              {[
                ["Published", "Designing REST APIs…"],
                ["Draft saved", "PostgreSQL Patterns…"],
                ["Scheduled", "TypeScript at the API…"],
              ].map((x, i) => (
                <div key={x[1]}>
                  <span className={`activity-dot dot-${i}`} />
                  <div>
                    <b>{x[0]}</b>
                    <p>{x[1]}</p>
                    <small>Editable date</small>
                  </div>
                </div>
              ))}
            </div>
            <div className="activity-empty">
              Activity will appear here when a backend is connected.
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}

function AdminTable({
  rows,
  go,
  compact = false,
  onDelete,
}: {
  rows: string[][];
  go: (p: string) => void;
  compact?: boolean;
  onDelete?: (title: string) => void;
}) {
  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date</th>
            {!compact && <th>Views</th>}
            <th>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              <td>
                <div className="table-title-icon">
                  <Icon name="file" />
                </div>
                <div>
                  <b>{row[0]}</b>
                  <small>/blog/{row[0].toLowerCase().replace(/\W+/g, "-")}</small>
                </div>
              </td>
              <td>
                <Badge>{row[1]}</Badge>
              </td>
              <td>
                <span className={`status status-${row[2].toLowerCase()}`}>
                  <i />
                  {row[2]}
                </span>
              </td>
              <td>{row[3]}</td>
              {!compact && <td>{row[4]}</td>}
              <td>
                <div className="table-actions">
                  <button title="Preview">
                    <Icon name="eye" />
                  </button>
                  <button title="Edit" onClick={() => go("admin/articles/edit")}>
                    <Icon name="edit" />
                  </button>
                  {!compact && (
                    <button title="Delete" onClick={() => onDelete?.(row[0])}>
                      <Icon name="trash" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminArticles({
  go,
  onLogout,
  notify,
}: {
  go: (p: string) => void;
  onLogout: () => void;
  notify: (t: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [deleteTitle, setDeleteTitle] = useState("");
  const rows = adminRows.filter(
    (r) =>
      r[0].toLowerCase().includes(query.toLowerCase()) &&
      (status === "All statuses" || r[2] === status),
  );
  return (
    <AdminShell
      route="admin-articles"
      go={go}
      onLogout={onLogout}
      title="Articles"
      subtitle="Create, edit, and organize your writing."
      actions={
        <Button icon="plus" onClick={() => go("admin/articles/new")}>
          New Article
        </Button>
      }
    >
      <div className="admin-content">
        <section className="admin-panel">
          <div className="article-tools">
            <div className="search-box">
              <Icon name="search" />
              <input
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All statuses</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
            </select>
            <select>
              <option>All categories</option>
              <option>Backend</option>
              <option>Database</option>
            </select>
            <select>
              <option>Last updated</option>
              <option>Title A–Z</option>
            </select>
          </div>
          {rows.length ? (
            <>
              <AdminTable rows={rows} go={go} onDelete={setDeleteTitle} />
              <div className="table-footer">
                <span>Showing {rows.length} sample articles</span>
                <div>
                  <button disabled>←</button>
                  <button className="active">1</button>
                  <button disabled>→</button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState
              icon="file"
              title="No articles match"
              copy="Try clearing the search or status filter."
              action={
                <Button
                  onClick={() => {
                    setQuery("");
                    setStatus("All statuses");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          )}
        </section>
      </div>
      {deleteTitle && (
        <ConfirmDialog
          title="Delete this article?"
          copy={`“${deleteTitle}” will be removed from this demo view. This action is shown for prototype purposes.`}
          confirm="Delete article"
          onCancel={() => setDeleteTitle("")}
          onConfirm={() => {
            setDeleteTitle("");
            notify("Delete action confirmed in prototype mode.");
          }}
        />
      )}
    </AdminShell>
  );
}

function ConfirmDialog({
  title,
  copy,
  confirm,
  onCancel,
  onConfirm,
}: {
  title: string;
  copy: string;
  confirm: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        <span className="danger-icon">
          <Icon name="trash" />
        </span>
        <h2>{title}</h2>
        <p>{copy}</p>
        <div>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <button className="button danger-button" onClick={onConfirm}>
            {confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminEditor({
  go,
  onLogout,
  notify,
}: {
  go: (p: string) => void;
  onLogout: () => void;
  notify: (t: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [cover, setCover] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const save = (action: string) => notify(`${action} completed in this session-only prototype.`);
  const addTitle = (v: string) => {
    setTitle(v);
    setSlug(
      v
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    );
  };
  return (
    <AdminShell
      route="admin-editor"
      go={go}
      onLogout={onLogout}
      title="New Article"
      subtitle="Create a thoughtful piece for your readers."
      actions={
        <>
          <Button variant="secondary" onClick={() => save("Preview")}>
            Preview
          </Button>
          <Button onClick={() => save("Publish")}>Publish</Button>
        </>
      }
    >
      <div className="admin-content editor-layout">
        <div className="editor-main">
          <section className="admin-panel editor-fields">
            <label>
              Article title
              <input
                className="title-input"
                value={title}
                onChange={(e) => addTitle(e.target.value)}
                placeholder="Enter a clear, descriptive title..."
              />
            </label>
            <label>
              Slug
              <div className="slug-field">
                <span>dev.thanh/blog/</span>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-slug"
                />
              </div>
            </label>
            <label>
              Excerpt
              <textarea
                rows={3}
                maxLength={180}
                placeholder="A short summary that helps readers understand what this article is about..."
              />
            </label>
          </section>
          <section className="admin-panel rich-editor">
            <div className="editor-toolbar">
              <select aria-label="Text style">
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
              <span />
              {(["bold", "italic", "link", "list", "quote", "code", "image"] as IconName[]).map(
                (x) => (
                  <button key={x} title={x}>
                    <Icon name={x} />
                  </button>
                ),
              )}
            </div>
            <div
              className="editor-canvas"
              contentEditable
              suppressContentEditableWarning
              data-placeholder="Start writing your article here..."
            />
            <div className="editor-status">
              <span>0 words · 0 min read</span>
              <span>Saved locally just now</span>
            </div>
          </section>
        </div>
        <aside className="editor-side">
          <section className="admin-panel">
            <h3>Publishing</h3>
            <label>
              Status
              <select>
                <option>Draft</option>
                <option>Published</option>
                <option>Scheduled</option>
              </select>
            </label>
            <div className="publish-row">
              <span>Visibility</span>
              <b>Public</b>
            </div>
            <div className="publish-row">
              <span>Publish date</span>
              <b>Immediately</b>
            </div>
            <Button variant="secondary" onClick={() => save("Draft save")}>
              Save Draft
            </Button>
          </section>
          <section className="admin-panel">
            <h3>Cover image</h3>
            <button
              className={`cover-upload ${cover ? "has-cover" : ""}`}
              onClick={() => fileRef.current?.click()}
            >
              {cover ? (
                <img src={cover} alt="Uploaded preview" />
              ) : (
                <>
                  <Icon name="upload" />
                  <b>Upload cover image</b>
                  <span>PNG, JPG or WebP · max 5MB</span>
                </>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setCover(URL.createObjectURL(f));
              }}
            />
          </section>
          <section className="admin-panel">
            <h3>Organization</h3>
            <label>
              Category
              <select>
                <option>Select category</option>
                <option>Backend</option>
                <option>Database</option>
                <option>AI/ML</option>
              </select>
            </label>
            <label>
              Tags
              <input placeholder="Add a tag and press Enter" />
            </label>
          </section>
          <section className="admin-panel">
            <h3>Search preview</h3>
            <label>
              SEO title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="SEO title"
              />
            </label>
            <label>
              SEO description
              <textarea rows={3} placeholder="Search description..." />
            </label>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}

function AdminMedia({
  go,
  onLogout,
  notify,
}: {
  go: (p: string) => void;
  onLogout: () => void;
  notify: (t: string) => void;
}) {
  const [media, setMedia] = useState<{ name: string; url: string; date: string }[]>([
    { name: "article-cover-sample.jpg", url: articles[0].image, date: "Editable date" },
    {
      name: "workspace-placeholder.jpg",
      url: "https://images.unsplash.com/photo-1520583457224-aee11bad5112?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=700&h=500",
      date: "Editable date",
    },
  ]);
  const [target, setTarget] = useState("");
  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f)
      setMedia((m) => [
        { name: f.name, url: URL.createObjectURL(f), date: "Just now · session only" },
        ...m,
      ]);
  };
  return (
    <AdminShell
      route="admin-media"
      go={go}
      onLogout={onLogout}
      title="Media Library"
      subtitle="Upload and manage images for your articles."
      actions={
        <label className="button button-primary">
          <Icon name="upload" />
          Upload Image
          <input hidden type="file" accept="image/*" onChange={upload} />
        </label>
      }
    >
      <div className="admin-content">
        <div className="media-tools">
          <div className="search-box">
            <Icon name="search" />
            <input placeholder="Search media..." />
          </div>
          <span>{media.length} files · prototype library</span>
        </div>
        {media.length ? (
          <div className="media-grid">
            {media.map((m) => (
              <article key={m.name} className="media-card">
                <div>
                  <img src={m.url} alt="Media thumbnail" />
                  <div className="media-hover">
                    <button onClick={() => notify("Media preview opened in prototype mode.")}>
                      <Icon name="eye" />
                    </button>
                    <button onClick={() => setTarget(m.name)}>
                      <Icon name="trash" />
                    </button>
                  </div>
                </div>
                <b>{m.name}</b>
                <span>{m.date}</span>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="image"
            title="Your media library is empty"
            copy="Upload an image to use it as an article cover or inline visual."
          />
        )}
      </div>
      {target && (
        <ConfirmDialog
          title="Delete this image?"
          copy={`${target} will be removed from this session-only media library.`}
          confirm="Delete image"
          onCancel={() => setTarget("")}
          onConfirm={() => {
            setMedia((m) => m.filter((x) => x.name !== target));
            setTarget("");
          }}
        />
      )}
    </AdminShell>
  );
}

export default function App() {
  const { route, go } = useRoute();
  const [toast, setToast] = useState("");
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("thanh-admin-demo") === "true");
  const notify = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(""), 2800);
  };
  const login = () => {
    sessionStorage.setItem("thanh-admin-demo", "true");
    setAuthed(true);
  };
  const logout = () => {
    sessionStorage.removeItem("thanh-admin-demo");
    setAuthed(false);
    go("admin/login");
  };
  useEffect(() => {
    if (route.startsWith("admin-") && route !== "admin-login" && !authed) go("admin/login");
    if (route === "admin-login" && authed) go("admin");
  }, [route, authed]);
  let page: ReactNode;
  if (route === "blog") page = <BlogPage go={go} />;
  else if (route === "article") page = <ArticlePage go={go} notify={notify} />;
  else if (route === "admin-login") page = <AdminLogin go={go} onLogin={login} notify={notify} />;
  else if (route === "admin-dashboard" && authed)
    page = <AdminDashboard go={go} onLogout={logout} />;
  else if (route === "admin-articles" && authed)
    page = <AdminArticles go={go} onLogout={logout} notify={notify} />;
  else if (route === "admin-editor" && authed)
    page = <AdminEditor go={go} onLogout={logout} notify={notify} />;
  else if (route === "admin-media" && authed)
    page = <AdminMedia go={go} onLogout={logout} notify={notify} />;
  else page = <HomePage go={go} notify={notify} />;
  return (
    <>
      {page}
      {toast && <Toast message={toast} />}
    </>
  );
}
