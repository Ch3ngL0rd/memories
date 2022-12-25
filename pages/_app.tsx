import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Outfit } from '@next/font/google'


const outfit = Outfit({

});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
      :root {
        --lora-font: ${outfit.style.fontFamily};
      }
    `}
      </style>
      <Component {...pageProps} />
    </>
  )
}