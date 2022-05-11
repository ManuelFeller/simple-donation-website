import * as React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import { CardMedia, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ShareIcon from '@mui/icons-material/Share';

import { StaticImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';

import LayoutModule, { emailShareLink } from '../components/layout';
import PageMetadata from '../components/pageMetadata';
import CampaignListing from '../components/campaignListing';
import PageConfiguration from '../config';
import UpdateNote from '../components/updateNote';

const GetInContactLink = () => <a href={PageConfiguration.ImprintContact.ContactEmail}>{PageConfiguration.ImprintContact.ContactEmail}</a>;

const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <LayoutModule>
      <PageMetadata title="Willkommen"></PageMetadata>
      &nbsp;
      <Container maxWidth="lg">
        <Card>
          <CardHeader title={PageConfiguration.pageTitle} subheader="How can we help people in Ukraine affected by war?"></CardHeader>
          <CardMedia>
            <StaticImage
              src="../images/ehimetalor-akhere-unuabona-6hzWwYioEo4-unsplash.jpg"
              alt="'We Love Ukraine' Artwork von Ehimetalor Akhere Unuabona (unsplash)"
              placeholder="blurred"
              layout="fullWidth"
              //transformOptions={{ trim: 10 }}
              style={{ height: '430px' }}
            />
          </CardMedia>
        </Card>

        <Typography paragraph={true} sx={{ marginBlockStart: '1em' }}>
          Mit jedem vergehenden Tag, an dem Russland angreift, sind mehr Menschen in der Ukraine gezwungen ihr Zuhause zu verlassen.
          Sie haben mehr und mehr Probleme Essen, Wasser, medizinische Hilfe und Schutz zu finden, ihre gundsätzlichen Bedürfnisse zu erfüllen.
        </Typography>

        <Typography variant="body0" paragraph={true} sx={{ marginBlockEnd: 0 }}>
          Mit jeder Spende helfen Sie direkt den Menschen in in der Ukraine
        </Typography>
        <Typography variant="body0" paragraph={true} sx={{ marginBlockEnd: 0 }}>
          💙💛
        </Typography>
        <Typography variant="body0" paragraph={true}>
          Wir bitten Sie bei den Kampagnen die wir organisieren zu spenden. Jede Spende zählt und hilft den Menschen in der Ukraine die dort
          um ihr Leben kämpfen um das Land zu beschützen in dem sie geboren und aufgewachsen sind.
        </Typography>
        <Typography paragraph={true}>
          Wir bekommen unsere Informationen darüber was und wem wir wie helfen können von unseren Freunden in der Ukraine die genau wie wir
          freiwillig arbeiten und vor Ort versuchen zu helfen. Wir engagieren uns primär in der Sammlung von humanitärer Hilfe und bringen
          die Spenden dorthin woe sie am dringensten benötigt werden.
        </Typography>

        <Typography variant="h4" id="donation-in-kind">
          Sachspenden
        </Typography>
        <Typography paragraph={true}>
          Wir aktualisieren unsere Listen regelmäßig auf Basis der Informationen die wir von den Helfern in der Ukraine erhalten ebenso wie des Forschritt der Kampagnen.
        </Typography>
        <Typography paragraph={true}>Currently the most urgent needs for people within Ukraine:</Typography>
        <CampaignListing campaignTypes={['civilianSupport', 'medicalSupport', 'civilianProtection']} statusType="running" />

        <Typography variant="h4" id="volunteer">
          Geldspenden
        </Typography>
        <Typography paragraph={true}>
          Ein anderer Weg zu helfen ist das Spenden von von Geld für festgelegte Bedarfe von menschen denen wir vertrauen.
        </Typography>
        <CampaignListing campaignTypes={['financialSupport']} statusType="running" />

        <Typography variant="h4" id="volunteer">
          Freiwillige
        </Typography>
        <Typography paragraph={true}>
          Wenn Sie uns bei unserer Arbeit helfen möchten kontaktieren Sie und bitte via Email: <GetInContactLink />
        </Typography>
        <CampaignListing campaignTypes={['volunteering']} statusType="running" />

        <Typography variant="h4" id="volunteer">
          Erfolgreiche Kampagnen
        </Typography>
        <CampaignListing
          campaignTypes={['civilianSupport', 'medicalSupport', 'civilianProtection', 'financialSupport']}
          statusType="closed"
        />

        <Typography variant="h4" id="about-us">
          {t('menu.about')}
        </Typography>
        <Typography>🚜💙💛</Typography>
        <Typography paragraph={true}>
          Wir sind eine Gruppe Kollegen die in einem Unternehmen in Ingelheim (Deutschland) arbeiten. Im April 2022 haben wir uns zusammengeschlossen
          um aktiv den Menschen in der Ukraine zu helfen die von der russischen Invasion betroffen sind.
        </Typography>
        <Typography paragraph={true}>
          Wir haben Frunde und Familie in der Ukraine und wissen daher gut was gebraucht wird. Wir kooperieren in unserer Freizeit um Spenden zu sammeln und 
          diese an freiwillige Helfer in der Ukraine zu liefern, die diese Hilfe dann direkt an Menschen in Not weiterreichen.
        </Typography>
        <Typography paragraph={true}>
          Kontaktieren Sie uns: <GetInContactLink />
        </Typography>
        <Typography paragraph={true} sx={{ display: 'flex' }}>
          <a href={emailShareLink()}>Teilen Sie diese Seite mit anderen</a>
          <ShareIcon />
        </Typography>
        <Typography sx={{ marginBottom: 10 }}>
          <a href="imprint">{t('imprint.pageTitle')}</a>
        </Typography>

        <UpdateNote />
      </Container>
    </LayoutModule>
  );
};

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
