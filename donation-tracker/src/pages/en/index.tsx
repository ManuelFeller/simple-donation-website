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

import LayoutModule, { emailShareLink } from '../../components/layout';
import PageMetadata from '../../components/pageMetadata';
import CampaignListing from '../../components/campaignListing';
import PageConfiguration from '../../config';
import UpdateNote from '../../components/updateNote';

const GetInContactLink = () => <a href={`mailto:${PageConfiguration.ImprintContact.ContactEmail}`}>{PageConfiguration.ImprintContact.ContactEmail}</a>;

const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <LayoutModule>
      <PageMetadata title="Welcome"></PageMetadata>
      &nbsp;
      <Container maxWidth="lg">
        <Card>
          <CardHeader title={PageConfiguration.pageTitle} subheader="How can we help people in Ukraine affected by war?"></CardHeader>
          <CardMedia>
            <StaticImage
              src="../../images/ehimetalor-akhere-unuabona-6hzWwYioEo4-unsplash.jpg"
              alt="'We Love Ukraine' Artwork by Ehimetalor Akhere Unuabona (unsplash)"
              placeholder="blurred"
              layout="fullWidth"
              //transformOptions={{ trim: 10 }}
              style={{ height: '430px' }}
            />
          </CardMedia>
        </Card>

        <Typography paragraph={true} sx={{ marginBlockStart: '1em' }}>
          As each day of the russian attack passes, more people in Ukraine are forced to leave their homes and continue to struggle with
          finding food, water, medical assistance, shelter, and covering their basic needs.
        </Typography>

        <Typography variant="body0" paragraph={true} sx={{ marginBlockEnd: 0 }}>
          With every donation you help people in Ukraine directly
        </Typography>
        <Typography variant="body0" paragraph={true} sx={{ marginBlockEnd: 0 }}>
          ????????
        </Typography>
        <Typography variant="body0" paragraph={true}>
          We are asking you to donate to the campaigns we organise. Every donation counts and helps the people in Ukraine fighting for their
          lives to protect the country they were born and raised in.
        </Typography>
        <Typography paragraph={true}>
          We get all the information about the actual needs and whom we could directly help and support from our friends in Ukraine who are
          also volunteering and trying to help there. We mainly engage in collecting humanitarian aid and bringing it where it is needed the
          most.
        </Typography>

        <Typography variant="h4" id="donation-in-kind">
          Donations in-kind
        </Typography>
        <Typography paragraph={true}>
          We regularly update our lists of needs based on information we receive from helpers in Ukraine and the progress of the campaigns.
        </Typography>
        <Typography paragraph={true}>Currently the most urgent needs for people within Ukraine are:</Typography>
        <CampaignListing campaignTypes={['civilianSupport', 'medicalSupport', 'civilianProtection']} statusType="running" />

        <Typography variant="h4" id="donations">
          Donations
        </Typography>
        <Typography paragraph={true}>
          Another way to help is by donating money for targeted needs of the people we know and trust.
        </Typography>
        <CampaignListing campaignTypes={['financialSupport']} statusType="running" />

        <Typography variant="h4" id="volunteer">
          Volunteer
        </Typography>
        <Typography paragraph={true}>
          If you want to help us, please get in touch via mail: <GetInContactLink />
        </Typography>
        <CampaignListing campaignTypes={['volunteering']} statusType="running" />

        <Typography variant="h4" id="successful-campaigns">
          Successful campaigns
        </Typography>
        <CampaignListing
          campaignTypes={['civilianSupport', 'medicalSupport', 'civilianProtection', 'financialSupport']}
          statusType="closed"
        />

        <Typography variant="h4" id="about-us">
          {t('menu.about')}
        </Typography>
        <Typography>????????????</Typography>
        <Typography paragraph={true}>
          We are a group of colleagues who work in Ingelheim, Germany. We joined our forces in April 2022 to actively support people in
          Ukraine affected by the russian invasion.
        </Typography>
        <Typography paragraph={true}>
          We have friends and family members in Ukraine so we are very well informed about the current situation and what is urgently
          needed. We collaborate privately to raise donations and send them to volunteers in Ukraine who deliver aid directly to people in
          need.
        </Typography>
        <Typography paragraph={true}>
          <MailIcon sx={{ width: 18, height: 18, marginRight: '8px', marginBottom: '-2px' }} />
          Get in touch: <GetInContactLink />
        </Typography>
        <Typography paragraph={true}>
          <ShareIcon sx={{ width: 18, height: 18, marginRight: '8px', marginBottom: '-4px' }} />
          <a href={emailShareLink()}>Spread the word</a>
        </Typography>
        <Typography paragraph={true}>
          <PolicyIcon sx={{ width: 18, height: 18, marginRight: '8px', marginBottom: '-3px' }} />
          <Link to="imprint">{t('imprint.pageTitle')}</Link>
        </Typography>
        <Typography paragraph={true} sx={{ marginBottom: 10 }}>
          <img width="18" height="18" src="/media/GitHub-Mark-32px.png" style={{ marginRight: '8px', marginBottom: '-2px' }} />
          Find our source code on <a href="https://github.com/ManuelFeller/simple-donation-website.git">GitHub</a>
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
