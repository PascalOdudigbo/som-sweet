"use client";
import React, { useState, useEffect } from 'react'
import "./_signUp.scss"
import { userIcon, emailIcon, passwordIcon } from '@/assets'
import { FormInputWithIcon, NavChildFooterLayout } from '@/components';
import Link from 'next/link';

function SignUp() {
  //Declaring state variables fro controlled form input
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setComfirmPassword] = useState<string>("");

  useEffect(() => {

  }, []);

  return (
    <NavChildFooterLayout>
      <main className='signUp_main_container page_container flex_column_justify_center'>
        <div className='signUp_form_and_image_container flex_column_justify_center'>

          <section className='form_wrapper'>
            <form className='form'>
              <h3 className='form_title'>Create an account</h3>

              <FormInputWithIcon
                label='First name'
                required={true}
                iconSrc={userIcon}
                type='text'
                hint='john'
                autoComplete={"given-name"}
                value={firstName}
                setValue={setFirstName}
              />
              
              <FormInputWithIcon
                label='Last name'
                required={true}
                iconSrc={userIcon}
                type='text'
                hint='doe'
                autoComplete={"family-name"}
                value={lastName}
                setValue={setLastName}
              />

              <FormInputWithIcon
                label='Email'
                required={true}
                iconSrc={emailIcon}
                type='email'
                hint='johndoe@email.com'
                autoComplete={"email"}
                value={email}
                setValue={setEmail}
              />

              <FormInputWithIcon
                label='Password'
                required={true}
                iconSrc={passwordIcon}
                type='password'
                hint='********'
                autoComplete={"password"}
                value={password}
                setValue={setPassword}
              />

              <FormInputWithIcon
                label='Confirm password'
                required={true}
                iconSrc={passwordIcon}
                type='password'
                hint='********'
                autoComplete={"password"}
                value={confirmPassword}
                setValue={setComfirmPassword}
              />

              <Link
                className='forgot_password_link flex_row_center'
                href={"/signin"}>Already have an account?</Link>
                <button type='submit' className='sign_in_button custom_large_button'>Sign in</button>

            </form>
          </section>
        </div>

      </main>
    </NavChildFooterLayout>
  )
}

export default SignUp
