import styles from "@/styles/footer/Footer.module.css";

import Typography from "@mui/material/Typography";

export default function Footer() {
  const CURRENT_YEAR = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <Typography color='text.secondary'>© {CURRENT_YEAR} Балкан АД. Всички права запазени.</Typography>
      </div>
    </footer>
  )
}
