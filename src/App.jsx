import { Route, Routes } from 'react-router-dom';
import { AppContextProvider } from './context/context';
import { Home, Consulates, Users, Verifiers, VerifyDocuments, VisaApplication } from './pages';


function App() {
  return (
    <>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/verifiers" element={<Verifiers />} />
          <Route path="/consulates" element={<Consulates />} />
          <Route path="/verify-documents" element={<VerifyDocuments />} />
          <Route path="/visa-application" element={<VisaApplication />} />
        </Routes>
      </AppContextProvider>
    </>
  )
}

export default App;
