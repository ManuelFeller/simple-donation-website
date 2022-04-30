import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LayoutModule from '../components/layout';
import PageConfiguration from '../config';

const CampaignOverviewModule = (props: any) => {
  return (
    <LayoutModule>
      <Container maxWidth="lg">
        &nbsp;
        <Typography variant="h2" component="h1">Campaigns / Sammlungen</Typography>
        
        <Typography component="div">coming soon(ish)</Typography>
      </Container>
      {/* ToDo:
        - generate campaign cards here and link to generated detail pages in them
        - make sure we order by date (newest first)
      */}
    </LayoutModule>
  );
}

export default CampaignOverviewModule;
