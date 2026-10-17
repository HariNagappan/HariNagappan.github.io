import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react'
import { CONTACT } from './content'

const css = (v: Record<string, string | number>) => v as unknown as CSSProperties
const isPlaceholder = (href: string) => href.includes('YOUR')

const HEADLINE = 'I build software that turns interesting problems into real products.'

// inset %, tilt-x deg, tilt-y deg, tone, seconds per orbit, dashed
const RINGS: [number, number, number, 'cy' | 'vi', number, boolean][] = [
  [0, 72, 0, 'cy', 28, false],
  [9, 72, 62, 'vi', 20, false],
  [18, 72, 124, 'cy', 15, true],
  [27, 8, 82, 'vi', 11, false],
]
const READOUTS = ['Real-time systems', 'Mobile products', 'Databases', 'Explainable ML']

const PRINCIPLES = [
  { k: 'System', t: 'Understand the system, not just the syntax.', d: 'Frameworks change. How state, networks and databases behave underneath is what carries over.' },
  { k: 'Users', t: 'Build for real users.', d: 'Apps used by 2,000+ people change what “done” means.' },
  { k: 'Performance', t: 'Treat performance as a product feature.', d: 'Cutting JSON Patch updates from ≈40 KB to ≈5 KB is something players feel, not just a number.' },
  { k: 'Curiosity', t: 'Stay curious about how things work.', d: 'Open the box: read the source, trace the packet, ask why it’s shaped that way.' },
  { k: 'Iteration', t: 'Think beyond the first working implementation.', d: 'Working is the starting line. Edge cases, scale and a better second draft come next.' },
]

const ON_TILES = [3, 9, 12, 18, 24, 27, 33, 38, 41, 46]
const CODE_LINES = [46, 72, 38, 84, 56, 28, 64]
// [width in rem, highlight intensity]: abstract tokens, no real text
const TOKENS: [number, number][] = [
  [3, 0], [2, 0], [4, 0.2], [2, 0], [5, 0.9], [3, 0.45], [2, 0], [4, 0], [3, 0.7],
  [2, 0.3], [5, 0], [2, 0], [3, 0.55], [4, 0], [2, 0.15], [3, 0], [5, 0], [2, 0.35],
]

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        }),
      { threshold: 0.2 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
}

