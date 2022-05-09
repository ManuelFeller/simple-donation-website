import * as React from 'react';

import { Box } from '@mui/material';

import CampaignCard from '../components/campaignCard';
import { Campaign } from '../types/campaign';
import DataStore from '../utils/dataStore';
import PageConfiguration from '../config';

const CampaignListing = ({ campaignTypes }: { campaignTypes: Campaign['CampaignType'][] }) => {
  const data = DataStore.getInstance();
  const campaigns = PageConfiguration.CampaignDetails.filter(({ CampaignType: campaignType }) => campaignTypes.includes(campaignType)).sort(
    sortByStartDate
  );
  return (
    <Box marginX={-2}>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        {campaigns.map(campaign => (
          <Box m={2} display="flex" flex="0 1 560px" key={campaign.Key}>
            <CampaignCard campaign={campaign} donationItems={data.getItemsForCampaign(campaign.Key)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CampaignListing;

const sortByStartDate = (a: Campaign, b: Campaign) =>
  (a.StartDate?.getTime() ?? 0) < (b.StartDate?.getTime() ?? 0)
    ? 1
    : (a.StartDate?.getTime() ?? 0) > (b.StartDate?.getTime() ?? 0)
    ? -1
    : 0;
