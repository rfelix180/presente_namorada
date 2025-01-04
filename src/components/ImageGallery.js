import React, { useState, useEffect, useRef } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Adicione a classe 'fade-out' à imagem atual
      imageRef.current.classList.add('fade-out');

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        // Remova a classe 'fade-out' e adicione 'fade-in' à nova imagem
        imageRef.current.classList.remove('fade-out');
        imageRef.current.classList.add('fade-in');
      }, 500); // Ajuste o tempo de espera para sincronizar com a transição
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div>
      <img ref={imageRef} src={images[currentIndex]} alt="Imagem atual" className="image fade-in" />
    </div>
  );
};

export default ImageGallery;