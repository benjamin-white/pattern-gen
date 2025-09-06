import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './Menu.module.css'
import { Accordion } from '@szhsin/react-accordion'
import MenuItem from './MenuItem'
import clsx from 'clsx'

export type NavItem = {
  title: React.ReactNode
  slug: string
  children?: NavItem[]
}

const Menu = ({ navItems }: { navItems: NavItem[] }) => {
  const { asPath } = useRouter()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleKeyUp = ({ key }) =>
      key === 'm' && setIsVisible((isVisible) => !isVisible)

    document.addEventListener('keyup', handleKeyUp)
    return () => document.removeEventListener('keyup', handleKeyUp)
  }, [])

  return (
    <div className={clsx(styles.menu, isVisible && styles['is-active'])}>
      <Accordion transition transitionTimeout={250} allowMultiple>
        {navItems.map((item) => (
          <MenuItem {...item} pathName={asPath} key={item.slug} />
        ))}
      </Accordion>
    </div>
  )
}

export default Menu
