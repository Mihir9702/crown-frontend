import React from 'react'
import { useUserSearchQuery, useUserQuery, useLogoutMutation } from '@/graphql'
import Image from 'next/image'
import Link from 'next/link'
import { Settings } from '@/components/Icons'
import { useRouter } from 'next/navigation'
import Icon from '@/assets/id.png'
import { Button } from '.'
import { tooltip } from '@/utils/Tooltip'
import { responseHandler } from '@/utils/responseHandler'

interface Props {
  path: string
  isOpts: React.Dispatch<React.SetStateAction<'all' | 'likes'>>
}

export default function UserCard(props: Props) {
  const router = useRouter()
  const [, logout] = useLogoutMutation()

  const [{ data }] = useUserSearchQuery({ variables: { nameid: props.path } })
  const id = data?.userSearch

  const [{ data: userData }] = useUserQuery()
  const ud = userData?.user

  const mine = ud?.id === id?.id

  const [error, ier] = React.useState<string | undefined>()

  const handleLogout = async () => {
    const response = await logout({})
    responseHandler({ response, setError: ier, router })
  }

  return (
    <main className="w-full flex-center min-w-[400px] justify-center mt-16">
      <section
        className={`flex flex-col items-end w-full max-w-sm pb-8 bg-[#121516] shadow-xl shadow-black rounded-xl ${
          !mine ? 'pt-12' : ''
        }`}
      >
        {error && <p className="text-red-500">{error}</p>}
        {mine && (
          <div className="flex flex-col items-center gap-2">
            <Link
              {...tooltip('Settings')}
              href={`/u/${id?.nameid}/settings`}
              className="text-gray-400 hover:text-gray-600 m-2 cursor-default"
            >
              {Settings}
            </Link>

            <button
              {...tooltip('Logout')}
              className="text-transparent bg-red-500 hover:bg-red-800 rounded-full p-2 cursor-default"
              onClick={() => handleLogout()}
            />
          </div>
        )}

        <div className="flex flex-col items-center place-self-center">
          <Image
            src={id?.photoid || Icon}
            className="mb-3 rounded-full shadow-lg"
            alt="user.photoid"
            width={96}
            height={96}
            priority
          />
          <h5 className="my-2 text-xl font-medium text-gray-200">{id?.nameid}</h5>
          <p>
            <span
              className={
                id?.likes! >= 1000
                  ? 'text-purple-700'
                  : id?.likes! >= 500
                  ? 'text-green-500'
                  : id?.likes! >= 100
                  ? 'text-yellow-400'
                  : 'text-blue-600'
              }
            >
              {id?.likes}
            </span>{' '}
            pts
          </p>
          <p className="mt-4 text-center">{id?.bio}</p>
          {mine && (
            <section className="flex mt-4 gap-4">
              <Button color="blue" onClick={() => props.isOpts('all')}>
                Your Posts
              </Button>

              <Button color="violet" onClick={() => props.isOpts('likes')}>
                Saved
              </Button>
            </section>
          )}
        </div>
      </section>
    </main>
  )
}
