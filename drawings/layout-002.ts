import type { DrawScriptType } from '../hooks/useDraw'
import gaussian from '../helpers/utils/gaussian'
import { clamp, normalRange } from '../helpers'
import { wrapText } from '../helpers'

const drawParagraph = (
  ctx: CanvasRenderingContext2D,
  [x, y]: [number, number],
  cellSize: number,
  lineCount: number,
) => {

  const lines = [
    'Restrict all code to very simple control flow constructs – do not use goto statements, setjmp or longjmp constructs, and direct or indirect recursion.',
    'All loops must have a fixed upper-bound. It must be trivially possible for a checking tool to prove statically that a preset upper-bound on the number of iterations of a loop cannot be exceeded. If the loop-bound cannot be proven statically, the rule is considered violated.',
    'Do not use dynamic memory allocation after initialization.',
    'No function should be longer than what can be printed on a single sheet of paper in a standard reference format with one line per statement and one line per declaration. Typically, this means no more than about 60 lines of code per function.',
    'The assertion density of the code should average to a minimum of two assertions per function. Assertions are used to check for anomalous conditions that should never happen in real-life executions. Assertions must always be side-effect free and should be defined as Boolean tests. When an assertion fails, an explicit recovery action must be taken, e.g., by returning an error condition to the caller of the function that executes the failing assertion. Any assertion for which a static checking tool can prove that it can never fail or never hold violates this rule (I.e., it is not possible to satisfy the rule by adding unhelpful “assert(true)” statements).',
    'Data objects must be declared at the smallest possible level of scope.',
    'The return value of non-void functions must be checked by each calling function, and the validity of parameters must be checked inside each function.',
    'The use of the preprocessor must be limited to the inclusion of header files and simple macro definitions. Token pasting, variable argument lists (ellipses), and recursive macro calls are not allowed. All macros must expand into complete syntactic units. The use of conditional compilation directives is often also dubious, but cannot always be avoided. This means that there should rarely be justification for more than one or two conditional compilation directives even in large software development efforts, beyond the standard boilerplate that avoids multiple inclusion of the same header file. Each such use should be flagged by a tool-based checker and justified in the code.',
    'The use of pointers should be restricted. Specifically, no more than one level of dereferencing is allowed. Pointer dereference operations may not be hidden in macro definitions or inside typedef declarations. Function pointers are not permitted.',
    'All code must be compiled, from the first day of development, with all compiler warnings enabled at the compiler’s most pedantic setting. All code must compile with these setting without any warnings. All code must be checked daily with at least one, but preferably more than one, state-of-the-art static source code analyzer and should pass the analyses with zero warnings.',
  ]
console.log(x, y)
  wrapText(ctx, lines[Math.floor(Math.random()*lines.length)], 100).forEach((line, index) => 
    ctx.fillText(line, x, y + (index * 6))
  )

  // const lineLength = {
  //   rand: () => +Math.random().toFixed(1),
  //   gauss: () => gaussian({ mean: 0, dev: 1 }),
  //   clamped: () => clamp(gaussian({ mean: .8, dev: .1 }), .1, 1)
  // }

  // normalRange(lineCount).forEach((num, idx) => {    
  //   if (idx + 1 === lineCount) return
  //   ctx.fillRect(
  //     x * cellSize,
  //     y * cellSize - cellSize * num,
  //     cellSize * 2.75 * lineLength.rand(),
  //     1
  //   )
  // })

}

const drawing: DrawScriptType = (ctx, [sizeX, sizeY]) => {

  const cellSize = 100
  const cellsX = sizeX / cellSize
  const cellsY = sizeY / cellSize

  ctx.lineCap = 'round'
  ctx.font = '3px sans-serif'
  
  for (let i = 1; i < cellsX; i += 2) {
    for (let j = 1; j < cellsY + 1; j++) {
      // if (Math.random() > .96 || j % 5 === 0) continue
      drawParagraph(ctx, [i * cellSize, j * cellSize], cellSize, 6)
    }
  }

}

export default drawing