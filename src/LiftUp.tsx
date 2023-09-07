import { SpringConfig, a, config, useSprings } from '@react-spring/web'
import React, {
  CSSProperties,
  Children,
  ReactNode,
  createContext,
  useContext,
  useEffect,
} from 'react'

/**
 * LiftUpProps is the props interface for LiftUp.
 */
export type LiftUpProps = {
  /**
   * Whether or not the LiftUp component is active.
   */
  readonly active?: boolean | undefined

  /**
   * The delay between each character.
   */
  readonly charDelay?: number | ((i: number) => number) | undefined

  /**
   * The delay between each line.
   */
  readonly lineDelay?: number | ((i: number) => number) | undefined

  /**
   * The spring config for the animation.
   */
  readonly springConfig?: SpringConfig | undefined

  /**
   * The width of the space character.
   */
  readonly spaceWidth?:
    | CSSProperties['width']
    | ((char: string) => CSSProperties['width'])
    | undefined

  /**
   * The children of the LiftUp component.
   */
  readonly children?: ReactNode | undefined

  /**
   * The class name for the LiftUp component.
   */
  readonly className?: string | undefined

  /**
   * The style for the LiftUp component.
   */
  readonly style?: CSSProperties | undefined
}

/**
 * LiftUp is a component that animates its children in a way that resembles
 */
export const LiftUp = ({
  active = false,
  charDelay = 35,
  lineDelay = 100,
  springConfig,
  spaceWidth = '0.2em',
  children,
  className,
  style = {},
}: LiftUpProps) => {
  // Normalize the children to be an array of LiftUpItems.
  const items = Children.toArray(children)
    .reduce((groups: (ReactNode | ReactNode[])[], child) => {
      if (
        typeof child === 'object' &&
        'type' in child &&
        child.type === LiftUpItem
      ) {
        return [...groups, child]
      } else {
        const lastGroup = groups[groups.length - 1]
        if (typeof lastGroup === 'undefined') {
          return [[child]]
        } else if (Array.isArray(lastGroup)) {
          return [...groups.slice(0, -1), [...lastGroup, child]]
        } else {
          return [...groups, [child]]
        }
      }
    }, [])
    .map((group) => {
      if (Array.isArray(group) && group.length === 1) {
        return <LiftUpItem>{group[0]}</LiftUpItem>
      } else if (Array.isArray(group)) {
        return <LiftUpItem>{group}</LiftUpItem>
      } else {
        return group
      }
    })

  // ---
  return (
    <div
      className={className}
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {items.map((item, i) => (
        <LiftUpContext.Provider
          key={i}
          value={{
            wrapped: true,
            active,
            charDelay,
            lineDelay:
              typeof lineDelay === 'function' ? lineDelay(i) : i * lineDelay,
            springConfig,
            spaceWidth,
          }}
        >
          {item}
        </LiftUpContext.Provider>
      ))}
    </div>
  )
}

/**
 * The props interface for LiftUpItem.
 */
export type LiftUpItemProps = {
  /**
   * The spring config for the animation.
   */
  readonly springConfig?: SpringConfig | undefined

  /**
   * The width of the space character.
   */
  readonly spaceWidth?:
    | CSSProperties['width']
    | ((char: string) => CSSProperties['width'])
    | undefined

  /**
   * The children of the LiftUpItem component.
   */
  readonly children?: ReactNode | undefined
}

/**
 * LiftUpItem is a component that animates its children in a way that resembles
 */
const LiftUpItem = ({
  springConfig,
  spaceWidth,
  children,
}: LiftUpItemProps) => {
  // Get the context.
  const {
    wrapped,
    active,
    charDelay,
    lineDelay,
    springConfig: contextSpringConfig = { ...config.default },
    spaceWidth: contextSpaceWidth,
  } = useContext(LiftUpContext)

  // Ensure that LiftUpItem is wrapped in a LiftUp component.
  if (!wrapped) {
    throw new Error('LiftUpItem must be wrapped in a LiftUp component.')
  }

  // Normalize the children to be an array of characters.
  const items =
    typeof children === 'string' ? [...children] : Children.toArray(children)

  const [springs, api] = useSprings(items.length, () => ({
    y: '100%',
    config: springConfig ?? contextSpringConfig,
  }))

  useEffect(() => {
    if (active) {
      api.start((i) => ({
        y: '0%',
        delay:
          (typeof charDelay === 'function' ? charDelay(i) : i * charDelay) +
          lineDelay,
      }))
    } else {
      api.start((i) => ({
        y: '100%',
        delay:
          (typeof charDelay === 'function' ? charDelay(i) : i * charDelay) +
          lineDelay,
      }))
    }
  }, [active, charDelay, lineDelay, api])

  return (
    <div style={{ overflow: 'hidden' }}>
      {items.map((item, i) => (
        <a.span
          key={i}
          style={{
            display: 'inline-block',
            ...(typeof item === 'string' && item.match(/^\s$/)
              ? typeof spaceWidth === 'function'
                ? { width: spaceWidth(item) }
                : typeof spaceWidth !== 'undefined'
                ? { width: spaceWidth }
                : typeof contextSpaceWidth === 'function'
                ? { width: contextSpaceWidth(item) }
                : typeof contextSpaceWidth !== 'undefined'
                ? { width: contextSpaceWidth }
                : {}
              : {}),
            ...springs[i],
          }}
        >
          {item}
        </a.span>
      ))}
    </div>
  )
}

/**
 * LiftUpItem is a component that animates its children in a way that resembles
 */
LiftUp.Item = LiftUpItem

/**
 * LiftUpContext is the context for LiftUp.
 */
const LiftUpContext = createContext<{
  wrapped: boolean
  active: boolean
  charDelay: number | ((i: number) => number)
  lineDelay: number
  springConfig?: SpringConfig | undefined
  spaceWidth?:
    | CSSProperties['width']
    | ((char: string) => CSSProperties['width'])
    | undefined
}>({
  wrapped: false,
  active: false,
  charDelay: 0,
  lineDelay: 0,
})
