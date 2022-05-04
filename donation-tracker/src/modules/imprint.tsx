import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LayoutModule from '../components/layout';
import PageConfiguration from '../config';
import PageMetadata from '../components/pageMetadata';

const ImprintModule = (props: any) => {
  // props.pageContext contains the context data from the gatsby-node page generation process
  return(
    <LayoutModule>
      <PageMetadata title="Imprint / Impressum"></PageMetadata>
      &nbsp;
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1"></Typography>
        <Card elevation={4} sx={{ minWidth: 275 }}>
          <CardHeader
            title="Imprint / Impressum"
            subheader="Contact as required by TMG § 5 / Kontakt gem. TMG § 5"
          />
          <CardContent>
            <Typography component="div">{PageConfiguration.ImprintContact.NameOfResponsible}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.AddressLine1}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.AddressLine2}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.ZipCode}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.City}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.PhoneNumber}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.ContactEmail}</Typography>
          </CardContent>
        </Card>
        &nbsp;
        <Card elevation={4} sx={{ minWidth: 275 }}>
          <CardHeader title="Cookie Policy" />
          <CardContent>
            <Typography component="div">
              <strong>🇬🇧 This page does not use any cookies.</strong><br/>
              We only cache the data what is asked to be donated in the browsers local storage (variable name <code>donationCache</code>) and never transmit this information to anywhere. To delete this cache you need to clear your browsers local storage for this website.
            </Typography>
            &nbsp;
            <Typography component="div">
              <strong>🇩🇪 Diese Seite nutzt keine Cookies.</strong><br/>
              Wir speichern die Daten was gespendet werden kann im so genannten Local Storage des Browsers zwischen (Variablenname <code>donationCache</code>) und übertragen diese Information niemals irgendwo hin. Um diesen Zwischenspeicher zu löschen müssen sie den Local Storage für diese Seite in Ihrem Browser zurücksetzten.
            </Typography>
          </CardContent>
        </Card>
        &nbsp;
        <Card elevation={4} sx={{ minWidth: 275 }}>
          <CardHeader title="Data Privacy / Datenschutz" />
          <CardContent>
            <Typography component="div">
              🇬🇧 We use services from Google (Google Forms &amp; Google Spreadsheets) to manage the information about what things are needed and for the recording of what was already donated.<br/>
              This means that Google will receive your IP address and process the data you enter in the forms that are linked on this page.<br/>
              We do not require any sign in to fill out the forms, so you can do so anonymously via a private browser window.<br/>
              To delete your entered data after you submitted it we need the following:
              <ul>
                <li>
                  URL of the form you filled
                </li>
                <li>
                  date and time ouf the form submission
                </li>
                <li>
                  the data that was entered
                </li>
              </ul>
              We need the details what you entered to make sure that we remove the correct dataset - as we have no way to identify who submitted what any other way.<br/>
              Please send your request to {PageConfiguration.ImprintContact.PrivacyEmail}.
            </Typography>
            &nbsp;
            <Typography component="div">
              🇩🇪 Wir nutzen Google Dienste (Google Forms &amp; Google Spreadsheets) um die Informationen was benötigt wird und was schon gespendet wurde zu verwalten.<br/>
              Das bedeutet das Google Ihre IP Adresse erhält und auch alle Eingaben in die verlinkten Formulare verarbeitet.<br/>
              Wir erfordern keinen Login um die Formulare auszufüllen, daher können sie die anonym bleiben indem Sie ein privates Browserfenster zum Ausfüllen benutzen.<br/>
              Um Ihre eingegebenen Daten zu löschen nachdem Sie diese übermittelt haben benötigen wir folgendes:
              <ul>
                <li>
                  die URL des ausgefüllten Formular
                </li>
                <li>
                  Datum und Zeit der Übermittlung
                </li>
                <li>
                  die Daten die Sie übermittelt haben
                </li>
              </ul>
              Wir benötigen die übermittelten Daten in der Anfrage um den Datensatz eindeutig zu identifizieren - weil wir keine andere Möglichkeit haben einduetig herauszufinden wer was übermittelt hat.<br/>
              Bitte senden Sie die Anfrage an {PageConfiguration.ImprintContact.PrivacyEmail}.
            </Typography>
          </CardContent>
        </Card>
        &nbsp;
      </Container>
    </LayoutModule>
  );
}

export default ImprintModule;
