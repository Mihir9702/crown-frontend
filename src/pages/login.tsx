import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation, useUserQuery } from '@/graphql'
import Link from 'next/link'
import { Button } from '@/components'
import { responseHandler } from '@/utils/responseHandler'

export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const [{ data }] = useUserQuery()
  const idx = data?.user
  const [, login] = useLoginMutation()
  const router = useRouter()

  if (idx) {
    router.push('/')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await login({
      params: { username, password },
    })

    responseHandler({ response, setError, router })
  }

  return (
    <main className="flex justify-center items-start bg-background h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-border p-8 mt-8 rounded-xl shadow-lg shadow-black py-12 flex flex-col items-start text-gray-300"
      >
        <h1 className="font-bold text-2xl text-gray-200">Login</h1>
        {error && <p className="text-red-500 my-4">{error}</p>}
        <div className="flex flex-col gap-6 mt-6">
          <input
            name={username}
            type="text"
            placeholder="Username"
            className="form-input"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            name={password}
            type="password"
            placeholder="Password"
            className="form-input"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Link href={'/signup'} legacyBehavior>
          <a className="text-gray-400 hover:text-gray-500 my-4 text-sm">Create Account</a>
        </Link>
        <Button type="submit" className="w-full" color="blue">
          Login
        </Button>
      </form>
    </main>
  )
}
