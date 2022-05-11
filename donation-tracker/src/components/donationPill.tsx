import * as React from 'react';
import { useTranslation, I18nextContext } from 'gatsby-plugin-react-i18next';
import { Button } from '@mui/material';

import { DonationItem } from '../types/donationItem';
import { Campaign } from '../types/campaign';

const DonationPill = ({ campaign, donationItem }: { donationItem: DonationItem; campaign: Campaign }) => {
  const { t } = useTranslation();
  const langContext = React.useContext(I18nextContext);
  return donationItem.remainingNeed ? (
    <Button
      href={donationItem.formLink[langContext.language]!}
      target="_blank"
      variant="contained"
      sx={{
        fontWeight: 'bold',
        justifyContent: 'center',
        width: '100%',
        whiteSpace: 'nowrap',
      }}
    >
      {t('campaign.donate')}
    </Button>
  ) : (
    <Button
      href={donationItem.formLink[langContext.language]!}
      target="_blank"
      variant="outlined"
      color="success"
      sx={{
        justifyContent: 'center',
        width: '100%',
        whiteSpace: 'nowrap',
      }}
    >
      {t('campaign.complete')}
    </Button>
  );
};

export default DonationPill;
