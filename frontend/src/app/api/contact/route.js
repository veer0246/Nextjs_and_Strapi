// export async function POST(request) {
//   const data = await request.json();
//   // Simulate saving or emailing
//   return Response.json({ message: `Thank you, ${data.name}! We received your message.` });
// }

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Send data directly to Strapi Cloud API
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      body: formData // forward the same form data
    });

    const result = await strapiRes.json();

    if (!strapiRes.ok) {
      return new Response(JSON.stringify({ error: result.error }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
