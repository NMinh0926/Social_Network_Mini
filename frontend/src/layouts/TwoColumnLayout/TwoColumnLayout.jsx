import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './TwoColumnLayout.module.css'

function TwoColumnLayout() {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}><Sidebar /></aside>
      
      <main className={styles.main}><Outlet /></main>
    </div>
  )
}

export default TwoColumnLayout;