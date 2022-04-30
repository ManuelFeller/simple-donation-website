import { Link } from 'gatsby';
import * as React from 'react';
import { useEffect, useState } from 'react';
import LayoutModule from '../components/layout';
import TestComponent from '../components/testComponent';
import DataStore from '../utils/dataStore';

const IndexPage = () => {

  /* --- start of data connection code --- */

  // get the data store object
  let data = DataStore.getInstance();

  // set up a state to have a content re-render trigger
  const [dataUpdateTime, setDataUpdateTime] = useState(new Date(1970, 1, 1));

  // page lifecycle registrations (in the functional component way)
  useEffect(() => {
    // Anything in here is fired on component mount.
    data.subscribeToDataUpdates(handleDataUpdate);
    return () => {
        // Anything in here is fired on component unmount.
        data.unsubscribeFromDataUpdates(handleDataUpdate);
    }
  }, [])
  
  // the update handler that is passed to the data store object
  const handleDataUpdate = (newUpdateTime: Date) => {
    setDataUpdateTime(newUpdateTime);
  }

  /* --- end of data connection code --- */

  const convertDateToString = (date: Date) => {
    if (date !== null && date !== undefined) {
      return date.toString();
    } else {
      return 'unknown';
    }
  }

  return (

    <LayoutModule>
      <TestComponent></TestComponent>
      <title>Home Page</title>
      
      <table>
        <tr>
          <th>Article / Artikel</th>
          <th>Needed / Benötigt</th>
          <th>Donated / Gespendet</th>
          <th>Remamining / Offen</th>
          <th>Unit / Einheit</th>
        </tr>
        {data.getAllItems().map(item => (
          <tr>
            <td>{item.article}</td>
            <td>{item.neededOverall}</td>
            <td>{item.alreadyDonated}</td>
            <td>{item.remainingNeed}</td>
            <td>{item.unit}</td>
          </tr>
        ))}
      </table>
      <p>Data from {convertDateToString(data.getLastDataUpdateTime())}: (last refresh at {convertDateToString(dataUpdateTime)})</p>
    </LayoutModule>
  )
}

export default IndexPage
