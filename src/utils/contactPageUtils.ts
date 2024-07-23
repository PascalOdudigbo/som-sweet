import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

export type ContactDetails = {
  name: string;
  email: string;
  message: string;
};

export const sendContactEmail = async (contactDetails: ContactDetails): Promise<void> => {
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_EMAIL_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceID || !templateID || !publicKey) {
    console.error('Environment variables for email service are not set properly');
    toast.error('Unable to send message due to configuration error');
    return;
  }

  const emailValues = {
    logo_text: "Som' Sweet",
    logo_color: "#B8B5E4",
    email_title: `Som' Sweet: New Contact Message from ${contactDetails.name}`,
    user_name: "Som' Sweet Team",
    email_to: "oinkoinkbakeryke@gmail.com",
    notice: "This is an automated message from your website's contact form.",
    email_body: `
    Message Details:
    Name: ${contactDetails.name}
    Email: ${contactDetails.email}
    Message: ${contactDetails.message}
    `
  };

  try {
    await emailjs.send(serviceID, templateID, emailValues, publicKey);
    toast.success('Message sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    toast.error('Failed to send message. Please try again later.');
  }
};