'use server';

import { z } from 'zod';

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResponse> {
  try {
    // Parse and validate form data
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    const validatedData = contactSchema.parse(rawData);

    // In production, you would send this to an email service
    // For now, we'll log it and return success
    console.log('Contact form submission:', validatedData);

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // Example:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   from: validatedData.email,
    //   subject: `Contact Form: ${validatedData.subject}`,
    //   html: emailTemplate(validatedData)
    // });

    // For demo purposes, simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      
      return {
        success: false,
        message: 'Please correct the errors in the form.',
        errors,
      };
    }

    console.error('Contact form error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    };
  }
}