import { client } from '../index.ts';
import { graphql } from '../generated/index.ts'; // A utility function for handling GraphQL queries

const GET_PRODUCT_REVIEWS_QUERY = graphql(`
  query getProductReviews($productIds: [Int!]) {
    site {
      products(entityIds: $productIds) {
        edges {
          node {
            reviews {
              edges {
                node {
                  author {
                    name
                  }
                  title
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`);

const response = await client.fetch({
  document: GET_PRODUCT_REVIEWS_QUERY, // GraphQL query
  variables: { productIds: [101, 202] },  // Query variables
  fetchOptions: { cache: 'no-store' }, // Optional fetch options
});

console.log(response.data);