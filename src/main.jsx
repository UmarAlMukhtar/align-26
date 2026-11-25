import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Instagram, Linkedin, Plus, X } from 'lucide-react'
import './styles.css'
import './footer.css'
import './motion.css'

const ease = [0.16, 1, 0.3, 1]
const localRegistration = import.meta.env.DEV
const reveal = { initial: { opacity: 0, y: 28, filter: 'blur(8px)' }, whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' }, viewport: { once: true, amount: 0.18 }, transition: { duration: .85, ease } }
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=LBS+College+of+Engineering%2C+Povval%2C+Kasaragod%2C+Kerala+671542'
const mapsEmbedUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=75.073%2C12.499%2C75.088%2C12.508&layer=mapnik&marker=12.50358%2C75.08078'

const timeline = [
  ['09:30', 'Registration & Reporting', 'Participant arrival, reporting and attendance.'],
  ['10:15', 'Inaugural Ceremony', 'Opening with institutional leaders, IEEE faculty advisors, speakers, student leadership and invited dignitaries.'],
  ['11:00', 'Industry Panel Discussion', 'Bridging Academia and Industry for Future-Ready Engineering Professionals. Perspectives from industry, startups and academia.'],
  ['12:00', 'Lunch Break', 'Lunch and refreshments for registered participants.'],
  ['13:15', 'Hands-on Technical Workshop', 'Practical exposure to emerging IEEE IAS-related technologies such as robotics, industrial automation, embedded systems, Industrial IoT or additive manufacturing.'],
  ['15:00', 'Technical Quiz & Closing', 'An individual technical quiz based on the day’s concepts, followed by recognition and closing remarks.']
]

function LogoMark() {
  return <span className="logoMark"><i /><i /></span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const [overDarkSection, setOverDarkSection] = useState(false)
  const headerLogo = useRef(null)

  useEffect(() => {
    const darkSections = document.querySelectorAll('.darkSection, .siteFooter')
    let observer

    const observeLogoBackground = () => {
      observer?.disconnect()
      const logo = headerLogo.current
      const midpoint = Math.floor(logo.offsetTop + logo.offsetHeight / 2)
      const bottomInset = Math.max(0, document.documentElement.clientHeight - midpoint - 1)
      const sectionsBehindLogo = new Set()

      observer = new IntersectionObserver(entries => {
        for (const { target, isIntersecting } of entries) {
          if (isIntersecting) sectionsBehindLogo.add(target)
          else sectionsBehindLogo.delete(target)
        }
        setOverDarkSection(sectionsBehindLogo.size > 0)
      }, {
        // Narrow the viewport to a one-pixel strip through the fixed logo.
        rootMargin: `-${midpoint}px 0px -${bottomInset}px 0px`,
      })

      darkSections.forEach(section => observer.observe(section))
    }

    observeLogoBackground()
    window.addEventListener('resize', observeLogoBackground)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', observeLogoBackground)
    }
  }, [])

  const navigation = [
    ['About', '#about'], ['Program', '#program'], ['Workshop', '#workshop'],
    ['Why Attend', '#why-attend'], ['Venue', '#venue'], ['FAQ', '#faq'],
  ]

  return (
    <MotionConfig reducedMotion="user">
      <style>{`.menuButton{border:0;cursor:pointer;font-family:inherit}.menuPanel{position:fixed;z-index:45;top:72px;right:16px;width:min(360px,calc(100vw - 32px));background:#050505;color:#fff;border-radius:22px;box-shadow:0 22px 60px rgba(0,0,0,.24);padding:18px}.menuPanelInner{display:flex;flex-direction:column;gap:18px}.menuLabel{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#888}.menuLinks{display:grid;gap:3px}.menuLinks a{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #242424;font-size:18px;font-weight:400;letter-spacing:-.025em;text-decoration:none}.menuLinks a span{font-size:14px;color:#aaa}.menuNotice{font-size:12px;color:#aaa;line-height:1.45}@media(min-width:768px){.menuPanel{top:84px;right:32px;width:390px}}`}</style>
      <motion.nav initial={{y:-16, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:.8, ease}}>
        <div className="cluster">
          <a ref={headerLogo} className={overDarkSection ? 'logo logoOnDark' : 'logo'} href="#top" aria-label="ALIGN ’26 home"><LogoMark/><span className="brand">ALIGN ’26</span></a>
          <div className="pill desktopOnly"><span>Industry Connect</span><span>Technical Workshop</span></div>
        </div>
        <div className="cluster">
          <a className="iasHeaderLogo desktopOnly" href="https://ieeeiaslbscek.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="IEEE Industry Applications Society LBSCEK website">
            <img src="/ieee-ias-primary-logo.png" alt="IEEE Industry Applications Society" width="1875" height="521" />
          </a>
          <motion.button
            className="pill dark menuButton"
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
          >
            <motion.span
              className="circle"
              aria-hidden="true"
              animate={{ rotate: menuOpen && !reduceMotion ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 21 }}
            >
              {menuOpen && reduceMotion ? <X size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
            </motion.span>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            className="menuPanel"
            style={{ transformOrigin: 'top right' }}
            initial={{ opacity: 0, scale: 0.85, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -8, transition: { duration: 0.18, ease } }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 21,
              opacity: { duration: 0.16 },
            }}
          >
            <div className="menuPanelInner">
              <span className="menuLabel">Navigate</span>
              <div className="menuLinks">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<span>↗</span></a>)}</div>
              <div className="menuNotice">Registration details coming soon.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {localRegistration && (
        <>
          <link rel="preconnect" href="https://embed.lu.ma" />
          <link rel="preconnect" href="https://luma.com" />
          <script
            id="luma-checkout"
            src="https://embed.lu.ma/checkout-button.js"
            async
            onLoad={() => window.luma?.initCheckout()}
          />
        </>
      )}

      <main>
        <section className="hero" id="top">
          <motion.div className="videoWrap" initial={{opacity:0, scale:1.05}} animate={{opacity:1, scale:1}} transition={{duration:1.8, ease}}>
            <video autoPlay muted loop playsInline src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"/>
            <div className="veil"/>
          </motion.div>

          <div className="heroFooter">
            <div className="footGrid">
              <div>
                <h1>ALIGN ’26</h1>
                <p className="heroDescription">IEEE IAS Industry–Academia Connect</p>
                <p className="eventDate"><time dateTime="2026-12-18">Friday, 18 December 2026</time> · LBS College of Engineering, Kasaragod</p>
                <div className="buttons">
                  {localRegistration ? (
                    <a
                      className="btn primary registrationButton"
                      href="https://luma.com/event/evt-IoNI4f9zYe4N9zd"
                      data-luma-action="checkout"
                      data-luma-event-id="evt-IoNI4f9zYe4N9zd"
                    >
                      Register for ALIGN ’26 <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                  <a className={localRegistration ? 'btn secondary' : 'btn primary'} href="#program">View the program</a>
                  {!localRegistration && <span className="registrationStatus">Registration hasn’t opened yet.</span>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content" id="about">
          <div className="shell">
            <h2 className="sectionTitle">About ALIGN ’26</h2>
            <p className="lead">The IEEE Industry Applications Society Student Branch Chapter at LBSCEK is bringing students and faculty together with engineers and startup founders for an industry panel, a hands-on workshop and an individual technical quiz.</p>
          </div>
        </section>

        <section className="content" id="program">
          <div className="shell">
            <h2 className="sectionTitle">Event schedule</h2>
            <div className="program">
              {timeline.map(([time,title,text]) => (
                <motion.div className="row" key={time+title} {...reveal}>
                  <div className="time">{time}</div>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="content darkSection">
          <div className="shell">
            <h2 className="sectionTitle">Industry panel</h2>
            <p className="lead">How does an engineering degree prepare students for their first industry role? The panel brings together an industry professional, a startup founder and a faculty moderator.</p>
            <div className="grid3">
              <Card title="Industry professional">Perspective from power systems, automation, manufacturing, renewable energy or electrical infrastructure.</Card>
              <Card title="Startup founder">Perspective from building products in robotics, automation, embedded systems, industrial IoT, additive manufacturing or clean technology.</Card>
              <Card title="Faculty moderator">A senior faculty member will connect the discussion to engineering curricula and research opportunities.</Card>
            </div>
          </div>
        </section>

        <section className="content darkSection" id="workshop">
          <div className="shell">
            <h2 className="sectionTitle">Hands-on technical workshop</h2>
            <p className="lead">The workshop will cover an applied engineering topic. Possible topics include:</p>
            <div className="chips">
              {['Robotics','Industrial Automation','Embedded Systems','Industrial IoT','Additive Manufacturing'].map(x=><span className="chip" key={x}>{x}</span>)}
            </div>
          </div>
        </section>

        <section className="content" id="why-attend">
          <div className="shell">
            <h2 className="sectionTitle">Why attend</h2>
            <div className="grid3">
              <Card title="Engineering careers">Hear how engineers apply classroom concepts at work and what employers look for in graduates.</Card>
              <Card title="Further study and projects">Discuss internships, research and starting a company with people working in those areas.</Card>
              <Card title="IEEE community">Meet other students and learn about the IEEE IAS chapter at LBSCEK.</Card>
            </div>
          </div>
        </section>

        <section className="content" id="venue">
          <div className="shell">
            <h2 className="sectionTitle">Venue</h2>
            <div className="venue">
              <div className="card">
                <h3>Amphitheater</h3>
                <p>LBS College of Engineering<br/>Kasaragod, Kerala</p>
                <div className="buttons"><a className="btn primary" href={mapsUrl} target="_blank" rel="noreferrer">Get Directions</a></div>
              </div>
              <div className="map"><iframe title="LBS College of Engineering location" src={mapsEmbedUrl} style={{width:'100%', height:'100%', minHeight:320, border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            </div>
          </div>
        </section>

        <section className="content" id="faq">
          <div className="shell">
            <h2 className="sectionTitle">Frequently asked questions</h2>
            <div className="faq">
              <Faq q="Who can participate?">Undergraduate and M.Tech students, IEEE and non-IEEE students, faculty members, industry professionals and other interested participants.</Faq>
              <Faq q="Is the event limited to IEEE members?">No. Students can attend without an IEEE membership.</Faq>
              <Faq q="Is food provided?">Yes. Lunch and refreshments are planned for registered participants.</Faq>
              <Faq q="Does the event include a workshop?">Yes. The program includes a hands-on technical workshop focused on emerging IEEE IAS-related technologies.</Faq>
              <Faq q="When will registration open?">The organizers haven’t announced a registration date.</Faq>
              <Faq q="Will certificates be provided?">The organizers haven’t confirmed whether certificates will be available.</Faq>
            </div>
          </div>
        </section>

      </main>

      <footer className="siteFooter">
        <div className="shell">
          <motion.div className="footerGrid" {...reveal} transition={{duration:.9, delay:.08, ease}}>
            <div className="footerBrand">
              <a className="footerLogo" href="#top" aria-label="ALIGN 2026 home"><LogoMark/><strong>ALIGN ’26</strong></a>
              <a className="iasLogoLink" href="https://ieeeiaslbscek.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="IEEE Industry Applications Society LBSCEK website">
                <img className="iasLogo" src="/ieee-ias-primary-logo-white.png" alt="IEEE Industry Applications Society" width="1875" height="521" loading="lazy" />
              </a>
              <p>Organised by IEEE Industry Applications Society Student Branch Chapter, LBS College of Engineering, Kasaragod.</p>
            </div>
            <nav className="footerNav" aria-label="Footer navigation">
              <span className="footerLabel">Explore</span>
              <a href="#about">About</a><a href="#program">Program</a><a href="#workshop">Workshop</a><a href="#why-attend">Why Attend</a><a href="#venue">Venue</a><a href="#faq">FAQ</a>
            </nav>
            <div className="footerSocial">
              <span className="footerLabel">Follow IEEE IAS LBSCEK</span>
              <a href="https://www.instagram.com/ieee.ias.lbscek" target="_blank" rel="noopener noreferrer"><Instagram size={18}/><span>Instagram</span><ArrowUpRight size={16}/></a>
              <a href="https://www.linkedin.com/showcase/ieee-ias-lbscek/" target="_blank" rel="noopener noreferrer"><Linkedin size={18}/><span>LinkedIn</span><ArrowUpRight size={16}/></a>
              <a href="https://ieeeiaslbscek.vercel.app/" target="_blank" rel="noopener noreferrer"><span className="webGlyph">www</span><span>Chapter website</span><ArrowUpRight size={16}/></a>
            </div>
          </motion.div>
          <motion.div className="footerBottom" {...reveal} transition={{duration:.8, delay:.12, ease}}><span>© 2026 IEEE IAS SBC LBSCEK</span><span>18 December 2026 · Kasaragod, Kerala</span><a href="#top">Back to top ↑</a></motion.div>
        </div>
      </footer>
    </MotionConfig>
  )
}

function Card({title,children}) {
  return <motion.article className="card" {...reveal}><h3>{title}</h3><p>{children}</p></motion.article>
}
function Faq({q,children}) {
  const [open, setOpen] = useState(false)
  return <motion.div className={`faqItem${open ? ' isOpen' : ''}`} {...reveal}>
    <button className="faqQuestion" type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
      <span>{q}</span><span className="faqPlus" aria-hidden="true">+</span>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div className="faqAnswer" initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} transition={{height:{duration:.45, ease}, opacity:{duration:.28, ease}}}>
        <p>{children}</p>
      </motion.div>}
    </AnimatePresence>
  </motion.div>
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
