'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * 「話す → 下書き → 確認して保存」を見せるイメージ図（実際の画面ではない）。
 * 内容は架空の例。動きを減らす設定では最後の状態をそのまま表示する。
 */
const SPOKEN = '前回と同じで、ベンチだけ60キロ。右の股関節に詰まりがあったので深さを変えた。次回は股関節を確認。'

const ROWS = [
  { k: '種目', v: 'ベンチプレス　60kg × 10回 × 3' },
  { k: '体調', v: '右股関節に詰まり → 深さを調整' },
  { k: '申し送り', v: '次回：股関節の可動域を確認' },
]

const BARS = 36

export default function VoiceDemo() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const text = el.querySelector<HTMLElement>('[data-demo="text"]')
    const bars = el.querySelectorAll<HTMLElement>('[data-demo="bar"]')
    const rows = el.querySelectorAll<HTMLElement>('[data-demo="row"]')
    const save = el.querySelector<HTMLElement>('[data-demo="save"]')
    const status = el.querySelector<HTMLElement>('[data-demo="status"]')
    if (!text || !save || !status) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      text.textContent = SPOKEN
      status.textContent = '保存しました'
      return
    }

    const ctx = gsap.context(() => {
      const wave = gsap.to(bars, {
        scaleY: () => 0.2 + Math.random() * 0.8,
        duration: 0.18,
        ease: 'sine.inOut',
        repeat: -1,
        repeatRefresh: true,
        stagger: { each: 0.02, from: 'center' },
        paused: true,
      })
      const typed = { n: 0 }
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 1.2 })
      tl.set(text, { textContent: '' })
        .set(rows, { autoAlpha: 0, y: 12 })
        .set(save, { backgroundColor: 'rgba(74,152,208,0)', color: '#2F7DB6' })
        .call(() => { status.textContent = '聞き取り中…'; wave.play() })
        .fromTo(typed, { n: 0 }, {
          n: SPOKEN.length,
          duration: 3.6,
          ease: 'none',
          onUpdate: () => { text.textContent = SPOKEN.slice(0, Math.round(typed.n)) },
        })
        .call(() => { wave.pause(); gsap.to(bars, { scaleY: 0.15, duration: 0.4 }); status.textContent = '下書きを作成' })
        .to(rows, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.25, ease: 'expo.out' }, '+=0.3')
        .call(() => { status.textContent = 'トレーナーが確認' }, [], '+=0.6')
        .to(save, { backgroundColor: '#4A98D0', color: '#fff', duration: 0.4 }, '+=0.8')
        .call(() => { status.textContent = '保存しました' })
        .to({}, { duration: 2.2 })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative w-full max-w-[440px] rounded-2xl bg-white/80 backdrop-blur-md ring-1 ring-breeze-200 shadow-[0_30px_80px_-30px_rgba(47,125,182,0.35)] p-5 md:p-6" aria-label="VOICEカルテの使い方のイメージ（架空の例）" role="img">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.08em] text-zinc-500">
        <span className="flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-breeze-500 animate-ping opacity-60" />
            <span className="relative w-2 h-2 rounded-full bg-breeze-500" />
          </span>
          VOICE KARTE
        </span>
        <span data-demo="status">保存しました</span>
      </div>

      <div className="mt-5 h-14 flex items-center justify-center gap-[3px]" aria-hidden>
        {Array.from({ length: BARS }).map((_, i) => (
          <span
            key={i}
            data-demo="bar"
            className="w-[4px] h-full rounded-full bg-gradient-to-t from-breeze-500 to-breeze-300 origin-center"
            style={{ transform: `scaleY(${0.15 + 0.5 * Math.abs(Math.sin(i * 0.55))})` }}
          />
        ))}
      </div>

      <p className="mt-4 min-h-[4.5em] text-[13px] leading-[1.75] text-deep/80">
        <span className="font-mono text-[10px] text-breeze-600 mr-2">話す</span>
        <span data-demo="text">{SPOKEN}</span>
      </p>

      <ul className="mt-4 divide-y divide-deep/10 border-y border-deep/10">
        {ROWS.map((r) => (
          <li key={r.k} data-demo="row" className="grid grid-cols-[4.5rem_1fr] gap-3 py-2.5 text-[12.5px]">
            <span className="font-mono text-[10px] text-zinc-400 pt-0.5">{r.k}</span>
            <span className="text-deep">{r.v}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] text-zinc-400">AIは下書きまで。保存は人が確認して。</span>
        <span data-demo="save" className="shrink-0 rounded-full ring-1 ring-breeze-400 px-4 h-8 inline-flex items-center text-[11px] font-bold bg-breeze-500 text-white">
          確認して保存
        </span>
      </div>
      <p className="absolute -bottom-6 right-1 font-mono text-[9px] text-zinc-400">* イメージ（架空の例）</p>
    </div>
  )
}
