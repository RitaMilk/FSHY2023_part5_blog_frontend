import React, { useState, useEffect } from "react"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Button from "./components/Button"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  //const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [mStyle, setMStyle] = useState("success")
  //
  //BlogForm
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedVlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedVlogappUser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setMessage("wrong credentials")
      setMStyle("success")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  //const handleLogout = (id) =>{
  const handleLogout = () => {
    //event.preventDefault()
    console.log("Handle Logout")
    console.log("iserd logged in with ", username, password)
    window.localStorage.removeItem("loggedVlogappUser")
    setUser(null)
    //const oneMaaTable=maaListToShow.filter((item,index)=>(index===id))
    //console.log("yksi maa show=",maaListToShow[id])
    //console.log("yksi maa show Taulukkona =",oneMaaTable)
    //setMaaListToShow(oneMaaTable)
    //setMaaToShow('')
    //setFilterMessage('')
  }

  const addBlog = (event) => {
    console.log("button clicked ", event.target)

    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    //newPerson
    if (true) {
      blogService
        .create(blogObject)
        .then((returnedBlog) => {
          //console.log('returnedPersone',returnedPersone)
          setBlogs(blogs.concat(returnedBlog.data))
          setMStyle("success")
          setMessage(`a new blog ${newTitle} by ${newAuthor} added `)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          //console.log('Virhe Q')
          // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
          //console.log(error.response.data.error)
          //setMStyle("error")
          //setMessage(error.response.data.error)
          //setMessage("kuku")
          //setTimeout(() => {
          //  setMessage(null)
          //}, 5000)
        })
    }
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
    //setNewNumber('')
  }

  const handleTitleChange = (event) => {
    console.log("handleTitleChange ", event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log("handleAuthorChange ", event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log("handleUrlChange ", event.target.value)
    setNewUrl(event.target.value)
  }

  //LoginForm
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
  //LoginForm

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      {!user && loginForm()}

      {user && (
        <div>
          <p>
            {user.name} logged-in{" "}
            <Button text={"Logout"} handleClick={handleLogout} />
          </p>
          <h3>create new</h3>
          <BlogForm
            addBlog={addBlog}
            newTitle={newTitle}
            handleTitleChange={handleTitleChange}
            newAuthor={newAuthor}
            handleAuthorChange={handleAuthorChange}
            newUrl={newUrl}
            handleUrlChange={handleUrlChange}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
