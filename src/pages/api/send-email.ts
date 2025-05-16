import {Resend} from "resend"
import type { APIRoute } from "astro"
import { RESEND_API_KEY } from "astro:env/server"

export const prerender = false;

const resend = new Resend(RESEND_API_KEY)

export const POST: APIRoute = async ({request}) => {
    try{
        const {email, subject, message} = await request.json()
        await resend.emails.send({
            from: "Formulario <onboarding@resend.dev>",
            to: "danielscrip.zsh@gmail.com",
            subject: subject,
            replyTo: email,
            text: `Correo del cliente: ${email}\n\nMensaje:\n${message}`,
        });

        console.log('Resend email sent successfully');

        return new Response(JSON.stringify({ message: 'Correo enviado con éxito ✅' }), {
            status: 200,
          });
} catch (err){
    console.error('Error sending email with Resend:', err);

    return new Response(JSON.stringify({ message: "Error al enviar el correo 😵"}),{
        status: 500,
    })
  }
};