import React from 'react'
import Header from '../../../../../components/shared/Header'
import TranformationForm from '../../../../../components/shared/TransformationForm'
import { SearchParamProps, TransformationTypeKey } from '../../../../../types'
import { transformationTypes } from '../../../../../constants'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '../../../../../lib/actions/user.actions'
import { redirect } from 'next/navigation'

const AddTransormationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const transformation = transformationTypes[type]
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const user = await getUserById(userId)
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className='mt-10'>
        <TranformationForm
          action='Add'
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransormationTypePage
