import isEmpty from "is-empty";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

const post_types = [
  "ron_weasley_appreciation",
  "ron_weasley_defense",
  "ron_weasley_fanart",
  "romione_appreciation",
  "romione_fanart",
  "ron_and_harry_appreciation",
  "ron_and_harry_fanart",
  "ron_and_lavender_appreciation",
  "ron_and_lavender_fanart",
  "ron_and_luna_appreciation",
  "ron_and_luna_fanart",
  "golden_trio_appreciation",
  "golden_trio_fanart",
  "weasley_family_appreciation",
  "weasley_family_fanart",
  "checkmated",
];

const createSitemap = (posts) => {
  let url_sets = posts.map((x) => {
    if (x.post_type["S"].indexOf("checkmated") > -1) {
      return `<url><loc>https://www.ronweasley.co/fanfiction/${x.post_type["S"]}/${x.post_id["S"]}</loc><priority>0.75</priority></url>`;
    }

    if (x.post_type["S"].indexOf("fanart") > 0) {
      return `<url><loc>https://www.ronweasley.co/fanart/${x.post_type["S"]}/${x.post_id["S"]}</loc><priority>0.75</priority></url>`;
    } else {
      return `<url><loc>https://www.ronweasley.co/post/${x.post_type["S"]}/${x.post_id["S"]}</loc><priority>0.75</priority></url>`;
    }
  });

  return url_sets;
};

function Sitemap() {}

export async function getServerSideProps({ res }) {
  let post_ids = [];
  for (let x = 0; x < post_types.length; x++) {
    let pt = post_types[x];
    let r1 = await fetch(`${BASE_URL}/get_post/id_only/${pt}`);
    let d1 = await r1.json();

    if (d1["success"] && !isEmpty(d1["post_ids"])) {
      d1["post_ids"].map((x) => post_ids.push(x));
    }
  }

  let urls = createSitemap(post_ids);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://www.ronweasley.co</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/romione</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/friendships/golden_trio</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/friendships/weasley_family</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/fanon_ships/ron_and_harry</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/fanon_ships/ron_and_lavender</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/fanon_ships/ron_and_luna</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/fanfiction</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/fanfiction/checkmated</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/credits</loc><priority>1</priority></url>
      <url><loc>https://www.ronweasley.co/suggestions</loc><priority>0.25</priority></url>
      <url><loc>https://www.ronweasley.co/timeline</loc><priority>0.25</priority></url>
      ${urls.map((x) => x)}
    </urlset>
    `;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default Sitemap;
