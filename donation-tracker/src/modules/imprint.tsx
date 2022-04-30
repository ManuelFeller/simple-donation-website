import * as React from 'react';
import LayoutModule from '../components/layout';

const ImprintModule = (props: any) => {
  return(
    <LayoutModule>
      <h1>Imprint / Impressum</h1>

      <div>{props.pageContext.imprintContact.NameOfResponsible}</div>
      <div>{props.pageContext.imprintContact.AddressLine1}</div>
      <div>{props.pageContext.imprintContact.AddressLine2}</div>
      <div>{props.pageContext.imprintContact.ZipCode}</div>
      <div>{props.pageContext.imprintContact.City}</div>
      <div>{props.pageContext.imprintContact.PhoneNumber}</div>
      <div>{props.pageContext.imprintContact.ContactEmail}</div>
    </LayoutModule>
  );
}

export default ImprintModule;