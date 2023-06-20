import { useRouter } from 'next/router'
import styles from './Menu.module.css'
import { Accordion } from '@szhsin/react-accordion'
import MenuItem from './MenuItem'

export type NavItem = {
  title: string
  slug: string
  children?: NavItem[]
}

const Menu = ({ navItems }: { navItems: NavItem[] }) => {
  const { asPath } = useRouter()

  return (
    <div className={styles.menu}>
      <Accordion transition transitionTimeout={250} allowMultiple>
        {navItems.map((item) => (
          <MenuItem {...item} pathName={asPath} />
        ))}
      </Accordion>
    </div>
  )
}

export default Menu
