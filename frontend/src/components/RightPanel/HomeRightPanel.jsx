import FriendSuggestions from '../FriendSuggestions/FriendSuggestions'
import styles from './HomeRightPanel.module.css'

function RightPanel() {
  return (
    <div className={styles.wrapper}>
      <FriendSuggestions />
    </div>
  )
}

export default RightPanel