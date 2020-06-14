import gql from 'graphql-tag';

const add_Champ = gql`
  mutation create(
    $name: String!
    $id: ID!
    $damagetype: String!
    $lane: String!
    $playstyle: String!
    $champimage: String!
  ) {
    addChamp(
      name: $name
      id: $id
      damagetype: $damagetype
      lane: $lane
      playstyle: $playstyle
      champimage: $champimage
    ) {
      id
      name
      damagetype
      lane
      playstyle
      champimage
    }
  }
`;

const get_Products = gql`
  query Product($name: String!) {
    products(name: $name) {
      _id
      name
      price
      productimages {
        url
      }
      reviews
      details
      qty
    }
  }
`;

export {get_Products};
