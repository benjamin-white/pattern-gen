import styles from './index.module.css'
import wblut001 from './assets/wblut-001.jpeg'
import wblut002 from './assets/wblut-002.jpeg'
import wblut003 from './assets/wblut-003.jpeg'

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

const Index = () => (
  <ul className={styles.list}>
    <li>
      <ExternalLink href="https://winterbloed.be/">
        Frederik Vanhoutte
      </ExternalLink>
      <div className="gallery">
        <img src={wblut001.src} alt="" />
        <img src={wblut002.src} alt="" />
        <img src={wblut003.src} alt="" />
      </div>
    </li>
    <li>
      <ExternalLink href="https://inconvergent.net/">Anders Hoff</ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://leanderherzog.ch/">
        Leander Herzog
      </ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://lostpixels.io/">James Merill</ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://www.mattdesl.com/">
        Matt Deslauriers
      </ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://field.io/">Field</ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://field.io/">Universal Everything</ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://www.universaleverything.com/">
        Universal Everything
      </ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://hyperglu.com/">HyperGlu</ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://paulkremer.info/">Paul Kremer</ExternalLink>
    </li>
    <li>
      <ExternalLink href="https://joanielemercier.com/">
        Joanie Lemercier
      </ExternalLink>
    </li>
  </ul>
)

export default Index
