import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { navigate } from 'gatsby';

import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Pagination, Typography } from '@mui/material';

import { Campaign } from '../types/campaign';
import { DonationItem } from '../types/donationItem';
import DonationRow from './donationRow';
import DonationPill from './donationPill';
import CampaignAvatar from './campaignAvatar';

interface Props {
  campaign: Campaign;
  donationItems: DonationItem[];
  big: boolean;
}

const CampaignCard = ({ campaign, donationItems, big }: Props) => {
  const { t } = useTranslation();

  const handleClickOnLink = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink);
  };

  const getSubHeader = (campaign: Campaign) =>
    campaign.Status === 'collecting' && campaign.CollectionEndDate
      ? `Raising: transport on ${campaign.CollectionEndDate.toISOString().substring(0, 10)}`
      : campaign.Status === 'closed'
      ? '🎉   Successfully delivered'
      : campaign.ShortCampaignDescription;

  const campaignDetailsUrl = campaign.UrlSlug ? `/campaigns/${campaign.UrlSlug}/` : '';

  // Pagination and layout logic
  const itemsPerPage = 4;
  const pageCount = Math.ceil(donationItems.length / itemsPerPage);
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);
  const minRowHeight = 50;

  return (
    <Card sx={{ flex: big ? '0 1 1152px' : '0 1 560px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={campaign.Title}
        subheader={getSubHeader(campaign)}
        avatar={<CampaignAvatar campaignType={campaign.CampaignType} title={campaign.Title} />}
      />
      {campaign.TitleImage && <CardMedia component="img" height="194" image={campaign.TitleImage} />}
      {campaign.Photos?.length > 0 && (
        <Box display="flex">
          {campaign.Photos.map((file, index) => (
            <CardMedia
              key={file}
              component="img"
              image={file}
              sx={{ marginLeft: index > 0 ? 1 : 2, marginRight: index < campaign.Photos.length - 1 ? 1 : 2, marginBottom: 2 }}
            />
          ))}
        </Box>
      )}
      {(campaign.ShortDonationDescription || (campaign.Status === 'collecting' && donationItems.length > 0)) && (
        <CardContent sx={{ flex: '1 0 auto', paddingBottom: 0 }}>
          {campaign.ShortDonationDescription && <Typography variant="body2">{campaign.ShortDonationDescription}</Typography>}
          {campaign.Status === 'collecting' && donationItems.length > 0 && (
            <Box display="flex" flexDirection="column" mt={1}>
              <table style={{ minHeight: minRowHeight * itemsPerPage, borderSpacing: 0 }}>
                <tbody>
                  {donationItems
                    .map((donationItem, index) => ({ donationItem, index }))
                    .filter(({ index }) => (page - 1) * itemsPerPage <= index && index < page * itemsPerPage)
                    .map(({ donationItem, index }) => (
                      <tr key={index} style={{ verticalAlign: 'top' }}>
                        <td width={'100%'}>
                          <DonationRow donationItem={donationItem}></DonationRow>
                        </td>
                        <td style={{ paddingLeft: 12, paddingTop: 8 }}>
                          <DonationPill campaign={campaign} donationItem={donationItem}></DonationPill>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {pageCount > 1 && (
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handleChange}
                  size="small"
                  sx={{ display: 'flex', flex: '1 0 auto', alignSelf: 'flex-start' }}
                />
              )}
            </Box>
          )}
        </CardContent>
      )}
      {campaignDetailsUrl && (
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" href={campaignDetailsUrl} onClick={event => handleClickOnLink(event, campaignDetailsUrl)}>
            {t('campaign.showDetails')}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CampaignCard;
