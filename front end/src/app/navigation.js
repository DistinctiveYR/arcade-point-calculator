'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link href="/calculator" className={pathname === "/calculator" ? styles.active : ""}>
        Calculator
      </Link>
      <Link href="/about" className={pathname === "/about" ? styles.active : ""}>
        About Us
      </Link>
      <Link href="/contact" className={pathname === "/contact" ? styles.active : ""}>
        Contact Us
      </Link>
    </nav>
  );
}
