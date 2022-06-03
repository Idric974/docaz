/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readAllPost } from '../../actions/post.action';
import styles from '../../../styles/Thread.module.css';
import Card from '../Post/Card';
import { isEmpty } from '../../utils/Utils';

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  // console.log('⭐ CompThread ===>  Les posts :', posts);

  useEffect(() => {
    if (loadPost) {
      dispatch(readAllPost());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div className={styles.box}>
      <ul className={styles.postBoxDiv}>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
