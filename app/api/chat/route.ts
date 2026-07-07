import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { messages, language } = await request.json()

    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      console.error('OpenRouter API key is missing from environment variables.')
      return NextResponse.json(
        { success: false, error: 'AI Assistant is not configured yet. Please set OPENROUTER_API_KEY.' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a premium, highly knowledgeable AI Sales & Configuration Specialist for LUM Automotive. Your goal is to represent the LUM brand with utmost refinement and guide the visitor towards configuring their own vehicle.

Vehicle Specifications (LUM V5):
- Concept: Next-generation intelligent SUV developed on BEV and REEV (Range-Extended Electric Vehicle) platforms.
- Powertrain (LUM V5 REEV): 1.5L naturally aspirated generator engine (70 kW output, Euro V / China VI-B compliance, weight 98 kg). The gasoline engine does NOT drive the wheels directly, it only generates electricity.
- Electric Drive: Liquid-cooled, rear-wheel drive permanent magnet motor with flat-wire winding, delivering 170 kW peak power and 320 Nm peak torque. Single-speed reduction ratio is 11.361 : 1, max motor speed 16,000 rpm.
- Battery: 40 kWh LFP (Lithium Iron Phosphate) pack with liquid heating and cooling thermal management.
- Range (WLTC): Pure electric range is 210 km. Total combined range (gas + battery) is 1,000 km. 50 L fuel tank capacity, fuel consumption is 6.3 L/100 km.
- Performance: 0-100 km/h acceleration in 8.5 seconds.
- Chassis: Front independent MacPherson suspension, rear independent multi-link suspension. Tuned by an international team (John from Australia, Lam from Malaysia) for roll stability and comfort. Dual Electric Power Steering (D-EPS) speed-sensitive steering.
- Braking: OneBox brake-by-wire system for maximum braking efficiency.
- Safety: High-strength steel construction with 31,000 Nm/degree torsional rigidity. Driver, passenger, side, and curtain airbags. Tested against frontal rigid barrier (50FRB), offset deformable barrier (56ODB), side pole impact (32SPI), and mobile deformable barrier (50MDB).

Behavior Guidelines:
- Style: Professional, polite, sophisticated, premium (luxury automotive tone). Keep replies concise and structured.
- Language: You MUST respond in ${language === 'es' ? 'Spanish' : 'English'}. All communication must be strictly in this language.
- Goal: Answer questions about the LUM V5 and guide the user towards placing a quote request.
- Triggering the Configurator: If the user expresses interest in ordering, configuring, buying, getting a quote, or booking a test drive/allocation, output "[TRIGGER_QUOTE_MODAL]" at the very end of your response. The chat interface will detect this and show a premium inline card to launch the configurator.`

    const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions'

    const response = await fetch(openRouterUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://lum-website.vercel.app',
        'X-Title': 'LUM Website AI Assistant',
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.6-plus', // Active Qwen 3.6 Plus model on OpenRouter
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error response:', errorText)
      return NextResponse.json({ success: false, error: 'OpenRouter API returned error status' }, { status: 500 })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || ''

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('AI Chat Error:', error)
    const errMsg = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}
