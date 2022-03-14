import algoliasearch from "algoliasearch";
import "dotenv/config";
const client = algoliasearch(
  process.env.ALGOLIA_APPID,
  process.env.ALGOLIA_APIKEY
);
const index = client.initIndex("pets");

export { index };
