import styles from './MainLayout.module.css'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import { usePage } from '../../context/PageContext.jsx'

function MainLayout() {
    const { topbar, rightPanel} = usePage()
    return (
        <div className={`${styles.wrapper} ${!rightPanel ? styles.noRight : ''}`}>
            <aside className={styles.sidebar}>
                <Sidebar />
            </aside>

            <header className={styles.topbar}>
                {topbar}
            </header>

            <main className={styles.feed}>
                <Outlet />
            </main>

            {rightPanel && (
                <aside className={styles.rightPanel}>
                    {rightPanel}
                </aside>
            )}
        </div>  
    )
}

export default MainLayout;
