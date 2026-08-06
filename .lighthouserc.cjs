// Local Lighthouse CI evaluation for the production build served via `astro preview`.
// See docs/adr/0001-local-lighthouse-and-image-performance.md.
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: "npm run preview -- --host 127.0.0.1 --port 4321",
      startServerReadyPattern: "http://127.0.0.1:4321/",
      startServerTimeout: 30000,
      url: [
        "http://127.0.0.1:4321/",
        "http://127.0.0.1:4321/ja/",
        "http://127.0.0.1:4321/work/",
        "http://127.0.0.1:4321/ja/work/",
      ],
      settings: {
        extends: "lighthouse:default",
        formFactor: "mobile",
        throttlingMethod: "simulate",
        throttling: {
          rttMs: 150,
          throughputKbps: 1638,
          cpuSlowdownMultiplier: 4,
        },
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
        },
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { aggregationMethod: "median-run", minScore: 0.9 }],
        "categories:accessibility": ["error", { aggregationMethod: "median-run", minScore: 0.95 }],
        "categories:best-practices": ["error", { aggregationMethod: "median-run", minScore: 0.95 }],
        "categories:seo": ["error", { aggregationMethod: "median-run", minScore: 0.95 }],
        "cumulative-layout-shift": ["error", { aggregationMethod: "median-run", maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
