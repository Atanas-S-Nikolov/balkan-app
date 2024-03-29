import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/footer/Footer'

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
