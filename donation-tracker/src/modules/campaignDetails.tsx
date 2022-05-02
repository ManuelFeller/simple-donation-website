import * as React from 'react';
import { useEffect, useState } from 'react';

import { Button, Container, Typography } from '@mui/material';

import PageConfiguration from '../config';
import { Campaign } from '../types/campaign';
import DataStore from '../utils/dataStore';
import { navigate } from 'gatsby';
import { convertDateToString } from '../utils/convertDateToString';
import LayoutModule from '../components/layout';

const CampaignDetailsModule = (props: any) => {
  /* --- start of data connection code --- */
  // get the data store object
  let data = DataStore.getInstance();

  // set up a state to have a content re-render trigger
  const [dataUpdateTime, setDataUpdateTime] = useState(new Date(1970, 1, 1));

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

  const handleClickOnLink = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink)
  };

  let campaignDetails: Campaign = {
    Key: '',
    Title: 'unknown campaign / unbekannte Sammlung',
    TitleImage: '',
    DetailsFile: '',
    UrlSlug: '',
    Status: 'closed',
    Photos: [],
    StartDate: new Date(1970, 1, 1),
    RegistrationFormUrl: ''
  };
  PageConfiguration.CampaignDetails.forEach((campaign) => {
    if (campaign.Key === props.campaignKey) {
      campaignDetails = campaign;
    }
  });

  return (
    <LayoutModule>
      <Container maxWidth="lg">
        &nbsp;

        <Typography variant="h2" component="h1">
          Campaign / Sammlung &quot;{campaignDetails.Title}&quot;
        </Typography>
        <Button
          href={'/campaigns/'}
          onClick={(event) => handleClickOnLink(event, '/campaigns/')}
        >
          &lt;- back to the overview / zurück zur Übersicht
        </Button>
        <Typography variant="h5" component="h5">
          {campaignDetails.ShortCampaignDescription}
        </Typography>
        <Typography component="div">
          {props.children}
        </Typography>

        <p>
          Data from {convertDateToString(data.getLastDataUpdateTime())}: (last refresh at {convertDateToString(dataUpdateTime)})
        </p>
      </Container>
    </LayoutModule>
  );
}

export default CampaignDetailsModule;