import * as React from 'react';

import { Button } from '@mui/material';

import { DonationItem } from '../types/donationItem';
import { Campaign } from '../types/campaign';

const DonationPill = ({ campaign, donationItem }: { donationItem: DonationItem; campaign: Campaign }) => {
  return (
    <Button
      href={campaign.RegistrationFormUrl}
      target="_blank"
      variant="outlined"
      sx={{
        borderRadius: 5,
        backgroundColor: donationItem.remainingNeed ? 'rgba(25,118,210,0.1)' : 'rgba(0,255,0,0.25)',
        border: `2px solid ${donationItem.remainingNeed ? 'rgba(25,118,210,0.75)' : 'rgba(0,164,0,0.75)'}`,
        color: donationItem.remainingNeed ? 'rgba(25,118,210,0.75)' : 'rgba(0,164,0,0.75)',
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        lineHeight: 1.2,
        width: '100%',
        whiteSpace: 'nowrap',
        ':hover': {
          border: `2px solid ${donationItem.remainingNeed ? 'rgba(25,118,210,0.75)' : 'rgba(0,164,0,0.75)'}`,
        },
      }}
    >
      {donationItem.remainingNeed ? `Need + ${donationItem.remainingNeed}` : 'Complete'}
    </Button>
  );
};

export default DonationPill;
