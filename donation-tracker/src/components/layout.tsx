import { Link } from 'gatsby';
import * as React from 'react';

const LayoutModule = (props: any) => {
  return(
    <>
      <div>
        Header
      </div>
      <div>
        {props.children}
      </div>
      <div>
        <Link to='/'>Home / Start</Link> - <Link to='/imprint/'>Imprint / Impressum</Link>
      </div>
    </>
  );
}

export default LayoutModule;