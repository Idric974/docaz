/* eslint-disable @next/next/no-img-element */
import styles from '../../../styles/PostHandler.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timestampParser } from '../../utils/Utils';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { auth } from '../../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../../utils/firebase';

const CreatePost = () => {
  //

  //! Récupération du uid de l'utilisateur connecté.

  let uid = auth._delegate.currentUser.uid;
  // console.log('posterId : ', uid);

  //! -------------------------------------------------

  //! Récupér le profile de l'utilisateur connecté.

  const userData = useSelector((state) => state.userCRUDReducer);
  // console.log('userData', userData);

  //! -------------------------------------------------

  //! Les constantes.

  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [photoURL, setphotoURL] = useState();
  const [articleName, setArticleName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [town, setTown] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [postPicture, setPostPicture] = useState(null);

  useEffect(() => {
    setUserName(userData.userName);
    setPhone(userData.phone);
    setphotoURL(userData.photoURL);
  }, [userData.phone, userData.photoURL, userData.userName]);

  const dispatch = useDispatch();

  //! -------------------------------------------------

  //! Logique pour la gestion de l'image du post.

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0])); //* Prévisualisation.
    setImageUpload(e.target.files[0]); //* upload.
  };

  //! -------------------------------------------------

  //! LOGIQUE POUR LA CREATION D'UN POST.

  let date = new Date().getTime();
  let imageUrl;
  let data;
  let postDate = new Date();
  let userImageFileName;

  //? les fonctions.

  //* Création de l'image.

  function imageCreator() {
    return new Promise((resolve, reject) => {
      if (imageUpload == null) return;

      const imageRef = ref(storage, `images/${imageUpload.name + date}`);

      uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            //
            userImageFileName = snapshot.ref._location.path_;
            console.log(
              '✅ %c SUCCÈS UpdateProfile ==> Création de la nouvelle image de l’utilisateur réussie :',
              'color: green',
              url
            );
            imageUrl = url;
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
    });
  }

  //* -------------------------------------------------

  //* Transmission des données.

  function submitData() {
    return new Promise((resolve, reject) => {
      if (userData) {
        const docRef = addDoc(collection(db, 'posts'), {
          uid,
          userName,
          phone,
          photoURL,
          articleName,
          town,
          price,
          brand,
          model,
          description,
          imageUrl,
          postDate,
          userImageFileName,
        });

        console.log(
          '✅ %c SUCCÈS UpdateProfile ==> Transmission des données réussie :',
          'color: green'
        );

        resolve();
      } else {
        console.log(
          '❌ %c ERREUR UpdateProfile ==> Transmission des données',
          'color: orange'
        );

        reject();
      }
    });
  }

  //* -------------------------------------------------

  //* Retour à l'accueil.

  function backHome() {
    return new Promise((resolve, reject) => {
      if (userData) {
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

  async function handlePost(e) {
    e.preventDefault();

    try {
      //
      await imageCreator();

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

  //! Logique pour l'anulation d'un post.

  const cancelPost = () => {
    setUserName('');
    setPhone('');
    setphotoURL('');
    setArticleName('');
    setBrand('');
    setModel('');
    setTown('');
    setPrice('');
    setDescription('');
    setImageUpload('');
    setPostPicture('');
  };

  //! -------------------------------------------------

  return (
    <div className={styles.box}>
      <h1>Poster annonce</h1>

      <div className={styles.PostForm}>
        <input
          className={styles.inputTitle}
          name="articleName"
          type="text"
          placeholder="Type d'article"
          onChange={(e) => setArticleName(e.target.value)}
          value={articleName}
          required
        />

        <input
          className={styles.inputTitle}
          name="brand"
          type="text"
          placeholder="Marque de l'article"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          required
        />

        <input
          className={styles.inputTitle}
          name="model"
          type="text"
          placeholder="Modèle de l'article"
          onChange={(e) => setModel(e.target.value)}
          value={model}
          required
        />

        <input
          className={styles.inputTitle}
          name="town"
          type="text"
          placeholder="Ville où l'article est disponible"
          onChange={(e) => setTown(e.target.value)}
          value={town}
          required
        />

        <input
          className={styles.inputTitle}
          name="price"
          type="text"
          placeholder="Prix de l'article"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />

        <textarea
          className={styles.inputMessage}
          name="description"
          id="description"
          placeholder="Description de l'article"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <div className={styles.inputImageBox}>
          <input
            className={styles.inputImage}
            type="file"
            id="file-upload"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handlePicture(e)}
          />
        </div>

        {/* Prévisualisation */}
        <div className={styles.messagePreview}>
          {articleName ? (
            <li className="card-container">
              {/** Image de l'article **/}
              <h1>{"Prévisualisation de l'annonce"}</h1>

              <div className={styles.userInfo}>{userName}</div>

              {/** Téléphone **/}
              <div className={styles.userInfo}>{phone}</div>

              {/** Nom de l'article **/}
              <div className={styles.userInfo}>{articleName}</div>

              {/** Marque de l'article **/}
              <div className={styles.userInfo}>{brand}</div>

              {/** Modèle de l'article **/}
              <div className={styles.userInfo}>{model}</div>

              {/** Ville de l'article **/}
              <div className={styles.userInfo}>{town}</div>

              {/** Description de l'article **/}
              <div className={styles.userInfo}>{description}</div>

              {/** Date du post **/}
              <div className={styles.userInfo}>
                {timestampParser(Date.now())}
              </div>

              {/** Image de l'article **/}
              <div className={styles.prewieuImageBox}>
                <div>
                  <img
                    className={styles.prewieuImage}
                    src={postPicture}
                    alt=""
                  />
                </div>
              </div>
            </li>
          ) : null}
        </div>
        <div>
          {articleName || brand || model || town || description ? (
            <button className={styles.postButton} onClick={cancelPost}>
              {"Annuler l'annonce"}
            </button>
          ) : null}
        </div>

        <button className={styles.postButton} onClick={handlePost}>
          {"Poster l'annonce"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
