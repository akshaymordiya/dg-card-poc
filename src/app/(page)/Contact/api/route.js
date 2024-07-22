// import { validationSchema } from "../Schema";
// import { generateEmailTemplate } from "@/utils/templates";
// import { sendEmail } from "@/services/mail";

// export async function POST(request) {
//   try {
//     const data = await request.json();

//     // Validate data with Yup
//     await validationSchema.validate(data, { abortEarly: false });

//     // Send email
//     const emailResult = await sendEmail({
//       from: `"${data.name}"`,
//       to: process.env.EMAIL_ADD,
//       subject: 'PWA : New Contact Form Submission',
//       text: `Name: ${data.name}\nphone: ${data.phone}\nMessages: ${data.messages}`,
//       html: generateEmailTemplate(data)
//     });

//     if (!emailResult.success) {
//       return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
//     }

//     return new Response(JSON.stringify({ success: true }), { status: 200 });

//   } catch (err) {
//     console.log("err", err);
//     if (err.name === 'ValidationError') {
//       return new Response(JSON.stringify({ errors: err.errors }), { status: 400 });
//     }

//     return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });

//   }
// }