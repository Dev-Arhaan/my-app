'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function UserData() {

    const [userData, setUserData] = useState('');
    const [userName, setUserName] = useState('');

    async function fetchData(userName){
        try {
            const response = await fetch("http://localhost:3000/API/userData?address=" + userName);
            const jsonData = (await response.json()).data;
            setUserData(jsonData) 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData("mojombo")
    }, [])
  
    return (
        
        <main className="font-bold text-2xl flex justify-center">
            <div className='mt-10 border border-stone-400 rounded-md shadow-md shadow-stone-500 p-5 m-3 text-center'>

            
        <article>
            <Image
            className='mb-10 rounded-md shadow-md shadow-stone-500'
            src={userData.avatar_url}
            width={500}
            height={500}
            alt="user Avatar"/>
            <h1 >{userData.id}, {userData.login}</h1>
            <h1 >{userData.name}</h1>
            <h1 ></h1>
            <div>
                <h1 >Followers : {userData.followers}</h1>
                <h1 >Following : {userData.following}</h1>
            </div>
            <h1 >Created at : {userData.created_at}</h1>
        </article>

        </div>
    </main>
    )
    
}