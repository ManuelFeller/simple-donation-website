import * as React from 'react';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { convertDateToString } from '../utils/convertDateToString';
import CampaignCard from '../components/campaignCard';
import { Campaign } from '../types/campaign';
import DataStore from '../utils/dataStore';
import PageConfiguration from '../config';

const CampaignListing = ({ campaignTypes }: { campaignTypes: Campaign['CampaignType'][] }) => {
  /* --- start of data connection code --- */
  // get the data store object
  let data = DataStore.getInstance();

  let initialUpdateTime = data.getLastDataLoadingTime();
  if (initialUpdateTime === undefined) {
    initialUpdateTime = new Date(1970, 1, 1);
  }

  // set up a state to have a content re-render trigger
  const [dataUpdateTime, setDataUpdateTime] = useState(initialUpdateTime);

  // page lifecycle registrations (in the functional component way)
  useEffect(() => {
    // Anything in here is fired on component mount.
    data.subscribeToDataUpdates(handleDataUpdate);
    return () => {
      // Anything in here is fired on component unmount.
      data.unsubscribeFromDataUpdates(handleDataUpdate);
    };
  }, []);

  // the update handler that is passed to the data store object
  const handleDataUpdate = (newUpdateTime: Date) => {
    setDataUpdateTime(newUpdateTime);
  };
  /* --- end of data connection code --- */

  const campaigns = PageConfiguration.CampaignDetails.filter(({CampaignType: campaignType}) => campaignTypes.includes(campaignType));

  return (
    <>
      <Box marginX={-2}>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
          {campaigns.sort(sortByStartDate).map(campaign => (
            <Box m={2} display="flex" flex="0 1 560px" key={campaign.Key}>
              <CampaignCard campaign={campaign} donationItems={data.getItemsForCampaign(campaign.Key)}></CampaignCard>
            </Box>
          ))}
        </Box>
      </Box>
      &nbsp;
      <Typography component="div" sx={{ fontStyle: 'italic', textAlign: 'center' }} style={{ color: 'gray' }}>
        Data from {convertDateToString(data.getLastDataUpdateTime())}; last refresh at {convertDateToString(dataUpdateTime)}
      </Typography>
    </>
  );
};

export default CampaignListing;

const sortByStartDate = (a: Campaign, b: Campaign) =>
  (a.StartDate?.getTime() ?? 0) < (b.StartDate?.getTime() ?? 0)
    ? 1
    : (a.StartDate?.getTime() ?? 0) > (b.StartDate?.getTime() ?? 0)
    ? -1
    : 0;
