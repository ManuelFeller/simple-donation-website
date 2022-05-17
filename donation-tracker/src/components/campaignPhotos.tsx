import React from 'react';

import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

interface Props {
  imageFiles: string[];
  big?: boolean;
}

const CampaignPhotos = ({ imageFiles, big }: Props) => {
  return (
    <Box display="flex">
      {imageFiles.map((file, index) => (
        <CardMedia
          key={file}
          component="img"
          image={file}
          sx={{
            marginLeft: index > 0 ? 1 : 2,
            marginRight: index < imageFiles.length - 1 ? 1 : 2,
            marginBottom: 2,
            maxWidth: imageFiles.length > 1 ? `calc((100% - ${8 + 16 * imageFiles.length + 8}px) / ${imageFiles.length})` : undefined,
            maxHeight: big ? undefined : '360px',
          }}
        />
      ))}
    </Box>
  );
};

export default CampaignPhotos;
