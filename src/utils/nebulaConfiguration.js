// https://qlik.dev/tutorials/build-a-simple-mashup-using-nebulajs
import { embed } from '@nebula.js/stardust';
import barChart from '@nebula.js/sn-bar-chart';
import pieChart from '@nebula.js/sn-pie-chart';
// import lineChart from '@nebula.js/sn-line-chart';
// import sankeyChart from '@nebula.js/sn-sankey-chart';
// import funneChart from '@nebula.js/sn-funnel-chart';
// import mekkoChart from '@nebula.js/sn-mekko-chart';

// Register the relevant charts with Nebula.
const nebulaConfiguration = embed.createConfiguration({
  // context: {
  //   theme: 'light',
  //   language: 'en-US',
  //   constraints: {
  //     active: false,
  //     passive: false,
  //     select: false,
  //   },
  // },
  types: [
    {
      name: 'barchart', // Name must be all lowercase, barChart breaks it
      load: () => Promise.resolve(barChart),
    },
    {
      name: 'piechart',
      load: () => Promise.resolve(pieChart),
    },
    // {
    //   name: 'linechart',
    //   load: () => lineChart,
    // },
    // {
    //   name: 'sankeychart',
    //   load: () => sankeyChart,
    // },
    // {
    //   name: 'funnechart',
    //   load: () => funneChart,
    // },
    // {
    //   name: 'mekkochart',
    //   load: () => mekkoChart,
    // },
  ],
});

export default nebulaConfiguration;
