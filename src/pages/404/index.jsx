import Head from "next/head";
import Image from "next/image";

export default function NotFound() {
    return (
    <>
        <Head>
        <title>Pagina não encontrada</title>
        </Head>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                <Image width={500} height={500} src="/images/404/erro.jpg" alt="Erro 404" />
            </div>
        </div>
        <h1 style={{display: 'flex', justifyContent: 'center'}}>Infelizmente não encontramos o que você está buscando</h1>
    </>
    );
}