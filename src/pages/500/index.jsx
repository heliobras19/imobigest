import Head from "next/head";
import Image from "next/image";

export default function NotFound() {
    return (
    <>
        <Head>
        <title>Erro no servidor</title>
        </Head>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                <Image width={500} height={500} src="/images/500/erro.jpg" alt="Erro 500" />
            </div>
        </div>
        <h1 style={{display: 'flex', justifyContent: 'center'}}>Servidor com problemas, estamos trabalhando para melhorar</h1>
    </>
    );
}