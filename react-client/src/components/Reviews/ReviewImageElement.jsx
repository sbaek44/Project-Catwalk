import React, { useState } from 'react';
import Modal from 'react-modal';

const ReviewImageElement = ({ url }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  }
  return (
    <div onClick={toggleModal}>
      <Modal isOpen={modalIsOpen} >
        <button onClick={toggleModal} >Exit</button>
      <img src={url}/>
      </Modal>
      <img className="reviewThumb" src={url}/>
    </div>
  );
};

export default ReviewImageElement;
