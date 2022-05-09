import * as React from 'react';
import { navigate } from 'gatsby';

import Card from '@mui/material/Card';
import { Avatar, Box, Button, CardActions, CardContent, CardMedia, Pagination, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';

import { Campaign } from '../types/campaign';
import { DonationItem } from '../types/donationItem';
import DonationRow from './donationRow';
import DonationPill from './donationPill';
import { useTranslation } from 'react-i18next';
import CampaignAvatar from './campaignAvatar';

interface Props {
  campaign: Campaign;
  donationItems: DonationItem[];
}

const CampaignCard = ({ campaign, donationItems }: Props) => {
  const { t } = useTranslation();

  const handleClickOnLink = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink);
  };

  const getSubHeader = (campaign: Campaign) =>
    campaign.Status === 'collecting' && campaign.CollectionEndDate
      ? `Raising: transport on ${campaign.CollectionEndDate.toISOString().substring(0, 10)}`
      : campaign.ShortCampaignDescription;

  const campaignDetailsUrl = campaign.UrlSlug ? `/campaigns/${campaign.UrlSlug}/` : '';

  // Pagination and layout logic
  const itemsPerPage = 4;
  const pageCount = Math.ceil(donationItems.length / itemsPerPage);
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);
  const minRowHeight = 50;

  return (
    <Card sx={{ flex: '0 1 560px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={campaign.Title}
        subheader={getSubHeader(campaign)}
        avatar={<CampaignAvatar campaignType={campaign.CampaignType} title={campaign.Title} />}
      />
      {campaign.TitleImage && <CardMedia component="img" height="194" image={campaign.TitleImage} />}
      <CardContent sx={{ flex: '1 0 auto', paddingBottom: 0 }}>
        {campaign.ShortDonationDescription && <Typography variant="body2">{campaign.ShortDonationDescription}</Typography>}
        {campaign.Status === 'collecting' && donationItems.length > 0 ? (
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
        ) : (
          <div></div>
        )}
      </CardContent>
      {campaignDetailsUrl && (
        <CardActions>
          <Button sx={{ width: '100%' }} href={campaignDetailsUrl} onClick={event => handleClickOnLink(event, campaignDetailsUrl)}>
            {t('campaign.showDetails')}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CampaignCard;
