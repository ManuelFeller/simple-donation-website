import * as React from 'react';

import { Button } from '@mui/material';

import { DonationItem } from '../types/donationItem';
import { Campaign } from '../types/campaign';
import { useTranslation } from 'react-i18next';

const DonationPill = ({ campaign, donationItem }: { donationItem: DonationItem; campaign: Campaign }) => {
  const { t } = useTranslation();
  return donationItem.remainingNeed ? (
    <Button
      href={campaign.RegistrationFormUrl!}
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
      href={campaign.RegistrationFormUrl!}
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
