import { useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Github, Linkedin, Mail, ExternalLink, Code2, Sparkles, ArrowRight } from 'lucide-react'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-white/50 shadow-sm">
      <Sparkles size={12} className="text-purple-500" /> {children}
    </span>
  )
}

function Project({ title, desc, tags = [], link, repo }) {
  return (
    <div className="group relative rounded-xl border border-white/30 bg-white/60 backdrop-blur p-5 shadow-sm hover:shadow-md transition-shadow">
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
  )
}

export default function App() {
  const [emailCopied, setEmailCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('youremail@example.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 1500)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 text-slate-800" id="home">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-30 border-b border-white/40 bg-white/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-bold tracking-tight text-lg">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DevPortfolio</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#projects" className="hover:text-slate-900">Projects</a>
            <a href="#skills" className="hover:text-slate-900">Skills</a>
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
            <div className="flex items-center gap-3">
              <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-slate-900"><Github size={18} /></a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-slate-900"><Linkedin size={18} /></a>
              <a href="#contact" aria-label="Email" className="hover:text-slate-900"><Mail size={18} /></a>
            </div>
          </nav>
          <a href="#contact" className="md:hidden inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm">
            Contact <ArrowRight size={14} />
          </a>
        </div>
      </header>

      {/* Hero with Spline */}
      <section className="relative pt-24 md:pt-28">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Gradient overlay for readability - doesn't block interactions */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/70 via-white/40 to-white/90" />

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

      {/* Projects */}
      <section id="projects" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
              <p className="text-slate-600 mt-1">A selection of work I loved building</p>
            </div>
            <a href="#contact" className="hidden md:inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">Work with me <ArrowRight size={14} /></a>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold">Skills & Toolbox</h2>
          <p className="text-slate-600 mt-1">What I use to bring ideas to life</p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ['Frontend', 'React, Vite, Tailwind, Framer Motion'],
              ['Backend', 'FastAPI, Node, REST, WebSockets'],
              ['Data & Cloud', 'MongoDB, Postgres, Docker, CI/CD'],
              ['Extras', 'Spline, Three.js, Testing, Design Systems'],
            ].map(([title, items]) => (
              <div key={title} className="rounded-xl border border-white/40 bg-white/70 p-5 shadow-sm">
                <h3 className="font-semibold text-slate-800">{title}</h3>
                <p className="text-sm text-slate-600 mt-2">{items}</p>
              </div>
            ))}
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
