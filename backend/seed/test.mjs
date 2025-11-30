import TCGdex from "@tcgdex/sdk";

// instantiate tcg sdk w/ preferred language
const tcgdex = new TCGdex("en");

async function test() {
  const card = await tcgdex.card.get("sv01-251");
  console.log(card.pricing);
}

test();
