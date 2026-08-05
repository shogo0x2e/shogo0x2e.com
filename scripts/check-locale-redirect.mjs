import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
const localeScript = scripts.find((script) => script.includes("shogo0x2e-locale"));

assert(localeScript, "Locale redirect script was not emitted into dist/index.html");
assert(!localeScript.includes("{`"), "Locale redirect script was emitted as a template literal string");

function runLocaleScript({ languages, storedLocale = null }) {
  const redirects = [];
  const context = {
    navigator: {
      languages,
      language: languages[0] ?? "",
    },
    sessionStorage: {
      getItem: () => storedLocale,
    },
    location: {
      search: "",
      hash: "",
      replace: (url) => redirects.push(url),
    },
  };

  vm.runInNewContext(localeScript, context);
  return redirects;
}

assert.deepEqual(runLocaleScript({ languages: ["ja-JP", "en-US"] }), ["/ja/"]);
assert.deepEqual(runLocaleScript({ languages: ["en-US", "ja-JP"] }), []);
assert.deepEqual(runLocaleScript({ languages: ["fr-FR", "ja-JP", "en-US"] }), ["/ja/"]);
assert.deepEqual(runLocaleScript({ languages: ["fr-FR", "en-US", "ja-JP"] }), []);
assert.deepEqual(runLocaleScript({ languages: ["ja-JP"], storedLocale: "en" }), []);
assert.deepEqual(runLocaleScript({ languages: ["en-US"], storedLocale: "ja" }), ["/ja/"]);

console.log("Locale redirect checks passed.");
