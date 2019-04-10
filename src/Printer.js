import React, { useState, useEffect } from 'react';
import './Printer.css'
export default function Printer ({ images }) {
  if (!images) {
    return ''
  }
  const [ printed, setPrinted ] = useState(false)
  useEffect(() => {
    if (!printed) {
      window.print()
      setPrinted(true)
    }
  }, [printed])
  return (
    <div className="Printer">
      {images.map((image) => (<Image key={image.key} image={image} />))}
    </div>
  )
}

function Image ({ image }) {
  const backgroundStyle = {
    backgroundImage: `url('${image.url}')`
  }
  return (
    <div className="Printer__image" style={backgroundStyle}>
      <p className="Printer__legend">{ image.name }</p>
    </div>
  )
}
