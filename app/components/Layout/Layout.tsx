import React from 'react'
import Menu from '@/components/Menu'
import drawingsMap from '../../config/drawings-map'
import styles from './Layout.module.css'

const xm = {
  title: <>&middot; Inspirations</>,
  slug: 'inspirations',
}

const Layout = ({ children }: { children: React.ReactElement }) => (
  <div className={styles.wrapper}>
    <Menu navItems={[...drawingsMap, xm]} />
    <main className={styles.main}>{children}</main>
  </div>
)

export default Layout
