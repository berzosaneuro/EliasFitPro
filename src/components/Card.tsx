import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-dark-surface rounded-xl p-6 card-hover ${className}`}>
      {children}
    </div>
  )
}
