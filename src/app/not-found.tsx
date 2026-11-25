import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative min-h-[100svh] bg-breeze-50 text-deep flex items-center px-5 md:px-10">
      <div className="hero-glow" aria-hidden />
      <div className="relative">
        <p className="font-outfit font-bold tracking-[-0.06em] leading-[0.8] text-[clamp(7rem,24vw,20rem)] text-breeze-200" aria-hidden>404</p>
        <h1 className="mt-8 text-3xl md:text-5xl font-bold">ページが見つかりませんでした</h1>
        <Link href="/" className="mt-10 inline-flex items-center h-12 px-7 rounded-full bg-breeze-500 text-white font-outfit text-[12px] font-semibold tracking-[0.2em] uppercase">Home</Link>
      </div>
    </main>
  )
}
