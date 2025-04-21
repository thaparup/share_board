import { createFileRoute } from '@tanstack/react-router'
import SigninForm from '../forms/SigninForm'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const sessionToken = JSON.parse(localStorage.getItem('session')!);

  if (sessionToken) {
    // The 'sessionToken' variable now holds the JWT token from local storage.
    console.log('JWT Token:', sessionToken);
    // You can now use the 'sessionToken' variable as needed.
  } else {
    // Handle the case where the 'session' item is not found in local storage.
    console.log('Session token not found in local storage.');
  }
  return <div>
    <h1 className='text-2xl text-amber-600 text-center mt-16 font-semibold'>Welcome Back</h1>
    <h6 className='text-center text-sm'>Please enter your details to log in</h6>
    <SigninForm />
  </div>
}
