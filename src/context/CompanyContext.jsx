import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

export const CompanyContext = createContext({});

export function useCompany() {
    return useContext(CompanyContext);
}

export function CompanyProvider({ children }) {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get("/contact");
                setContacts(response.data);
                console.log("Todos os contatos listados", response.data);
            } catch (error) {
                console.log("Erro ao buscar contatos", error);
            }
        }

        fetchData();
    }, []);

    return (
        <CompanyContext.Provider value={contacts}>
            {children}
        </CompanyContext.Provider>
    );
}
