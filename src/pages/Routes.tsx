import React, { ElementType, lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Header from '../components/Header';

const loadable = (Component: ElementType) => (props: any)=>{
    return (
    <Suspense fallback={<h1>... loading </h1>}>
        {<Component {...props}/>}
    </Suspense>)
}

const Routes =  ()=>{
    return useRoutes([
        {
            path: '',
            element: <Header/>,
            children: [
                { element: <Home/>, index:true },
                {
                    path: 'auth',
                    children: [
                        { path:"login", element: <Login/> }
                    ]
                },
            ]
        },
        
        {
            path:'*',
            element: <h1>404 not found</h1>
        }
    ])
}
export default Routes;
const Home = loadable(lazy(()=> import('./home')));
const Login = loadable(lazy(()=>import('./login')));


