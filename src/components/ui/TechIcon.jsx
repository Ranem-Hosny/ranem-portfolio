/**
 * TechIcon — a tool's official logo in its own colours.
 * `icon` is a path to an SVG in /public/tech (e.g. '/tech/react.svg').
 */
export default function TechIcon({ icon, className = 'w-7 h-7' }) {
  return <img src={icon} alt="" aria-hidden="true" loading="lazy" className={`object-contain ${className}`} />
}
