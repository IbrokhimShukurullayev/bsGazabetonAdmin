import React, {useEffect} from 'react'
import "./notfound.scss"
import { Link } from 'react-router-dom'

const NotFound = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  return (
    <div className='notfound'>
        <h1>404</h1>
        <p>Похоже, ничего не нашлось :(</p>
        <Link to={"/"}>На главную</Link>
    </div>
  )
}

export default NotFound