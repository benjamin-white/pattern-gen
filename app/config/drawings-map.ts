import arcs from '../drawings/patterns/geometric/arcs'
import chequerCirlces from '../drawings/patterns/geometric/chequer-cirlces'
import tiledHexagons from '../drawings/patterns/geometric/tiled-hexagons'
import patternsGeometric004 from '../drawings/patterns/geometric/004'
import dotGrid from '../drawings/patterns/geometric/dot-grid'
import patternsGeometric006 from '../drawings/patterns/geometric/006'
import patternsGeometric007 from '../drawings/patterns/geometric/007'
import patternsGeometric008 from '../drawings/patterns/geometric/008'
import patternsGeometric009 from '../drawings/patterns/geometric/009'
import patternsGeometric010 from '../drawings/patterns/geometric/010'
import patternsGeometric011 from '../drawings/patterns/geometric/011'
import patternsGeometric012 from '../drawings/patterns/geometric/012'
import patternsGeometric013 from '../drawings/patterns/geometric/013'
import geometricTiles from '../drawings/patterns/geometric/geometric-tiles'
import dotChequers from '../drawings/patterns/geometric/dot-chequers'
import patternsOrganic001 from '../drawings/patterns/organic/001'
import patternsOrganic002 from '../drawings/patterns/organic/002'
import layout001 from '../drawings/layouts/001'
import layout002 from '../drawings/layouts/002'
import clipping from '../drawings/shapes/clipping'
import voronoi from '../drawings/shapes/voronoi'
import sketch001 from '../drawings/sketches/001'
import waves from '../drawings/sketches/waves'
import railHomage from '../drawings/sketches/rail-homage'
import hexGram from '../drawings/sketches/hexgram'
import cubeGram from '../drawings/sketches/cubeGram'
import mohr from '../drawings/sketches/mohr'
import mohrMotion from '../drawings/sketches/mohr-motion'
import { DrawScriptType } from '../hooks/useDraw'

export type DrawingEntry = {
  title: string
  slug: string
  children?: DrawingEntry[]
  script?: DrawScriptType
}

export type DrawingsMap = DrawingEntry[]

const patterns = {
  title: 'Patterns',
  slug: 'patterns',
  children: [
    {
      title: 'Geometric',
      slug: 'geometric',
      children: [
        {
          title: 'Arcs',
          slug: 'arcs',
          script: arcs,
        },
        {
          title: 'Chequer Cirlces',
          slug: 'chequer-cirlces',
          script: chequerCirlces,
        },
        {
          title: 'Tiled Hexagons',
          slug: 'tiled-hexagons',
          script: tiledHexagons,
        },
        {
          title: '004',
          slug: '004',
          script: patternsGeometric004,
        },
        {
          title: 'Dot Chequers',
          slug: 'dot-chequers',
          script: dotChequers,
        },
        {
          title: 'Dot Grid',
          slug: 'dot-grid',
          script: dotGrid,
        },
        {
          title: '006',
          slug: '006',
          script: patternsGeometric006,
        },
        {
          title: '007',
          slug: '007',
          script: patternsGeometric007,
        },
        {
          title: '008',
          slug: '008',
          script: patternsGeometric008,
        },
        {
          title: '009',
          slug: '009',
          script: patternsGeometric009,
        },
        {
          title: '010',
          slug: '010',
          script: patternsGeometric010,
        },
        {
          title: '011',
          slug: '011',
          script: patternsGeometric011,
        },
        {
          title: '012',
          slug: '012',
          script: patternsGeometric012,
        },
        {
          title: '013',
          slug: '013',
          script: patternsGeometric013,
        },
        {
          title: 'Geometric Tiles',
          slug: 'geometric-tiles',
          script: geometricTiles,
        },
      ],
    },
    {
      title: 'Organic',
      slug: 'organic',
      children: [
        {
          title: '001',
          slug: '001',
          script: patternsOrganic001,
        },
        {
          title: '002',
          slug: '002',
          script: patternsOrganic002,
        },
      ],
    },
  ],
}

const layouts = {
  title: 'Layouts',
  slug: 'layouts',
  children: [
    {
      title: '001',
      slug: '001',
      script: layout001,
    },
    {
      title: '002',
      slug: '002',
      script: layout002,
    },
  ],
}

const shapes = {
  title: 'Shapes',
  slug: 'shapes',
  children: [
    {
      title: 'Clipping',
      slug: 'clipping',
      script: clipping,
    },
    {
      title: 'Voronoi',
      slug: 'voronoi',
      script: voronoi,
    },
  ],
}

const sketches = {
  title: 'Sketches',
  slug: 'sketches',
  children: [
    {
      title: '001',
      slug: '001',
      script: sketch001,
    },
    {
      title: 'Waves',
      slug: 'waves',
      script: waves,
    },
    {
      title: 'Rail Homage',
      slug: 'rail-homage',
      script: railHomage,
    },
    {
      title: 'HexGram',
      slug: 'hexgram',
      script: hexGram,
    },
    {
      title: 'CubeGram',
      slug: 'cubegram',
      script: cubeGram,
    },
    {
      title: 'mohr',
      slug: 'mohr',
      script: mohr,
    },
    {
      title: 'mohr motion',
      slug: 'mohr-motion',
      script: mohrMotion,
    },
    {
      title: 'TBC: Levy Flight',
      slug: 'levy-flight',
    },
    {
      title: 'TBC: Random Walk (Brownian)',
      slug: 'random-walk',
    },
    {
      title: 'TBC: Truchet Tiles',
      slug: 'truchet-tiles',
    },
  ],
}

const drawings: DrawingsMap = [patterns, layouts, shapes, sketches]

export default drawings
