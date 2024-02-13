import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

export const CategoryContext = createContext({})

export function useCategory() {
    return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {

    const totalColumns = 4
    const [categories, setCategories] = useState([])
    const [categoryColumns, setCategoryColumns] = useState([])
    const [totalCategories, setTotalCategories] = useState(0)

    useEffect(() => {
        getCategories()
            .then(categories => {
                setCategories(categories)
                setTotalCategories(categories.length)
                const columns = separeteCategoriesByColumns(categories)
                setCategoryColumns(columns)


                // console.log('LISTA DE CATEGORIAS', categories)
            })
            .catch(error => console.log('error ao listar as categorias', error))
    }, [])

    async function getCategories() {
        const result = await api.get('/categories');
        return result.data.data;
    }

    function separeteCategoriesByColumns(categories) {

        const total = categories.length
        const byColumn = Math.ceil(total / totalColumns)

        let columnIndex = 0
        let count = 0
        let columns = []
        for (let i = 0; i < totalColumns; i++) {
            columns[i] = []
        }

        categories.map(category => {
            if (count == byColumn) {
                count = 0
                columnIndex++
            }
            columns[columnIndex].push(category)

            count++
        })
        return columns
    }

    return (
        <CategoryContext.Provider value={{ categories, totalColumns, totalCategories, categoryColumns }}>
            {children}
        </CategoryContext.Provider>
    )
}