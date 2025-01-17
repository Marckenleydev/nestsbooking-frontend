
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {   BrowserRouter as Router } from 'react-router-dom'; 
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./context/AppContext.tsx";
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry: 0
    }
  }
})
createRoot(document.getElementById("root")!).render(
  <Router>
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
    
      <App />
     
  
    </AppContextProvider>
   
  </QueryClientProvider>
  </Router>
  

);
