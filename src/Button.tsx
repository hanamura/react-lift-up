import React, { ReactNode, useEffect, useState } from 'react'
import styles from './Button.module.css'

interface Props {
  type: 'primary' | 'secondary'
  children?: ReactNode
}

export const Button = ({ children, type }: Props) => {
  console.log(type)

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Button count updated', count)
  }, [count])

  useEffect(() => {
    console.log('Button mounted')
    return () => {
      console.log('Button unmounted')
    }
  }, [])

  return (
    <button className={styles['isPrimary']} onClick={() => setCount(count + 1)}>
      {children} {count}
    </button>
  )
}
