import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import './ImageImporter.css'

export default function ImageImporter ({ onImages }) {
  onImages = onImages || noop

  const onDrop = useCallback(async (files) => {
    const items = await mapFilesToImagesItems(files)
    let key = 0
    const images = items.filter(Boolean).map((image) => ({ key: key++, ...image }))
    onImages(images)
  })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  let topClassName = 'ImageImporter_dropzone'
  if (isDragActive) {
    topClassName += ' dragging'
  }
  return (
    <div className={topClassName} {...getRootProps()}>
      <input {...getInputProps()} />
      <span className="legend">
      { isDragActive ? 'Lache tout !' : 'Dépose tes images ici' }
      </span>
    </div>
  )
}

async function mapFilesToImagesItems (files) {
  return await Promise.all(files.map((file) => mapFileToImageItem(file)))
}

async function mapFileToImageItem (file) {
  if (!file.type.startsWith('image/')) return
  const name = file.name.replace(/\.[a-zA-Z]{1,5}$/, '')
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve({ name, url: reader.result, objectUrl: URL.createObjectURL(file) })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function noop () { }
