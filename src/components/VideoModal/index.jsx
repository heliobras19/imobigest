
import Modal from 'react-modal';
import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { parse } from 'url';
// import Link from 'next/link';

Modal.setAppElement('#__next');

export default function VideoModal({isOpen, onClose, youtubeLink, youtubeVideoId}) {

    const youtubeId = youtubeLink != undefined ? getYouTubeIdFromLink(youtubeLink) : youtubeVideoId;
    const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}`;

    const youtubeOpts = {
        playerVars: {
          autoplay: 1,
          mute: 1
        },
    };

    function getYouTubeIdFromLink(link) {
        const parsedUrl = parse(link, true);
        const youtubeId = parsedUrl.query.v;
        return youtubeId;
    }

    const modalStyles = {
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },
        content: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          height: '80%',
          margin: 'auto',
        },
      };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Video Modal"
      style={modalStyles} 
    >
      <div className="embed-responsive embed-responsive-16by9">
        <button onClick={onClose}>X</button>
        <iframe
            className="embed-responsive-item"
            width="600"
            height="415"
            src={youtubeUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
      </div>
    </Modal>
  );
};
