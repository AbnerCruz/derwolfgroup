function PriceCalculator(defaultHourPrice, discount, raw = false) {
  if (typeof defaultHourPrice !== 'number' || typeof discount !== 'number') {
    throw new TypeError("Ambos os argumentos devem ser números");
  }

  const finalPrice = defaultHourPrice - (defaultHourPrice * (discount / 100));

  if (raw) return finalPrice;

  return finalPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}


export default PriceCalculator;
