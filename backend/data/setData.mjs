import TCGdex from "@tcgdex/sdk";

// Instantiate the SDK with your preferred language
const tcgdex = new TCGdex('en');

// Use in an async context
async function getSets () {
  console.log('fetching set data...')
  const set = await tcgdex.fetch('sets', 'sv01');
 
  const {id, name, logo, cards} = set;

  console.log('set fetched');

  const setData = {id, name, logo, cards};
  
  return setData;
}

export default getSets;
