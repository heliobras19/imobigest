import { useRouter } from "next/router";
import { api } from "../../services/api";

export default function useAddfavorite(productId) {

    const router = useRouter();

    api.post(`/favorites`, {
        product_id: productId
    })
    .then(response => {
        if (response.status === 200) {
            alert("Produto adicionado aos favoritos");
            return;
        }
    })
    .catch(error => {
        if (error.response.status === 401) {
            alert("Você precisa estar logado para adicionar produtos aos favoritos");
            router.push("/login");
            return;
        }

        alert("Erro ao adicionar produto aos favoritos");
    });
}