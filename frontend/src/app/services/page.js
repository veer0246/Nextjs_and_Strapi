
import Blogs from "@/components/Blogs";
import Categories from "@/components/Categories";
import { headers } from "next/headers";

export const metadata = {
  title: "Services | MyNextApp",
  description: "Our services — placeholder list for the Next.js project."
};

const dummyServices = [
  {
    id: "1",
    title: "Web Development",
    description: "Building responsive and performant web applications."
  },
  {
    id: "2",
    title: "API Integration",
    description: "Connecting frontend to backend services securely."
  },
  {
    id: "3",
    title: "UI/UX Design",
    description: "Designing intuitive interfaces with Tailwind CSS."
  }
];

async function fetchCategories(params) {
  // const options = {
  //   headers: {
  //     Authorization:`Bearer ${process.env.STRAPI_API_TOKEN}`
  //   }
  // }
  try {
    const res = await fetch("https://radiant-pleasure-e494182367.strapiapp.com/api/categories")
    const response = res.json();
    return response;
  } catch (error) {
    console.log(error)
  }
}
async function fetchBlogs(params) {
  // const options = {
  //   headers: {
  //     Authorization:`Bearer ${process.env.STRAPI_API_TOKEN}`
  //   }
  // }
  try {
    const res = await fetch("https://radiant-pleasure-e494182367.strapiapp.com/api/blogs?populate=*")
    const response = res.json();
    return response;
  } catch (error) {
    console.log(error)
  }
}
export default async function Services() {
  const categories = await fetchCategories();
  const blogs = await fetchBlogs();
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 pt-30">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      {/* <div className="grid gap-6 md:grid-cols-2">
        {dummyServices.map((s) => (
          <div key={s.id} className="border rounded-lg p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <p className="text-gray-600">{s.description}</p>
          </div>
        ))}
      </div> */}
      <div>
        <Categories categories={categories}/>
        <Blogs blogs={blogs}/>
      </div>
    </main>
  );
}
