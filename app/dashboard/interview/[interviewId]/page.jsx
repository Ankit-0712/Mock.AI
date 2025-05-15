"use client"
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { useParams } from 'next/navigation'
import Webcam from 'react-webcam'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Interview() {
  const params = useParams()
  const [interviewData, setInterviewData] = useState(null)
  const [webcamEnabled, setWebCamEnabled] = useState(false)

  useEffect(() => {
    if (!params?.interviewId) return

    const GetInterviewDetails = async () => {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))
      console.log(result)
      setInterviewData(result?.[0])
    }

    GetInterviewDetails()
  }, [params])

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 px-6">
      <h2 className='font-bold text-3xl mb-10 text-gray-800'>🎯 Let's Get Started</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl'>
        {/* Left Side - Interview Info */}
        {interviewData && (
          <div className='flex flex-col gap-6 justify-center'>
            <div className='p-6 rounded-xl border shadow-md bg-white'>
              <h2 className='text-xl font-semibold mb-2'>🚀 Job Role / Position</h2>
              <p className='text-gray-700'>{interviewData.jobPosition}</p>

              <h2 className='text-xl font-semibold mt-6 mb-2'>🧰 Tech Stack / Description</h2>
              <p className='text-gray-700'>{interviewData.jobDesc}</p>

              <h2 className='text-xl font-semibold mt-6 mb-2'>📅 Years Of Experience</h2>
              <p className='text-gray-700'>{interviewData.jobExperience}</p>
            </div>

            <div className='p-6 rounded-xl border border-yellow-300 bg-yellow-100 shadow-sm'>
              <h2 className='flex gap-2 items-center font-semibold text-yellow-600 text-lg mb-2'>
                <Lightbulb className='w-5 h-5' /> Important Information
              </h2>
              <p className='text-yellow-600'>{process.env.NEXT_PUBLIC_INFORMATION}</p>
            </div>
          </div>
        )}

        {/* Right Side - Webcam Section */}
        <div className='flex flex-col items-center justify-center gap-5 bg-white p-6 rounded-xl shadow-md'>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
                borderRadius: '12px',
                border: '1px solid #ccc'
              }}
            />
          ) : (
            <>
              <WebcamIcon className='h-72 w-full mb-2 p-20 bg-secondary rounded-lg border text-gray-400' />
              <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </>
          )}

          <Link href={`/dashboard/interview/${params.interviewId}/start`} className="w-full">
            <Button variant="default" className='w-full mt-2'>
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Interview
