import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { DonationItem } from '../types/donationItem';

const DonationRow = ({ donationItem }: { donationItem: DonationItem }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography width="120">{donationItem.article}</Typography>
      <Typography width="120">
        {donationItem.alreadyDonated} / {donationItem.neededOverall}
      </Typography>
    </Box>
  );
};

export default DonationRow;
