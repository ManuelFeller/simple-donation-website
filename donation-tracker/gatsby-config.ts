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
      "icon": PageConfiguration.pageIconFile
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
  }]
};

export default config;
