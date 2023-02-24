import React, { useState, useEffect, useCallback } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const inputForSearch = e.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
      return;
    }
    const response = await fetchImages(inputForSearch.value, 1);
    setImages(response);
    setIsLoading(false);
    setCurrentSearch(inputForSearch.value);
    setPageNr(1);
  };

  const handleClickMore = async () => {
    const response = await fetchImages(currentSearch, pageNr + 1);
    setImages(prevImages => [...prevImages, ...response]);
    setPageNr(prevPageNr => prevPageNr + 1);
  };

  const handleImageClick = e => {
    setModalOpen(true);
    setModalAlt(e.target.alt);
    setModalImg(e.target.name);
  };

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setModalImg('');
    setModalAlt('');
  }, []);

  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        handleModalClose();
      }
    },
    [handleModalClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery onImageClick={handleImageClick} images={images} />
          {images.length > 0 && <Button onClick={handleClickMore} />}
        </>
      )}
      {modalOpen && (
        <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
      )}
    </div>
  );
}
