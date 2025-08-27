// 'use client'

// import ShareCard from '@/components/Card'

// export default function AboutPage() {
//   return (
//     <div className="container mt-4">
//       <h1 className="h4 mb-4">Share Card to WhatsApp</h1>
//       <ShareCard
//         imageSrc="/laptop2.jpg"
//         text="This is a demo card text for sharing."
//         phoneNumber="+916390686448"
//       />
//     </div>
//   )
// }

'use client'

import ShareCard from '@/components/Card'

export default function AboutPage() {
  // Array of cards
  const cards = [
    {
      imageSrc: '/laptop2.jpg',
      name:'Laptop',
      text: 'This is the first demo card.',
      phoneNumber: '+916390686448',
    },
    {
      imageSrc: '/img2.jpg',
      name:'Veer',
      text: 'Second card example for WhatsApp sharing.',
      phoneNumber: '+916390686448',
    },
    {
      imageSrc: '/img.jpg',
      name:'XYZ',
      text: 'Another card with a different number.',
      phoneNumber: '+916390686448',
    },
  ]

  return (
    <div className="container mt-4 pt-25">
      <h1 className="h4 mb-4">Share Cards to WhatsApp</h1>
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-md-4 mb-4">
            <ShareCard
              imageSrc={card.imageSrc}
              name={card.name}
              text={card.text}
              phoneNumber={card.phoneNumber}
            />
          </div>
        ))}
      </div>
    </div>
  )
}



