import React  from 'react'
import { BrowserRouter as Router, withRouter, Route, Link } from "react-router-dom";
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import './Preview.css'

export default function Preview ({ images, onUpdateImages }) {
  onUpdateImages = onUpdateImages || noop
  const onSortEnd = ({oldIndex, newIndex}) => {
    onUpdateImages(arrayMove(images, oldIndex, newIndex))
  }
  return <ImageList images={images} onSortEnd={onSortEnd} helperClass="grabbing" />
}
const ImageList = SortableContainer(({ images }) => {
  return (
    <div className="Preview">
      <div className="Preview__submit">
        <Link to="/print">Imprimer</Link>
      </div>
      <div className="Preview__List">
        {images.map((image, index) => (<Image key={image.key} index={index} image={image} />))}
      </div>
    </div>
  )
})

const Image = SortableElement(({ image }) => {
  const thumbnailStyle = {
    backgroundImage: `url('${image.url}')`
  }
  return (
    <div className="Preview__Image">
      <div style={thumbnailStyle} alt={image.name} className="Preview__Image__thumbnail"/>
      <em className="Preview__Image__legend">{image.name}</em>
    </div>
  )
})

function noop () { }
