import * as React from 'react';

import LayoutModule from '../../components/layout';
import CampaignDetailsModule from '../../modules/campaignDetails';

const CampaignDetailsPage = (props: any) => {
  return (
    <LayoutModule>
      <CampaignDetailsModule campaignKey='medication'>
        Medical 1 Details!!!
      </CampaignDetailsModule>
    </LayoutModule>
  );
}

export default CampaignDetailsPage;