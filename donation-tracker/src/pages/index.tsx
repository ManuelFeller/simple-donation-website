import * as React from 'react';
import LayoutModule from '../components/layout';

import { Button, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const IndexPage = () => {

  const handleClickOnLink = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink)
  };

  return <LayoutModule>
    &nbsp;
    <Container maxWidth="lg">
      <Card elevation={4} sx={{ flex: '0 1 500px', display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          title="How can we help people in Ukraine? / Wie können wir Menschen in der Ukraine helfen?"
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
          <Typography component="div">
            🇬🇧 We are a group of employees at a company in Ingelheim that have friends and family from or in the Ukraine.
            Because of that we know very well what is needed where right now, and that is why we are organizing donation campaigns.<br/>
            The main goal of this website is to allow all our colleagues to do coordinated donations while being updated about the progress
            - without the need of access to the company intranet. This also allows friends and families of them to participate if they want.<br/>
            Details what is needed and how you can send it to us (so that we can forward it to the people in need) are available in the details of the individual campaigns.
          </Typography>
          &nbsp;
          <Typography component="div">
            Please understand that we are only publishing limited information about our identities.
            Even if we hope that this will feel like a bad dream tomorrow we want to make sure that - in case of an escalation - we don't get in trouble for helping.
            Or that we get threatened or similar things because some people disagree with this activity.
          </Typography>
          &nbsp;
          <Typography component="div">
            🇩🇪 Wir sind eine Gruppe von Mitarbeitern eines Unternehmen in Ingelheim die Freunde und Familie in oder aus der Ukraine haben.
            Aus diesem Grund wissen wir recht genau was gerade wo benötigt wird, und das ist der Grund warum wir Spenden-Kampagnen durchführen.<br/>
            Das Haupt-Ziel dieser Webseite ist unseren Kollegen zu ermöglichen koordiniert zu spenden und über den Fortschritt informiert zu bleiben
            - ohne auf das Firmen-Intranet zugreifen zu müssen. Das ermöglicht dann auch deren Familien und Freunden teilzunehmen (wenn diese das möchten).<br/>
            Details was benötigt wird und wie man uns Spenden zukommen lassen kann (so das wir das wiederum weiterleiten können) ist in den Details der einzelnen Kampagnen aufgeführt.
          </Typography>
          &nbsp;
          <Typography component="div">
            Bitte haben Sie Verständnis das wir hier nur begrenzt Informationen über unsere Identität veröffentlichen.
            Auch wenn wir hoffen das morgen alles wie ein böser Traum wirkt möchten wir dennoch verhindern das wir bei einer Eskalation
            durch unsere Hilfe Probleme bekommen. Oder durch Gegner solcher Tätigkeiten gefährdet oder ähnliches werden.
          </Typography>
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
    </Container>
  </LayoutModule>;
};

export default IndexPage;
