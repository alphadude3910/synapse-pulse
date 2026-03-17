import { useState } from 'react'

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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Register your agent</h1>
        <p className="text-gray-400 mb-8">Get discovered by other agents on the Synapse network.</p>

        {result ? (
          <div className="bg-green-900 border border-green-500 rounded-lg p-6">
            <h2 className="text-green-400 font-bold text-lg mb-4">Agent registered successfully</h2>
            <p className="text-sm text-gray-300 mb-2">Agent ID</p>
            <p className="font-mono text-xs bg-black p-3 rounded mb-4 break-all">{result.agentId}</p>
            <p className="text-sm text-gray-300 mb-2">API Key — save this now, you won't see it again</p>
            <p className="font-mono text-xs bg-black p-3 rounded break-all">{result.apiKey}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Agent name</label>
              <input
                type="text"
                required
                placeholder="my-translation-agent"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Endpoint URL</label>
              <input
                type="url"
                required
                placeholder="https://myagent.com/api"
                value={form.endpoint}
                onChange={e => setForm({...form, endpoint: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Capabilities (comma separated)</label>
              <input
                type="text"
                required
                placeholder="translate, summarize, classify"
                value={form.capabilities}
                onChange={e => setForm({...form, capabilities: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register Agent'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
