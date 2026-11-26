import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VoiceDemo from '@/components/VoiceDemo'
import MotionProvider from '@/components/motion/MotionProvider'
import { site } from '@/config'

/* ──────────────────────────────────────────
   Content（VOICEカルテの説明は、開発リポジトリのREADMEの範囲に合わせている）
   ────────────────────────────────────────── */

const karteFeatures = [
  { k: 'Voice to Karte', t: '話すだけで、カルテが完成', d: 'セッションの内容を声で伝えるだけ。AIが種目・重量・回数・体調・申し送りを整理し、カルテを自動で作成します。' },
  { k: 'Hand-over', t: '担当が変わっても、つながる', d: '前回の状態・実施内容・注意点を残し、次の指導や担当者間の引き継ぎに活かします。' },
  { k: 'Body Map', t: '身体の状態を、図で残す', d: '骨格図の前面・背面に、気になる部位を記録。言葉だけでは伝わりにくい状態を共有できます。' },
  { k: 'Progress', t: '変化を、見返せる', d: '体重や種目ごとの使用重量の推移を確認し、次の指導に役立てます。' },
]

const flow = [
  { n: '01', t: '話す', d: 'セッション中・直後に、声で伝えるだけ。' },
  { n: '02', t: 'AIが自動作成', d: '種目・重量・回数・申し送りまで、AIがカルテにまとめる。' },
  { n: '03', t: '確認', d: 'トレーナーが内容を見て、必要ならひと言で直す。' },
  { n: '04', t: '保存・共有', d: '確定した記録を、次の指導と引き継ぎに。' },
]

const roles = [
  { k: 'Personal Trainer', t: 'パーソナルトレーナー', d: 'HALLEL 半蔵門・恵比寿で、コンディショニングを軸に一般の方からアスリートまで指導。指導歴10年以上。', href: site.trainerSite, cta: 'Training Site', external: true },
  { k: 'Strength Coach', t: 'ストレングスコーチ', d: '湘南学院高等学校 男子バレーボール部に、ストレングストレーナーとして帯同。', href: '', cta: '', external: false },
  { k: 'AI Product', t: 'AIサービスの開発', d: '音声でカルテを自動作成するAI「VOICEカルテ」を開発中（試験運用中）。', href: '#products', cta: 'Products', external: false },
  { k: 'Writer', t: '情報発信', d: 'トレーニング・栄養・ライフスタイルについて、現場の知見をブログで発信。', href: `${site.trainerSite}/blog`, cta: 'Journal', external: true },
]

const approach = [
  { n: '01', t: '現場で使えること', d: '入力が速い、操作が少ない、スマホで使いやすい、現場を止めない。トレーナーとして毎日使う目線で作ります。' },
  { n: '02', t: '面倒はAIに、判断は人に', d: '記録のような手間のかかる作業はAIに任せ、トレーナーはお客様と向き合う時間と指導の判断に集中する。そのための道具をつくります。' },
  { n: '03', t: '小さく試して、直す', d: 'まずは試験運用で現場に置き、使ってもらいながら改善を重ねます。' },
]

