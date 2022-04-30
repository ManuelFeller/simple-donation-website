import * as React from 'react';
import { Link } from 'gatsby';
import TestComponent from '../components/testComponent';

// markup
const NotFoundPage = () => {
  return (
    <main>
      <title>Not found</title>
      <h1>Page not found</h1>
      <p>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </main>
  )
}

export default NotFoundPage
