import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Category from '../components/Category';

function Dashboard() {

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user]);

  return (
    <>
      <section className='heading'>
        <h1>Welcome { user && user.name } dashboard</h1>
        <br />
        <Category />
      </section>
    </>
  )
}

export default Dashboard