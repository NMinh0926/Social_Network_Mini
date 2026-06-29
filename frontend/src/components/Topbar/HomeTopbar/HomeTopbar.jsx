import styles from './HomeTopbar.module.css'
import { Search, Home, Bell, MessageCircle } from 'lucide-react'
import { useState } from 'react'

function HomeTopbar () {
    const [ activemes, setActiveMes ] = useState(false)
    const [ activenoti, setActiveNoti ] = useState(false)

    return(
        <div className={styles.topbar}>
            <div className={styles.searchBar}>

                <Search size={18} className={styles.searchIcon}></Search>

                <input 
                    type="text"
                    placeholder='Search for people, posts, or tags'
                    className={styles.searchInput}
                />

            </div>

            <div className={styles.iconGroup}>
                <button className={`${styles.active} ${styles.iconBtn}`}
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                    }
                >
                    <Home size={18}></Home>
                </button>

                <button className={ activemes===true ? `${styles.active} $ ${styles.iconBtn}`: styles.iconBtn }
                    onClick={() => {
                        setActiveMes(prev => !prev) 
                        setActiveNoti(false)
                    }}
                >
                    <div className={styles.iconWrap}>
                        <MessageCircle size={18} className={styles.iconWrap}></MessageCircle>
                        <span className={styles.badge}>2</span>
                    </div>
                </button>

                <button className={ activenoti===true ? `${styles.active} $ ${styles.iconBtn}`: styles.iconBtn }
                    onClick={() => {
                        setActiveNoti(prev => !prev)
                        setActiveMes(false) 
                        
                    }}
                >
                    <div className={styles.iconWrap}>
                        <Bell size={18} className={styles.iconWrap}></Bell>
                        <span className={styles.badge}>2</span>
                    </div>
                </button>

                <div className={styles.avatar}>A</div>
            </div>
        </div>
    )
}

export default HomeTopbar;