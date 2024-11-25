import React, { useEffect, useState } from 'react'
import { db } from "../config/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { createContext } from "react";
import SHOP_DATA from '../data/ShopData';

export const DataContext = createContext(null)

const DataProvider = ({children}) => {
    const [data, setData] = useState(SHOP_DATA)

    const dataRef = collection(db,"products")

    const GetAllData = async ()=>{
      const response = await getDocs(dataRef)
      const filteredData = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(filteredData);      
    }

    useEffect(() => {
      GetAllData()
    }, [])
    
    
  return (   
    <DataContext.Provider value={data} >
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider