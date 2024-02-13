import Link from 'next/link';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import {nullable} from 'zod';

export default function Pagination({pages, currentPage, totalPages}) {

    const router = useRouter();
    var {slug} = router.query
    var buscaResultado = null;
    console.log("router-query", router.query)
    if (slug == undefined) {
        const {flag} = router.query
        slug = flag
        if (flag == undefined) {
            const {busca} = router.query
            if ("busca" in router.query) {
                buscaResultado = busca
                console.log("entrou aqui")
            }
          
            slug = "busca" in router.query ?  "resultado?busca="+busca : "brindes-para-empresas"
            //slug = 
        }
    }
    const handleLocal = () => {
        if (slug=="resultado") {
            return "busca="+buscaResultado
        }
        const currentPath = router.pathname;
        const pathParts = currentPath.split('/');
        const slugIndex = pathParts.indexOf('[slug]');
        if (slugIndex == undefined) {
            return "brindes-para-empresas"
        }
        const preSlugPath = pathParts.slice(0, slugIndex).join('/');
        return preSlugPath
    }
    console.log("ROUTER", router);
    console.log(slug)
    const paginationRange = 5; // Define o limite de páginas exibidas antes e depois da página atual

    // Cria um array com as páginas a serem exibidas na paginação
    const paginationPages = Array.from({ length: paginationRange * 2 + 1 }, (_, index) => currentPage - paginationRange + index)
    .filter(page => page > 0 && page <= totalPages); // Filtra para garantir que as páginas estejam dentro dos limites totais


  /* function handlePage(page) {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page }
        });
    } */

    return (
        <>
            <nav aria-label="Page navigation example" className={styles.pagination}>
                <ul className="pagination">
                    <li className="mx-1">
                        <Link
                            className={`page-link ${styles.paginationItem} ${currentPage == 1 ? 'disabled' : ''}`}
                            href={buscaResultado != null ? `${slug}` :`/${handleLocal()}/${slug}`}
                        >
                            {'<'}
                        </Link>
                    </li>
                    
                    {paginationPages.map(page => (
                        <li className="mx-1" key={`page-${page}`}>
                            <Link
                                className={`page-link ${styles.paginationItem} ${currentPage == page ? styles.pageActive : ''}`}
                                href={buscaResultado != null ? `${slug}&page=${page}` :`/${handleLocal()}/${slug}?page=${page}`}
                                style={currentPage === page ? { color: '#fff', backgroundColor: '#000' } : null}
                            >
                                {page}
                            </Link>
                        </li>
                    ))}

                    <li className="mx-1">
                        <Link
                            href={buscaResultado != null ? `${slug}&page=${totalPages}` :`/${handleLocal()}/${slug}?page=${totalPages}`}
                            className={`page-link ${styles.paginationItem} ${currentPage == totalPages ? 'disabled' : ''}`}
                        >
                            {'>'}
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );

}