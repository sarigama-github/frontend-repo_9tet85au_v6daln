import { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Github, Linkedin, Mail, ExternalLink, Code2, Sparkles, ArrowRight, Menu, X, Briefcase, Rocket, Layers } from 'lucide-react'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-white/50 shadow-sm">
      <Sparkles size={12} className="text-purple-500" /> {children}
    </span>
  )
}

// 3D tilt wrapper for interactive cards
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const frame = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const R = 10 // max rotation deg
    const Z = 24 // pop-out in px

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rx = (py - 0.5) * -2 * R
      const ry = (px - 0.5) * 2 * R
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(${Z}px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)'
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className={`[transform-style:preserve-3d] will-change-transform transition-transform duration-200 ${className}`}
         ref={ref}>
      {children}
    </div>
  )
}

// Floating 3D decorations (orbs) used across sections
function FloatingDecor({ count = 3, variant = 'blue' }) {
  const colors = useMemo(() => {
    if (variant === 'purple') return ['#a78bfa22', '#c4b5fd22']
    if (variant === 'pink') return ['#f472b622', '#f9a8d422']
    return ['#60a5fa22', '#93c5fd22']
  }, [variant])

  const items = Array.from({ length: count })
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 [perspective:1000px] overflow-hidden">
      <style>{`
        @keyframes floatY { 0%{ transform: translateY(0) } 50%{ transform: translateY(-16px) } 100%{ transform: translateY(0) } }
        @keyframes rotateOrb { 0%{ transform: rotate(0deg) } 100%{ transform: rotate(360deg) } }
      `}</style>
      {items.map((_, i) => {
        const size = 140 + Math.round(Math.random() * 120)
        const top = Math.round(Math.random() * 80)
        const left = Math.round(Math.random() * 80)
        const delay = (Math.random() * 4).toFixed(2)
        const z = (Math.random() * 200 - 100).toFixed(0) // [-100, 100]
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              transform: `translateZ(${z}px)`,
              filter: 'blur(0.2px)'
            }}
          >
            <div
              className="rounded-full shadow-xl"
              style={{
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle at 30% 30%, ${colors[1]} 0%, ${colors[0]} 60%, transparent 70%)`,
                animation: `floatY ${6 + i}s ease-in-out ${delay}s infinite`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

function Project({ title, desc, tags = [], link, repo }) {
  return (
    <TiltCard className="group relative">
      <div className="relative rounded-xl border border-white/30 bg-white/60 backdrop-blur p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 pointer-events-none" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">{title}</h3>
            <p className="text-sm text-slate-600 mt-1">{desc}</p>
          </div>
          <Code2 className="text-purple-500" size={20} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="text-[10px] uppercase tracking-wide bg-slate-900/5 text-slate-700 px-2 py-1 rounded-md ring-1 ring-slate-900/10">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm">
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700">
              Live <ExternalLink size={14} />
            </a>
          )}
          {repo && (
            <a href={repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900">
              Code <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  )
}

function Service({ icon: Icon, title, desc }) {
  return (
    <TiltCard>
      <div className="rounded-xl border border-white/40 bg-white/70 p-6 shadow-sm hover:shadow-md transition">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/10 to-purple-600/10 text-blue-700">
          <Icon size={18} />
        </div>
        <h3 className="mt-3 font-semibold text-slate-800">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>
    </TiltCard>
  )
}

function TimelineItem({ role, company, period, points }) {
  return (
    <div className="relative pl-6">
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow ring-2 ring-white/80" />
      <div className="rounded-lg bg-white/70 ring-1 ring-white/50 backdrop-blur p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="font-semibold text-slate-800">{role} • <span className="text-slate-600">{company}</span></h4>
          <span className="text-xs text-slate-500">{period}</span>
        </div>
        <ul className="mt-2 list-disc ms-4 text-sm text-slate-600">
          {points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Subtle parallax layers in hero
function HeroParallax() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const layers = el.querySelectorAll('[data-depth]')
      layers.forEach((node) => {
        const d = parseFloat(node.getAttribute('data-depth') || '0')
        const tx = -x * d * 20
        const ty = -y * d * 20
        node.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      })
    }

    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      <div data-depth="0.2" className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl" />
      <div data-depth="0.4" className="absolute top-10 right-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 blur-xl" />
      <div data-depth="0.6" className="absolute bottom-10 left-1/3 h-24 w-24 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 blur-xl" />
    </div>
  )
}

export default function App() {
  const [emailCopied, setEmailCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('youremail@example.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 1500)
    } catch {}
  }

  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#services', label: 'Services' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 text-slate-800" id="home">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-30 border-b border-white/40 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-bold tracking-tight text-lg">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DevPortfolio</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-slate-900">{l.label}</a>
            ))}
            <div className="flex items-center gap-3">
              <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-slate-900"><Github size={18} /></a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-slate-900"><Linkedin size={18} /></a>
              <a href="#contact" aria-label="Email" className="hover:text-slate-900"><Mail size={18} /></a>
            </div>
          </nav>

          <button aria-label="Toggle menu" onClick={() => setMenuOpen((s) => !s)} className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md ring-1 ring-slate-200 bg-white/70">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/50 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={closeMenu} className="py-2 text-sm">{l.label}</a>
              ))}
              <div className="mt-1 flex items-center gap-4 py-2">
                <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-slate-900"><Github size={18} /></a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-slate-900"><Linkedin size={18} /></a>
                <a href="#contact" onClick={closeMenu} aria-label="Email" className="hover:text-slate-900"><Mail size={18} /></a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero with Spline */}
      <section className="relative pt-24 md:pt-28">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/70 via-white/40 to-white/90" />
        <HeroParallax />

        <div className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
            <div className="max-w-3xl">
              <Badge>Tech • Portfolio • Interactive • Modern</Badge>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
                Hi, I’m <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Name</span> —
                building playful, modern web experiences.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-slate-700">
                Full‑stack developer crafting delightful products with React, TypeScript, and cloud‑native backends.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-md bg-slate-900 text-white px-4 py-2 text-sm shadow hover:opacity-90">
                  View Projects <ArrowRight size={16} />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-white/70 backdrop-blur ring-1 ring-white/50 text-slate-800 px-4 py-2 text-sm shadow">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative z-10 py-16 md:py-24">
        <FloatingDecor count={5} variant="blue" />
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold">What I Do</h2>
          <p className="text-slate-600 mt-1">End‑to‑end development with a focus on UX and performance</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1000px]">
            <Service icon={Rocket} title="Web Apps"
              desc="High‑quality React frontends with smooth animations, accessibility, and responsive design." />
            <Service icon={Layers} title="APIs & Backends"
              desc="Reliable REST/WebSocket services, authentication, and databases with best practices." />
            <Service icon={Briefcase} title="Product Engineering"
              desc="From idea to launch — prototypes, iterations, and measurable outcomes." />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-10 py-16 md:py-24">
        <FloatingDecor count={6} variant="purple" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
              <p className="text-slate-600 mt-1">A selection of work I loved building</p>
            </div>
            <a href="#contact" className="hidden md:inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">Work with me <ArrowRight size={14} /></a>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1000px]">
            <Project
              title="Realtime Chat App"
              desc="WebSockets powered chat with rooms, typing indicators, and message search."
              tags={["React", "FastAPI", "WebSockets"]}
              link="#"
              repo="#"
            />
            <Project
              title="3D Product Showcase"
              desc="Interactive 3D viewer using Spline and custom shaders for lighting and depth."
              tags={["Spline", "Three.js", "UX"]}
              link="#"
              repo="#"
            />
            <Project
              title="Task Manager"
              desc="Kanban-style productivity tool with offline support and sync."
              tags={["TypeScript", "PWA", "MongoDB"]}
              link="#"
              repo="#"
            />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative z-10 py-16 md:py-24 bg-white/60 backdrop-blur">
        <FloatingDecor count={4} variant="pink" />
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold">Skills & Toolbox</h2>
          <p className="text-slate-600 mt-1">What I use to bring ideas to life</p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 [perspective:1000px]">
            {[
              ['Frontend', 'React, Vite, Tailwind, Framer Motion'],
              ['Backend', 'FastAPI, Node, REST, WebSockets'],
              ['Data & Cloud', 'MongoDB, Postgres, Docker, CI/CD'],
              ['Extras', 'Spline, Three.js, Testing, Design Systems'],
            ].map(([title, items]) => (
              <TiltCard key={title}>
                <div className="rounded-xl border border-white/40 bg-white/70 p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-800">{title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{items}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>
          <p className="text-slate-600 mt-1">Highlights from recent roles</p>

          <div className="mt-8 grid gap-6">
            <TimelineItem
              role="Senior Frontend Engineer"
              company="TechCo"
              period="2022 — Present"
              points={[
                'Led migration to React + Vite, reducing bundle size by 38%.',
                'Built design system components, improving dev velocity by 2x.',
                'Shipped real‑time features with WebSockets and optimistic UI.',
              ]}
            />
            <TimelineItem
              role="Full‑stack Developer"
              company="Startup Inc."
              period="2020 — 2022"
              points={[
                'Delivered 10+ features end‑to‑end from API to UI.',
                'Implemented CI/CD pipelines and containerized services.',
                'Collaborated closely with product and design to iterate quickly.',
              ]}
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold">About Me</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              I’m a developer focused on crafting interactive, high‑performance web apps. I love blending solid engineering with delightful user experiences — from real‑time systems to immersive 3D.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 py-16 md:py-24">
        <FloatingDecor count={5} variant="blue" />
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold">Let’s build something great</h2>
            <p className="mt-2 text-slate-600">Email me or connect on socials.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="mailto:youremail@example.com" className="inline-flex items-center gap-2 rounded-md bg-slate-900 text-white px-4 py-2 text-sm shadow hover:opacity-90">
                <Mail size={16} /> Email
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white text-slate-800 ring-1 ring-slate-200 px-4 py-2 text-sm shadow">
                <Github size={16} /> GitHub
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white text-slate-800 ring-1 ring-slate-200 px-4 py-2 text-sm shadow">
                <Linkedin size={16} /> LinkedIn
              </a>
              <button onClick={copyEmail} className="inline-flex items-center gap-2 rounded-md bg-white text-slate-800 ring-1 ring-slate-200 px-4 py-2 text-sm shadow">
                {emailCopied ? 'Copied!' : 'Copy email'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-sm text-slate-600">
        <p>
          © {new Date().getFullYear()} Your Name. Built with love, React, and a sprinkle of 3D.
        </p>
      </footer>
    </div>
  )
}
