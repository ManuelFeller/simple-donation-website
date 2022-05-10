import * as React from 'react';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import { convertDateToString } from '../utils/convertDateToString';
import DataStore from '../utils/dataStore';

const UpdateNote = () => {
  /* --- start of data connection code --- */
  // get the data store object
  let data = DataStore.getInstance();

  let initialUpdateTime = data.getLastDataLoadingTime();
  if (initialUpdateTime === undefined) {
    initialUpdateTime = new Date(1970, 1, 1);
  }

  // set up a state to have a content re-render trigger
  const [dataUpdateTime, setDataUpdateTime] = useState(initialUpdateTime);

  // page lifecycle registrations (in the functional component way)
  useEffect(() => {
    // Anything in here is fired on component mount.
    data.subscribeToDataUpdates(handleDataUpdate);
    return () => {
      // Anything in here is fired on component unmount.
      data.unsubscribeFromDataUpdates(handleDataUpdate);
    };
  }, []);

  // the update handler that is passed to the data store object
  const handleDataUpdate = (newUpdateTime: Date) => {
    setDataUpdateTime(newUpdateTime);
  };
  /* --- end of data connection code --- */

  return (
    <Typography component="div" sx={{ fontStyle: 'italic', textAlign: 'center' }} style={{ color: 'gray' }}>
      Data from {convertDateToString(data.getLastDataUpdateTime())}; last refresh at {convertDateToString(dataUpdateTime)}
    </Typography>
  );
};

export default UpdateNote;
