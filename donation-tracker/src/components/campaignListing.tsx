import React, { useEffect, useState } from 'react';

import { useTranslation } from 'gatsby-plugin-react-i18next';

import { Box, Typography } from '@mui/material';

import CampaignCard from '../components/campaignCard';
import { Campaign } from '../types/campaign';
import DataStore from '../utils/dataStore';
import PageConfiguration from '../config';
import { DonationItem } from '../types/donationItem';
import { DonationList } from '../types/donationList';

interface Props {
  campaignTypes: Campaign['CampaignType'][];
  statusType: 'running' | 'closed';
}

const CampaignListing = ({ campaignTypes, statusType }: Props) => {
  const { t } = useTranslation();

  const campaigns = PageConfiguration.CampaignDetails.filter(({ CampaignType: campaignType }) => campaignTypes.includes(campaignType))
    .filter(({ Status: campaignStatus }) => (statusType === 'closed') === (campaignStatus === 'closed'))
    .sort(sortByStartDate);

  const dataStore = DataStore.getInstance();

  // set up a state to have a content re-render trigger
  const [donationItems, setDonationItems] = useState<DonationItem[]>(dataStore.getAllItems());

  // page lifecycle registrations (in the functional component way)
  useEffect(() => {
    // the update handler that is passed to the data store object
    const handleDataUpdate = ({ data }: DonationList) => setDonationItems(data);
    // Anything in here is fired on component mount.
    dataStore.subscribeToDataUpdates(handleDataUpdate);
    return () => {
      // Anything in here is fired on component unmount.
      dataStore.unsubscribeFromDataUpdates(handleDataUpdate);
    };
  }, []);

  const bigCard = statusType === 'closed';
  return (
    <Box marginX={-2}>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        {campaigns.length > 0 ? (
          campaigns.map(campaign => (
            <Box m={2} display="flex" flex={bigCard ? '0 1 1152px' : '0 1 560px'} key={campaign.Key}>
              <CampaignCard
                campaign={campaign}
                donationItems={donationItems.filter(item => item.campaignKey === campaign.Key)}
                big={bigCard}
              />
            </Box>
          ))
        ) : (
          <Typography variant="h5">{t('campaigns.listing.moreToCome')}</Typography>
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
