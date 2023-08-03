import patternsGeometric001 from '../drawings/patterns/geometric/001'
import patternsGeometric002 from '../drawings/patterns/geometric/002'
import patternsGeometric003 from '../drawings/patterns/geometric/003'
import patternsGeometric004 from '../drawings/patterns/geometric/004'
import patternsGeometric005 from '../drawings/patterns/geometric/005'
import patternsGeometric006 from '../drawings/patterns/geometric/006'
import patternsGeometric007 from '../drawings/patterns/geometric/007'
import patternsGeometric008 from '../drawings/patterns/geometric/008'
import patternsGeometric009 from '../drawings/patterns/geometric/009'
import patternsGeometric010 from '../drawings/patterns/geometric/010'
import patternsGeometric011 from '../drawings/patterns/geometric/011'
import patternsGeometric012 from '../drawings/patterns/geometric/012'
import patternsGeometric013 from '../drawings/patterns/geometric/013'
import patternsGeometric014 from '../drawings/patterns/geometric/014'
import patternsOrganic001 from '../drawings/patterns/organic/001'
import patternsOrganic002 from '../drawings/patterns/organic/002'
import layout001 from '../drawings/layouts/001'
import layout002 from '../drawings/layouts/002'
import sketch001 from '../drawings/sketches/001'
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
          title: '001',
          slug: '001',
          script: patternsGeometric001,
        },
        {
          title: '002',
          slug: '002',
          script: patternsGeometric002,
        },
        {
          title: '003',
          slug: '003',
          script: patternsGeometric003,
        },
        {
          title: '004',
          slug: '004',
          script: patternsGeometric004,
        },
        {
          title: '005',
          slug: '005',
          script: patternsGeometric005,
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
          title: '014',
          slug: '014',
          script: patternsGeometric014,
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
  children: [],
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
  ],
}

const drawings: DrawingsMap = [patterns, layouts, shapes, sketches]

export default drawings
