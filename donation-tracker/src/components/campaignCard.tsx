import * as React from 'react';
import { navigate } from 'gatsby';

import Card from '@mui/material/Card';
import { Avatar, Box, Button, CardActions, CardContent, CardMedia, Pagination, Typography } from '@mui/material';
import { green, blue, yellow, grey } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';

import { Campaign } from '../types/campaign';
import { DonationItem } from '../types/donationItem';
import DonationRow from './donationRow';
import DonationPill from './donationPill';
import { useTranslation } from 'react-i18next';

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

  const getAvatarForStatus = (status: 'collecting' | 'preparing' | 'transfer' | 'delivered' | 'closed') => {
    switch (status) {
      case 'collecting':
        return (
          <Avatar sx={{ bgcolor: green[200] }} aria-label="collecting / Sammeln" title="collecting / Sammeln">
            🛒
          </Avatar>
        );
      case 'preparing':
        return (
          <Avatar sx={{ bgcolor: blue[200] }} aria-label="preparation / Vorbereiten" title="preparation / Vorbereiten">
            📦
          </Avatar>
        );
      case 'transfer':
        return (
          <Avatar sx={{ bgcolor: blue[200] }} aria-label="delivering / Unterwegs" title="delivering / Unterwegs">
            🚚
          </Avatar>
        );
      case 'delivered':
        return (
          <Avatar sx={{ bgcolor: yellow[200] }} aria-label="delivered / Geliefert" title="delivered / Geliefert">
            🏁
          </Avatar>
        );
      case 'closed':
        return (
          <Avatar sx={{ bgcolor: grey[200] }} aria-label="finished / Abgeschlossen" title="finished / Abgeschlossen">
            🔒
          </Avatar>
        );
    }
  };

  const campaignDetailsUrl = '/initiatives/'.concat(campaign.UrlSlug, '/');

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
        subheader={campaign.ShortCampaignDescription}
        avatar={getAvatarForStatus(campaign.Status)}
      ></CardHeader>
      <CardMedia component="img" height="194" image={campaign.TitleImage} />
      <CardContent sx={{ flex: '1 0 auto', paddingBottom: 0 }}>
        {campaign.ShortDonationDescription && <Typography variant="body2">{campaign.ShortDonationDescription}</Typography>}
        {campaign.Status === 'collecting' ? (
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
      <CardActions>
        <Button sx={{ width: '100%' }} href={campaignDetailsUrl} onClick={event => handleClickOnLink(event, campaignDetailsUrl)}>
          {t('campaign.showDetails')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CampaignCard;
