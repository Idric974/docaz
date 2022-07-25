import Link from 'next/link';
import styles from './NavBar.module.css';
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
  faArrowsToCircle,
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
  faArrowsToCircle,
  faHeart
);

const NavBar = () => {
  return (
    <div className={styles.box}>
      <div className={styles.masterMenu}>
        {/** Menu avec les icones. **/}
        <div className={styles.menuIconeBox}>
          <div className={styles.menuIcone}>
            <Link href="/">
              <a>
                <FontAwesomeIcon icon={faHouse} />
                <div className={styles.menuIconTexte}>Accueil</div>
              </a>
            </Link>
          </div>

          <div className={styles.menuIcone}>
            <Link href="/PosterAnnonce">
              <a className={styles.menuIconePub}>
                <FontAwesomeIcon icon={faArrowsToCircle} />
                <div className={styles.menuIconTextePub}>Publier</div>
              </a>
            </Link>
          </div>

          <div className={styles.menuIcone}>
            <Link href="/Favoris">
              <a>
                <FontAwesomeIcon icon={faHeart} />
                <div className={styles.menuIconTexte}>Favoris</div>
              </a>
            </Link>
          </div>

          <div className={styles.menuIcone}>
            <Link href="/profile">
              <a>
                <FontAwesomeIcon icon={faUser} />
                <div className={styles.menuIconTexte}>Compte</div>
              </a>
            </Link>
          </div>

          {/* <div className={styles.menuIcone}>
            <Link href="/Connexion">
              <a>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <div className={styles.menuIconTexte}>Déconnexion</div>
              </a>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
