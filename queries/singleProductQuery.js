import axios from "axios";

export const getSingleProduct = async (productId, imagesPerItem = 3) => {
  const graphqlQuery = {
    query: `
    {
        product(id: "${productId}") {
          id
          title
          handle
          description
          variants(first: 10) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                availableForSale
              }
            }
          }
          images(first: ${imagesPerItem}) {
            edges {
              node {
                originalSrc
              }
            }
          }
        }
      }
      
    `,
  };

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
