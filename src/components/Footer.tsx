import Link from 'next/link'
import TokyoClock from '@/components/motion/TokyoClock'
import { site } from '@/config'

export default function Footer() {
  return (
    <footer className="relative bg-breeze-100 text-deep overflow-hidden">
      <div className="px-5 md:px-10 pt-24 md:pt-32">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-14 gap-x-6 pb-20 border-b border-deep/10">
          <div className="col-span-2 md:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.1em] text-breeze-600 mb-6">Trainer × AI</p>
            <p className="palt text-2xl md:text-3xl font-bold leading-snug tracking-tight">
              トレーニングの現場から、
              <br />
              AIで「続けたくなる」をつくる。
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-8">
            <p className="font-outfit text-[10px] font-semibold tracking-[0.4em] uppercase text-deep/50 mb-6">Index</p>
            <ul className="space-y-3 font-outfit text-sm">
              {['About', 'Products', 'Approach', 'Trainer', 'Contact'].map((n) => (
                <li key={n}>
                  <Link href={`/#${n.toLowerCase()}`} className="link-underline text-deep/80 hover:text-breeze-600">{n}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3 md:col-start-10 space-y-6 text-sm">
            <p className="font-outfit text-[10px] font-semibold tracking-[0.4em] uppercase text-deep/50">Links</p>
            <a href={site.trainerSite} className="block link-underline w-fit">Personal Training ↗</a>
            <a href={site.voiceKarte} target="_blank" rel="noopener noreferrer" className="block link-underline w-fit">VOICEカルテ ↗</a>
            <a href={`mailto:${site.email}`} className="block font-outfit text-breeze-600 link-underline w-fit">{site.email}</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4 py-8 font-outfit text-[10px] font-semibold tracking-[0.3em] uppercase text-deep/50">
          <p>© {new Date().getFullYear()} Junya Ishihara</p>
          <p>
            Tokyo <TokyoClock /> JST
          </p>
        </div>
      </div>
      <div className="select-none pointer-events-none px-3 md:px-6 -mb-[2.2vw]" aria-hidden>
        <p className="footer-wordmark font-outfit font-black uppercase leading-[0.8] tracking-[-0.06em] whitespace-nowrap text-center">Junya Ishihara</p>
      </div>
    </footer>
  )
}
