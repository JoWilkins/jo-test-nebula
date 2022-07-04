import React, { useEffect, useState, useMemo, useCallback } from 'react';
import QlikConnector from '../utils/qlikConnector';
import QlikContext from './QlikContext';
import configure from '../utils/embedNebula';

const QlikProvider = ({ children }) => {
  const [qlikApp, setQlikApp] = useState();
  const [qlikAppIsLoading, setQlikAppIsLoading] = useState();
  const [qlikAppError, setQlikAppError] = useState();

  const [nebula, setNebula] = useState(null);

  const qlikAppMemo = useMemo(() => qlikApp, [qlikApp]);
  const setQlikAppCallback = useCallback(
    (value) => setQlikApp(value),
    [setQlikApp]
  );

  const qlikAppIsLoadingMemo = useMemo(
    () => qlikAppIsLoading,
    [qlikAppIsLoading]
  );
  const setQlikAppIsLoadingCallback = useCallback(
    (value) => setQlikAppIsLoading(value),
    [setQlikAppIsLoading]
  );

  const qlikAppErrorMemo = useMemo(() => qlikAppError, [qlikAppError]);
  const setQlikAppErrorCallback = useCallback(
    (value) => setQlikAppError(value),
    [setQlikAppError]
  );

  // When called will get the qlikApp using the QlikConnector function then set to state
  const getSetQlikApp = async () => {
    setQlikAppIsLoadingCallback(true);
    let sourcedQlikApp;
    try {
      sourcedQlikApp = await QlikConnector(
        'e0a475b9-62fd-4313-a650-4d865baca5e1',
        'http://localhost:3000'
      );
      setNebula(await configure(sourcedQlikApp));
      // console.log('sourcedQlikApp', sourcedQlikApp);
    } catch (err) {
      console.log(err);
      setQlikAppErrorCallback(err);
      setQlikAppErrorCallback(false);
    }
    setQlikAppCallback(sourcedQlikApp);
    setQlikAppIsLoading(false);
  };

  useEffect(() => {
    // Only call getSetQlikApp if qlikApp is undefined and is not already loading
    if (qlikAppMemo === undefined && !qlikAppIsLoadingMemo) {
      setQlikAppIsLoadingCallback(true);
      getSetQlikApp();
    }
  }, [qlikAppMemo, qlikAppIsLoadingMemo]);

  console.log('nebula', nebula);

  return (
    <QlikContext.Provider
      value={{
        qlikAppMemo,
        qlikAppIsLoadingMemo,
        qlikAppErrorMemo,
        nebula,
      }}
    >
      {children}
    </QlikContext.Provider>
  );
};

export default QlikProvider;
