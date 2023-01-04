import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Outfit } from '@next/font/google'
import React from 'react';
import { useRouter } from 'next/router';


const outfit = Outfit(
  { subsets: ['latin'] }
);


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    const checkWindow = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 1000) {
          router.push("../../../mobile");
        }
      }
    }

    checkWindow();
  }, [router]);


  return (
    <>
      <style jsx global>
        {`
      :root {
        --outfit-font: ${outfit.style.fontFamily};
      }
    `}
      </style>
      <Component {...pageProps} />
    </>
  )
}