import * as React from 'react';

import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { StaticImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';

import { CardMedia, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import MailIcon from '@mui/icons-material/Mail';
import PolicyIcon from '@mui/icons-material/Policy';
import ShareIcon from '@mui/icons-material/Share';

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
          <CardHeader
            title={PageConfiguration.pageTitle}
            subheader="Wie können wir den vom Krieg betroffenen Menschen in der Ukraine helfen?"
          ></CardHeader>
          <CardMedia>
            <StaticImage
              src="../images/ehimetalor-akhere-unuabona-6hzWwYioEo4-unsplash.jpg"
              alt="'We Love Ukraine' Artwork von Ehimetalor Akhere Unuabona (unsplash)"
              placeholder="blurred"
              layout="fullWidth"
              style={{ height: '430px' }}
            />
          </CardMedia>
        </Card>

        <Typography paragraph={true} sx={{ marginBlockStart: '1em' }}>
          Mit jedem weiteren Tag, an dem Russland angreift, sind mehr Menschen in der Ukraine gezwungen, ihr Zuhause zu verlassen. Sie haben
          zunehmend Probleme, Essen, Wasser, medizinische Hilfe und Schutz zu finden und ihre Grundbedürfnisse zu erfüllen.
        </Typography>

        <Typography variant="body0" paragraph={true} sx={{ marginBlockEnd: 0 }}>
          Mit jeder Spende helfen Sie den Menschen in der Ukraine direkt
        </Typography>
        <Typography variant="body0" paragraph={true} sx={{ marginBlockEnd: 0 }}>
          💙💛
        </Typography>
        <Typography variant="body0" paragraph={true}>
          Wir bitten Sie, bei den Kampagnen, die wir organisieren, zu spenden. Jede Spende zählt und hilft den Menschen in der Ukraine, die
          dort um ihr Leben kämpfen, um das Land zu beschützen, in dem sie geboren und aufgewachsen sind.
        </Typography>
        <Typography paragraph={true}>
          Wir bekommen unsere Informationen darüber, was und wem wir wie helfen können von unseren Freunden in der Ukraine, die genau wie
          wir freiwillig arbeiten und vor Ort versuchen zu helfen. Wir engagieren uns primär in der Sammlung von humanitärer Hilfe und
          bringen die Spenden dorthin, wo sie am dringensten benötigt werden.
        </Typography>

        <Typography variant="h4" id="donation-in-kind">
          Sachspenden
        </Typography>
        <Typography paragraph={true}>
          Wir aktualisieren unsere Listen regelmäßig auf Basis der Informationen, die wir von den Helfern in der Ukraine erhalten, ebenso
          wie den Forschritt der Kampagnen.
        </Typography>
        <Typography paragraph={true}>Die aktuell dringendsten Bedürfnisse für Menschen in der Ukraine:</Typography>
        <CampaignListing campaignTypes={['civilianSupport', 'medicalSupport', 'civilianProtection']} statusType="running" />

        <Typography variant="h4" id="donations">
          Geldspenden
        </Typography>
        <Typography paragraph={true}>
          Ein anderer Weg zu helfen ist das Spenden von Geld für festgelegte Bedarfe von Menschen, denen wir vertrauen.
        </Typography>
        <CampaignListing campaignTypes={['financialSupport']} statusType="running" />

        <Typography variant="h4" id="volunteer">
          Freiwillige
        </Typography>
        <Typography paragraph={true}>
          Wenn Sie uns bei unserer Arbeit helfen möchten, kontaktieren Sie uns bitte via E-Mail: <GetInContactLink />
        </Typography>
        <CampaignListing campaignTypes={['volunteering']} statusType="running" />

        <Typography variant="h4" id="successful-campaigns">
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
          Wir sind eine Gruppe von Kollegen, die in einem Unternehmen in Ingelheim (Deutschland) arbeiten. Im April 2022 haben wir uns
          zusammengeschlossen, um aktiv den Menschen in der Ukraine zu helfen, die von der russischen Invasion betroffen sind.
        </Typography>
        <Typography paragraph={true}>
          Wir haben Freunde und Familie in der Ukraine und wissen daher gut, was gebraucht wird. Wir wirken in unserer Freizeit zusammen, um
          Spenden zu sammeln und diese an freiwillige Helfer in der Ukraine zu liefern, die diese Hilfe dann direkt an Menschen in Not
          weiterreichen.
        </Typography>
        <Typography paragraph={true}>
          <MailIcon sx={{ width: 18, height: 18, marginRight: '8px', marginBottom: '-2px' }} />
          Kontaktieren Sie uns: <GetInContactLink />
        </Typography>
        <Typography paragraph={true}>
          <ShareIcon sx={{ width: 18, height: 18, marginRight: '8px', marginBottom: '-4px' }} />
          <a href={emailShareLink()}>Teilen Sie diese Seite mit anderen</a>
        </Typography>
        <Typography paragraph={true}>
          <PolicyIcon sx={{ width: 18, height: 18, marginRight: '8px', marginBottom: '-3px' }} />
          <Link to="imprint">{t('imprint.pageTitle')}</Link>
        </Typography>
        <Typography paragraph={true} sx={{ marginBottom: 10 }}>
          <img width="18" height="18" src="/media/GitHub-Mark-32px.png" style={{ marginRight: '8px', marginBottom: '-2px' }} />
          Unser Quellcode auf <a href="https://github.com/ManuelFeller/simple-donation-website.git">GitHub</a>
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
