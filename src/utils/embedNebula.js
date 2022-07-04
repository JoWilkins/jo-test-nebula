import { embed } from '@nebula.js/stardust';
import bar from '@nebula.js/sn-bar-chart';

const configure = embed.createConfiguration({
  context: {
    theme: 'light',
    language: 'en-US',
    constraints: {
      active: false,
      passive: false,
      select: false,
    },
  },
  types: [
    {
      name: 'barchart',
      load: () => bar,
    },
  ],
});

export default configure;
