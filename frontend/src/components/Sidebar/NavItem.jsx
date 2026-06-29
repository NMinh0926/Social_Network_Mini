import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

function NavItem ({ label, path, badge, end }) {
    return(
        <NavLink 
            to={path}
            end={end}
            className={({ isActive }) => 
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
        >
            <span className={styles.navLabel}>{label}</span>
            {badge > 0 && (
                <span className={styles.badge}>{badge}</span>
            )}      
        </NavLink>
    )
}

export default NavItem;