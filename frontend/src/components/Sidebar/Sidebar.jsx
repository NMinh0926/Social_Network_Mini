import { Link } from 'react-router-dom'
import NavItem from './NavItem'
import { navItems, currentUser } from '../../data/mockData'
import styles from './Sidebar.module.css'

function Sidebar() {
  return (
    <div className={styles.sidebar}>

      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoText}>SC</span>
      </div>

      {/* Nav Items */}
      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavItem
            key={item.id}
            label={item.label}
            path={item.path}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* User Info */}
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {currentUser.name.charAt(0)}
        </div>
        <div className={styles.userText}>
          <span className={styles.userName}>{currentUser.name}</span>
          <Link to="/profile" className={styles.viewProfile}>
            View profile
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Sidebar;