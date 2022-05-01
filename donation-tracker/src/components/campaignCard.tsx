import * as React from 'react';
import { navigate } from 'gatsby';

import Card from '@mui/material/Card';
import { Button, CardActions, CardContent, CardMedia, Typography, Avatar } from '@mui/material';
import { green, blue, yellow, grey } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';

import { Campaign } from '../types/campaign';
import { DonationItem } from '../types/donationItem';
import DonationRow from './donationRow';

interface Props {
  campaign: Campaign;
  donationItems: DonationItem[];
}

const CampaignCard = ({ campaign, donationItems }: Props) => {

  const handleClickOnLink = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink)
  };

  const getAvatarForStatus = (status: 'collecting' | 'preparing' | 'transfer' | 'delivered' | 'closed') => {
    switch (status) {
      case 'collecting':
        return (<Avatar sx={{ bgcolor: green[200] }} aria-label="collecting / Sammeln" title="collecting / Sammeln">🛒</Avatar>);
      case 'preparing':
        return (<Avatar sx={{ bgcolor: blue[200] }} aria-label="preparation / Vorbereiten" title="preparation / Vorbereiten">📦</Avatar>);
      case 'transfer':
        return (<Avatar sx={{ bgcolor: blue[200] }} aria-label="delivering / Unterwegs" title="delivering / Unterwegs">🚚</Avatar>);
      case 'delivered':
        return (<Avatar sx={{ bgcolor: yellow[200] }} aria-label="delivered / Geliefert" title="delivered / Geliefert">🏁</Avatar>);
      case 'closed':
        return (<Avatar sx={{ bgcolor: grey[200] }} aria-label="finished / Abgeschlossen" title="finished / Abgeschlossen">🔒</Avatar>);
    }
  };

  const campaignDetailsUrl = '/initiatives/'.concat(campaign.UrlSlug, '/')

  return (
    <Card elevation={4} sx={{ flex: '0 1 500px' }}>
      <CardHeader
        title={campaign.Title}
        subheader={campaign.ShortCampaignDescription}
        avatar={getAvatarForStatus(campaign.Status)}
      ></CardHeader>
      <CardMedia component="img" height="194" image={campaign.TitleImage} />
      <CardContent>
        {campaign.ShortDonationDescription && <Typography variant="body2">{campaign.ShortDonationDescription}</Typography>}
        {campaign.Status === 'collecting' ? (
          donationItems.map((donationItem, index) => <DonationRow donationItem={donationItem} key={index}></DonationRow>)
        ) : (
          <div></div>
        )}
      </CardContent>
      <CardActions>
        <Button
          sx={{ width: '100%' }}
          href={campaignDetailsUrl}
          onClick={(event) => handleClickOnLink(event, campaignDetailsUrl)}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};
/*
ToDo:
  - generate campaign cards here and link to generated detail pages in them
  - make sure we order by date (newest first)

<table>
  <tr>
    <th>Article / Artikel</th>
    <th>ck</th>
    <th>Needed / Benötigt</th>
    <th>Donated / Gespendet</th>
    <th>Remamining / Offen</th>
    <th>Unit / Einheit</th>
  </tr>
  {data.getAllItems().map((item) => (
    <tr>
      <td>{item.article}</td>
      <td>{item.campaignKey}</td>
      <td>{item.neededOverall}</td>
      <td>{item.alreadyDonated}</td>
      <td>{item.remainingNeed}</td>
      <td>{item.unit}</td>
    </tr>
  ))}
</table>
*/
export default CampaignCard;
