// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export const metadata = {
//   title: "NextEdge",
//   description: "A full-stack website built with Next.js",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="font-sans bg-gray-50">
//         <Navbar />
//         <main className="p-4 min-h-screen">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'WhatsApp Share Card',
  description: 'Share card to WhatsApp',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}


