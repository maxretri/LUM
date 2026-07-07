'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, MessageCircle, Sliders } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIChatWidget() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Sync greeting message when language shifts
  useEffect(() => {
    const greeting = language === 'es'
      ? 'Hola. Soy el Asistente Inteligente de LUM. Puedo responder a cualquier pregunta sobre las especificaciones del SUV LUM V5, su autonomía (1000 km), la plataforma híbrida REEV, la seguridad, o ayudarle a configurar y reservar el suyo. ¿Cómo puedo ayudarle hoy?'
      : 'Hello. I am the LUM Intelligent Assistant. I can answer any questions about the specifications of the LUM V5 SUV, its range (1000 km), REEV hybrid platform, safety features, or help you configure and reserve yours. How can I assist you today?'
    
    setMessages([
      {
        role: 'assistant',
        content: greeting,
      },
    ])
  }, [language])

  // Reset hash when quote is launched to allow relaunching
  const handleLaunchConfigurator = () => {
    window.location.hash = ''
    setTimeout(() => {
      window.location.hash = 'quote'
    }, 50)
  }

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue
    setInputValue('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // Build history payload
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))
      history.push({ role: 'user', content: userMessage })

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, language }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'es'
            ? 'Lo sentimos, ocurrió un error técnico al conectar con el servidor de IA. Por favor, inténtelo de nuevo más tarde.'
            : 'Sorry, a technical error occurred while connecting to the AI server. Please try again later.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  // Helper to parse message text and extract trigger tokens without rendering them
  const renderMessageContent = (msg: Message) => {
    const triggerToken = '[TRIGGER_QUOTE_MODAL]'
    const hasTrigger = msg.content.includes(triggerToken)
    const cleanContent = msg.content.replace(triggerToken, '').trim()

    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs font-light leading-relaxed whitespace-pre-wrap">{cleanContent}</p>
        
        {hasTrigger && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-3 bg-stone-900 border border-stone-800 rounded-xl flex flex-col gap-2.5 shadow-md"
          >
            <div className="flex items-center gap-2">
              <Sliders size={12} className="text-white/60" />
              <span className="text-[10px] tracking-wider uppercase font-semibold text-white/80">
                {language === 'es' ? 'Configurador LUM V5' : 'LUM V5 Configurator'}
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-light leading-normal">
              {language === 'es'
                ? 'Seleccione pintura personalizada, paquete de carga y envíe su solicitud de reserva.'
                : 'Choose custom paint, charging package, and submit your reservation request.'}
            </p>
            <button
              onClick={handleLaunchConfigurator}
              className="w-full text-center py-2 bg-white text-stone-950 text-[10px] tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors rounded-md cursor-pointer shadow-sm"
            >
              {language === 'es' ? 'Configurar vehículo' : 'Configure Vehicle'}
            </button>
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 bg-stone-950 text-white rounded-full border border-stone-850 hover:border-stone-700 transition-all duration-300 shadow-xl cursor-pointer group"
          aria-label="Toggle AI assistant chat"
        >
          {/* Subtle pulse glow effect */}
          <span className="absolute -inset-0.5 rounded-full bg-stone-800/20 blur opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <MessageCircle size={20} className="text-white" strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Expanded Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-40 w-[350px] sm:w-[380px] h-[520px] max-h-[80vh] bg-stone-950/95 border border-stone-850/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-stone-900 bg-stone-950/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                <div>
                  <h4 className="text-xs font-medium text-white tracking-wide">LUM Assistant</h4>
                  <p className="text-[9px] text-stone-500 font-light mt-0.5">Qwen 3.6 Intelligent Agent</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-500 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5 scrollbar-thin">
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user'
                return (
                  <div
                    key={index}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3.5 rounded-xl ${
                        isUser
                          ? 'bg-stone-900 text-white rounded-br-none border border-stone-800/45'
                          : 'bg-stone-900/40 text-stone-300 rounded-bl-none border border-stone-900/60'
                      }`}
                    >
                      {isUser ? (
                        <p className="text-xs font-light leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        renderMessageContent(msg)
                      )}
                    </div>
                  </div>
                )
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-stone-900/40 border border-stone-900/60 text-stone-400 px-4 py-3 rounded-xl rounded-bl-none flex items-center gap-2">
                    <Loader2 size={12} className="animate-spin text-stone-500" />
                    <span className="text-[10px] tracking-wider uppercase font-light">
                      {language === 'es' ? 'Analizando...' : 'Analyzing...'}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Action Bar */}
            <div className="p-4 border-t border-stone-900 bg-stone-950/40 shrink-0 flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  language === 'es'
                    ? 'Pregunte sobre LUM V5 (potencia, autonomía)...'
                    : 'Ask about LUM V5 (power, range)...'
                }
                disabled={isLoading}
                className="flex-1 bg-stone-900/80 text-white text-xs border border-stone-850 px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-700 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-white text-stone-950 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center shadow-md"
                aria-label="Send message"
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
