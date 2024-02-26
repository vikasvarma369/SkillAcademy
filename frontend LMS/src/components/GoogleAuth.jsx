import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from 'react-redux'
import { ContinueWithGoogle, getUserData, login } from '../Redux/Slices/AuthSlice.js'
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
            console.log(resultFromGoogle)

            const data = {
                email: resultFromGoogle?.user?.email,
                fullName: resultFromGoogle?.user?.displayName,
                avatar: resultFromGoogle?.user?.photoURL
            }

            const res = await dispatch(ContinueWithGoogle(data))
            console.log("google data base responce :", res)
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
            className="btn btn-info  hover:btn-outline font-semibold w-full ">
            <AiFillGoogleCircle  /> Continue with Google
        </button>
    </div>
  )
}

export default GoogleAuth