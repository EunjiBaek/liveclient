import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { IntlProvider } from "react-intl";
import enUsMsg from "./lang/en.json";
import koMsg from "./lang/ko.json";
import queryString from "query-string";
import Home from './pages/Home';
import './App.css';

const App = () => {
  
  let location = useLocation();
  const query = queryString.parse(location.search);
  const lang_cd = query.lang_cd.length > 0 ? (query.lang_cd ==="kr" ? "ko" : "en") : "ko";    
  const [locale, setLocale] = useState(lang_cd);
  const messages = { "en": enUsMsg,"ko": koMsg }[locale];


  return (
    <>
      <IntlProvider locale={locale} messages={messages}>
        <Routes>
            <Route path="/liveclient" element={<Home />} />
        </Routes>
      </IntlProvider>
    </>
 
  );
}

export default App;
