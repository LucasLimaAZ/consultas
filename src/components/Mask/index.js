export const cpfMask = value => {
    return value
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') 
}

export const phoneMask = value => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{0})(\d)/, '$1($2') 
        .replace(/(\d{2})(\d)/, '$1) $2')
}

export const currencyMask = val => {
    let value = val
        .replace(/\D/g, '')
        .replace(/^0+/g, '')

    if(value.length === 1){
        return value
            .replace(/(\d{0})(\d)/, '$1R$ $2')
            .replace(/([0-9]{1})$/g, "0,0$1")
    }
    else if(value.length === 2){
        return value
            .replace(/(\d{0})(\d)/, '$1R$ $2')
            .replace(/([0-9]{2})$/g, "0,$1")
    }
    else{
        return value
            .replace(/(\d{0})(\d)/, '$1R$ $2')
            .replace(/([0-9]{2})$/g, ",$1")
    }
}