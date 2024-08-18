import React from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import LoginHeader from '../../components/LoginHeader/LoginHeader'
import CreateTodo from '../../components/CreateTodo/CreateTodo'

const Home = ({handleSetLogin,isLogin}) => {
  
  
  return (
    <div>
      <Header />
      <CreateTodo />
    </div>
  )
}

export default Home