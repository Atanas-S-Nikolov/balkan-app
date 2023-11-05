import styles from './page.module.css';

import Link from 'next/link'

export default function Home() {
  return (
    <ul className={`${styles.home} grid-center`}>
      <li>
        <Link href='/breakdown'>Разбивка</Link>
      </li>
      <li>
        <Link href='/products?page=1'>Изделия</Link>
      </li>
    </ul>
  )
}
