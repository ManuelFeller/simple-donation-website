import * as React from 'react';

import CampaignDetailsModule from '../../modules/campaignDetails';

const CampaignDetailsPage = (props: any) => {
  return (
    <CampaignDetailsModule campaignKey='medication'>
      Medical 1 Details!!!
    </CampaignDetailsModule>
  );
}

export default CampaignDetailsPage;