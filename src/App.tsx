import './App.css'
import { Header } from './components/Header/Header'
import { Category } from './components/Category/Category'
import { Home } from './components/Home/Home'
import RecentNews from './components/RecentNews/RecentNews'



export const App = () => {
  return (
    <>
      <Header />
      <Home />
      <Category />
      <RecentNews />
    </>
    
  )
}

