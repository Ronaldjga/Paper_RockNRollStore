export function moneyFomat(money:number | string): string{
    if (typeof money === 'number') {
        return money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 4 })
    } else {
        const numberMoney = parseFloat(money);
        return numberMoney.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 4 })
    }
}


export function totalCalculationOneProduct(quantity:number, productPrice: string ): number {
    const price = parseFloat(productPrice)
    const finalCalculation = parseFloat((quantity * price).toFixed(2))
    return finalCalculation
}