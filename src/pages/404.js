import styles from "@/styles/NotFound.module.css";

import Image from "next/image";
import Link from "next/link";

import Typography from "@mui/material/Typography";

export default function NotFound() {
  return (
    <div className={`${styles.not_found} grid_center`}>
      <Image
        src='/not-found.png'
        alt='404 изображение'
        width={300}
        height={300}
        priority
      />
      <Typography
        variant="h5"
        fontWeight='bold'
        fontStyle='italic'
      >
        Страницата не може да бъде намерена
      </Typography>
      <Link href='./'>&#60;-- Към началната страница</Link>
    </div>
  )
}
