import { useState } from 'react';
import '../assets/user-info.css';
import getCookie, {setCookie} from '../utils/getCookie';
import { useNavigate } from 'react-router-dom';

interface props{
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

const UserInfo:React.FC<props> = ({closeModal}) => {

const [name, setName]= useState<string>()
const [email, setEmail]= useState<string>()
const [password, setPassword]= useState<string>()
const navigate = useNavigate()
  const handleSubmit=()=>{
// const router = useRouter()
    closeModal(false)
    navigate('/message/1')
  }  
    return ( 
    <>
    <div className="popup">
        <form action="" className='info_form'>
            <input type="text" required onChange={(e:any)=> setName(e.target.value)} placeholder='Enter full name'  />
            <input type="email" required onChange={(e:any)=> setName(e.target.value)} placeholder='Enter Your email' />
            <input type="tel" required onChange={(e:any)=> setName(e.target.value)} placeholder='Enter phone number' />
            <button onClick={handleSubmit}>
                Submit
            </button>
        </form>
    </div>
    </> );
}
 
export default UserInfo;