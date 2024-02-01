import axios from "axios";
export const checkoutQuery = async (cartItems) => {
  const graphqlQuery = {
    query: `
          mutation {
            checkoutCreate(input: {
              lineItems: ${JSON.stringify(cartItems).replace(
                /"([^(")"]+)":/g,
                "$1:"
              )}
            }) {
              checkout {
                id
                webUrl
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
      },
    });
    const checkoutUrl = response.data.data.checkoutCreate.checkout.webUrl;

    // Redirect to Shopify checkout
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error("Error creating checkout:", error);
  }
};
