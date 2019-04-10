import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './ImageImporter.css'

export default function ImageImporter ({ onImages }) {
  onImages = onImages || noop
  const [ isProcessing, setIsProcessing ] = useState(false)
  const onDrop = useCallback(async (files) => {
    setIsProcessing(true)
    const images = await mapFilesToImagesItems(files)
    setIsProcessing(false)
    onImages(images)
  })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  let topClassName = 'ImageImporter_dropzone'
  if (isDragActive) {
    topClassName += ' dragging'
  }

  return isProcessing ? processing() : dropZone()

  function dropZone () {
    return (
      <div className={topClassName} {...getRootProps()}>
        <input {...getInputProps()} />
        <span className="legend">
        { isDragActive ? 'Lache tout !' : 'Dépose tes images ici' }
        </span>
      </div>
    )
  }
  function processing () {
    return (
      <div className={topClassName}>
        <span className="legend">
          Chargement...
        </span>
      </div>
    )
  }
}

async function mapFilesToImagesItems (files) {
  const items = await Promise.all(files.map((file) => mapFileToImageItem(file)))
  return items.filter(Boolean).map((image, key) => ({ key, ...image }))
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
