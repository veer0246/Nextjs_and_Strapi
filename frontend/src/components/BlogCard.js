import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BlogCard({blog}) {
    const truncateBlogDec = blog.Description.length>50 ?
    blog.Description.substring(0, 50) + "...."
    : blog.Description

    // const ImgUrl = blog.img.url
    // console.log(ImgUrl)
    return (
        <div className='rounded-lg shadow-md p-4 mt-2 overflow-hidden border border-gray-600 cursor-pointer  bg-gray-200 '>
            <Link href={`/blog/${blog.id}`}>
            {blog.img.map((item)=>(
                <div key={item.id} className='relative w-full h-30'>
                    <Image layout='fill' objectFit='cover' src={item.formats.thumbnail.url} alt={""} className='rounded-t-lg' />
                </div>
            ))}
                <div className='p-2'>
                    <h2 className='text-xl font-semibold mb-2 overflow-ellipsis'>
                        {blog.Title}
                    </h2>
                    <p className='text-gray-600'>
                       {truncateBlogDec}
                    </p>
                </div>

            </Link>
        </div>
    )
}
