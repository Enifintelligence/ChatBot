import {lazy} from 'react'
import {createBrowserRouter} from 'react-router-dom'

const ChatHome = lazy(()=>import('../pages/ChatHome'));
const SingleMessage = lazy(()=>import('../pages/SingleMessage'));
const ChatMessage = lazy(()=>import('../pages/ChatMessage'));
const AllMessages= lazy(()=>import('../pages/Messages'));
const Review= lazy(()=>import('../pages/Review'));

interface route {
    path:string;
    element:JSX.Element;
   
  }
export const routes:route[]= [
    {
        path:'/',
        element:<ChatHome/>,
        
    },
    {
        path:'/popup',
        element:<ChatMessage/>,
        
    },
    {
        path:'/message/:id',
        element:<SingleMessage/>,
        
    },
    {
        path:'/messages',
        element:<AllMessages/>,
        
    },
    {
        path:'/review',
        element:<Review/>,
        
    },
]


const router=  createBrowserRouter(routes)

export default router