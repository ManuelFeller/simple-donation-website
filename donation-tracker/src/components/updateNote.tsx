import * as React from 'react';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import { convertDateToString } from '../utils/convertDateToString';
import DataStore from '../utils/dataStore';
import { DonationList } from '../types/donationList';

const UpdateNote = () => {
  /* --- start of data connection code --- */
  // get the data store object
  let dataStore = DataStore.getInstance();

  // set up a state to have a content re-render trigger
  const [localDataUpdateTime, setLocalDataUpdateTime] = useState(dataStore.getLastDataLoadingTime() ?? new Date(1970, 1, 1));
  const [serverDataUpdateTime, setServerDataUpdateTime] = useState(dataStore.getLastDataUpdateTime());

  // page lifecycle registrations (in the functional component way)
  useEffect(() => {
    // the update handler that is passed to the data store object
    const handleDataUpdate = ({ requestTime, timeStamp }: DonationList) => {
      setServerDataUpdateTime(timeStamp);
      setLocalDataUpdateTime(requestTime);
    };
    // Anything in here is fired on component mount.
    dataStore.subscribeToDataUpdates(handleDataUpdate);
    // Anything in here is fired on component unmount.
    return () => dataStore.unsubscribeFromDataUpdates(handleDataUpdate);
  }, []);
  /* --- end of data connection code --- */

  return (
    <Typography component="div" sx={{ fontStyle: 'italic', textAlign: 'center' }} style={{ color: 'gray' }}>
      Data from {convertDateToString(serverDataUpdateTime)}; last refresh at {convertDateToString(localDataUpdateTime)}
    </Typography>
  );
};

export default UpdateNote;
