import "@/styles/footer/Footer.css";
import Typography from "@mui/material/Typography";

export default function Footer() {
  const CURRENT_YEAR = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="footer-content">
        <Typography color='text.secondary'>© {CURRENT_YEAR} Балкан АД. Всички права запазени.</Typography>
      </div>
    </div>
  )
}
