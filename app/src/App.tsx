import { useEffect, useState } from 'react'

import { LiftUp } from '../../src/LiftUp'

export const App = () => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onClick = () => setActive((active) => !active)
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <LiftUp active={active}>
        <LiftUp.Item>Hello World</LiftUp.Item>
        <LiftUp.Item>Salt Pepper</LiftUp.Item>
        <LiftUp.Item>Water Sugar</LiftUp.Item>
      </LiftUp>

      <div style={{ blockSize: '1em' }} />

      <LiftUp active={active}>Hello World</LiftUp>

      <div style={{ blockSize: '1em' }} />

      <LiftUp active={active}>
        <LiftUp.Item>
          <>Hello</> <>World</>
        </LiftUp.Item>
        <LiftUp.Item>
          <>Salt</> <>Pepper</>
        </LiftUp.Item>
        <LiftUp.Item>
          <>Water</> <>Sugar</>
        </LiftUp.Item>
      </LiftUp>
    </>
  )
}
