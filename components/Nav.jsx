'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [toggleDragDown, setToggleDragDown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' alt='Promptopia Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ?
          <div className='flex gap-3 md:gap-5'>
            <Link href="/creat-prompt" className='black_btn'>
              creat new post
            </Link>

            <botton type="botton" onClick={signOut} className="outline_btn">sign out</botton>

            <Link href="/profile">
              <Image src='/assets/images/logo.svg'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
          :
          (<>{
            providers && Object.values(providers).map((provider) =>
            (
              <button
                type='button'
                key={provider.name}
                onClick={() => { signIn(provider.id) }}
                className='black_btn'
              >
                Sign In
              </button>
            )
            )
          }
          </>)
        }

      </div>


      {/* Mobile Navigation */}
      <div className='sm:hidden relative'>
        {
          isUserLoggedIn ? (
            <div className='flex'>
              <Image src='/assets/images/logo.svg'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => { setToggleDragDown((prev) => !prev) }}
              />

              {
                toggleDragDown && (

                  <div className='dropdown'>
                    <Link href="/profile"
                      className='dropdown_link'
                      onClick={() => { setToggleDragDown(false) }}
                    >
                      My Profile
                    </Link>

                    <Link href="/create-prompt"
                      className='dropdown_link'
                      onClick={() => { setToggleDragDown(false) }}
                    >
                      Create Prompt
                    </Link>
                    <button type='button'
                      onClick={() => {
                        setToggleDragDown(false);
                        signOut();
                      }}
                      className='mt-5 w-full black_btn'
                    >
                      Sign Out
                    </button>
                  </div>
                )

              }


            </div>
          ) : (
            <>{providers && Object.values(providers).map((provider) =>
            (
              <button
                type='button'
                key={provider.name}
                onClick={() => { signIn(provider.id) }}
                className='black_btn'
              >
                Sign In
              </button>
            ))}
            </>
          )
        }
      </div>




    </nav>
  )
}

export default Nav