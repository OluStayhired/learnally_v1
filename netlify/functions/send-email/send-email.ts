import { SendGridEmailData, EmailResponse } from '../types/email';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Method not allowed' 
    }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const emailData: SendGridEmailData = await req.json();

    // Validate email data
    if (!emailData.to || !emailData.from || !emailData.subject) {
      throw new Error('Missing required email fields');
    }

    // Send email using SendGrid
    await sgMail.send({
      to: emailData.to,
      from: emailData.from,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      templateId: emailData.templateId,
      dynamicTemplateData: emailData.dynamicTemplateData,
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Email sent successfully'
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('SendGrid error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to send email'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}