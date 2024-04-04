import { EmailPaymentToPayerTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_fvAKjNmH_FYaTEQVNMNpBGZULcR5N9W6s');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emailParams = {
        amount: body.amount,
        model: body.model,
        year: body.year
    }

    const data = await resend.emails.send({
      from: 'DriveShare <onboarding@resend.dev>',
      to: ['mohamadalabudi42@gmail.com'],
      subject: 'DriveShare - Payment Sent',
      text: '',
      react: EmailPaymentToPayerTemplate({ 
        amount: emailParams.amount,
        model:  emailParams.model, 
        year: emailParams.year
    }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
