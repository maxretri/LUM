import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    // Fallback if environment variables are not set during local testing
    if (!token || !chatId) {
      console.warn('Telegram environment variables not set. Simulated notification success.')
      return NextResponse.json({ 
        success: true, 
        simulated: true, 
        warning: 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment variables.' 
      })
    }

    let text = ''
    if (type === 'quote') {
      text = `🚗 *New Spec Configuration & Quote Request*\n\n` +
             `*Contact Details:*\n` +
             `• Name: ${data.firstName} ${data.lastName}\n` +
             `• Email: ${data.email}\n` +
             `• Phone: ${data.phone}\n\n` +
             `*Configuration Details:*\n` +
             `• Vehicle model: LUM LEV 01\n` +
             `• Paint Work: ${data.color}\n` +
             `• Energy Package: ${data.energy}\n` +
             `• Base Price: €59,900\n` +
             `• Total Estimate: €${data.price.toLocaleString()}\n\n` +
             `*Consents:*\n` +
             `• Newsletter subscription: ${data.newsletter ? 'Yes' : 'No'}`
    } else if (type === 'contact') {
      text = `✉️ *New Contact Form Message*\n\n` +
             `*Contact Details:*\n` +
             `• Name: ${data.name}\n` +
             `• Email: ${data.email}\n\n` +
             `*Message Contents:*\n` +
             `• Subject: ${data.subject}\n` +
             `• Message:\n${data.message}`
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Telegram API error:', errText)
      return NextResponse.json({ success: false, error: 'Telegram API returned error status' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send Telegram error:', error)
    const errMsg = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}
