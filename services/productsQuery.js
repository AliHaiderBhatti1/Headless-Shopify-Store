import axios from "axios";

export const getProducts = async (
  collection,
  numOfItems = 10,
  imagesPerItem = 3
) => {
  const graphqlQuery = {
    query: `
      {
        collectionByHandle(handle: "${collection}") {
          products(first: ${numOfItems}) {
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
                images(first: ${imagesPerItem}) {
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

    console.log("GraphQL Response:", response.data);
    return response.data; // You might want to return the data or process it further
  } catch (error) {
    console.error("GraphQL Request Error:", error);
    throw error; // You can handle errors as needed
  }
};
