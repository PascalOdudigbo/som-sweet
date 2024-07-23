"use client";
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import "./_signin.scss"
import { emailIcon, passwordIcon } from '@/assets'
import { Loading, NavChildFooterLayout } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
// Import the useAuth hook
import { useAuth } from '@/contexts/AuthProvider'

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

function SignIn() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  // Use the login function from the auth context
  const { login } = useAuth(); 

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password); // Use the login function from the auth context
      showToast('success', 'Signed in successfully');
      router.push('/'); // Or wherever you want to redirect after successful login
    } catch (error) {
      console.error('Sign in failed:', error);
      showToast('error', 'Failed to sign in. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return <Loading/>;
  }

  return (
    <NavChildFooterLayout>
      <main className='signIn_main_container page_container flex_column_justify_center'>
        <div className='signIn_form_and_image_container flex_column_justify_center'>
          <section className='form_wrapper'>
            <ClientOnlyForm>
              <form className='form' onSubmit={handleSubmit}>
                <h3 className='signIn_form_title form_title'>Sign In</h3>

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
                  autoComplete={"current-password"}
                  value={password}
                  setValue={setPassword}
                />

                <Link
                  className='forgot_password_link flex_row_center'
                  href={"/forgot-password"}>forgot password?</Link>

                <button type='submit' className='sign_in_button custom_large_button' disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
                <p className='form_text_center flex_column_center'>or</p>
                <Link href={"/signup"} className='sign_up_button custom_large_button'>Create Account</Link>
              </form>
            </ClientOnlyForm>
          </section>
        </div>
      </main>
    </NavChildFooterLayout>
  )
}

export default SignIn