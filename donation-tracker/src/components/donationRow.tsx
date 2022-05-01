import { Box, Typography, LinearProgress } from '@mui/material';
import * as React from 'react';
import { DonationItem } from '../types/donationItem';

const DonationRow = ({ donationItem }: { donationItem: DonationItem }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography width="120">{donationItem.article} ({donationItem.neededOverall} {donationItem.unit})</Typography>
      <LinearProgress variant="determinate" value={(donationItem.alreadyDonated / donationItem.neededOverall) * 100} />
      <span>&nbsp;</span>
    </Box>
  );
};

export default DonationRow;
