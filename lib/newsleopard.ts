/**
 * Newsleopard (電子豹) API v1 Utility
 * Documentation: https://newsleopard.com/api/v1/
 */

const API_ENDPOINT = 'https://api.newsleopard.com/v1';

interface SendEmailParams {
  subject: string;
  content: string; // HTML content
  to_email: string;
  from_name?: string;
  from_email?: string;
}

export async function sendNewsleopardEmail({
  subject,
  content,
  to_email,
  from_name = process.env.NEWSLEOPARD_FROM_NAME || 'Doris AI 學院',
  from_email = process.env.NEWSLEOPARD_FROM_EMAIL || 'service@doris-ai-academy.com'
}: SendEmailParams) {
  const apiKey = process.env.NEWSLEOPARD_API_KEY;

  if (!apiKey) {
    console.error('NEWSLEOPARD_API_KEY is not set');
    throw new Error('Email service configuration missing');
  }

  try {
    // Newsleopard v1 Campaign API
    // Note: If this endpoint differs from the latest transactional API, 
    // it can be adjusted to use /campaign/single or similar if available.
    const response = await fetch(`${API_ENDPOINT}/campaign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        subject,
        from_name,
        from_email,
        content,
        // Using recipient_emails array which is standard for many EDM single-send APIs
        // or to_email string if it's a dedicated transactional endpoint.
        recipient_emails: [to_email] 
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Newsleopard API Error:', result);
      throw new Error(result.message || 'Failed to send email');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}
