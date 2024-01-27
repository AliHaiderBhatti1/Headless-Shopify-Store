// Return Amount and Currency of single product

export const getProductAmount = (item) => {
  return (
    item.node.variants.edges[0].node.priceV2.amount +
    " " +
    item.node.variants.edges[0].node.priceV2.currencyCode
  );
};
