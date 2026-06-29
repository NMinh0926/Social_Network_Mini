import { usePage } from '../../context/PageContext.jsx'
import HomeTopbar from '../../components/Topbar/HomeTopbar/HomeTopbar.jsx'
import {useEffect} from 'react'
import HomeRightPanel from '../../components/RightPanel/HomeRightPanel.jsx'


function Home() {
  const { setTopbar, setRightPanel } = usePage();
  
  useEffect(() => {
    setTopbar(<HomeTopbar />)
    setRightPanel(<HomeRightPanel />)

    return () => {
      setTopbar(null)
      setRightPanel(null)
    }
  },[])
  return <div>Home Page</div>
}

export default Home;