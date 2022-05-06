import * as React from 'react';

import { Card, CardContent, CardHeader } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LayoutModule from '../components/layout';
import PageMetadata from '../components/pageMetadata';

const AboutModule = () => {
  return (
    <LayoutModule>
      <PageMetadata title="About us / Über uns"></PageMetadata>
      &nbsp;
      <Container maxWidth="lg">
        <Card>
          <CardHeader title="🇬🇧 What is this about?" />
          <CardContent>
            <Typography variant="body1">
              We are a group of employees at a company in Ingelheim that have friends and family from or in the Ukraine. Because of that we
              know very well what is needed where right now, and that is why we are organizing donation campaigns.
              <br />
              The main goal of this website is to allow all our colleagues to do coordinated donations while being updated about the
              progress - without the need of access to the company intranet. This also allows friends and families of them to participate,
              if they want. Details what is needed and how you can send it to us so that we can forward it to the people in need are
              available in the details of the individual campaigns.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{marginTop: 2}}>
          <CardHeader title="🇩🇪 Worum geht es hier?" />
          <CardContent>
            <Typography variant="body1">
              Wir sind eine Gruppe von Mitarbeitern eines Ingelheimer Unternehmens, die Freunde und Familie in oder aus der Ukraine haben.
              Aus diesem Grund wissen wir recht gut, was gerade wo benötigt wird, und haben wir uns entschlossen, diese Spenden-Kampagnen
              durchzuführen.
              <br />
              Das Haupt-Ziel dieser Webseite ist es unseren Kollegen das koordinierte Spenden zu ermöglichen und über den Fortschritt
              informiert zu bleiben - ohne auf das Firmen-Intranet zugreifen zu müssen. Das ermöglicht dann auch deren Familien und Freunden
              teilzunehmen, wenn diese das möchten.
              <br />
              Details was benötigt wird und wie man uns Spenden zukommen lassen kann, so dass wir diese weiterleiten können, ist in den
              Details der einzelnen Kampagnen aufgeführt.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </LayoutModule>
  );
};

export default AboutModule;
