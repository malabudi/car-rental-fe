import { EmailAccCreatedTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_fvAKjNmH_FYaTEQVNMNpBGZULcR5N9W6s');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emailParams = {
        email: body.email
    }

    const data = await resend.emails.send({
      from: 'DriveShare <onboarding@resend.dev>',
      to: ['mohamadalabudi42@gmail.com'],
      subject: 'DriveShare - Account Created',
      text: '',
      react: EmailAccCreatedTemplate({ email:  emailParams.email }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
