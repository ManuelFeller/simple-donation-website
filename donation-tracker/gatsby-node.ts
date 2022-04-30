import type { GatsbyNode } from 'gatsby';
import path from 'path';
import PageConfiguration from './src/config';

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  // create imprint page
  createPage({
    path: '/imprint',
    component: path.resolve('./src/modules/imprint.tsx'),
    context: {imprintContact: PageConfiguration.ImprintContact}
  })
  
};
