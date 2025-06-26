import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from 'react-redux'
import { ContinueWithGoogle, getUserData, login } from '../redux/slices/authSlice.js'
import toast from 'react-hot-toast'
import { json, useNavigate } from 'react-router-dom'
function GoogleAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = async()=>{
        const auth = getAuth(app)
        const Provider = new GoogleAuthProvider()
        Provider.setCustomParameters({prompt: 'select_account'})
        try {
            const resultFromGoogle = await signInWithPopup(auth, Provider)

            const data = {
                email: resultFromGoogle?.user?.email,
                fullName: resultFromGoogle?.user?.displayName,
                avatar: resultFromGoogle?.user?.photoURL
            }

            await dispatch(ContinueWithGoogle(data))
            
            navigate("/")
            

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <button
            type='button'
            onClick={handleClick}
            className="btn btn-info  hover:btn-outline hover:opacity-60 font-semibold w-full transition-all ease-in-out duration-300 cursor-pointer">
            <AiFillGoogleCircle  /> Continue with Google
        </button>
    </div>
  )
}

export default GoogleAuth
