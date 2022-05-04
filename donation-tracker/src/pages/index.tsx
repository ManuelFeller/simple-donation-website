import * as React from 'react';
import LayoutModule from '../components/layout';

import { Button, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import PageMetadata from '../components/pageMetadata';

const IndexPage = () => {

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleClickOnLink = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink)
  };

  return <LayoutModule>
    <PageMetadata title="Welcome / Willkommen"></PageMetadata>
    &nbsp;
    <Container maxWidth="lg">
      <Card elevation={4} sx={{ flex: '0 1 500px', display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          title="#StandWithUkraine"
          subheader="What is this about? / Worum geht es hier?"
        ></CardHeader>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <StaticImage
            src="../images/tim-mossholder-BQa--UCtFqg-unsplash_trimmed.jpg"
            alt="Ukraine Flag Artwork by Tim Mossholder (unsplash)"
            placeholder="blurred"
            layout="fullWidth"
            transformOptions={{trim: 20}}
          />
          &nbsp;
          <Accordion elevation={4} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '40px', flexShrink: 0 }} variant="h5" component="div">
                🇬🇧
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {expanded !== 'panel1' && <>
                  We are a group of employees at a company in Ingelheim that have friends and family from or in the Ukraine <i>... expand to read more</i>
                </>}
                {expanded === 'panel1' && <>
                  What is this about?
                </>}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We are a group of employees at a company in Ingelheim that have friends and family from or in the Ukraine.
                Because of that we know very well what is needed where right now, and that is why we are organizing donation campaigns.<br/>
                The main goal of this website is to allow all our colleagues to do coordinated donations while being updated about the progress
                - without the need of access to the company intranet. This also allows friends and families of them to participate if they want.
                Details what is needed and how you can send it to us (so that we can forward it to the people in need) are available in the details of the individual campaigns.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion elevation={4} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '40px', flexShrink: 0 }} variant="h5" component="div">
                🇩🇪
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {expanded !== 'panel2' && <>
                  Wir sind eine Gruppe von Mitarbeitern eines Unternehmen in Ingelheim die Freunde und Familie in oder aus der Ukraine haben <i>... ausklappen für mehr</i>
                </>}
                {expanded === 'panel2' && <>
                  Worum geht es hier?
                </>}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Wir sind eine Gruppe von Mitarbeitern eines Unternehmen in Ingelheim die Freunde und Familie in oder aus der Ukraine haben.
                Aus diesem Grund wissen wir recht genau was gerade wo benötigt wird, und das ist der Grund warum wir Spenden-Kampagnen durchführen.<br/>
                Das Haupt-Ziel dieser Webseite ist unseren Kollegen zu ermöglichen koordiniert zu spenden und über den Fortschritt informiert zu bleiben
                - ohne auf das Firmen-Intranet zugreifen zu müssen. Das ermöglicht dann auch deren Familien und Freunden teilzunehmen (wenn diese das möchten).<br/>
                Details was benötigt wird und wie man uns Spenden zukommen lassen kann (so das wir das wiederum weiterleiten können) ist in den Details der einzelnen Kampagnen aufgeführt.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <CardActions>
          <Button
            sx={{ width: '100%' }}
            href={'/campaigns/'}
            onClick={(event) => handleClickOnLink(event, '/campaigns/')}
          >
            Open the campaign overview / Die Kampagnen-Übersicht öffnen
          </Button>
        </CardActions>
      </Card>
      &nbsp;
    </Container>
  </LayoutModule>;
};

export default IndexPage;
