import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, phone, projectType, dateRange, location, vision, referralSource } = await request.json()
    
    // Validate the input
    if (!name || !email || !projectType || !dateRange.from || !location || !vision || !referralSource) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format the date range
    const formattedDateRange = dateRange.to
      ? `${dateRange.from.toString()} - ${dateRange.to.toString()}`
      : dateRange.from.toString()

    // Send email using Resend
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Update this with your verified domain
      to: process.env.CONTACT_EMAIL as string,
      subject: `New Project Inquiry from ${name} - ${projectType}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Project Type: ${projectType}
Date: ${formattedDateRange}
Location: ${location}

Vision:
${vision}

Referral Source: ${referralSource}
      `,
      reply_to: email
    })
    
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 