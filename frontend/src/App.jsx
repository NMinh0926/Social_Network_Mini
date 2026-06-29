import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageProvider } from './context/PageContext.jsx'
import MainLayout from './layouts/MainLayout/MainLayout.jsx'
import TwoColumnLayout from './layouts/TwoColumnLayout/TwoColumnLayout.jsx'
import Home from './pages/Home/Home.jsx'
import Explore from './pages/Explore/Explore.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Messages from './pages/Messages/Message.jsx'
import Settings from './pages/Settings/Settings.jsx'

function App() {
  return (
    <BrowserRouter>
      <PageProvider>
        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/"        element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<TwoColumnLayout />}>
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

        </Routes>
      </PageProvider>
    </BrowserRouter>
  )
}

export default App;