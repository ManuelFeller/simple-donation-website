import * as React from 'react';
import { useEffect, useState } from 'react';

import { Box, Button, Container, Typography } from '@mui/material';

import PageConfiguration from '../config';
import { Campaign } from '../types/campaign';
import DataStore from '../utils/dataStore';
import { navigate } from 'gatsby';
import { convertDateToString } from '../utils/convertDateToString';
import LayoutModule from '../components/layout';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { ChevronLeft } from '@mui/icons-material';
import DonationRow from '../components/donationRow';
import DonationPill from '../components/donationPill';
import PageMetadata from '../components/pageMetadata';

const CampaignDetailsModule = (props: { campaignKey: string; children: any[] }) => {
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
    navigate(itemLink);
  };

  const campaignDetails: Campaign = PageConfiguration.CampaignDetails.find(campaign => campaign.Key === props.campaignKey) ?? {
    Key: '',
    Title: 'unknown campaign / unbekannte Sammlung',
    TitleImage: '',
    DetailsFile: '',
    UrlSlug: '',
    Status: 'closed',
    Photos: [],
    StartDate: new Date(1970, 1, 1),
    RegistrationFormUrl: '',
  };
  const donationItems = data.getItemsForCampaign(campaignDetails.Key);

  return (
    <LayoutModule>
      <PageMetadata title={campaignDetails.Title}></PageMetadata>
      <Container maxWidth="lg">
        <Box marginY={2}>
          <Button href={'/campaigns/'} onClick={event => handleClickOnLink(event, '/campaigns/')}>
            <ChevronLeft /> back to campaigns / zurück zu den Sammlungen
          </Button>
        </Box>
        <Card elevation={4} sx={{ flex: '0 1 500px', display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            title={'Campaign / Sammlung "'.concat(campaignDetails.Title, '"')}
            subheader={campaignDetails.ShortCampaignDescription}
          ></CardHeader>
          <CardMedia component="img" height="194" image={campaignDetails.TitleImage} />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" marginY={2}>
              {props.children}
            </Typography>
            {donationItems.length && (
              <>
                <Typography variant="h6" mt={2}>
                  Donations / Spenden
                </Typography>
                <Typography variant="subtitle1" marginY={1}>
                  {campaignDetails.ShortDonationDescription}
                </Typography>
                <table>
                  {donationItems
                    .map((donationItem, index) => ({ donationItem, index }))
                    .map(props => (
                      <tr key={props.index}>
                        <td width={'100%'}>
                          <DonationRow {...props}></DonationRow>
                        </td>
                        <td>
                          <Box display="flex" mx={2}>
                            <DonationPill donationItem={props.donationItem}></DonationPill>
                          </Box>
                        </td>
                      </tr>
                    ))}
                </table>
              </>
            )}
          </CardContent>
          {campaignDetails.RegistrationFormUrl && (
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button variant="contained" href={campaignDetails.RegistrationFormUrl} target="_blank">
                Register donation / Spende registrieren
              </Button>
            </CardActions>
          )}
        </Card>
        <p>
          Data from {convertDateToString(data.getLastDataUpdateTime())}: (last refresh at {convertDateToString(dataUpdateTime)})
        </p>
      </Container>
    </LayoutModule>
  );
};

export default CampaignDetailsModule;
