// shopifyService.js

export const getProducts = async () => {
  try {
    const response = await this.$axios.$post(
      '',
      {
        query: `
          {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  variants(first: 1) {
                    edges {
                      node {
                        priceV2 {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        originalSrc
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      },
      {
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_TOKEN,
        },
      }
    );

    return response.data.data.products.edges.map(({ node }) => node);
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    throw error;
  }
};
