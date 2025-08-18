'use client'

import React, { useContext, useLayoutEffect } from "react";
import Category from "./Category";
import { CategoryContext } from "@/app/context/CategoryContext";

export default function Categories({categories}) {
    const {changeCategory}= useContext(CategoryContext)

    useLayoutEffect(()=>{
        changeCategory(categories?.data[0].Title)
    }, []);

  return (
    <div className="flex gap-3 mt-3">
        {categories?.data?.map((category)=>(
            <div key={category.id}>   
                <Category cat={category}/>
                 </div>     

        ))}
    </div>
  )
}
