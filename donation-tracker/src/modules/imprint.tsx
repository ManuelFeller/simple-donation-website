import * as React from 'react';
import LayoutModule from '../components/layout';
import PageConfiguration from '../config';

const ImprintModule = (props: any) => {
  // props.pageContext contains the context data from the gatsby-node page generation process
  return(
    <LayoutModule>
      <h1>Imprint / Impressum</h1>
      <h2>Contact Information / Kontakt Informationen</h2>
      <div>
        <div>{PageConfiguration.ImprintContact.NameOfResponsible}</div>
        <div>{PageConfiguration.ImprintContact.AddressLine1}</div>
        <div>{PageConfiguration.ImprintContact.AddressLine2}</div>
        <div>{PageConfiguration.ImprintContact.ZipCode}</div>
        <div>{PageConfiguration.ImprintContact.City}</div>
        <div>{PageConfiguration.ImprintContact.PhoneNumber}</div>
        <div>{PageConfiguration.ImprintContact.ContactEmail}</div>
      </div>
      <h2>Cookie Policy</h2>
      <div>
        🇬🇧 This page does not use any cookies.<br/>
        We only cache the data what is asked to be donated in the browsers local storage (variable name 'donationCache') and never transmit this information to anywhere. To delete this cache you need to clear your browsers local storage for this website.
      </div>
      <div>
        🇩🇪 Diese Seite nutzt keine Cookies.<br/>
        Wir speichern die Daten was gespendet werden kann im so genannten Local Storage des Browsers zwischen (Variablenname 'donationCache') und übertragen diese Information niemals irgendwo hin. Um diesen Zwischenspeicher zu löschen müssen sie den Local Storage für diese Seite in Ihrem Browser zurücksetzten.
      </div>
      <h2>Data Privacy / Datenschutz</h2>
      <div>
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
      </div>
      <div>
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
      </div>

    </LayoutModule>
  );
}

export default ImprintModule;