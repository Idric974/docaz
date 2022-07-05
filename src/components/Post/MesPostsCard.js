/* eslint-disable @next/next/no-img-element */
import styles from '../../../styles/Card.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../../utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCode,
  faHighlighter,
  faThumbsUp,
  faThumbsDown,
  faHouse,
  faRightToBracket,
  faRightFromBracket,
  faUser,
  faSpinner,
  faPhone,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCode,
  faHighlighter,
  faThumbsUp,
  faThumbsDown,
  faHouse,
  faRightToBracket,
  faRightFromBracket,
  faUser,
  faSpinner,
  faPhone,
  faHeart
);

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);

  // console.log('Liste des posts : ', post);

  //! Le profil de l'auteur du post.

  const usersData = useSelector((state) => state.userCRUDReducer);
  // console.log("⭐ CompCard ===>  Le profil de l'auteur du post :", usersData);

  //! --------------------------------------------------

  //! Stopper le isLoading.

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  //! --------------------------------------------------

  //! Logique pour la gestion de l'image.

  const [imageUpload, setimageUpload] = useState(null);
  const [postPicture, setPostPicture] = useState(null);

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0])); //* Prévisualisation.
    setimageUpload(e.target.files[0]); //* upload.
  };

  //! -------------------------------------------------

  return (
    <div className={styles.box}>
      <li className={styles.cards} key={post._id}>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} />
        ) : (
          <>
            {/********** User image Box **********/}
            <div className={styles.userInfo}>
              <div className={styles.userImageBox}>
                <img
                  className={styles.userImage}
                  src={post.photoURL}
                  alt={post.userPseudo}
                />
              </div>

              {/** Pseudo de l'utilisateur **/}
              <div className={styles.pseudoDateBox}>
                {/** Pseudo de l'utilisateur **/}
                <div className={styles.userpseudo}>{post.userName}</div>

                {/** Ville ou est disponible l'article **/}
                <div className={styles.lieuxBox}>
                  {'Disponible à : '}
                  {post.town}
                </div>

                {/** Date de création du post **/}
                <div className={styles.postDate}>
                  {dateParser(post.postDate)}
                </div>
              </div>

              <div className={styles.phoneBox}>
                <div className={styles.phoneIncone}>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className={styles.phoneCta}>{'Appeller'}</div>
              </div>
            </div>

            {/********** FIN User image Box **********/}

            {/********** Corps du post **********/}

            <div className={styles.postBody}>
              {''}
              {/** Nom de l'article **/}
              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}>{'Nom : '}</div>
                <div className={styles.postItemsData}>
                  <input
                    className={styles.inputInfo}
                    placeholder={post.name}
                    required
                    // ref={registerFirstName}
                  ></input>
                </div>
              </div>
              {/** Marque de l'article **/}
              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}>{'Marque : '}</div>
                <div className={styles.postItemsData}>
                  <input
                    className={styles.inputInfo}
                    placeholder={post.brand}
                    required
                    // ref={registerFirstName}
                  ></input>
                </div>
              </div>
              {/** Modèle de l'article **/}
              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}> {'Modèle : '}</div>
                <div className={styles.postItemsData}>
                  <input
                    className={styles.inputInfo}
                    placeholder={post.model}
                    required
                    // ref={registerFirstName}
                  ></input>
                </div>
              </div>
              {/** Prix de l'article **/}
              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}> {'Prix : '}</div>
                <div className={styles.postItemsData}>
                  <input
                    className={styles.inputInfo}
                    placeholder={'100.00€'}
                    required
                    // ref={registerFirstName}
                  ></input>
                </div>
              </div>

              {/** Description de l'article **/}
              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}> {'Description : '}</div>
                <div className={styles.postItemsData}>
                  <input
                    className={styles.inputInfo}
                    placeholder={post.description}
                    required
                    // ref={registerFirstName}
                  ></input>
                </div>
              </div>

              {/**  Image actuelle du post **/}
              <div className={styles.postItems}>
                <div className={styles.postPictureBox}>
                  <p className={styles.postPictureInstructions}>
                    Image actuelle du post
                  </p>

                  <img
                    className={styles.postPicture}
                    src={post.imageUrl}
                    alt="card-pic"
                  />
                </div>
              </div>

              {/**  Nouvelle image du post **/}
              <div className={styles.postItems}>
                {' '}
                <div className={styles.postPictureBox}>
                  <p className={styles.postPictureInstructions}>
                    Choisire une nouvelle image pour votre annonce
                  </p>

                  <input
                    className={styles.postPicture}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handlePicture(e)}
                  />

                  <div>
                    <img src={postPicture} alt="" />
                  </div>
                </div>
              </div>
            </div>

            {/********** FIN Corps du post **********/}

            {/********** Like barre  **********/}

            <div className={styles.handlePostButtonBox}>
              <button className={styles.handlePostButton}>
                Modifier ce post
              </button>
              <button className={styles.handlePostButton}>
                Supprimer ce post
              </button>
            </div>
          </>
        )}
      </li>
    </div>
  );
};

export default Card;
