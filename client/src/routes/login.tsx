import { createFileRoute } from '@tanstack/react-router'
import SigninForm from '../forms/SigninForm'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {

  return <div>
    <h1 className='text-2xl text-amber-600 text-center mt-16 font-semibold'>Welcome Back</h1>
    <h6 className='text-center text-sm'>Please enter your details to log in</h6>
    <SigninForm />
  </div>
}
