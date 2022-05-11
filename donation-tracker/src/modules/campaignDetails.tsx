import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';

import { Box, Button, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { ChevronLeft } from '@mui/icons-material';

import PageConfiguration from '../config';
import { Campaign } from '../types/campaign';
import DataStore from '../utils/dataStore';
import LayoutModule from '../components/layout';
import DonationRow from '../components/donationRow';
import DonationPill from '../components/donationPill';
import PageMetadata from '../components/pageMetadata';
import CampaignAvatar from '../components/campaignAvatar';
import UpdateNote from '../components/updateNote';

const CampaignDetailsModule = (props: { campaignKey: string; children: any }) => {
  const { navigate } = useI18next();
  const { t } = useTranslation();

  // get the data store object
  let data = DataStore.getInstance();

  const handleClickOnLink = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink);
  };

  const campaignDetails: Campaign = PageConfiguration.CampaignDetails.find(campaign => campaign.Key === props.campaignKey) ?? {
    Key: '',
    CampaignType: 'generalSupport',
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
          <Button href={'/'} onClick={event => handleClickOnLink(event, '/')}>
            <ChevronLeft /> Back
          </Button>
        </Box>
        <Card sx={{ flex: '0 1 500px', display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            title={campaignDetails.Title}
            subheader={campaignDetails.ShortCampaignDescription}
            avatar={<CampaignAvatar campaignType={campaignDetails.CampaignType} title={campaignDetails.Title} />}
          />
          {campaignDetails.TitleImage && <CardMedia component="img" height="194" image={campaignDetails.TitleImage} />}
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" marginY={2}>
              {props.children}
            </Typography>
            {donationItems.length > 0 && (
              <>
                <Typography variant="h6" mt={2}>
                  Donations / Spenden
                </Typography>
                <Typography variant="subtitle1" marginY={1}>
                  {campaignDetails.ShortDonationDescription}
                </Typography>
                <table>
                  <tbody>
                    {donationItems.map((donationItem, index) => (
                      <tr key={index}>
                        <td width={'100%'}>
                          <DonationRow donationItem={donationItem}></DonationRow>
                        </td>
                        <td style={{ paddingLeft: 16 }}>
                          <DonationPill campaign={campaignDetails} donationItem={donationItem}></DonationPill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            {isMobile && (
              <Typography component="div" sx={{ fontStyle: 'italic' }}>
                Long-press a line if you want to see the full item description / Eine Zeile lange drücken um die ganze Beschreibung zu sehen
              </Typography>
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
        &nbsp;
        {isMobile && PageConfiguration.AutoRefresh && <>&nbsp;</>}
        {donationItems.length > 0 && PageConfiguration.AutoRefresh && (
          <>
            <Typography component="div" sx={{ fontStyle: 'italic' }}>
              🇬🇧 The data is refreshed in the background about every {PageConfiguration.MaxDataAgeInMinutes} minutes - so your registered
              donation may take a few minutes until it is shown here.
              <br />
              🇩🇪 Die Daten werden ca. alle {PageConfiguration.MaxDataAgeInMinutes} Minuten im Hintergund aktualisiert - es kann also ein
              paar Minuten dauern bis Ihre Spendenregistrierung hier angezeiht wird.
            </Typography>
            &nbsp;
            <UpdateNote />
          </>
        )}
      </Container>
    </LayoutModule>
  );
};

export default CampaignDetailsModule;
