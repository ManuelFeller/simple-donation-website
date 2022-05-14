import * as React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import { Box, Typography } from '@mui/material';

import CampaignCard from '../components/campaignCard';
import { Campaign } from '../types/campaign';
import DataStore from '../utils/dataStore';
import PageConfiguration from '../config';

interface Props {
  campaignTypes: Campaign['CampaignType'][];
  statusType: 'running' | 'closed';
}

const CampaignListing = ({ campaignTypes, statusType }: Props) => {
  const { t } = useTranslation();
  const data = DataStore.getInstance();
  const campaigns = PageConfiguration.CampaignDetails.filter(({ CampaignType: campaignType }) => campaignTypes.includes(campaignType))
    .filter(({ Status: campaignStatus }) => (statusType === 'closed') === (campaignStatus === 'closed'))
    .sort(sortByStartDate);

  const bigCard = statusType === 'closed';
  return (
    <Box marginX={-2}>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        {campaigns.length > 0 ? (
          campaigns.map(campaign => (
            <Box m={2} display="flex" flex={bigCard ? '0 1 1152px' : '0 1 560px'} key={campaign.Key}>
              <CampaignCard campaign={campaign} donationItems={data.getItemsForCampaign(campaign.Key)} big={bigCard} />
            </Box>
          ))
        ) : (
          <Typography variant="h5">{t('campaigns.listing.moretocome')}</Typography>
        )}
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
