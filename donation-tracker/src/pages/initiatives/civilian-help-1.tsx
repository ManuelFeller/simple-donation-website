import * as React from 'react';

import LayoutModule from '../../components/layout';
import CampaignDetailsModule from '../../modules/campaignDetails';

const CampaignDetailsPage = (props: any) => {
  return (
    <CampaignDetailsModule campaignKey='civilian'>
      Civilian 1 Details!!!
    </CampaignDetailsModule>
  );
}

export default CampaignDetailsPage;