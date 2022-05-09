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
import PageConfiguration from '../config.template';

interface Props {
  campaign: Campaign;
  donationItems: DonationItem[];
}

const campaignCardMap: { [campaignType in Campaign['CampaignType']]: string } = {
  civilianSupport: 'media/campaign-types/9203968_ukraine_of_spikelet_wheat.svg',
  medicalSupport: 'media/campaign-types/9203976_field_care_medical_hospital_military.svg',
  civilianProtection: 'media/campaign-types/9203979_war_mobilization_soldier_father_child_mother_family.svg',
  financialSupport: 'media/campaign-types/9153349_free_icons_design_ukraine_nation_country_love_heart.svg',
  generalSupport: 'media/campaign-types/9153349_free_icons_design_ukraine_nation_country_love_heart.svg',
  volunteering: 'media/campaign-types/9153349_free_icons_design_ukraine_nation_country_love_heart.svg',
};

const CampaignCard = ({ campaign, donationItems }: Props) => {
  const { t } = useTranslation();

  const handleClickOnLink = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink);
  };

  const getAvatarForCampaign = ({ CampaignType: campaignType, Title: title }: Campaign) => (
    <Avatar variant="square" aria-label={title} title={title} src={campaignCardMap[campaignType]}></Avatar>
  );

  const getSubHeader = (campaign: Campaign) =>
    campaign.Status === 'collecting' && campaign.CollectionEndDate
      ? `Raising: transport on ${campaign.CollectionEndDate.toISOString().substring(0, 10)}`
      : campaign.ShortCampaignDescription;

  const campaignDetailsUrl = '/campaigns/'.concat(campaign.UrlSlug, '/');

  // Pagination and layout logic
  const itemsPerPage = 4;
  const pageCount = Math.ceil(donationItems.length / itemsPerPage);
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);
  const minRowHeight = 50;

  return (
    <Card sx={{ flex: '0 1 560px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title={campaign.Title} subheader={getSubHeader(campaign)} avatar={getAvatarForCampaign(campaign)}></CardHeader>
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
