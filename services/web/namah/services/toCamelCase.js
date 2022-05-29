const toCamelCase = (str) => {
    const map = {
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ'
    };
    
    for(let pattern in map){
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str.replace(/([-_][a-z]|[A-Z]|)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/[^a-zA-Z]/g, '',/\s/g, '',/[0-9]/g,'');
};

module.exports = toCamelCase;