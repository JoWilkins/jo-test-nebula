/* eslint-disable no-unused-expressions */
// import { useEffect } from '@nebula.js/stardust';
import React, { useEffect, useContext, useRef } from 'react';
import QlikContext from '../context/QlikContext';

// https://cc-edapps.calibrateconsulting.com/sense/app/e0a475b9-62fd-4313-a650-4d865baca5e1/sheet/LChBs/state/analysis/options/developer
const salesRepBarChartId = 'fQdkG';

const Dashboard1 = () => {
  const { nebula } = useContext(QlikContext);
  const chartRef = useRef();
  console.log('nebula', nebula);

  useEffect(() => {
    if (nebula) {
      nebula.render({
        element: chartRef.current,
        id: salesRepBarChartId, // This format is used when passing in object id
      });
    }
  }, [nebula, chartRef]);

  return <div>{chartRef && <div ref={chartRef}></div>}</div>;
};

export default Dashboard1;
