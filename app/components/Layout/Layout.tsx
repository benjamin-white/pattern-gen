import React from 'react'
import Menu from '@/components/Menu'
import drawingsMap from '../../config/drawings-map'
import styles from './Layout.module.css'

const Layout = ({ children }: { children: React.ReactElement }) => (
  <div className={styles.wrapper}>
    <Menu navItems={drawingsMap} />
    <main className={styles.main}>{children}</main>
  </div>
)

export default Layout
