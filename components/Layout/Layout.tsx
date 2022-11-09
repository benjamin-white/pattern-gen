import React from 'react'
import Menu from '../Menu'
import navItems from '../../helpers/navigation'
import styles from './Layout.module.css'

const Layout = ({ children }: { children: React.ReactElement }) =>
  <div className={styles.wrapper}>
    <Menu navItems={navItems} />
    <main className={styles.main}>{children}</main>
  </div>

export default Layout