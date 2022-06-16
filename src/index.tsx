import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';

import 'Styles/reset-styles.scss';
import { appReducers } from 'Redux-Manager/reducers';
import App from 'App';
import { configureStore } from '@reduxjs/toolkit';

const PipesPuzzleGameApp = () => {
  const store =configureStore({
    reducer:appReducers,
    devTools:process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['PUZZLE_CREATED','PUZZLE_Updated'],
          // Ignore these paths in the state
          ignoredPaths: ['puzzleReducer.puzzleWebSocket'],
        },
      });
    }
  });
  
  return (
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
};

const pipePuzzleRootElement = window.document.getElementById('PipesPuzzleGameApp');
if (pipePuzzleRootElement?.hasChildNodes()) {
  hydrate(<PipesPuzzleGameApp />, pipePuzzleRootElement);
} else {
  render(<PipesPuzzleGameApp />, pipePuzzleRootElement);
}
