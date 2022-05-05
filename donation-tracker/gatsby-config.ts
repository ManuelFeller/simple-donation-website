import type { GatsbyConfig } from "gatsby";
import PageConfiguration from "./src/config";


const config: GatsbyConfig = {
  siteMetadata: {
    title: "#StandWithUkraine",
    titleTemplate: "%s · #StandWithUkraine",
    description:
      "Collecting needed things for the people in Ukraine.",
    image: "/static/media/tim-mossholder-BQa--UCtFqg-unsplash_1200.jpg", // Path to the image placed in the 'static' folder, in the project's root directory.
    siteUrl: PageConfiguration.PageUrl
  },
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/tim-mossholder-BQa--UCtFqg-unsplash.jpg"
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
