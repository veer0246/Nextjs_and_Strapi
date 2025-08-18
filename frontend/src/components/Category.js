import { CategoryContext } from "@/app/context/CategoryContext"
import { useContext } from "react"

export default function Category({cat}) {
    const {category, changeCategory}= useContext(CategoryContext)
  return (
    <div
    onClick={()=>changeCategory(cat.Title)}
    className={`${
        cat.Title ===category
        ? "bg-[#e36969] text-back" : "bg-[#232018] text-white"
    } p-2 rounded-lg shadow-md cursor-pointer`}>
     {cat.Title}
    </div>
  )
}