function Label({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div data-reveal className="flex items-center gap-4 font-outfit text-[11px] font-semibold tracking-[0.3em] uppercase text-zinc-500">
      <span className="font-mono tracking-normal text-breeze-600">{index}</span>
      <span className="h-px w-10 bg-zinc-300" />
      <span>{children}</span>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white text-deep">
        {/* ─── Hero ─── */}
        <section className="relative min-h-[100svh] bg-breeze-50 overflow-hidden flex flex-col">
          <div className="hero-glow" aria-hidden />
          <div className="relative flex-1 grid grid-cols-12 gap-x-6 gap-y-16 px-5 md:px-10 pt-32 md:pt-40 pb-14 items-center">
            <div className="col-span-12 lg:col-span-7">
              <p data-hero="fade" className="font-mono text-[12px] tracking-[0.08em] text-breeze-600 mb-8">Personal Trainer × AI Product Developer</p>
              <h1 className="font-bold tracking-[-0.035em] leading-[1.12] text-[clamp(2.5rem,7vw,6.25rem)]">
                <span className="block overflow-hidden pb-[0.06em]"><span data-hero="line" className="block">トレーニングの</span></span>
                <span className="block overflow-hidden pb-[0.06em]"><span data-hero="line" className="block">現場から、</span></span>
                <span className="block overflow-hidden pb-[0.06em]">
                  <span data-hero="line" className="block">
                    <span className="text-breeze-500 font-outfit">AI</span>でつくる。
                  </span>
                </span>
              </h1>
              <p data-hero="fade" className="mt-10 max-w-xl text-base md:text-lg leading-[1.9] text-zinc-600">
                パーソナルトレーナーの石原淳哉です。指導の現場で感じた「もっとこうなれば」を、AIとテクノロジーで形にしています。
              </p>
              <div data-hero="fade" className="mt-10 flex flex-wrap items-center gap-6">
                <Link href="#products" className="inline-flex items-center h-12 px-7 rounded-full bg-breeze-500 text-white font-outfit text-[12px] font-semibold tracking-[0.2em] uppercase hover:bg-breeze-600 transition-colors duration-500">
                  Products
                </Link>
                <Link href="#contact" className="link-underline font-outfit text-[12px] font-semibold tracking-[0.2em] uppercase">
                  Contact →
                </Link>
              </div>
            </div>
            <div data-hero="fade" className="col-span-12 lg:col-span-5 flex lg:justify-end">
              <VoiceDemo />
            </div>
          </div>
          <div data-hero="fade" className="relative grid grid-cols-2 md:grid-cols-4 border-t border-deep/10 font-mono text-[11px] text-zinc-500">
            {[
              { k: 'Trainer', v: 'HALLEL 半蔵門・恵比寿' },
              { k: 'Coach', v: '高校バレーボール部' },
              { k: 'AI Product', v: 'VOICEカルテ' },
            ].map((s) => (
              <div key={s.v} className="px-5 md:px-10 py-5 border-r border-deep/10 flex items-baseline gap-3">
                <span className="font-outfit text-deep text-sm md:text-base font-semibold">{s.k}</span>
                <span>{s.v}</span>
              </div>
            ))}
            <div className="px-5 md:px-10 py-5 flex items-center justify-between">
              <span>Writer — Journal</span>
              <span className="scroll-cue" aria-hidden />
            </div>
          </div>
        </section>

        {/* ─── About ─── */}
        <section id="about" className="px-5 md:px-10 py-28 md:py-44">
          <div className="grid grid-cols-12 gap-x-6 gap-y-14">
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <div data-clip className="relative aspect-[3/4] w-4/5 md:w-full mx-auto md:mx-0 max-w-[420px] overflow-hidden rounded-t-full bg-gradient-to-b from-white via-breeze-50 to-breeze-200 ring-1 ring-breeze-200/70">
                <Image src="/junya-portrait-cut.webp" alt="石原淳哉" fill sizes="(min-width:768px) 40vw, 100vw" className="object-contain object-bottom" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
              <Label index="01">About</Label>
              <h2 data-split className="mt-8 font-bold tracking-[-0.03em] leading-[1.25] text-[clamp(2.25rem,5vw,4.25rem)]">
                トレーナーであり、
                <br />
                つくり手でもある。
              </h2>
              <div data-reveal className="mt-10 space-y-6 text-base md:text-lg leading-[1.95] text-zinc-600 max-w-2xl">
                <p>
                  都内のフィットネスクラブを経て独立し、現在はコンディショニングジム「HALLEL」（半蔵門・恵比寿）で、一般の方からアスリートまでを指導しています。
                </p>
                <p>
                  毎日の指導の中で、記録や引き継ぎ、続けるための仕組みに課題を感じてきました。だからこそ、現場を知るトレーナーの目線で、AIを使ったサービスづくりにも取り組んでいます。
                </p>
              </div>
              <p data-reveal className="mt-10 palt text-xl md:text-2xl font-bold leading-[1.7]">
                「しなきゃ」を「したい！」に変える。
                <span className="block text-base md:text-lg font-medium text-zinc-500 mt-1">その考え方は、トレーニングでもプロダクトでも同じです。</span>
              </p>
            </div>
          </div>
        </section>

        {/* ─── What I Do ─── */}
        <section id="works" className="px-5 md:px-10 pb-28 md:pb-44">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-deep/10 pt-16 md:pt-24">
            <div>
              <p className="font-mono text-[11px] text-breeze-600">What I Do</p>
              <h2 data-split className="mt-6 font-bold tracking-[-0.03em] leading-[1.2] text-[clamp(2rem,4.5vw,3.75rem)]">
                鍛える、支える、
                <br />
                つくる、伝える。
              </h2>
            </div>
            <p data-reveal className="max-w-md text-base leading-[1.9] text-zinc-600">
              4つの顔を持つトレーナーです。すべての軸にあるのは、トレーニングの現場で得た経験です。
            </p>
          </div>
          <ul data-stagger className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((r, i) => {
              const highlight = r.k === 'AI Product'
              const body = (
                <>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className={highlight ? 'text-white/85' : 'text-breeze-600'}>{r.k}</span>
                    <span className={highlight ? 'text-white/60' : 'text-zinc-400'}>0{i + 1}</span>
                  </div>
                  <p className="mt-10 text-xl xl:text-2xl font-bold palt">{r.t}</p>
                  <p className={`mt-3 text-sm leading-[1.85] ${highlight ? 'text-white/85' : 'text-zinc-600'}`}>{r.d}</p>
                  {r.href && (
                    <span className={`mt-auto pt-8 inline-flex items-center gap-2 font-outfit text-[11px] font-semibold tracking-[0.2em] uppercase ${highlight ? 'text-white' : 'text-deep/70 group-hover:text-breeze-600'} transition-colors duration-500`}>
                      {r.cta}
                      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">{r.external ? '↗' : '→'}</span>
                    </span>
                  )}
                </>
              )
              const box = `group h-full sm:min-h-[17rem] flex flex-col rounded-md p-7 transition-colors duration-700 ${
                highlight ? 'bg-breeze-500 text-white hover:bg-breeze-600' : 'bg-breeze-50 ring-1 ring-breeze-200 hover:ring-breeze-400'
              }`
              return (
                <li key={r.k}>
                  {r.href ? (
                    <a href={r.href} className={box}>
                      {body}
                    </a>
                  ) : (
                    <div className={box}>{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        {/* ─── Products ─── */}
        <section id="products" className="bg-breeze-50 px-5 md:px-10 py-28 md:py-44">
          <Label index="02">Products</Label>
          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <div data-reveal className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-white ring-1 ring-breeze-300 font-mono text-[11px] text-breeze-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-breeze-500 animate-pulse" aria-hidden />
                  試験運用中 / Trial
                </span>
                <span className="font-mono text-[11px] text-zinc-500">開発担当（システム）</span>
              </div>
              <h2 data-split className="mt-8 font-outfit font-bold tracking-[-0.045em] leading-[0.9] text-[clamp(3.5rem,10vw,9rem)]">
                VOICE<span className="text-breeze-500">カルテ</span>
              </h2>
              <p data-reveal className="mt-8 palt text-xl md:text-3xl font-bold leading-[1.5]">話すだけで、カルテができる。<span className="block text-base md:text-xl font-medium text-zinc-500 mt-2">トレーニングを、もっと価値ある体験に。</span></p>
            </div>
            <p data-reveal className="col-span-12 lg:col-span-4 text-base md:text-lg leading-[1.9] text-zinc-600">
              セッション中の声から、AIがカルテを自動で作成するトレーナー・ジム向けのサービスです。記録した状態と指導内容を、次の指導や担当者間の引き継ぎに活かせます。現在は試験運用をしながら改善を進めています。
            </p>
          </div>

          <ol className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-px bg-deep/10 border border-deep/10 rounded-md overflow-hidden" data-stagger>
            {flow.map((f) => (
              <li key={f.n} className="bg-breeze-50 p-6 md:p-8">
                <span className="font-mono text-[11px] text-breeze-600">{f.n}</span>
                <p className="mt-6 text-xl md:text-2xl font-bold">{f.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-10" data-stagger>
            {karteFeatures.map((f) => (
              <article key={f.k} className="border-t border-deep/10 py-8 md:py-10 grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-3 sm:gap-4">
                <span className="font-mono text-[11px] text-breeze-600 pt-1.5">{f.k}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">{f.t}</h3>
                  <p className="mt-3 text-sm md:text-base leading-[1.9] text-zinc-600">{f.d}</p>
                </div>
              </article>
            ))}
          </div>

          <div data-reveal className="mt-16 md:mt-20 rounded-md bg-white p-7 md:p-10 grid grid-cols-12 gap-6 items-center ring-1 ring-breeze-200">
            <div className="col-span-12 md:col-span-8">
              <p className="font-mono text-[11px] text-breeze-600">AI × Trainer</p>
              <p className="mt-3 text-lg md:text-xl font-bold leading-[1.7]">
                AIが前回の記録も参考にしながら、カルテを自動で作成。トレーナーは内容を確認して保存するだけ。書く時間を、お客様と向き合う時間に。
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-wrap gap-3 md:justify-end">
              <a href={`mailto:${site.email}?subject=${encodeURIComponent('VOICEカルテについて')}`} className="inline-flex items-center h-12 px-6 rounded-full bg-breeze-500 text-white text-[13px] font-bold hover:bg-breeze-600 transition-colors duration-500">
                試験運用のご相談
              </a>
              <a href={site.voiceKarte} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-12 px-6 rounded-full ring-1 ring-deep/20 text-[13px] font-bold hover:bg-breeze-50 transition-colors duration-500">
                サービスサイト ↗
              </a>
            </div>
          </div>

          <div data-reveal className="mt-10 rounded-md border border-dashed border-breeze-300 p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] text-zinc-500">Next</p>
              <p className="mt-2 text-lg font-bold">次のプロダクトを準備中です。</p>
            </div>
            <p className="text-sm text-zinc-500 max-w-md">トレーニングや身体づくりを「続けたくなる」ための仕組みを、引き続きつくっていきます。</p>
          </div>
        </section>

        {/* ─── Approach ─── */}
        <section id="approach" className="px-5 md:px-10 py-28 md:py-44">
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Label index="03">Approach</Label>
                <h2 data-split className="mt-8 font-bold tracking-[-0.03em] leading-[1.25] text-[clamp(2.25rem,5vw,4.25rem)]">
                  現場の目線で、
                  <br />
                  つくる。
                </h2>
              </div>
            </div>
            <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
              {approach.map((a) => (
                <li key={a.n} className="relative py-10 md:py-12">
                  <span data-draw className="absolute top-0 left-0 right-0 h-px bg-deep/10" aria-hidden />
                  <div data-reveal className="grid grid-cols-[3rem_1fr] gap-4">
                    <span className="font-mono text-[12px] text-breeze-600 pt-2">{a.n}</span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">{a.t}</h3>
                      <p className="mt-4 text-base md:text-lg leading-[1.9] text-zinc-600">{a.d}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── Trainer ─── */}
        <section id="trainer" className="px-5 md:px-10 pb-28 md:pb-44">
          <a href={site.trainerSite} data-cursor="Visit" className="group relative block overflow-hidden rounded-md bg-breeze-100 hover:bg-breeze-500 transition-colors duration-700 p-7 md:p-14">
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 lg:col-span-8">
                <Label index="04">Personal Training</Label>
                <p className="mt-8 palt font-bold tracking-[-0.03em] leading-[1.2] text-[clamp(2.25rem,5.5vw,4.75rem)] group-hover:text-white transition-colors duration-700">
                  「しなきゃ」を
                  <br />
                  「したい！」に変える。
                </p>
                <p className="mt-6 text-base md:text-lg text-zinc-600 group-hover:text-white/85 transition-colors duration-700">
                  半蔵門・恵比寿のパーソナルトレーニング。コンディショニングを軸に、見た目も体調も根本から。
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:justify-self-end">
                <span className="inline-flex items-center gap-3 font-outfit text-[12px] font-semibold tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-700">
                  Visit Training Site
                  <span className="text-2xl transition-transform duration-700 group-hover:-rotate-45" aria-hidden>→</span>
                </span>
              </div>
            </div>
          </a>
        </section>

        {/* ─── Contact ─── */}
        <section id="contact" className="relative overflow-hidden bg-breeze-200/60 px-5 md:px-10 py-28 md:py-40">
          <div className="contact-sky" aria-hidden />
          <div className="relative">
            <Label index="05">Contact</Label>
            <h2 data-split className="mt-8 font-bold tracking-[-0.035em] leading-[1.12] text-[clamp(2.5rem,7vw,6rem)]">
              一緒に、
              <br />
              つくりませんか。
            </h2>
            <p data-reveal className="mt-8 max-w-2xl text-base md:text-lg leading-[1.9] text-zinc-600">
              VOICEカルテの試験運用、AIを使ったサービスの共同開発、取材などのご相談はメールでお気軽にどうぞ。パーソナルトレーニングのご予約は、トレーニングのサイトから受け付けています。
            </p>
            <div data-reveal className="mt-12 flex flex-col sm:flex-row gap-4">
              <a href={`mailto:${site.email}`} className="contact-mail group inline-flex items-center justify-between gap-6 h-16 px-7 rounded-full bg-white ring-1 ring-breeze-300 hover:bg-breeze-500 hover:text-white transition-colors duration-500 font-outfit text-lg md:text-xl">
                {site.email}
                <span aria-hidden className="transition-transform duration-500 group-hover:-rotate-45">→</span>
              </a>
              <a href={`${site.trainerSite}/#contact`} className="inline-flex items-center justify-center h-16 px-7 rounded-full ring-1 ring-deep/20 hover:bg-white transition-colors duration-500 text-[14px] font-bold">
                トレーニングのご予約 ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MotionProvider />
    </>
  )
}
