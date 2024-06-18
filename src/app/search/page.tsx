'use client'

import React from 'react'
import Autocomplete from '../components/search'
import UserData from '../components/userdata'
import { useState, useEffect } from 'react';

export default function SearchPage(){

  const [userNames, setUserNames] = useState([]);

  async function getUsers() {
    const response = await fetch('https://api.github.com/users');
    const namedata = await response.json();
    return namedata;
  }
  
  async function getUserNames() {
    const users = await getUsers();
    const userNames = users.map((user: any) => user.login);
    return userNames;
     
  }

  useEffect(() => {
    const fetchData = async () => {
      const names = await getUserNames();
      setUserNames(names);
    };
  
    fetchData();
  }, []); // Empty dependency array to run only on mount

  return (
    <div>
      <Autocomplete suggestions={userNames} className="mt-10 flex justify-center" />
      <UserData />
    </div>
  );
  
}
