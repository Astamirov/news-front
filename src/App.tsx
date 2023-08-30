import './App.css'
import { Header } from './components/Header/Header'
import { Category } from './components/Category/Category'
import { Home } from './components/Home/Home'
import RecentNews from './components/RecentNews/RecentNews'
import { SignUp } from './components/SignUp/SignUp'
import { SignIn } from './components/Login/Login'
import { Routes, Route } from 'react-router-dom'



export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={
            <>
              <Header />
              <Home />
              <Category />
              <RecentNews />
            </>
          } 
        />
        <Route path='/login' element={<SignIn />} />
        <Route path='/auth' element={<SignUp />} />
      </Routes>
    </>
  )
}

