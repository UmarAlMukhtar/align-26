import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { motion } from 'motion/react'
import { Plus, X } from 'lucide-react'
import './styles.css'

const ease = [0.16, 1, 0.3, 1]
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=LBS+College+of+Engineering%2C+Povval%2C+Kasaragod%2C+Kerala+671542'
const mapsEmbedUrl = 'https://www.google.com/maps?q=LBS%20College%20of%20Engineering%2C%20Povval%2C%20Kasaragod%2C%20Kerala%20671542&z=15&output=embed'

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

function DotGrid() {
  return <span className="dotGrid"><span/><span/><span/><span/></span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigation = [
    ['About', '#about'], ['Program', '#program'], ['Workshop', '#workshop'],
    ['Why Attend', '#why-attend'], ['Venue', '#venue'], ['FAQ', '#faq'],
  ]

  return (
    <>
      <style>{`.menuButton{border:0;cursor:pointer;font-family:inherit}.menuPanel{position:fixed;z-index:45;top:72px;left:16px;width:min(360px,calc(100vw - 32px));background:#050505;color:#fff;border-radius:22px;box-shadow:0 22px 60px rgba(0,0,0,.24);padding:18px}.menuPanelInner{display:flex;flex-direction:column;gap:18px}.menuLabel,.footerLabel{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#888}.menuLinks{display:grid;gap:3px}.menuLinks a{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #242424;font-size:18px;font-weight:400;letter-spacing:-.025em;text-decoration:none}.menuLinks a span{font-size:14px;color:#aaa}.menuNotice{font-size:12px;color:#aaa;line-height:1.45}.footerEnhanced{align-items:flex-start}.footerBrand,.footerNav,.footerStatus{display:flex;flex-direction:column;gap:10px}.footerBrand .logo{width:max-content}.footerBrand strong,.footerStatus strong{font-size:13px}.footerNav{min-width:160px}.footerLinks{display:grid;grid-template-columns:repeat(2,max-content);gap:9px 18px}.footerStatus{align-items:flex-start}.footerTop{margin-top:6px;font-size:12px;text-decoration:none;border-bottom:1px solid #999;padding-bottom:2px}@media(min-width:768px){.menuPanel{top:84px;left:32px;width:390px}.footerEnhanced{display:grid;grid-template-columns:1.35fr 1fr .8fr;gap:32px}.footerGrid.footerEnhanced{align-items:start}}`}</style>
      <motion.nav initial={{y:-16, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:.8, ease}}>
        <div className="cluster">
          <a className="logo" href="#top"><LogoMark/><span className="brand">ALIGN ’26</span></a>
          <button className="pill dark menuButton" type="button" onClick={() => setMenuOpen(open => !open)} aria-expanded={menuOpen} aria-controls="site-menu">
            <span className="circle">{menuOpen ? <X size={13} strokeWidth={3}/> : <Plus size={12} strokeWidth={3}/>}</span><span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
          <div className="pill desktopOnly"><span>Industry Connect</span><span>Technical Workshop</span></div>
        </div>
        <div className="pill desktopOnly"><span className="circle black"><DotGrid/></span><span>IEEE IAS · LBSCEK</span></div>
      </motion.nav>

      {menuOpen && <motion.div id="site-menu" className="menuPanel" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{duration:.25, ease}}>
        <div className="menuPanelInner">
          <span className="menuLabel">Navigate</span>
          <div className="menuLinks">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<span>↗</span></a>)}</div>
          <div className="menuNotice">Registration details coming soon.</div>
        </div>
      </motion.div>}

      <main>
        <section className="hero" id="top">
          <motion.div className="videoWrap" initial={{opacity:0, scale:1.05}} animate={{opacity:1, scale:1}} transition={{duration:1.8, ease}}>
            <video autoPlay muted loop playsInline src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"/>
            <div className="veil"/>
          </motion.div>

          <motion.section className="heroFooter" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:.5,duration:1,ease}}>
            <div className="footGrid">
              <div>
                <motion.div className="eyebrow" initial={{y:16, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:.6,duration:.8,ease}}>
                  <span className="dot"/><span>19 September 2026 · LBS College of Engineering, Kasaragod</span>
                </motion.div>
                <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:.8,duration:.8,ease}}>
                  Academia meets<br/>Industry. For real.
                </motion.h1>
                <motion.div className="buttons" initial={{y:16, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:1,duration:.8,ease}}>
                  <span className="btn primary disabled" aria-disabled="true">Registration coming soon</span>
                  <a className="btn secondary" href="#program">Explore Program</a>
                </motion.div>
              </div>
              <div className="tags"><span className="tag">Industry Panel</span><span className="tag">Hands-on Workshop</span><span className="tag">Technical Quiz</span></div>
            </div>
          </motion.section>
        </section>

        <section className="content" id="about">
          <div className="shell">
            <div className="sectionKicker">About ALIGN ’26</div>
            <h2 className="sectionTitle">Bridging the gap between campus and industry.</h2>
            <p className="lead">ALIGN ’26 brings students, faculty, startup founders and industry professionals into one space to explore emerging technology, career pathways and the expectations of modern engineering practice.</p>
            <div className="grid3">
              <Card n="01" title="Industry Insights">Hear directly from professionals working across power, automation, manufacturing, renewable energy and modern industrial systems.</Card>
              <Card n="02" title="Emerging Technology">Explore robotics, embedded systems, industrial IoT, automation, additive manufacturing and related technologies.</Card>
              <Card n="03" title="Future-Focused Learning">Explore new ideas with founders, professionals, mentors and fellow students through focused sessions and discussion.</Card>
            </div>
          </div>
        </section>

        <section className="content" id="program">
          <div className="shell">
            <div className="sectionKicker">Program</div>
            <h2 className="sectionTitle">One day. Multiple ways to move forward.</h2>
            <div className="program">
              {timeline.map(([time,title,text]) => (
                <div className="row" key={time+title}>
                  <div className="time">{time}</div>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content darkSection">
          <div className="shell">
            <div className="sectionKicker">Featured panel</div>
            <h2 className="sectionTitle">Three perspectives. One conversation.</h2>
            <p className="lead">A structured discussion designed to connect what students learn, what industries need and where technology is heading.</p>
            <div className="grid3">
              <Card n="Industry" title="Corporate Industry Leader">A senior professional from power systems, industrial automation, manufacturing, renewable energy or electrical infrastructure.</Card>
              <Card n="Startups" title="Startup Founder">An entrepreneur working in robotics, automation, embedded systems, Industrial IoT, additive manufacturing or clean technologies.</Card>
              <Card n="Academia" title="Academic Moderator">A senior faculty member connecting industry expectations with learning, research opportunities and student development.</Card>
            </div>
          </div>
        </section>

        <section className="content darkSection" id="workshop">
          <div className="shell">
            <div className="sectionKicker">Technical workshop</div>
            <h2 className="sectionTitle">Learn by building, not just listening.</h2>
            <p className="lead">An expert-led practical session intended to expose participants to emerging industrial technology.</p>
            <div className="chips">
              {['Robotics','Industrial Automation','Embedded Systems','Industrial IoT','Additive Manufacturing','Emerging Industrial Tech'].map(x=><span className="chip" key={x}>{x}</span>)}
            </div>
            <div className="buttons"><span className="btn light disabled" aria-disabled="true">Registration coming soon</span></div>
          </div>
        </section>

        <section className="content" id="why-attend">
          <div className="shell">
            <div className="sectionKicker">Why attend</div>
            <h2 className="sectionTitle">More than a campus event.</h2>
            <div className="grid3">
              <Card n="Exposure" title="Industry Exposure">See how technical concepts are applied beyond the classroom.</Card>
              <Card n="Careers" title="Career Insights">Understand what modern engineering roles and employers expect.</Card>
              <Card n="Practice" title="Hands-on Learning">Gain practical exposure through a guided technical workshop.</Card>
              <Card n="People" title="Expert Perspectives">Learn from founders, professionals and academics working across modern engineering domains.</Card>
              <Card n="Next steps" title="Future Opportunities">Discover pathways toward internships, research, entrepreneurship and collaboration.</Card>
              <Card n="Community" title="IEEE Connections">Explore technical communities, professional development and future industry engagement.</Card>
            </div>
            <div className="stats">
              <Stat value="200+" label="Expected participants"/>
              <Stat value="7 hrs" label="Full-day experience"/>
              <Stat value="3" label="Industry × Startup × Academia"/>
              <Stat value="1 day" label="Learning & opportunity"/>
            </div>
          </div>
        </section>

        <section className="content" id="venue">
          <div className="shell">
            <div className="sectionKicker">Venue</div>
            <h2 className="sectionTitle">Meet us at LBSCEK.</h2>
            <div className="venue">
              <div className="card">
                <small>Location</small>
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
            <div className="sectionKicker">FAQ</div>
            <h2 className="sectionTitle">Before you register.</h2>
            <div className="faq">
              <Faq q="Who can participate?">Undergraduate and M.Tech students, IEEE and non-IEEE students, faculty members, industry professionals and other interested participants.</Faq>
              <Faq q="Is the event limited to IEEE members?">No. The proposed participation includes both IEEE and non-IEEE students.</Faq>
              <Faq q="Is food provided?">Yes. Lunch and refreshments are planned for registered participants.</Faq>
              <Faq q="Does the event include a workshop?">Yes. The program includes a hands-on technical workshop focused on emerging IEEE IAS-related technologies.</Faq>
              <Faq q="When will registration open?">Registration details will be announced soon. Please check back for the external registration link.</Faq>
              <Faq q="Will certificates be provided?">Certificate details have not been specified in the current proposal and should be added only after confirmation from the organizers.</Faq>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="shell">
            <div className="ctaBox">
              <div className="sectionKicker">ALIGN ’26</div>
              <h2>Connect with industry. Build beyond the classroom.</h2>
              <p>Join students, professionals, founders and academics for a full day of technology and practical learning.</p>
              <div className="buttons"><span className="btn light disabled" aria-disabled="true">Registration coming soon</span></div>
              <p className="muted">19 September 2026 · LBS College of Engineering, Kasaragod</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="shell footerGrid footerEnhanced">
          <div className="footerBrand">
            <a className="logo" href="#top"><LogoMark/><strong>ALIGN ’26</strong></a>
            <div className="muted">IEEE IAS Student Branch Chapter<br/>LBS College of Engineering, Kasaragod</div>
          </div>
          <div className="footerNav">
            <span className="footerLabel">Explore</span>
            <div className="footerLinks"><a href="#about">About</a><a href="#program">Program</a><a href="#workshop">Workshop</a><a href="#why-attend">Why Attend</a><a href="#venue">Venue</a><a href="#faq">FAQ</a></div>
          </div>
          <div className="footerStatus">
            <span className="footerLabel">Registration</span>
            <strong>Coming soon</strong>
            <span className="muted">19 September 2026</span>
            <a className="footerTop" href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  )
}

function Card({n,title,children}) {
  return <article className="card"><small>{n}</small><h3>{title}</h3><p>{children}</p></article>
}
function Stat({value,label}) {
  return <div className="stat"><b>{value}</b><span>{label}</span></div>
}
function Faq({q,children}) {
  return <details><summary>{q}<span>+</span></summary><p>{children}</p></details>
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
