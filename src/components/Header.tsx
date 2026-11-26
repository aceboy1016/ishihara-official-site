'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const nav = [
  { name: 'About', href: '/#about' },
  { name: 'Works', href: '/#works' },
  { name: 'Products', href: '/#products' },
  { name: 'Approach', href: '/#approach' },
  { name: 'Trainer', href: '/#trainer' },
  { name: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const overlay = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 160 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = overlay.current
    if (!el) return
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis
    if (open) {
      lenis?.stop()
      gsap.set(el, { visibility: 'visible' })
      gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
      gsap.fromTo(el.querySelectorAll('[data-menu-item]'), { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.05, delay: 0.35 })
    } else {
      lenis?.start()
      gsap.to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut', onComplete: () => void gsap.set(el, { visibility: 'hidden' }) })
    }
  }, [open])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[100] text-deep transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${hidden && !open ? '-translate-y-full' : ''}`}>
        <nav className="flex items-center justify-between px-5 md:px-10 h-20 md:h-24">
          <Link href="/" className="flex items-baseline gap-3 leading-none" aria-label="石原淳哉 ホーム">
            <span className="font-outfit font-black text-[15px] md:text-base tracking-[-0.02em] uppercase">Junya Ishihara</span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.1em] text-breeze-600">Trainer × AI</span>
          </Link>
          <ul className="hidden lg:flex items-center gap-9">
            {nav.slice(0, 5).map((n) => (
              <li key={n.name}>
                <Link href={n.href} className="nav-link inline-flex font-outfit text-[11px] font-semibold tracking-[0.22em] uppercase">
                  <span data-text={n.name}>{n.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <Link href="/#contact" className="hidden md:inline-flex nav-link font-outfit text-[11px] font-semibold tracking-[0.22em] uppercase">
              <span data-text="Contact">Contact</span>
              <span className="ml-2" aria-hidden>↗</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex items-center gap-3 font-outfit text-[11px] font-semibold tracking-[0.22em] uppercase h-10"
              aria-expanded={open}
              aria-controls="site-menu"
            >
              {open ? 'Close' : 'Menu'}
              <span className="relative block w-6 h-[7px]" aria-hidden>
                <span className={`absolute left-0 right-0 h-px bg-current transition-transform duration-500 ${open ? 'top-[3px] rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 right-0 h-px bg-current transition-transform duration-500 ${open ? 'top-[3px] -rotate-45' : 'top-[6px]'}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={overlay}
        id="site-menu"
        aria-hidden={!open}
        className="fixed inset-0 z-[90] bg-breeze-50 text-deep invisible flex flex-col justify-between pt-28 pb-10 px-5 md:px-10"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <ul className="space-y-1">
          {nav.map((n, i) => (
            <li key={n.name} className="overflow-hidden">
              <Link href={n.href} onClick={() => setOpen(false)} data-menu-item tabIndex={open ? 0 : -1} className="group flex items-baseline gap-4 py-1">
                <span className="font-mono text-[10px] text-breeze-500 w-6">0{i + 1}</span>
                <span className="font-outfit font-bold uppercase tracking-[-0.04em] text-[clamp(2.4rem,11vw,6rem)] leading-[0.95] group-hover:text-breeze-500 transition-colors duration-500">
                  {n.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-xs text-zinc-500 border-t border-deep/10 pt-6">トレーニングの現場から、AIで「続けたくなる」をつくる。</p>
      </div>
    </>
  )
}
