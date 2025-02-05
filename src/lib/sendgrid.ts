import type { SendGridEmailData } from '../types/email';

// Initialize SendGrid with API key from environment variable
const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  console.warn('SendGrid API key is not defined');
}

export async function sendEmail(emailData: SendGridEmailData): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn('Skipping email send - SendGrid API key not configured');
    return;
  }

  try {
    // Create a plain serializable object for the email
    const emailPayload = {
      to: emailData.to,
      from: {
        email: emailData.from,
        name: 'Learnally Team'
      },
      subject: emailData.subject,
      html: emailData.html
    };

    // Send the email using Netlify function endpoint
   const response = await fetch('/netlify/functions/send-email', 
   //const response = await //fetch('http://localhost:8888/netlify/functions/send-email',  
      {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload)
    });

    // Check if response has content before trying to parse JSON
    const contentType = response.headers.get('content-type');
    let errorData;
    
    if (contentType && contentType.includes('application/json')) {
      try {
        errorData = await response.json();
      } catch (parseError) {
        console.warn('Failed to parse error response:', parseError);
        errorData = { message: 'Unknown error occurred' };
      }
    } else {
      errorData = { message: await response.text() || 'Failed to send email' };
    }

    if (!response.ok) {
      throw new Error(errorData.message || 'Failed to send email');
    }

    console.log('Email sent successfully to:', emailData.to);
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message
      });
    }
    throw error;
  }
}