
export const getCurrency = (n) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
}).format(n)

let option = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
};
export const getPercent = (n) => new Intl.NumberFormat("en-US", option).format(n);