import type { GatsbyNode } from 'gatsby';
import path from 'path';
import PageConfiguration from './src/config';

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // create imprint page
  createPage({
    path: '/imprint',
    component: path.resolve('./src/modules/imprint.tsx'),
    context: {/* pass data into page here */}
  })
  // create campaign overview page
  createPage({
    path: '/campaigns',
    component: path.resolve('./src/modules/campaignOverview.tsx'),
    context: {/* pass data into page here */}
  })
  /* ToDo: generate campaign detail pages here */

};
