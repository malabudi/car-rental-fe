import { EmailBookedCarToRenterTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_fvAKjNmH_FYaTEQVNMNpBGZULcR5N9W6s');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emailParams = {
        model: body.model,
        year: body.year,
        email: body.email
    }

    const data = await resend.emails.send({
      from: 'DriveShare <onboarding@resend.dev>',
      to: ['mohamadalabudi42@gmail.com'],
      subject: 'DriveShare - Car Booked',
      text: '',
      react: EmailBookedCarToRenterTemplate({ 
        model:  emailParams.model, 
        year: emailParams.year,
        bookerEmail: emailParams.email

    }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
