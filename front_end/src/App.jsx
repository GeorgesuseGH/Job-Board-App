import { Routes, Route,BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { JobsPage } from './pages/JobsPage.jsx'
import { EmployersPage } from './pages/EmployersPage.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { FaqsPage } from './pages/FaqsPage.jsx'
import { SignPage } from './pages/SignPage.jsx'
import { LogInPage } from './pages/LogInPage.jsx'
import { Footer } from './components/footer.jsx'
import { ResetPass,SetNewPass } from './pages/Reset-pass.jsx'
import { AuthProvider } from './components/authProvider'
import { ErrorPage } from './pages/Error.jsx'
import { ScrollTop } from './components/scrollTop.jsx'
export function App() {
  return (<BrowserRouter><ScrollTop></ScrollTop>
    <div className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/lebanonBg.jpg')" }}>
<AuthProvider>
  
      <Navbar></Navbar>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
       
                <Route path="/log-in" element={<LogInPage />} />
                        <Route path="/sign-up" element={<SignPage />} />
  <Route path="/reset-pass" element={<ResetPass/>}/>
  <Route path="/reset-password" element={<SetNewPass/>}></Route>
  <Route path="/error" element={<ErrorPage/>}></Route>
      </Routes>
      <Footer></Footer>
      </AuthProvider>
    </div>
    </BrowserRouter>
  )
}
