import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { ModalProvider } from "./context/Modal.tsx";
import { BrowserRouter } from 'react-router-dom';
import store from './store/index.ts';
import { Modal } from "./context/Modal.tsx";


// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
           <ModalProvider>
             <Provider store={store}>
               <BrowserRouter>
                <Modal />
          <App />
             </BrowserRouter>
             </Provider>
           </ModalProvider>
  </React.StrictMode>
);

//once these are created you can place back into the root