function Nav() {
  const items: [string, string][] = [['about', 'About'], ['work', 'Work'], ['approach', 'Approach'], ['contact', 'Contact']]
  return (
    <nav className="nav" aria-label="Primary">
      <div className="wrap">
        <a className="brand" href="#top">Hari Nagappan</a>
        <ul>
          {items.map(([id, label]) => (
            <li key={id}><a href={`#${id}`}>{label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', String((e.clientX / window.innerWidth - 0.5) * 2))
        el.style.setProperty('--my', String((e.clientY / window.innerHeight - 0.5) * 2))
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero" id="top" ref={ref} aria-label="Introduction">
      <div className="wrap">
        <div className="copy">
          <p className="eyebrow">NIT TRICHY · SOFTWARE ENGINEERING · PRODUCT BUILDING</p>
          <h1>
            {HEADLINE.split(' ').map((w, i) => (
              <Fragment key={i}>
                <span className="w" style={css({ '--i': i })}>{w}</span>{' '}
              </Fragment>
            ))}
          </h1>
          <p className="lede">
            I’m Hari — a computer science student, developer, and product-minded builder exploring the
            intersection of engineering, systems, and ideas worth building.
          </p>
          <div className="cta">
            <a className="btn primary" href="#work">Explore my work</a>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </div>

        <div className="stage" aria-hidden="true">
          <div className="halo" />
          <div className="sculpt">
            <div className="gyro">
              <div className="spin">
                {RINGS.map(([inset, rx, ry, tone, dur, dash], i) => (
                  <div
                    key={i}
                    className={`ring ${tone}${dash ? ' dash' : ''}`}
                    style={css({ '--in': `${inset}%`, '--rx': `${rx}deg`, '--ry': `${ry}deg` })}
                  >
                    <div className="orbit" style={css({ '--d': `${dur}s`, '--o': `${i * -3.1}s` })}>
                      <i className="node" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {READOUTS.map((t, i) => (
            <span key={t} className={`readout r${i}`}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const beats: [string, string][] = [
    ['Beneath the surface', 'A feature that merely works never satisfied me. I want to know why: what the runtime is doing, where the bytes go, and what breaks first when real people start using it.'],
    ['The hard parts are the fun parts', 'Real-time state, rate limiting, auction logic, JSON Patch updates trimmed from ≈40 KB to ≈5 KB. This is the unglamorous engineering where products quietly succeed or fail.'],
    ['Products, not just programs', 'Fast code matters less if nobody opens the app. I like building for real users and turning technical ideas into things that are genuinely useful.'],
    ['Still compiling', 'I’m a student, not a finished engineer. The plan is to keep getting better at the hard parts, and eventually build products of my own.'],
  ]
  return (
    <section id="about" aria-labelledby="h-about">
      <div className="wrap about">
        <h2 id="h-about" className="big">Software is a surface. I’m more interested in what’s underneath.</h2>
        <div className="beats">
          {beats.map(([t, p]) => (
            <article key={t} className="beat">
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
          <p className="now">
            Right now: App Development Manager at Delta Force, building Code Collab, and in my third year of
            Computer Science and Engineering at NIT Tiruchirappalli.
          </p>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" aria-labelledby="h-work">
      <div className="wrap">
        <h2 id="h-work" className="h2">Selected work</h2>

        <article className="proj" style={css({ '--ac': 'var(--vi)' })}>
          <div className="viz v-arc reveal" aria-hidden="true">
            <div className="tiles">
              {Array.from({ length: 50 }, (_, i) => (
                <i key={i} className={ON_TILES.includes(i) ? 'on' : ''} style={css({ '--i': `${(i % 7) * 0.37}s` })} />
              ))}
            </div>
            <div className="bars">
              <div>
                <p className="rd"><span>JSON Patch update, before</span><b>≈40 KB</b></p>
                <i className="bar b1" />
              </div>
              <div>
                <p className="rd"><span>After optimization</span><b>≈5 KB</b></p>
                <i className="bar b2" />
              </div>
            </div>
          </div>
          <div className="txt">
            <p className="kind">Real-time multiplayer game</p>
            <h3>Arcadia Rivals</h3>
            <ul>
              <li>Worked on real-time game state and backend functionality.</li>
              <li>Optimized JSON Patch updates from approximately 40 KB to 5 KB.</li>
              <li>Worked with backend rate limiting and auction-related logic.</li>
            </ul>
            <div className="stack"><span>Go</span><span>TypeScript</span><span>JavaScript</span><span>Phaser</span></div>
          </div>
        </article>

        <article className="proj" style={css({ '--ac': 'var(--cy)' })}>
          <div className="viz v-app" aria-hidden="true">
            <div className="phone"><i className="h" /><i className="s" /><i /><i /><i className="s" /><i /><i /></div>
            <div>
              <p className="num">2,000+</p>
              <p className="kind">users reached</p>
            </div>
          </div>
          <div className="txt">
            <p className="kind">Android apps for college festivals</p>
            <h3>Festember and Pragyan</h3>
            <ul>
              <li>Used Kotlin Multiplatform, Jetpack Compose, and related Android technologies.</li>
              <li>The applications have reached over 2,000 users.</li>
              <li>Experience with application architecture, state management, asynchronous data flows, notifications, and local persistence.</li>
            </ul>
            <div className="stack"><span>Kotlin Multiplatform</span><span>Jetpack Compose</span><span>Android</span></div>
          </div>
        </article>

        <article className="proj" style={css({ '--ac': 'var(--bl)' })}>
          <div className="viz v-col" aria-hidden="true">
            <span className="pill"><i />IN PROGRESS</span>
            <div className="editor">
              {CODE_LINES.map((w, i) => (
                <div className="ln" key={i}>
                  <b>{i + 1}</b>
                  <i className={i % 3 === 1 ? 'a' : ''} style={{ width: `${w}%` }} />
                  {i === 2 && <em className="cur c1" data-n="you" style={{ left: '46%' }} />}
                  {i === 5 && <em className="cur c2" data-n="peer" style={{ left: '32%' }} />}
                </div>
              ))}
            </div>
          </div>
          <div className="txt">
            <p className="kind">Collaborative coding platform, in progress</p>
            <h3>Code Collab</h3>
            <ul>
              <li>A platform for people to collaborate on code in real time.</li>
              <li>Focused on shared coding workspaces and collaborative development.</li>
            </ul>
            <div className="stack"><span>React</span><span>TypeScript</span><span>Go</span><span>PostgreSQL</span><span>Real-time communication</span></div>
          </div>
        </article>

        <article className="proj" style={css({ '--ac': 'var(--vi)' })}>
          <div className="viz v-xai" aria-hidden="true">
            <div className="toks">
              {TOKENS.map(([w, a], i) => (
                <i
                  key={i}
                  style={{
                    width: `${w}rem`,
                    background: a ? `rgba(139,123,255,${0.25 + a * 0.6})` : 'rgba(255,255,255,.09)',
                    boxShadow: a > 0.5 ? '0 0 16px rgba(139,123,255,.55)' : 'none',
                  }}
                />
              ))}
            </div>
            <div className="flow"><span>Context</span><i /><span>Prediction</span><i /><span>Highlighted evidence</span></div>
          </div>
          <div className="txt">
            <p className="kind">Explainable AI and machine learning</p>
            <h3>Hate-speech classification</h3>
            <ul>
              <li>Worked on a hate-speech classification project.</li>
              <li>Explored contextual reasoning and highlighting text to help explain model predictions.</li>
              <li>Python-based machine learning and backend components.</li>
            </ul>
            <div className="stack"><span>Python</span><span>Machine learning</span><span>Explainability</span></div>
          </div>
        </article>
      </div>
    </section>
  )
}

function Approach() {
  const [n, setN] = useState(0)
  const radii = [34, 68, 102, 136, 168]
  return (
    <section id="approach" aria-labelledby="h-approach">
      <div className="wrap">
        <h2 id="h-approach" className="h2">How I build</h2>
        <div className="approach">
          <ul className="plist">
            {PRINCIPLES.map((p, i) => (
              <li key={p.k}>
                <button
                  type="button"
                  className={i === n ? 'on' : ''}
                  aria-pressed={i === n}
                  onClick={() => setN(i)}
                  onMouseEnter={() => setN(i)}
                  onFocus={() => setN(i)}
                >
                  <strong>{p.t}</strong>
                  <span className="d">{p.d}</span>
                </button>
              </li>
            ))}
          </ul>
          <svg className="diagram" viewBox="0 0 360 360" role="img" aria-label={`System diagram highlighting: ${PRINCIPLES[n].k}`}>
            <circle className="sweep" cx="180" cy="180" r="176" />
            {radii.map((r, i) => (
              <g key={r} className={i === n ? 'lay on' : 'lay'}>
                <circle cx="180" cy="180" r={r} />
                <text x="180" y={180 - r + 14} textAnchor="middle">{PRINCIPLES[i].k}</text>
              </g>
            ))}
            <circle className="dot" cx="180" cy="180" r="4" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function Play() {
  const items: [string, string][] = [
    ['Basketball', 'Spacing, timing, and trusting the system when the clock is running.'],
    ['Badminton', 'Fast rallies, faster feedback loops. Footwork is just good architecture.'],
    ['Video games', 'My favorite real-time systems, especially the ones that feel good because they’re built well.'],
  ]
  return (
    <section aria-labelledby="h-play">
      <div className="wrap">
        <h2 id="h-play" className="h2">Away from the keyboard</h2>
        <div className="play">
          {items.map(([t, p]) => (
            <article key={t}>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const links: [string, string][] = [['Email', CONTACT.email], ['GitHub', CONTACT.github], ['LinkedIn', CONTACT.linkedin]]
  return (
    <section id="contact" className="close" aria-labelledby="h-contact">
      <div className="wrap">
        <h2 id="h-contact" className="finale reveal">The best ideas are the ones you actually build.</h2>
        <p className="lede">
          If you’re building something interesting, or you just want to trade notes on real-time systems,
          products, or a good game of basketball, I’d like to hear from you.
        </p>
        <ul className="links">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {label}
                {isPlaceholder(href) && <span className="ph">placeholder</span>}
              </a>
            </li>
          ))}
        </ul>
        {links.some(([, h]) => isPlaceholder(h)) && (
          <p className="hint">Replace the placeholder links in src/content.ts before you publish.</p>
        )}
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Work />
        <Approach />
        <Play />
        <Contact />
      </main>
      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} Hari Nagappan</span>
        <a href="#top">Back to top</a>
      </footer>
    </>
  )
}
