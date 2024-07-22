"use client";
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import "./_signUp.scss"
import { userIcon, emailIcon, passwordIcon } from '@/assets'
import { NavChildFooterLayout } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import { signUp } from '@/utils/userManagement';

const FormInputWithIcon = dynamic(
  () => import('@/components/FormInputWithIcon/FormInputWithIcon'),
  { ssr: false }
)

function ClientOnlyForm({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}

function SignUp() {
  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const username = `${firstName} ${lastName}`.trim();
      await signUp({ username, email, password });
      showToast('success', 'Account created successfully');
      router.push('/signin');
    } catch (error) {
      console.error('Signup failed:', error);
      showToast('error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <NavChildFooterLayout>
      <main className='signUp_main_container page_container flex_column_justify_center'>
        <div className='signUp_form_and_image_container flex_column_justify_center'>
          <section className='form_wrapper'>
            <ClientOnlyForm>
              <form className='form' onSubmit={handleSubmit}>
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
                  autoComplete={"new-password"}
                  value={password}
                  setValue={setPassword}
                />

                <FormInputWithIcon
                  label='Confirm password'
                  required={true}
                  iconSrc={passwordIcon}
                  type='password'
                  hint='********'
                  autoComplete={"new-password"}
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                />

                <Link
                  className='forgot_password_link flex_row_center'
                  href={"/signin"}>Already have an account?</Link>
                <button type='submit' className='sign_up_button custom_large_button' disabled={isLoading}>
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
              </form>
            </ClientOnlyForm>
          </section>
        </div>
      </main>
    </NavChildFooterLayout>
  )
}

export default SignUp