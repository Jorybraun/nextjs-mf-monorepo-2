import { Header } from "../components/Header"
const App = ({ Component, pageProps  }: { Component: any, pageProps: any
}) => {
    return <>
        <Header></Header>
        <Component {...pageProps} />
    </>
}
export default App;