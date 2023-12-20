import './globals.css'
import '@/styles/App.css';

import RootLayout from "./layout";
import Head from 'next/head';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>Балкан АД - Разбивки</title>
        <meta name='description' content='Приложение за разбивки на фирма Балкан АД' />
        <link rel='icon' href='/balkan-logo.jpg' type='image/x-icon' />
      </Head>
      <main className={inter.className}>
        <RootLayout>
          {getLayout(<Component {...pageProps} />)}
        </RootLayout>
      </main>
    </>
  )
}
