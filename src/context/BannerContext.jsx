import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

export const BannerContext = createContext({})

export function useBanner() {
    return useContext(BannerContext);
}

export function BannerProvider({ children }) {
    
    const [banners, setBanners] = useState([])

    useEffect(() => {
        getBanners()
            .then(banners => {
                setBanners(banners.slice(0, 2));
                console.log('LISTA DE BANNERS', banners)
            })
            .catch(error => console.log('error ao listar as categorias', error))
    }, [])

    async function getBanners() {
        const result = await api.get('/banners/by-local');
        console.log("Resultado da API", result.data['categoria-menu']);
        return result.data['categoria-menu'];
    }

    return (
        <BannerContext.Provider value={{ banners }}>
            {children}
        </BannerContext.Provider>
    )
}