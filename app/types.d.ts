// eslint-disable-next-line react/no-typos
import 'react'

type CSSCustomProperties = { [key in `--${string}`]: string | number }

declare module 'react' {
  export interface CSSProperties extends CSSCustomProperties {}
}
