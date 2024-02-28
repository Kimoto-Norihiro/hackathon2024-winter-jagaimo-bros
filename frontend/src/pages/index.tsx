import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Quiz } from '@/components/quiz'

export const Home: NextPage = () => {
  return (
    <div>
      <Quiz></Quiz>
    </div>
  )
}

export default Home
