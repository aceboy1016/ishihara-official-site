'use client'

import { useEffect, useState } from 'react'

/** 東京の現在時刻。スタジオの「今」を感じさせる小さなディテール。 */
export default function TokyoClock() {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' })
    const update = () => setTime(fmt.format(new Date()))
    update()
    const id = setInterval(update, 15000)
    return () => clearInterval(id)
  }, [])

  return <span className="tabular-nums">{time}</span>
}
