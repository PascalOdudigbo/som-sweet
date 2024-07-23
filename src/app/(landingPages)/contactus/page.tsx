"use client"
import React, { useState } from 'react'
import "./_contactus.scss"
import { FormInput, TextArea } from '@/components'
import { sendContactEmail, ContactDetails } from '@/utils/contactPageUtils'

function ContactUs() {
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await sendContactEmail(contactDetails)
    // Reset form after submission
    setContactDetails({ name: "", email: "", message: "" })
  }

  return (
    <main id="contactus" className='contactus_main_container page_container flex_column_center'>
      <section className='contactus_subsections_container flex_row'>
        <section className='contactus_text_form_container flex_column'>
          <section className='top_text_section flex_column'>
            <h1 className='top_text_section_title'>GET IN TOUCH</h1>
            <p className='top_text_section_text'>Welcome to Som' Sweet, your go-to cake bakery in the UK! We are passionate about creating delicious and beautifully crafted cakes for all occasions. Whether it's a birthday, wedding, or any special celebration, our team is here to sweeten your moments with our delectable treats.</p>
          </section>

          <form className='contactus_form flex_column' onSubmit={handleSubmit}>
            <FormInput
              label='Name'
              inputType='text'
              inputValue={contactDetails.name}
              required={true}
              readonly={false}
              onChangeFunction={(e) => setContactDetails({ ...contactDetails, name: e.target.value })}
            />

            <FormInput
              label='Email'
              inputType='email'
              inputValue={contactDetails.email}
              required={true}
              readonly={false}
              onChangeFunction={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
            />

            <TextArea
              label='Message'
              inputValue={contactDetails.message}
              required={true}
              rows={5}
              cols={45}
              onChangeFunction={(e) => setContactDetails({ ...contactDetails, message: e.target.value })}
            />

            <button type="submit" className='contactus_button border_button'>SEND MESSAGE</button>
          </form>
        </section>

        <section className='contactus_details_subsection flex_column'>
          <section className='contact_container'>
            <h1 className='contact_section_title'>PHONE</h1>
            <p className='contact_section_text'>+44793870248</p>

          </section>

          <section className='opening_hours_container flex_column'>
            <h1 className='contact_section_title'>OPENING HOURS</h1>
            <p className='contact_section_text'>Mon - Fri: 9am - 6pm</p>
            <p className='contact_section_text'>Saturday: 9am - 4pm</p>
            <p className='contact_section_text'>Sunday: Closed</p>
          </section>

          <section className='contact_container'>
            <h1 className='contact_section_title'>OUR LOCATION</h1>
            <p className='contact_section_text'>GL4 5XL, Old Rothman Road, Glasgow</p>
          </section>
        </section>
      </section>

      <iframe title="Som' Sweet's Location" className='contactus_map' src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=52.40790039969724,-1.4965874000000001`} />
    </main>
  )
}

export default ContactUs