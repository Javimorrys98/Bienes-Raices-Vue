export const propertyPrice = (price) =>
  Number(price).toLocaleString("es-es", {
    style: "currency",
    currency: "EUR",
  });
