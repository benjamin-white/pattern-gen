import clsx from 'clsx'
import Link from 'next/link'
import styles from './MenuItem.module.css'
import { Accordion, AccordionItem } from '@szhsin/react-accordion'
import { NavItem } from './Menu'

const accordionItemStyles = {
  contentProps: { className: styles.item },
  buttonProps: { className: 'link' },
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
          <MenuItem
            {...child}
            pathName={pathName}
            path={itemPath}
            key={child.slug}
          />
        ))}
      </Accordion>
    </AccordionItem>
  ) : (
    <div>
      <Link
        href={itemPath}
        className={clsx('link', pathName === itemPath && 'isActive')}
      >
        {title}
      </Link>
    </div>
  )
}

export default MenuItem
