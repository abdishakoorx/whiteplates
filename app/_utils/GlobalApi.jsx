import request, { gql } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const GetCategory = async () => {
  const query = gql`
    query {
      categories(first: 50) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `;
  
  const result = await request(MASTER_URL, query);
  return result;
};

const GetSizes = async () => {
  const query = gql`
    query {
      sizes(first: 50) {
        id
        name
      }
    }
  `;
  
  const result = await request(MASTER_URL, query);
  return result;
};

const GetBases = async () => {
  const query = gql`
    query {
      bases(first: 50) {
        id
        name
        slug
        icon {
          url
        }
        baseItems {
          id
          name
        }
      }
    }
  `;
  
  const result = await request(MASTER_URL, query);
  return result;
};

const GetLayerings = async () => {
  const query = gql`
    query {
      layerings(first: 50) {
        id
        name
        slug
        icon {
          url
        }
        layeringItems {
          id
          name
        }
      }
    }
  `;
  
  const result = await request(MASTER_URL, query);
  return result;
};

const GetToppings = async () => {
  const query = gql`
    query {
      toppings(first: 50) {
        id
        name
        slug
        icon {
          url
        }
        toppingItems {
          id
          name
        }
      }
    }
  `;
  
  const result = await request(MASTER_URL, query);
  return result;
};

const GetBeverages = async () => {
  const query = gql`
    query {
      beverages(first: 50) {
        id
        name
      }
    }
  `;
  
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  GetCategory,
  GetSizes,
  GetBases,
  GetLayerings,
  GetToppings,
  GetBeverages
};
