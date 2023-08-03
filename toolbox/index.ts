import { clamp } from './src/clamp'
import displacementFromImage from './src/displacementFromImage'
import fit from './src/fit'
import lerp from './src/lerp'
import { loopCells } from './src/loopCells'
import Noise, { Grad } from './src/noise'
import { normalRange } from './src/normalRange'
import upScale from './src/upscale'
import wrapText from './src/wrap-text'
export { default as scatterPoints } from './src/poissonSampling'
export { default as normal } from './src/gaussian'
export { default as Shape } from './src/Shape'
export { Vector } from './src/Vector'
export { vecAdjustMagnitude } from './src/vecAdjustMagnitude'
export { default as texturePaper } from './src/util/texturePaper'

export {
  clamp,
  displacementFromImage,
  fit,
  lerp,
  loopCells,
  Grad,
  Noise,
  normalRange,
  upScale,
  wrapText,
}
