import axios from "axios";

const endpoint = "https://uptek-store.myshopify.com/api/2024-01/graphql.json";

const graphqlQuery = {
  query: `
  {
    products(first: 11) {
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
};

export const getShopifyData = async () => {
  try {
    const response = await axios.post(process.env.BASE_URL, graphqlQuery, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_API_TOKEN,
        // Include any other headers required for your GraphQL endpoint
      },
    });
    return response.data; // You might want to return the data or process it further
  } catch (error) {
    console.error("GraphQL Request Error:", error);
    throw error; // You can handle errors as needed
  }
};
