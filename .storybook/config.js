import { configure, setAddon } from '@storybook/react';
import infoAddon, {setDefaults} from '@storybook/addon-info';

// addon-info
setDefaults({
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
  source: true,
});

setAddon(infoAddon);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
