import { Link } from 'react-router-dom'

import '../styles/Home.css'

const Home = () => (
    <div className='background'>
          <div className='welcome-card'>
            <h2 className='welcome-heading'>Click the below button to explore the properties</h2>
            <Link className='nav-link' to='/properties'><button className='btn'>Explore Properties Here</button></Link>
          </div>
      </div>
)

export default Home