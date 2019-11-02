import React from 'react'
import { Gallery, GalleryImage } from "react-gesture-gallery";

const Carousel = (props) => {

  const [index, setIndex] = React.useState(0);

  const { photosIndices, photos } = props

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (index === photosIndices) {
        setIndex(0);
      } else {
        setIndex(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [index, photosIndices]);

  return (
    <Gallery
      enableControls={false}
      enableIndicators={false}
      style={{
        background: "black",
        height: "150px",
        width: "70%",
        margin: '30px auto'
      }}
      index={index}
      onRequestChange={i => {
        setIndex(i);
      }}
    >
      {photos.map(({ photo }) => (
        <GalleryImage objectFit="contain" key={photo} src={photo} />
      ))}
    </Gallery>
  )
}

export default Carousel
