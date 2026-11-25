'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

type MotionWindow = Window & { __lenis?: Lenis; __heroReady?: boolean }

const EASE = 'expo.out'

/**
 * サイト全体のモーションを司る。
 * ページ側はサーバーコンポーネントのまま data 属性を付けるだけで動きが付く。
 *
 * data-split          見出しを行単位でマスク・リビール
 * data-reveal         フェードアップ（値に遅延秒を指定可）
 * data-stagger        子要素を順番にリビール
 * data-clip           画像をクリップパスで開く
 * data-parallax="n"   スクロールに対する視差（-1〜1）
 * data-scrub-words    スクロールに合わせて文字が濃くなる
 * data-draw           線を左から引く（data-draw="y" で縦）
 * data-count          数字をカウントアップ
 * data-marquee="n"    スクロール量で横に流れる
 * data-hero           ヒーローの入場アニメーション
 */
export default function MotionProvider() {
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement

    if (reduce) {
      root.classList.add('motion-off')
      window.dispatchEvent(new CustomEvent('hero:play'))
      return
    }

    // ── スムーススクロール ──
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
    ;(window as MotionWindow).__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href*="#"]') as HTMLAnchorElement | null
      if (!a) return
      const url = new URL(a.href)
      if (url.pathname !== window.location.pathname || !url.hash) return
      const el = document.querySelector(url.hash)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.6 })
      history.replaceState(null, '', url.hash)
    }
    document.addEventListener('click', onAnchor)

    const ctx = gsap.context(() => {
      // ── 見出し：行マスク・リビール ──
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
        gsap.set(el, { autoAlpha: 1 })
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.4,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      // ── フェードアップ ──
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.4,
            delay: parseFloat(el.dataset.reveal || '0') || 0,
            ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        )
      })

      // ── 子要素の順次リビール ──
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((el) => {
        gsap.fromTo(
          el.children,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.3,
            ease: EASE,
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        )
      })

      // ── 画像のクリップ・リビール ──
      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
        const img = el.querySelector('img')
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
        tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' })
        if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2.2, ease: EASE }, 0)
      })

      // ── 視差 ──
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.2')
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })

      // ── 文字が濃くなるステートメント ──
      // 和文の禁則処理（行頭の「」、。など）を崩さないよう、inline の span で1文字ずつ包む
      gsap.utils.toArray<HTMLElement>('[data-scrub-words]').forEach((el) => {
        const text = el.textContent || ''
        el.textContent = ''
        const chars = Array.from(text).map((c) => {
          const span = document.createElement('span')
          span.textContent = c
          el.appendChild(span)
          return span
        })
        gsap.fromTo(
          chars,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
          }
        )
      })

      // ── 線を引く ──
      gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((el) => {
        const vertical = el.dataset.draw === 'y'
        const scrub = el.dataset.drawScrub !== undefined
        gsap.fromTo(
          el,
          vertical ? { scaleY: 0 } : { scaleX: 0 },
          {
            ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
            transformOrigin: vertical ? 'top center' : 'left center',
            duration: 1.8,
            ease: scrub ? 'none' : 'expo.inOut',
            scrollTrigger: scrub
              ? { trigger: el.parentElement || el, start: 'top 75%', end: 'bottom 60%', scrub: true }
              : { trigger: el, start: 'top 92%', once: true },
          }
        )
      })

      // ── カウントアップ ──
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const raw = el.textContent || ''
        const m = raw.match(/^(\D*)(\d[\d,]*)(.*)$/)
        if (!m) return
        const [, pre, num, post] = m
        const target = parseInt(num.replace(/,/g, ''), 10)
        const obj = { v: 0 }
        el.textContent = `${pre}0${post}`
        gsap.to(obj, {
          v: target,
          duration: 2.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = `${pre}${Math.round(obj.v).toLocaleString('en-US')}${post}`
          },
        })
      })

      // ── スクロール連動マーキー ──
      gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((el) => {
        const dir = parseFloat(el.dataset.marquee || '1')
        gsap.fromTo(
          el,
          { xPercent: dir > 0 ? 0 : -30 },
          {
            xPercent: dir > 0 ? -30 : 0,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
          }
        )
      })
    })

    // ── ヒーロー入場 ──
    const heroCtx = gsap.context(() => {})
    const playHero = () => {
      heroCtx.add(() => {
        const tl = gsap.timeline({ defaults: { ease: EASE } })
        const lines = gsap.utils.toArray<HTMLElement>('[data-hero="line"]')
        tl.fromTo(lines, { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, duration: 1.6, stagger: 0.12 }, 0)
          .fromTo('[data-hero="strike"]', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.inOut' }, 0.9)
          .fromTo('[data-hero="dim"]', { opacity: 1 }, { opacity: 0.28, duration: 1.1 }, 1.1)
          .fromTo('[data-hero="fade"]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.08 }, 0.6)
          .fromTo(
            '[data-hero="image"]',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut' },
            0.15
          )
          .fromTo('[data-hero="image"] img', { scale: 1.4 }, { scale: 1, duration: 2.6 }, 0.15)
      })
    }
    window.addEventListener('hero:play', playHero, { once: true })
    // オープニング演出がないページでは、すぐにヒーローを再生する
    if ((window as MotionWindow).__heroReady || !document.querySelector('.preloader')) playHero()

    // フォント・画像読込後に位置を再計算
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      document.removeEventListener('click', onAnchor)
      window.removeEventListener('hero:play', playHero)
      window.removeEventListener('load', refresh)
      ctx.revert()
      heroCtx.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
      ;(window as MotionWindow).__lenis = undefined
    }
  }, [pathname])

  return null
}
