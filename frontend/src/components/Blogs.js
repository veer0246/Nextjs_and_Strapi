'use client'
import { useContext } from "react";
import BlogCard from "./BlogCard";
import { CategoryContext } from "@/app/context/CategoryContext";

export default function Blogs({blogs}) {
    const {category} = useContext(CategoryContext);

    const filterBlogs = blogs.data.filter((blog)=>{
        return blog.categories.some(
            (cat)=> cat.Title === category
        )
    });
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {/* {blogs?.data?.map((item)=>( */}
            {filterBlogs.map((item)=>(
            <div key={item.id}>
                <BlogCard blog={item} />
            </div>
            ))}
        </div>
    )
}
