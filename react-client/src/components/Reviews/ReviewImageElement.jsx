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
        <span className="close" onClick={toggleModal} >Close</span>
      <img src={url}/>
      </Modal>
      <img className="reviewThumb" src={url}/>
    </div>
  );
};

export default ReviewImageElement;
