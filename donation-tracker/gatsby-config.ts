import type { GatsbyConfig } from "gatsby";
import PageConfiguration from "./src/config";

const config: GatsbyConfig = {
  siteMetadata: {
    title: PageConfiguration.pageTitle,
    titleTemplate: PageConfiguration.titleTemplate,
    description: PageConfiguration.defaultDescription,
    image: PageConfiguration.defaultPageSocialCardImage,
    siteUrl: PageConfiguration.PageUrl
  },
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": `static${PageConfiguration.pageIconFile}`
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "locale",
      "path": "./locales/"
    },
    __key: "locale"
  },
  {
    resolve: `gatsby-plugin-react-i18next`,
    options: {
      localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
      languages: [`en`, `de`],
      defaultLanguage: `de`,
      // if you are using Helmet, you must include the siteUrl, and make sure you add http:https
      siteUrl: PageConfiguration.PageUrl,
      // you can pass any i18next options
      i18nextOptions: {
        interpolation: {
          escapeValue: false // not needed for react as it escapes by default
        },
        keySeparator: false,
        nsSeparator: false
      },
      pages: []
    }
  }]
};

export default config;
