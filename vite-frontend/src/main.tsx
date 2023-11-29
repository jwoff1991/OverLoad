import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'



const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
	window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
          <App />
  </React.StrictMode>
);

//once these are created you can place back into the root
    // <ModalProvider>
    //   <Provider store={store}>
    //     <BrowserRouter>
    //       <Modal />
    //     </BrowserRouter>
    //   </Provider>
    // </ModalProvider>
