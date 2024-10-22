export const handlePrice = (price) => {
    return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}