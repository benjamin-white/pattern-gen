import Head from 'next/head'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import 'modern-normalize'
import '../styles/vars.css'
import '../styles/global.css'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Patterns, Shapes & Sketches</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
)

export default App
