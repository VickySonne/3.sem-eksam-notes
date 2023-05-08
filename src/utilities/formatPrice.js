const formatPrice = (price) => {
    return new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
    }).format(price / 100)
}

export default formatPrice