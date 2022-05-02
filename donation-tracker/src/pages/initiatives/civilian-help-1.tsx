import * as React from 'react';

import CampaignDetailsModule from '../../modules/campaignDetails';

const CampaignDetailsPage = (props: any) => {
  return (
    <CampaignDetailsModule campaignKey='civilian'>
      Civilian 1 Details!!!
    </CampaignDetailsModule>
  );
}

export default CampaignDetailsPage;