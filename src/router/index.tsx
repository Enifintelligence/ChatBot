import {lazy} from 'react'
import {createBrowserRouter} from 'react-router-dom'

const ChatHome = lazy(()=>import('../pages/ChatHome'));
const SingleMessage = lazy(()=>import('../pages/SingleMessage'));
const ChatMessage = lazy(()=>import('../pages/ChatMessage'));
const AllMessages= lazy(()=>import('../pages/Messages'));
const Review= lazy(()=>import('../pages/Review'));
const Faq= lazy(()=>import('../pages/Faq'));
const Help = lazy(()=>import('../pages/Help') )
interface route {
    path:string;
    element:JSX.Element;
   
  }
export const routes:route[]= [
    {
        path:'/:businessId',
        element:<ChatHome/>,
        
    },
    {
        path:'/popup',
        element:<ChatMessage/>,
        
    },
    {
        path:'/message/:id/:customerId',
        element:<SingleMessage/>,
        
    },
    {
        path:'/faqs',
        element:<Faq/>,
        
    },
    {
        path:'/messages',
        element:<AllMessages/>,
        
    },
    {
        path:'/review',
        element:<Review/>,
        
    },
    {
        path:'/help',
        element:<Help/>,
        
    },
]


const router=  createBrowserRouter(routes)

export default router