/* eslint-disable @next/next/no-img-element */
import styles from '../../../styles/PostHandler.module.css';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timestampParser } from '../../utils/Utils';
import { addPost } from '../../actions/postCRUD.action';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { auth } from '../../firebase.config';

const CreatePost = () => {
  //
  //! I) Affichage des informations concernant l'utilisateur connecté.

  //? Récupération du UID.

  // console.log(auth._delegate.currentUser);
  let uid = auth._delegate.currentUser.uid;
  console.log('posterId : ', uid);

  //? -------------------------------------------------

  //? I) Récupér le profile de l'utilisateur connecté.

  const userData = useSelector((state) => state.userCRUDReducer);
  // console.log('userData', userData);

  //? -------------------------------------------------

  //* Les constantes.

  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [photoURL, setphotoURL] = useState();
  const [articleName, setArticleName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [town, setTown] = useState('');
  const [description, setDescription] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [postPicture, setPostPicture] = useState(null);

  useEffect(() => {
    setUserName(userData.userName);
    setPhone(userData.phone);
    setphotoURL(userData.photoURL);
  }, [userData.phone, userData.photoURL, userData.userName]);

  //* -------------------------------------------------

  const dispatch = useDispatch();

  //? --------------------------------------------------

  //! -------------------------------------------------

  //! Logique pour la gestion de l'image.

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0])); //* Prévisualisation.
    setImageUpload(e.target.files[0]); //* upload.
  };

  //! -------------------------------------------------

  //! Logique pour la gestion des posts.

  let date = new Date().getTime();
  let imageUrl;
  let data;
  let postDate = new Date();

  const handlePost = async (e) => {
    e.preventDefault();

    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + date}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          //
          console.log('imageUrl ===> ', url);
          imageUrl = url;
        });
      })
      .then(() => {
        setTimeout(() => {
          data = {
            uid,
            userName,
            phone,
            photoURL,
            articleName,
            town,
            brand,
            model,
            description,
            imageUrl,
            postDate,
          };
        }, 1000);

        // console.log('data : ', data);
      })
      .then(() => {
        setTimeout(() => {
          dispatch(addPost(data));
          window.location = '/';
        }, 1500);
      });
  };

  //! -------------------------------------------------

  //! Logique pour l'anulation d'un post.

  const cancelPost = () => {
    setName('');
    setBrand('');
    setModel('');
    setTown('');
    setDescription('');
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
          placeholder="Nom de l'article"
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
