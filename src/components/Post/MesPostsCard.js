/* eslint-disable @next/next/no-img-element */
import styles from '../../../styles/Card.module.css';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../../utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faPhone } from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner, faPhone);

const Card = ({ post }) => {
  //
  //! Les variables.

  let data;
  let userImageFileName;
  let date = new Date().getTime();

  //! -------------------------------------------------

  //! Les constantes.

  //const storage = getStorage();
  //const dispatch = useDispatch();

  //! -------------------------------------------------

  //! Le profil de l'auteur du post.

  const usersData = useSelector((state) => state.userCRUDReducer);
  // console.log("⭐ CompCard ===>  Le profil de l'auteur du post :", usersData);

  //! --------------------------------------------------

  //! Logique pour la gestion des images.

  const [imageUpload, setimageUpload] = useState(null);
  const [postPicture, setPostPicture] = useState(null);

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0])); //* Prévisualisation.
    setimageUpload(e.target.files[0]); //* upload.
  };

  //! -------------------------------------------------

  //! Logique pour la mise à jour du post.

  //? Récupération des informations saisies pour la mise à jour.

  const registerArticleName = useRef();
  const registerBrand = useRef();
  const registerDescription = useRef();
  const registerModel = useRef();
  const registerPrix = useRef();
  const registerTown = useRef();

  //! -------------------------------------------------

  return (
    <div className={styles.box}>
      <li className={styles.cards} key={post._id}>
        <>
          {/********** User image Box **********/}
          <div className={styles.userInfo}>
            <div className={styles.userImageBox}>
              <img
                className={styles.userImage}
                src={post.photoURL}
                alt={post.userName}
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
              <div className={styles.postDate}>{dateParser(post.postDate)}</div>
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
              <div className={styles.postItemsTitle}>{'Nom'}</div>
              <div className={styles.postItemsData}>
                <input
                  className={styles.inputInfo}
                  placeholder={post.articleName}
                  required
                  ref={registerArticleName}
                ></input>
              </div>
            </div>

            {/** Marque de l'article **/}
            <div className={styles.postItems}>
              <div className={styles.postItemsTitle}>{'Marque'}</div>
              <div className={styles.postItemsData}>
                <input
                  className={styles.inputInfo}
                  placeholder={post.brand}
                  required
                  ref={registerBrand}
                ></input>
              </div>
            </div>

            {/** Modèle de l'article **/}
            <div className={styles.postItems}>
              <div className={styles.postItemsTitle}> {'Modèle'}</div>
              <div className={styles.postItemsData}>
                <input
                  className={styles.inputInfo}
                  placeholder={post.model}
                  required
                  ref={registerModel}
                ></input>
              </div>
            </div>

            {/** Ville de l'article **/}
            <div className={styles.postItems}>
              <div className={styles.postItemsTitle}>
                {' '}
                {"Ville où est disponible l'artivcle"}
              </div>
              <div className={styles.postItemsData}>
                <input
                  className={styles.inputInfo}
                  placeholder={post.town}
                  required
                  ref={registerTown}
                ></input>
              </div>
            </div>

            {/** Prix de l'article **/}
            <div className={styles.postItems}>
              <div className={styles.postItemsTitle}> {'Prix'}</div>
              <div className={styles.postItemsData}>
                <input
                  className={styles.inputInfo}
                  placeholder={'100.00€'}
                  required
                  ref={registerPrix}
                ></input>
              </div>
            </div>

            {/** Description de l'article **/}
            <div className={styles.postItems}>
              <div className={styles.postItemsTitle}> {'Description'}</div>
              <div className={styles.postItemsData}>
                <input
                  className={styles.inputInfo}
                  placeholder={post.description}
                  required
                  ref={registerDescription}
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

                <div className={styles.postPictureBox}>
                  <img
                    className={styles.postPicture}
                    src={postPicture}
                    alt="card-pic"
                  />
                </div>
              </div>
            </div>
          </div>

          {/********** FIN Corps du post **********/}

          {/********** Like barre  **********/}

          <div className={styles.handlePostButtonBox}>
            <button className={styles.handlePostButton}>
              Modifier Annonce
            </button>
            <button className={styles.handlePostButton}>
              Supprimer Annonce
            </button>
          </div>
        </>
      </li>
    </div>
  );
};

export default Card;
