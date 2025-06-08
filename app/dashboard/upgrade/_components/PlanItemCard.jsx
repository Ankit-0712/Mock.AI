"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useRouter } from 'next/navigation'

function PlanItemCard({ plan }) {
  const { user } = useUser()
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()

    if (plan.name.toLowerCase() === 'free') {
      // Redirect to dashboard for Free plan
      router.push('/dashboard')
    } else {
      // Open payment link in new tab for other plans
      const url = plan.paymentLink + '?prefilled_email=' + user?.primaryEmailAddress.emailAddress
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">
          {plan.name}
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {plan.cost}$ </strong>
          <span className="text-sm font-medium text-gray-700">/month</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        {plan.offering.map((item, index) => (
          <li key={index} className="flex items-center gap-1 mb-2">
            <h2 className="text-gray-700">{item.value}</h2>
          </li>
        ))}
      </ul>

      <button
        onClick={handleClick}
        className="mt-8 w-full rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      >
        Get Started
      </button>
    </div>
  )
}

export default PlanItemCard
