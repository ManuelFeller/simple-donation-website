import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation, useI18next, I18nextContext, Trans } from 'gatsby-plugin-react-i18next';

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
import { getCampaignTitle, getCampaignShortCampaignDescription, getCampaignShortDonationDescription } from '../utils/campaign';

const CampaignDetailsModule = (props: { campaignKey: string; children: any }) => {
  const { navigate } = useI18next();
  const { t } = useTranslation();
  const langContext = React.useContext(I18nextContext);

  // get the data store object
  let data = DataStore.getInstance();

  const handleClickOnLink = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink);
  };

  const campaign: Campaign = PageConfiguration.CampaignDetails.find(campaignDetail => campaignDetail.Key === props.campaignKey) ?? {
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
  const title = getCampaignTitle(campaign, langContext.language);
  const shortCampaignDescription = getCampaignShortCampaignDescription(campaign, langContext.language);
  const shortDonationDescription = getCampaignShortDonationDescription(campaign, langContext.language);

  const donationItems = data.getItemsForCampaign(campaign.Key);

  return (
    <LayoutModule>
      <PageMetadata title={title}></PageMetadata>
      <Container maxWidth="lg">
        <Box marginY={2}>
          <Button href={'/'} onClick={event => handleClickOnLink(event, '/')}>
            <ChevronLeft /> {t('campaigns.details.goBackButton')}
          </Button>
        </Box>
        <Card sx={{ flex: '0 1 500px', display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            title={title}
            subheader={shortCampaignDescription}
            avatar={<CampaignAvatar campaignType={campaign.CampaignType} title={title} />}
          />
          {campaign.TitleImage && <CardMedia component="img" height="194" image={campaign.TitleImage} />}
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" marginY={2}>
              {props.children}
            </Typography>
            {donationItems.length > 0 && (
              <>
                <Typography variant="h6" mt={2}>
                  {t('campaigns.details.donations')}
                </Typography>
                <Typography variant="subtitle1" marginY={1}>
                  {shortDonationDescription}
                </Typography>
                <table>
                  <tbody>
                    {donationItems.map((donationItem, index) => (
                      <tr key={index}>
                        <td width={'100%'}>
                          <DonationRow donationItem={donationItem}></DonationRow>
                        </td>
                        <td style={{ paddingLeft: 16 }}>
                          <DonationPill campaign={campaign} donationItem={donationItem}></DonationPill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            {(isMobile && donationItems.length > 0) && (
              <Typography component="div" sx={{ fontStyle: 'italic' }}>
                {t('campaigns.details.mobileTooltipHint')}
              </Typography>
            )}
          </CardContent>
          {campaign.RegistrationFormUrl && (
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button variant="contained" href={campaign.RegistrationFormUrl} target="_blank">
                {t('campaigns.details.registerDonationButton')}
              </Button>
            </CardActions>
          )}
        </Card>
        &nbsp;
        {isMobile && PageConfiguration.AutoRefresh && <>&nbsp;</>}
        {donationItems.length > 0 && PageConfiguration.AutoRefresh && (
          <>
            <Typography component="div" sx={{ fontStyle: 'italic' }}>
              <Trans i18nKey="campaigns.details.dataRefreshInfo" values={{refreshMinutes: PageConfiguration.MaxDataAgeInMinutes}}>...</Trans>
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
