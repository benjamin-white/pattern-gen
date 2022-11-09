import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Menu.module.css'

type NavItem = {
  title: string;
  slug: string;
}

const Menu = ({ navItems }: { navItems: NavItem[] }) => {
  const { pathname } = useRouter()

  return (
    <nav className={styles.menu}>
      <ul>
        {navItems.map(({ title, slug }) =>
          <li key={slug} className={pathname.substring(1) === slug ? 'isActive' : ''}>
            <Link href={slug}>{title}</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Menu