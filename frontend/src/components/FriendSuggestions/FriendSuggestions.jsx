import styles from './FriendSuggestions.module.css'
import FriendItem from './FriendItem'
import { friendSuggestions } from '../../data/mockData'

function FriendSuggestions () {
    return(
        <div className={styles.wrapper}>
            {/* Header */}
            <div className={styles.header}>
                <span className={styles.title}>Friend Suggestion</span>
                <button className={styles.seeAll}>See All</button>
            </div>

            {/* List */}
            {friendSuggestions.map(friend => (
                <FriendItem 
                    key={friend.id}
                    name={friend.name}
                    mutual={friend.mutual}
                    avatar={friend.avatar}
                ></FriendItem>
            ))}
        </div>
    )
}

export default FriendSuggestions;