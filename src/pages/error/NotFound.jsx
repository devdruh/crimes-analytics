import { useRouteError } from 'react-router-dom'

const NotFound = () => {
  const error = useRouteError();
  // console.log(error," not found");
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      { error.statusText || error.message }
    </div>
  )
}

export default NotFound