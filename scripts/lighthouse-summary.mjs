// Prints a reproducible summary of the latest `.lighthouseci/` runs:
// category scores, Core Web Vitals, and byte weights per URL.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = ".lighthouseci";
const files = readdirSync(dir).filter((f) => f.startsWith("lhr-") && f.endsWith(".json"));

if (files.length === 0) {
  console.error("No Lighthouse results found in .lighthouseci/. Run `npm run lighthouse` first.");
  process.exit(1);
}

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const byUrl = new Map();
for (const file of files) {
  const lhr = JSON.parse(readFileSync(join(dir, file), "utf8"));
  const key = lhr.finalDisplayedUrl ?? lhr.finalUrl ?? lhr.requestedUrl;
  if (!byUrl.has(key)) byUrl.set(key, []);
  byUrl.get(key).push(lhr);
}

const percent = (v, digits = 0) => `${(v * 100).toFixed(digits)}%`;
const ms = (v) => `${Math.round(v)}ms`;
const kb = (v) => `${Math.round(v / 1024).toLocaleString("en-US")} KiB`;

const metric = (lhrs, id) => {
  const values = lhrs.map((lhr) => lhr.audits[id]?.numericValue).filter((v) => v !== undefined);
  return values.length === 0 ? "n/a" : ms(median(values));
};

const categoryScore = (lhrs, id) => {
  const values = lhrs.map((lhr) => lhr.categories[id]?.score).filter((v) => v !== undefined);
  return values.length === 0 ? "n/a" : percent(median(values), 2);
};

const cls = (lhrs) => {
  const values = lhrs.map((lhr) => lhr.audits["cumulative-layout-shift"]?.numericValue).filter((v) => v !== undefined);
  return values.length === 0 ? "n/a" : median(values).toFixed(4);
};

const transferTotals = (lhr) => {
  const network = lhr.audits["network-requests"]?.details?.items ?? [];
  return network.reduce(
    (acc, item) => {
      acc.all += item.transferSize ?? 0;
      if (item.resourceType === "Image") acc.images += item.transferSize ?? 0;
      return acc;
    },
    { all: 0, images: 0 },
  );
};

const row = (label, lhrs, pick) => metric(lhrs, pick);

for (const [url, lhrs] of [...byUrl.entries()].sort()) {
  const representative = [...lhrs].sort(
    (a, b) =>
      (a.audits["largest-contentful-paint"]?.numericValue ?? Infinity) -
      (b.audits["largest-contentful-paint"]?.numericValue ?? Infinity),
  )[Math.floor(lhrs.length / 2)];
  const totalsByRun = lhrs.map(transferTotals);
  const totals = {
    all: median(totalsByRun.map((item) => item.all)),
    images: median(totalsByRun.map((item) => item.images)),
  };
  const network = representative.audits["network-requests"]?.details?.items ?? [];
  const lcpItem = network
    .filter((item) => (item.resourceType ?? "") !== "Document")
    .sort((a, b) => (b.resourceSize ?? 0) - (a.resourceSize ?? 0))
    .filter((item) => item.resourceType === "Image")
    .sort((a, b) => b.transferSize - a.transferSize)[0];

  console.log(`\n=== ${url} (${lhrs.length} runs) ===`);
  console.log(`  Performance      ${categoryScore(lhrs, "performance")}`);
  console.log(`  Accessibility    ${categoryScore(lhrs, "accessibility")}`);
  console.log(`  Best Practices   ${categoryScore(lhrs, "best-practices")}`);
  console.log(`  SEO              ${categoryScore(lhrs, "seo")}`);
  console.log(`  FCP              ${row(url, lhrs, "first-contentful-paint")}`);
  console.log(`  LCP              ${row(url, lhrs, "largest-contentful-paint")}`);
  console.log(`  TBT              ${row(url, lhrs, "total-blocking-time")}`);
  console.log(`  CLS              ${cls(lhrs)}`);
  console.log(`  Speed Index      ${row(url, lhrs, "speed-index")}`);
  console.log(`  Total transfer   ${kb(totals.all)} (median of ${lhrs.length})`);
  console.log(`  Image transfer   ${kb(totals.images)} (median of ${lhrs.length})`);
  if (lcpItem) {
    const lcpAudit = representative.audits["largest-contentful-paint-element"];
    const lcpNode = lcpAudit?.details?.items?.[0]?.node?.snippet;
    console.log(`  Largest image    ${lcpItem.url.replace(/^https?:\/\/[^/]+/, "")} (${kb(lcpItem.transferSize)})`);
    if (lcpNode) console.log(`  LCP element      ${lcpNode.replaceAll("\n", " ").slice(0, 120)}`);
  }
}
