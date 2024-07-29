import { showToast, ToastType } from "./toast";
import emailjs from '@emailjs/browser';

export type EmailDetails = {
    emailTitle: string;
    username: string;
    emailTo: string;
    notice: string;
    emailBody: string;
}

export const sendEmail = async (emailDetails: EmailDetails, status: ToastType, message: string): Promise<void> => {
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_EMAIL_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  
    if (!serviceID || !templateID || !publicKey) {
      console.error('Environment variables for email service are not set properly');
      showToast("error", 'Unable to send message due to configuration error');
      return;
    }
  
    const emailValues = {
      logo_text: "Som' Sweet",
      logo_color: "B8B5E4",
      email_title: `${emailDetails.emailTitle}`,
      user_name: `${emailDetails.username}`,
      email_to: `${emailDetails.emailTo}`,
      notice: `${emailDetails.notice}`,
      email_body: `
      Message Details:
      ${emailDetails.emailBody} 
      `
    };
  
    try {
      await emailjs.send(serviceID, templateID, emailValues, publicKey);
      showToast(status, 'Message sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      showToast("error", 'Failed to send message. Please try again later.');
    }
  };