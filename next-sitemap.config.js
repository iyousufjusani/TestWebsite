/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DRIVE_WEBSITE_LINK,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    "/dashboard/*",
    "/dashboard",
    "/404",
    "/additional-information",
    "/verify-email",
  ],
  transform: async (config, path) => {
    return {
      loc: "https://" + process.env.NEXT_PUBLIC_DRIVE_WEBSITE_LINK + path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
