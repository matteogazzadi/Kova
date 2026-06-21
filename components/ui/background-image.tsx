'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const IMAGES = [
  'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1530143584546-02191bc84eb5?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
]

export function BackgroundImage({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    setIdx(Math.floor(Math.random() * IMAGES.length))
  }, [])

  return (
    <div
      className={cn('relative', className)}
      style={{
        backgroundImage: `url(${IMAGES[idx]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  )
}
