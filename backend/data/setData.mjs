import TCGdex from "@tcgdex/sdk";

// instantiate tcg sdk w/ preferred language
const tcgdex = new TCGdex("en");

// set names
// ** ADD MORE SETS HERE
const setNames = [
  "sv01",
  "sv02",
  "sv03",
  "sv03.5",
  "sv04",
  "sv04.5",
  "sv05",
  "sv06",
  "sv06.5",
  "sv07",
  "sv08",
  "sv08.5",
  "sv09",
  "sv10",
  "sv10.5b",
  "sv10.5w",
  "me01",
  "me02",
];

// Use in an async context
async function getSpecificSet(setName) {
  try {
    const set = await tcgdex.fetch("sets", `${setName}`);

    // destructure set
    const { id, name, logo, cards } = set;
    const destructuredSet = { id, name, logo, cards };
    return destructuredSet;

  } catch (error) {
    console.log(`Error in ${setName}`);
  }
}

// ** ADD MORE SETS HERE
async function getSets() {
  const sets = {
    sv01: await getSpecificSet(setNames.find((name) => name === "sv01")),
    sv02: await getSpecificSet(setNames.find((name) => name === "sv02")),
    sv03: await getSpecificSet(setNames.find((name) => name === "sv03")),
    sv03_5: await getSpecificSet(setNames.find((name) => name === "sv03.5")),
    sv04: await getSpecificSet(setNames.find((name) => name === "sv04")),
    sv04_5: await getSpecificSet(setNames.find((name) => name === "sv04.5")),
    sv05: await getSpecificSet(setNames.find((name) => name === "sv05")),
    sv06: await getSpecificSet(setNames.find((name) => name === "sv06")),
    sv06_5: await getSpecificSet(setNames.find((name) => name === "sv06.5")),
    sv07: await getSpecificSet(setNames.find((name) => name === "sv07")),
    sv08: await getSpecificSet(setNames.find((name) => name === "sv08")),
    sv08_5: await getSpecificSet(setNames.find((name) => name === "sv08.5")),
    sv09: await getSpecificSet(setNames.find((name) => name === "sv09")),
    sv10: await getSpecificSet(setNames.find((name) => name === "sv10")),
    sv11b: await getSpecificSet(setNames.find((name) => name === "sv10.5b")),
    sv11w: await getSpecificSet(setNames.find((name) => name === "sv10.5w")),
    me01: await getSpecificSet(setNames.find((name)=> name === "me01" )),
    me02: await getSpecificSet(setNames.find((name)=> name === "me02" )),
  };
  return sets;
}

const setData = await getSets();
export default setData;
