'use client'
import React, { useState } from 'react'
import { NavChildFooterLayout } from '@/components'
import './_store_policies.scss'

function StorePolicies() {
   const [activePolicy, setActivePolicy] = useState<string | null>(null)

   const togglePolicy = (policyId: string) => {
      setActivePolicy(activePolicy === policyId ? null : policyId)
   }


   return (
      <NavChildFooterLayout>
         <main className='store_policies_container page_container flex_column_center'>
            <h1 className='section_title'>Store Policies</h1>

            <section className='policy_section' id='refund-policy'>
               <h2 onClick={() => togglePolicy('refund-policy')}>Refund Policy</h2>
               {activePolicy === 'refund-policy' && (
                  <pre className='policy_content'>
                     {`At Som' Sweet, we take pride in our delicious cakes and pastries. We want you to be completely satisfied with your purchase. However, due to the perishable nature of our products, we have a specific refund policy to ensure fairness and food safety.
  
1. Cancellation and Refunds Before Delivery:
   * You can cancel your order for a full refund up to 24 hours before the scheduled delivery time.
   * For custom orders, cancellations must be made at least 48 hours before the scheduled delivery time for a full refund.

2. Issues with Your Order:
   * If you receive the wrong item, we will replace it free of charge or provide a full refund.
   * If your order arrives damaged or of poor quality, please contact us within 2 hours of delivery with photos of the issue. We will offer a replacement or a full refund.

3. Taste Preference:
   * While we can't offer refunds based on personal taste preferences, we value your feedback. Please let us know if you're unsatisfied, and we'll work to make it right for future orders.

4. Delivery Issues:
   * If your order doesn't arrive at the scheduled time, please contact us immediately. We will either expedite the delivery or provide a full refund.

5. Allergies and Special Dietary Requirements:
   * We take allergies seriously. If you receive a product that doesn't match your specified dietary requirements, we will provide a full refund.

6. How to Request a Refund:
   * Contact our customer service team via phone or email within 2 hours of receiving your order.
   * Provide your order number and a brief explanation of the issue.
   * If applicable, include clear photos of the product.

7. Refund Processing:
   * Approved refunds will be processed within 3-5 business days.
   * Refunds will be issued to the original payment method.

8. Gift Orders:
   * For gift orders, refunds will be issued to the purchaser, not the recipient.

We're committed to your satisfaction. If you have any questions or concerns about our refund policy, please don't hesitate to contact us.`}
                  </pre>
               )}
            </section>

            <section className='policy_section' id='shipping-policy'>
               <h2 onClick={() => togglePolicy('shipping-policy')}>Shipping Policy</h2>
               {activePolicy === 'shipping-policy' && (
                  <pre className='policy_content'>
                     {`At Som' Sweet, we strive to deliver your delicious treats as quickly and safely as possible. Please review our shipping policy:

1. Delivery Areas:
   * We currently deliver to [list of areas or postal codes].
   * For areas outside our delivery zone, please contact us for special arrangements.

2. Delivery Times:
   * Standard delivery: Orders are typically delivered within 24-48 hours of placement.
   * Express delivery: Same-day delivery is available for orders placed before 10 AM, subject to availability.

3. Shipping Costs:
   * Standard delivery: Free for orders over £50, £5 for orders under £50.
   * Express delivery: £10 flat rate.

4. Order Tracking:
   * You will receive a confirmation email with your order details and estimated delivery time.
   * For real-time updates, please contact our customer service team.

5. Delivery Instructions:
   * Please provide specific delivery instructions (e.g., leave at door, call upon arrival) during checkout.

6. Perishable Items:
   * Our products are perishable. We recommend consuming them within 24-48 hours of delivery for optimal freshness.

7. Missed Deliveries:
   * If you're not available to receive your order, we'll leave it in a safe place if specified. Otherwise, we'll attempt redelivery the next day.

8. International Shipping:
   * We currently do not offer international shipping due to the perishable nature of our products.

For any questions or concerns about our shipping policy, please contact our customer service team.`}
                  </pre>
               )}
            </section>

            <section className='policy_section' id='privacy-policy'>
               <h2 onClick={() => togglePolicy('privacy-policy')}>Privacy Policy</h2>
               {activePolicy === 'privacy-policy' && (
                  <pre className='policy_content'>
                     {`At Som' Sweet, we value your privacy and are committed to protecting your personal information. This privacy policy outlines how we collect, use, and safeguard your data:

1. Information We Collect:
   * Personal information (name, address, email, phone number) for order processing and delivery.
   * Payment information (processed securely through our payment provider).
   * Order history and preferences to enhance your shopping experience.

2. How We Use Your Information:
   * To process and deliver your orders.
   * To communicate with you about your orders and our services.
   * To improve our products and services.
   * To send promotional offers (with your consent).

3. Data Protection:
   * We employ industry-standard security measures to protect your personal information.
   * We do not sell or share your personal information with third parties for marketing purposes.

4. Cookies:
   * We use cookies to enhance your browsing experience and analyze website traffic.
   * You can adjust your browser settings to refuse cookies, but this may limit some website functionality.

5. Third-Party Services:
   * We use trusted third-party services for payment processing, analytics, and email marketing.
   * These services have their own privacy policies and data protection measures.

6. Your Rights:
   * You have the right to access, correct, or delete your personal information.
   * You can opt-out of marketing communications at any time.

7. Policy Updates:
   * We may update this policy periodically. Please check back for any changes.

8. Contact Us:
   * If you have any questions or concerns about our privacy policy, please contact our customer service team.

By using our website and services, you consent to the terms of this privacy policy.`}
                  </pre>
               )}
            </section>

            <section className='policy_section' id='terms-of-service'>
               <h2 onClick={() => togglePolicy('terms-of-service')}>Terms of Service</h2>
               {activePolicy === 'terms-of-service' && (
                  <pre className='policy_content'>
                     {`Welcome to Som' Sweet. By using our website and services, you agree to comply with and be bound by the following terms and conditions:

1. Use of Website:
   * You must be at least 18 years old to use this website.
   * You agree to provide accurate and current information when creating an account or placing an order.
   * You are responsible for maintaining the confidentiality of your account information.

2. Product Information:
   * We strive to display our products as accurately as possible, but slight variations may occur.
   * We reserve the right to limit the quantities of any products or services we offer.

3. Pricing and Payment:
   * All prices are in GBP and are subject to change without notice.
   * We reserve the right to refuse or cancel any order for any reason.
   * Payment must be made in full at the time of ordering.

4. Intellectual Property:
   * All content on this website, including text, graphics, logos, and images, is the property of Som' Sweet and protected by copyright laws.

5. User-Generated Content:
   * By submitting reviews or comments, you grant Som' Sweet a non-exclusive license to use, reproduce, and publish this content.

6. Limitation of Liability:
   * Som' Sweet is not liable for any direct, indirect, incidental, or consequential damages resulting from the use of our products or services.

7. Governing Law:
   * These terms are governed by and construed in accordance with the laws of [Your Jurisdiction].

8. Changes to Terms:
   * We reserve the right to modify these terms at any time. Please review them periodically.

9. Contact Information:
   * For any questions regarding these terms, please contact our customer service team.

By using our website, you acknowledge that you have read, understood, and agree to be bound by these terms of service.`}
                  </pre>
               )}
            </section>
         </main>
      </NavChildFooterLayout>
   )
}

export default StorePolicies