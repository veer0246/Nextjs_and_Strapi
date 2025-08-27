import Image from "next/image";
import Link from "next/link";


async function fetchBlog(id) {
  // const options = {
  //   headers: {
  //     Authorization:`Bearer ${process.env.STRAPI_API_TOKEN}`
  //   }
  // }
  try {
    const res = await fetch(`https://radiant-pleasure-e494182367.strapiapp.com/api/blogs?filters[id][$eq]=${id}&populate=*`)
    const response = await res.json();
    console.log(response)
    return response;
  } catch (error) {
    console.log(error)
  }
}
export default async function page({params}) {
    const blog = await fetchBlog(params.id)
    console.log(blog)
    return (
        <div className="max-w-3xl mx-auto p-4 pt-20">
            <Link href="/services">{"< Back"}</Link>
            {blog?.data?.map((item)=>(
                item.img.map((imgUrl)=>(

                <div key={item.id} className="relative w-full h-96 overflow-hidden rounded-lg mt-5">
                    <Image layout='fill' objectFit='cover' src={imgUrl.url} alt={""}/>
                </div>
                ))
            ))}
                {blog?.data?.map((item)=>(
                <div className="mt-4" key={item.id}>
                    <h1 className="text-3xl font-semibold">
                        {item.Title}
                    </h1>
                    <p className="text-gray-600 font-semibold">
                      {item.Description}
                    </p>
                    <div className="mt-4 flex items-center text-gray-600">
                        <span className="text-sm">
                            Publish on: {new Date(item.publishedAt).toLocaleString()}
                        </span>
                    </div>
                </div>
                ))}
        </div>
    )
}
