import { combineReducers } from 'redux';

import type { UiState } from './ui';
import ui from './ui.js';

export type State = {
  ui: UiState
};

export default combineReducers({
  /* 📌 SYMBOLS */
  ui
});
