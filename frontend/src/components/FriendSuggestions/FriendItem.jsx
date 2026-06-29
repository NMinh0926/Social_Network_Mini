import { useState } from 'react'
import styles from './FriendSuggestions.module.css'

function FriendItem ({ name, avatar, mutual }) {
    const [ followed, setFollowed] = useState(false)
    
    return (
        <div className={styles.friendItem}>

            {/*Avatar*/}
            <div className={styles.avatar}>
                {name.charAt(0)}
            </div>
            
            {/* Info */}
            <div className={styles.info}>
                <span className={styles.name}>{name}</span>
                <span className={styles.mutual}>{mutual} mutual friend</span>
            </div>

            {/* Button follow */}
            <button
                className={`${styles.followBtn} ${followed ? styles.following : ''}`}
                onClick={() => 
                    setFollowed(!followed)
                }
            >
                {followed ? 'Following' : 'Follow'}
            </button>

        </div>
    )
}

export default FriendItem;