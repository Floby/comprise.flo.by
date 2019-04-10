import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, withRouter, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import ImageImporter from './ImageImporter'
import Preview from './Preview'
import Printer from './Printer'
import './App.css';

export default function App () {
  return (
    <Router>
      <Main />
    </Router>
  )
}

const Main = withRouter(({ history, location, match }) => {
  const [ images, setImages ] = useState(undefined)
  function newImages (images, redirect) {
    setImages(images)
    setLocalImages(images)
    if (redirect) {
      history.push('/preview')
    }
  }
  useEffect(() => {
    if (!images) {
      if (getLocalImages()) {
        setImages(getLocalImages())
      } else {
        history.push('/')
      }
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Route exact path="/" render={importer} />
      <Route path="/preview" render={preview} />
      <Route path="/print" render={print} />
    </div>
  )
  function preview () {
    if (!images) return
    return <Preview images={images} onUpdateImages={newImages}/>
  }
  function importer () {
    return <ImageImporter onImages={(images) => newImages(images, true)}/>
  }
  function print () {
    return <Printer images={images} />
  }
})

function getLocalImages () {
  return localStorage.storedImages && JSON.parse(localStorage.storedImages)
}
function setLocalImages (images) {
  try {
    localStorage.storedImages = JSON.stringify(images)
  } catch (error) {
    console.error('Could not save images', error)
  }
}
