import clsx from 'clsx'
import Link from 'next/link'
import styles from './MenuItem.module.css'
import { Accordion, AccordionItem } from '@szhsin/react-accordion'
import { NavItem } from './Menu'

const accordionItemStyles = {
  className: styles.item,
  contentProps: { className: styles.itemContent },
  panelProps: { className: styles.itemPanel },
  buttonProps: { className: styles.button },
}

type MenuItemProps = NavItem & {
  pathName: string
  path?: string
}

const MenuItem = ({
  title,
  slug,
  children,
  pathName,
  path = '',
}: MenuItemProps) => {
  const itemPath = `${path}/${slug}`

  return children ? (
    <AccordionItem header={title} {...accordionItemStyles}>
      <Accordion
        transition
        transitionTimeout={250}
        allowMultiple
        className={styles.accordion}
      >
        {children.map((child) => (
          <MenuItem {...child} pathName={pathName} path={itemPath} />
        ))}
      </Accordion>
    </AccordionItem>
  ) : (
    <Link
      href={itemPath}
      className={clsx(styles.link, pathName === itemPath && styles.isActive)}
    >
      {title}
    </Link>
  )
}

export default MenuItem
