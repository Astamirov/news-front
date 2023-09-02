import './App.css'
import { Header } from './components/Header/Header'
import { Category } from './components/Category/Category'
import { Home } from './components/Home/Home'
import { RecentNews } from './components/RecentNews/RecentNews'
import { SignUp } from './components/SignUp/SignUp'
import { SignIn } from './components/Login/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Articles } from './components/Articles/Articles';
import { useSelector } from 'react-redux'
import { RootState } from './app/store'
import ArticleDetail from './components/ArticleDetail/ArticleDetail'



export const App = () => {

  const token = useSelector((state: RootState) => state.application.token)

  

  return (
    <>
      <Routes>
        <Route path='/' element={
            <>
              <Header />
              <Home />
              <Category />
              <Articles />
              <RecentNews />
            </>
          } 
        />
        {token ? <Route path='/login' element={<Navigate to='/' />} /> : <Route path='/login' element={<SignIn />} />}
        <Route path='/auth' element={<SignUp />} />
        <Route path="/article/:articleId" element={<ArticleDetail />} />
      </Routes>
    </>
  )
}

