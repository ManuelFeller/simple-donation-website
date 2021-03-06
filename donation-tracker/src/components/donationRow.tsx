import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { I18nextContext } from 'gatsby-plugin-react-i18next';
import { Box, Typography, LinearProgress, styled, linearProgressClasses, Tooltip } from '@mui/material';

import { DonationItem } from '../types/donationItem';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.determinate}`]: { backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800] },
  [`& .${linearProgressClasses.bar}`]: { borderRadius: 5, transition: 'transform .2s linear' },
}));

const DonationRow = ({ donationItem }: { donationItem: DonationItem }) => {
  const langContext = React.useContext(I18nextContext);
  return (
    <Box position="relative" height="46px">
      <Tooltip disableHoverListener={!isMobile} arrow title={donationItem.article[langContext.language]} placement="top">
        <Box position="absolute" top="4px" left="0" right="0" display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row">
            <Typography sx={{ flex: '1 1 auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {donationItem.article[langContext.language]}
            </Typography>
            <Typography ml={1} whiteSpace="nowrap">
              {donationItem.alreadyDonated} / {donationItem.neededOverall} {donationItem.unit[langContext.language]}
            </Typography>
          </Box>
          <BorderLinearProgress
            color="success"
            variant="determinate"
            value={(donationItem.alreadyDonated / donationItem.neededOverall) * 100}
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default DonationRow;
