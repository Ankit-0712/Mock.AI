"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState, use } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback(props) {
  const params = use(props.params); // ✅ unwrap the params
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log("Fetched Feedback Items:", result.length);
    result.forEach((item, i) => {
      console.log(`Item ${i + 1}:`, item);
    });

    setFeedbackList(result);
  };

  const getAverageRating = (data) => {
    if (!data || data.length === 0) return 0;
    const total = data.reduce((acc, item) => acc + Number(item.rating || 0), 0);
    const average = total / data.length;
    return Math.round(average * 10) / 10;
  };

  return (
    <div className='p-10'>
      {feedbackList?.length === 0 ? (
        <h2 className='font-bold text-xl text-gray-500'>
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
          <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
          <h2 className='text-primary text-lg my-3'>
            Your overall interview rating: <strong>{getAverageRating(feedbackList)}/10</strong>
          </h2>
          <h2 className='text-sm text-gray-500'>
            Find below interview question with correct answer, your answer and feedback for improvement
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={item.id || index} className='mt-7'>
              <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
                {item.question || "Untitled Question"} <ChevronsUpDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-red-500 p-2 border rounded-lg'>
                    <strong>Rating:</strong> {item.rating ?? "N/A"}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                    <strong>Your Answer: </strong>{item.userAns || "N/A"}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                    <strong>Correct Answer: </strong>{item.correctAns || "N/A"}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'>
                    <strong>Feedback: </strong>{item.feedback || "N/A"}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
