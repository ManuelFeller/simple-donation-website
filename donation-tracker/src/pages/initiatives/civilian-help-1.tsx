import { graphql } from 'gatsby';
import * as React from 'react';

import CampaignDetailsModule from '../../modules/campaignDetails';

const CampaignDetailsPage = (props: any) => {
  return (
    <CampaignDetailsModule campaignKey='civilian'>
      Civilian 1 Details &amp; updates here...
    </CampaignDetailsModule>
  );
}

export default CampaignDetailsPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;