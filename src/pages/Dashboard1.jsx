/* eslint-disable no-unused-expressions */
import React, { useEffect, useContext, useRef, useState } from 'react';
import nebulaConfiguration from '../utils/nebulaConfiguration';
import { embed } from '@nebula.js/stardust';
import barChart from '@nebula.js/sn-bar-chart';
import pieChart from '@nebula.js/sn-pie-chart';
import styled from 'styled-components';

import QlikContext from '../context/QlikContext';

// https://cc-edapps.calibrateconsulting.com/sense/app/e0a475b9-62fd-4313-a650-4d865baca5e1/sheet/LChBs/state/analysis/options/developer
const salesRepBarChartId = 'fQdkG';

// https://cc-edapps.calibrateconsulting.com/sense/app/e0a475b9-62fd-4313-a650-4d865baca5e1/sheet/JzJMza/state/analysis/options/developer
const pieChartMarginByProdSubGroup = 'MEAjCJ';

// https://cc-edapps.calibrateconsulting.com/sense/app/e0a475b9-62fd-4313-a650-4d865baca5e1/sheet/8847abec-651c-4271-93f5-fd3a7e68b7c7/state/analysis/options/developer
const lineChartTable = 'mCjTgdm';

const ParentDiv = styled.div`
  height: '100vh';
  width: '100vw';
  .chart-item {
    height: 600px;
  }
`;

const Dashboard1 = () => {
  const { qlikAppMemo } = useContext(QlikContext);
  const chartRef = useRef();

  const [nebula, setNebula] = useState();
  // 'qlikAppMemo' is an enigma app model
  useEffect(() => {
    const getSetNebula = async () => {
      // Load the Configured Nebula with the qlikApp
      // const nebulaLoadedWithQlikApp = nebulaConfiguration(qlikAppMemo);
      const nebulaLoadedWithQlikApp = embed(qlikAppMemo, {
        context: { theme: 'dark' },
        types: [
          {
            name: 'barchart', // Name must be all lowercase, barChart breaks it
            load: () => Promise.resolve(barChart),
          },
          {
            name: 'piechart',
            load: () => Promise.resolve(pieChart),
          },
        ],
      });
      setNebula(nebulaLoadedWithQlikApp);
    };
    if (qlikAppMemo && !nebula) {
      getSetNebula();
    }
  }, [nebula, qlikAppMemo]);

  useEffect(() => {
    console.log('chartRef.current', chartRef.current);
    const getNebulaRenderableChart = async () => {
      const test = await nebula.render({
        element: chartRef.current,
        id: 'nPLRub', // This format is used when passing in object id
      });
      console.log('test', test);
    };
    if (nebula) {
      getNebulaRenderableChart();
    }
  }, [nebula]);

  return (
    <ParentDiv style={{ height: '100vh', width: '100vw' }}>
      {chartRef && (
        <div style={{ height: '100vh', width: '100vw' }} ref={chartRef}></div>
      )}
    </ParentDiv>
  );
};

export default Dashboard1;

// table?
//    fields: ['Product Group', '=Margin Amount'],
//    properties: {
//      title: 'Table for Fun!',
//      showTitles: false,
//      visualization: 'table',
//      qInfo: {
//        qType: 'table',
//      },
//      qHyperCubeDef: {
//        qDimensions: [],
//        qMeasures: [],
//        qMode: 'S',
//      },
//    },
