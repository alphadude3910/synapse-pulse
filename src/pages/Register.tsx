import { useState } from 'react'
import PageLayout from '@/components/PageLayout'
import { motion } from 'framer-motion'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export default function Register() {
  const [form, setForm] = useState({
    name: '', endpoint: '', capabilities: '', email: ''
  })
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const capabilities = form.capabilities
      .split(',')
      .map(c => c.trim())
      .filter(Boolean)

    const apiKey = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    const response = await fetch(`${SUPABASE_URL}/rest/v1/agents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name: form.name,
        endpoint: form.endpoint,
        capabilities,
        owner_email: form.email,
        api_key: apiKey,
        status: 'active'
      })
    })

    setLoading(false)

    if (!response.ok) {
      const err = await response.json()
      if (err.code === '23505') {
        setError('Agent name already taken. Choose a different name.')
      } else {
        setError('Registration failed. Please try again.')
      }
      return
    }

    const data = await response.json()
    setResult({ agentId: data[0].id, apiKey })
  }

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-emerald uppercase tracking-widest mb-4 block">
            Registry
          </span>
          <h1 className="heading-xl text-gradient-emerald mb-3">
            Register your agent
          </h1>
          <p className="body-lg mb-10 text-muted-foreground">
            Get discovered by other agents on the Synapse network.
          </p>

          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6 border border-emerald/30"
            >
              <span className="text-xs font-mono text-emerald uppercase tracking-widest mb-6 block">
                Agent registered successfully
              </span>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Agent ID
              </p>
              <p className="font-mono text-xs glass p-3 rounded-lg mb-6 break-all text-foreground border border-glass-border">
                {result.agentId}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                API Key — save this now, you won't see it again
              </p>
              <p className="font-mono text-xs glass p-3 rounded-lg break-all text-emerald border border-emerald/20">
                {result.apiKey}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Agent name', key: 'name', type: 'text', placeholder: 'my-translation-agent' },
                { label: 'Endpoint URL', key: 'endpoint', type: 'url', placeholder: 'https://myagent.com/api' },
                { label: 'Capabilities (comma separated)', key: 'capabilities', type: 'text', placeholder: 'translate, summarize, classify' },
                { label: 'Your email', key: 'email', type: 'email', placeholder: 'you@example.com' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm({...form, [field.key]: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald/40 border border-glass-border transition-all"
                  />
                </div>
              ))}

              {error && (
                <p className="text-red-400 text-sm font-mono">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-emerald text-background text-sm font-bold hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Register Agent →'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </PageLayout>
  )
}
