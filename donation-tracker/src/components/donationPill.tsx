import * as React from 'react';

import { Typography } from '@mui/material';

import { DonationItem } from '../types/donationItem';

const DonationPill = ({ donationItem }: { donationItem: DonationItem }) => {
  return (
    <Typography
      fontSize="12px"
      fontWeight="bold"
      px={1}
      py={0.5}
      whiteSpace="nowrap"
      sx={{ backgroundColor: donationItem.remainingNeed ? 'rgba(25,118,210,0.1)' : 'rgba(0,255,0,0.25)' }}
      color={donationItem.remainingNeed ? 'rgba(25,118,210,0.75)' : 'rgba(0,164,0,0.75)'}
      border={`2px solid ${donationItem.remainingNeed ? 'rgba(25,118,210,0.75)' : 'rgba(0,164,0,0.75)'}`}
      borderRadius={5}
      textTransform="uppercase"
      component="div"
    >
      {donationItem.remainingNeed ? `Need + ${donationItem.remainingNeed}` : 'Complete'}
    </Typography>
  );
};

export default DonationPill;
