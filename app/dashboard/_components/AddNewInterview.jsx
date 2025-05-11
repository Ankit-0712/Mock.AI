"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createChatSession } from '@/utils/GeminAIModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState("")
    const [jobDesc, setJobDesc] = useState("")
    const [jobExperience, setJobExperience] = useState("")
    const [chat, setChat] = useState(null)
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])
    const router = useRouter();
    const { user } = useUser()

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        console.log("User Inputs:")
        console.log("Job Position:", jobPosition)
        console.log("Job Description:", jobDesc)
        console.log("Years of Experience:", jobExperience)

        let currentChat = chat
        if (!currentChat) {
            currentChat = await createChatSession()
            setChat(currentChat)
        }

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}.
Based on these, give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5} interview questions with answers in JSON format.
The JSON should contain objects with "question" and "answer" fields.`

        const result = await currentChat.sendMessage(InputPrompt)
        let rawText = await result.response.text()

        
        rawText = rawText.replace(/```json|```/g, '').trim()

        let parsedJson = []
        try {
            parsedJson = JSON.parse(rawText)
        } catch (error) {
            console.error("❌ Failed to parse JSON:", error)
            console.log("⚠️ Raw response:", rawText)
            setLoading(false)
            return
        }

        console.log("✅ Parsed Interview Q&A JSON:", parsedJson)
        setJsonResponse(parsedJson)

        const resp = await db.insert(MockInterview).values({
            mockId: uuidv4(),
            jsonMockResp: rawText,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            cretedAt: moment().format('DD-MM-yyyy')
        }).returning({ mockId: MockInterview.mockId })

        console.log("🟢 Inserted into DB with ID:", resp)
        if (resp) {
            setOpenDialog(false);
            router.push(`/dashboard/interview/${resp[0].mockId}`);  // ✅ Correct path format
        }
        setLoading(false)
    }

    return (
        <div>
            <div
                className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>

            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Tell us more about your Job Interview
                        </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2 className="mb-6 font-bold">
                                        Add Details about your Job position/role, Job Description, and years of Experience 
                                    </h2>

                                    <div className='mt-7 mb-4'>
                                        <label className="block text-sm font-medium mb-2">
                                            Job Role/Job Position
                                        </label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            required
                                            value={jobPosition}
                                            onChange={(e) => setJobPosition(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className="block text-sm font-medium mb-2">
                                            Job Description/ Tech Stack (In Short)
                                        </label>
                                        <Textarea
                                            placeholder="Ex. React, NodeJs, ExpressJs, MySql etc"
                                            className="min-h-[100px]"
                                            required
                                            value={jobDesc}
                                            onChange={(e) => setJobDesc(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className="block text-sm font-medium mb-2">
                                            Years Of Experience
                                        </label>
                                        <Input
                                            placeholder="Ex. 4"
                                            type="number"
                                            required
                                            value={jobExperience}
                                            onChange={(e) => setJobExperience(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='flex gap-5 justify-end mt-6'>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setOpenDialog(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className='animate-spin mr-2' />
                                                Generating from AI...
                                            </>
                                        ) : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview
