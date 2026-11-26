'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** マウス操作の端末だけに出す、控えめなカーソル。リンク上で広がり、data-cursor の文言を表示する。 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = dot.current
    if (!fine || reduce || !el) return

    document.documentElement.classList.add('has-cursor')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })

    const move = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      el.style.opacity = '1'
    }
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor]')
      const text = t?.dataset.cursor || ''
      if (label.current) label.current.textContent = text
      el.dataset.state = t ? (text ? 'label' : 'link') : ''
    }
    const leave = () => (el.style.opacity = '0')

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div ref={dot} className="cursor" aria-hidden="true">
      <span ref={label} className="cursor-label" />
    </div>
  )
}
