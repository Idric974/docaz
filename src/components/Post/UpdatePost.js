/* eslint-disable @next/next/no-img-element */
import styles from './UpdatePost.module.css';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser } from '../../utils/Utils';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from 'firebase/storage';
import { doc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faPhone } from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner, faPhone);

const Card = ({ post }) => {
  //
  // console.log('⭐ POST DATA ⭐ ', post);

  //! Les variables.

  let data;
  let userImageFileName;
  let MajPhotoURL;
  let imageUrl;
  let date = new Date().getTime();

  //! -------------------------------------------------

  //! Les constantes.

  const storage = getStorage();
  const dispatch = useDispatch();

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

  //! LOGIQUE POUR LA MISE À JOUR D'UN POST.

  //? Récupération des informations saisies pour la mise à jour.

  const registerArticleName = useRef();
  const registerBrand = useRef();
  const registerDescription = useRef();
  const registerModel = useRef();
  const registerPrice = useRef();
  const registerTown = useRef();

  //? -------------------------------------------------

  //? les fonctions.

  //* Création de l'image.

  function imageCreator() {
    return new Promise((resolve, reject) => {
      if (imageUpload == null) {
        imageUrl = post.imageUrl;

        // console.log('imageUrl : ', imageUrl);
        resolve();
      } else {
        const imageRef = ref(storage, `images/${imageUpload.name + date}`);

        uploadBytes(imageRef, imageUpload)
          .then((snapshot) => {
            //
            getDownloadURL(snapshot.ref).then((url) => {
              //
              userImageFileName = snapshot.ref._location.path_;
              console.log(
                '✅ %c SUCCÈS UpdateProfile ==> Création de la nouvelle image de l’utilisateur réussie :',
                'color: green',
                url
              );
              MajPhotoURL = url;

              resolve();
            });
          })
          .catch((error) => {
            console.log(
              '❌ %c ERREUR UpdateProfile ==> Création de la nouvelle image de l’utilisateur échouée :',
              'color: orange',
              error
            );

            reject();
          });
      }
    });
  }

  //* -------------------------------------------------

  //* Transmission des données.

  function submitData() {
    //
    let articleName = registerArticleName.current.value;
    let town = registerTown.current.value;
    let brand = registerBrand.current.value;
    let model = registerModel.current.value;
    let price = registerPrice.current.value;
    let description = registerDescription.current.value;

    return new Promise((resolve, reject) => {
      if (post) {
        if (registerArticleName.current.value == '') {
          articleName = post.articleName;
        } else {
          articleName = registerArticleName.current.value;
        }

        if (registerTown.current.value == '') {
          town = post.town;
        } else {
          town = registerTown.current.value;
        }

        if (registerBrand.current.value == '') {
          brand = post.brand;
        } else {
          brand = registerBrand.current.value;
        }

        if (registerModel.current.value == '') {
          model = post.model;
        } else {
          model = registerModel.current.value;
        }

        if (registerPrice.current.value == '') {
          price = post.price;
        } else {
          price = registerPrice.current.value;
        }

        if (registerDescription.current.value == '') {
          description = post.description;
        } else {
          description = registerDescription.current.value;
        }

        if (imageUpload == null) {
          imageUrl = post.imageUrl;
          console.log('imageUrl : ', imageUrl);
        } else {
          imageUrl = MajPhotoURL;
        }

        const postData = doc(db, 'posts', post.postId);

        updateDoc(postData, {
          articleName,
          town,
          brand,
          model,
          price,
          description,
          imageUrl,
        }).then((data) => {
          console.log(
            '✅ %c SUCCÈS UpdateProfile ==> Mise à jour de la data de l’utilisateur :',
            'color: green',
            data
          );
        });

        resolve();
      } else {
        console.log(
          '❌ %c ERREUR Update post ==> Mise à jour de la data de l’utilisateur :',
          'color: orange'
        );
        reject();
      }
    });
  }

  //* -------------------------------------------------

  //* Suppression de l'ancienne image.

  function imageDelector() {
    return new Promise((resolve, reject) => {
      if (imageUpload == null) {
        console.log('imageUpload = vide');

        resolve();
      } else {
        const desertRef = ref(storage, post.imageUrl);

        deleteObject(desertRef)
          .then(() => {
            console.log(
              '✅ %c SUCCÈS Update post ==> Suppression de l’image actuelle du post réussie :',
              'color: green',
              desertRef
            );

            resolve();
          })
          .catch((error) => {
            console.log(
              '❌ %c ERREUR Update post ==> Suppression de l’image actuelle du post échouée :',
              'color: orange',
              error
            );

            reject();
          });
      }
    });
  }

  //* -------------------------------------------------

  //* Retour à l'accueil.

  function backHome() {
    return new Promise((resolve, reject) => {
      if (post) {
        window.location = '/';
        resolve();
      } else {
        console.log(
          "❌ %c ERREUR UpdateProfile ==> Retour à l'accueil",
          'color: orange'
        );

        reject();
      }
    });
  }

  //* -------------------------------------------------

  //? -------------------------------------------------

  //? Exécution des fonctions.

  async function handlePostButton(e) {
    e.preventDefault();

    try {
      //
      await imageCreator();

      await imageDelector();

      await submitData();

      // await backHome();

      //
    } catch (err) {
      //
      console.log('err :', err);
    }
  }

  //? -------------------------------------------------

  //! -------------------------------------------------

  //! LOGIQUE POUR LA SUPPRESSION DU POST.

  //* Suppression de l'image du post.

  function postImageDelector() {
    return new Promise((resolve, reject) => {
      if (post) {
        const desertRef = ref(storage, post.imageUrl);

        deleteObject(desertRef)
          .then(() => {
            console.log(
              '✅ %c SUCCÈS Delete post ==> Suppression de l’image du post réussie :',
              'color: green',
              desertRef
            );

            resolve();
          })

          .catch((error) => {
            console.log(
              '❌ %c ERREUR Delete post ==> Suppression de l’image du post échouée :',
              'color: orange',
              error
            );

            reject();
          });
      } else {
        console.log(
          '❌ %c ERREUR Update post ==> Suppression de l’image actuelle du post échouée :',
          'color: orange',
          error
        );

        reject();
      }
    });
  }

  //* -------------------------------------------------

  //* Suppression de la data du post.

  function postDataDelector() {
    return new Promise((resolve, reject) => {
      if (post) {
        console.log('post.postId : ', post);

        deleteDoc(doc(db, 'posts', post.postId))
          .then(() => {
            console.log(
              '✅ %c SUCCÈS Delete post ==> Suppression de la data du post réussie :',
              'color: green'
            );
            resolve();
          })
          .catch((error) => {
            console.log(
              '❌ %c ERREUR Delete post ==> Suppression de la data du post échouée :',
              'color: orange',
              error
            );

            reject();
          });
      } else {
        console.log(
          '❌ %c ERREUR Update post ==> Suppression de la data du post échouée :',
          'color: orange',
          error
        );

        reject();
      }
    });
  }

  //* -------------------------------------------------

  //? Exécution des fonctions.

  async function handlePostDeletor(e) {
    e.preventDefault();

    try {
      //

      await postImageDelector();

      await postDataDelector();

      //
    } catch (err) {
      //
      console.log('err :', err);
    }
  }

  //? -------------------------------------------------

  //! -------------------------------------------------

  return (
    <div className={styles.box}>
      <form className={styles.myForm} onSubmit={(e) => updateUserLoged(e)}>
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
                <div className={styles.postItemsTitle}>{"Type d'article"}</div>
                <div className={styles.postItemsData}>
                  <input
                    className={styles.inputInfo}
                    placeholder={post.articleName}
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
                    ref={registerModel}
                  ></input>
                </div>
              </div>

              {/** Ville de l'article **/}
              <div className={styles.postItems}>
                <div className={styles.postItemsTitle}>
                  {' '}
                  {"Ville où est disponible l'article"}
                </div>

                <div className={styles.postItemsData}>
                  <input
                    className={styles.inputInfo}
                    placeholder={post.town}
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
                    placeholder={post.price}
                    required
                    ref={registerPrice}
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

              <div className={styles.inputImageBox}>
                <label className={styles.inputImageLabel} htmlFor="inputfile">
                  Télécharger une photo
                </label>
                <input
                  className={styles.inputImage}
                  type="file"
                  id="inputfile"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePicture(e)}
                />
              </div>

              <div className={styles.postPictureBoxPre}>
                {imageUpload ? (
                  <div className={styles.postPictureBox}>
                    <p className={styles.postPictureInstructions}>
                      Nouvelle image du post
                    </p>
                    <img
                      className={styles.postPicture}
                      src={postPicture}
                      alt="card-pic"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/********** FIN Corps du post **********/}

            {/********** Like barre  **********/}

            <div className={styles.handlePostButtonBox}>
              <button
                className={styles.handlePostButton}
                onClick={handlePostButton}
              >
                Modifier Annonce
              </button>

              <button
                className={styles.handlePostButton}
                onClick={handlePostDeletor}
              >
                Supprimer Annonce
              </button>
            </div>
          </>
        </li>
      </form>
    </div>
  );
};

export default Card;
