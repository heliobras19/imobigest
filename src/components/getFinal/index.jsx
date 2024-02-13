export default function getFinal(slug) {
        if (slug == undefined || slug == null || slug == 'Imoveis') {
            return ''
        }
        var isArray = slug.split('-')
        var term = isNaN(isArray[0]) ? isArray[0] : isArray[1]
        var gen = term[term.length-2]
        if (term.endsWith('s')) {
            if (gen == 'a') {
                return "personalizadas"
            }
            return "personalizados"
        } 
        if (term.endsWith('a')) {
            return 'personalizada'
        }
        return 'personalizado'
}