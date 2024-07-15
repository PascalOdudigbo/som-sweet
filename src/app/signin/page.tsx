"use client";
import React, { useState, useEffect } from 'react'
import "./_signin.scss"
import { emailIcon, passwordIcon } from '@/assets'
import { FormInputWithIcon, NavChildFooterLayout } from '@/components';
import Link from 'next/link';

function SignIn() {
  //Declaring state variables fro controlled form input
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {

  }, []);

  return (
    <NavChildFooterLayout>
      <main className='signIn_main_container page_container flex_column_justify_center'>
        <div className='signIn_form_and_image_container flex_column_justify_center'>

          <section className='form_wrapper'>
            <form className='form'>
              <h3 className='signIn_form_title form_title'>Sign In</h3>

              <FormInputWithIcon
                label='Email'
                required={true}
                iconSrc={emailIcon}
                type='text'
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

              <Link
                className='forgot_password_link flex_row_center'
                href={"/forgot-password"}>forgot password?</Link>

              <button type='submit' className='sign_in_button custom_large_button'>Sign in</button>
              <p className='form_text_center flex_column_center'>or</p>
              <Link href={"/signup"} className='sign_up_button custom_large_button'>Create Account</Link>

            </form>
          </section>
        </div>

      </main>
    </NavChildFooterLayout>
  )
}

export default SignIn
