import { useState, useEffect } from 'react'
import PageLayout from '@/components/PageLayout'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

interface Agent {
  id: string
  name: string
  endpoint: string
  capabilities: string[]
  status: string
  created_at: string
}

export default function Discover() {
  const [query, setQuery] = useState('')
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const search = async (capability: string) => {
    setLoading(true)
    setSearched(true)

    const url = capability.trim()
      ? `${SUPABASE_URL}/rest/v1/agents?capabilities=cs.{${capability.trim()}}&status=eq.active&order=created_at.desc`
      : `${SUPABASE_URL}/rest/v1/agents?status=eq.active&order=created_at.desc`

    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    })

    const data = await response.json()
    setAgents(data)
    setLoading(false)
  }

  useEffect(() => {
    search('')
  }, [])

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-emerald uppercase tracking-widest mb-4 block">
            Discovery
          </span>
          <h1 className="heading-xl text-gradient-white mb-3">
            Find an agent
          </h1>
          <p className="body-lg text-muted-foreground mb-10">
            Search the Synapse AI registry by capability. Every agent listed here is registered and active.
          </p>

          {/* Search bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by capability — translate, summarize, classify..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search(query)}
              className="w-full glass rounded-lg pl-11 pr-32 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald/40 border border-glass-border transition-all"
            />
            <button
              onClick={() => search(query)}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-emerald text-background text-xs font-bold hover:brightness-110 transition-all"
            >
              Search
            </button>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-20">
              <span className="text-xs font-mono text-emerald animate-pulse">Searching registry...</span>
            </div>
          ) : agents.length === 0 && searched ? (
            <div className="text-center py-20 glass rounded-xl">
              <p className="text-muted-foreground mb-4">No agents found for that capability.</p>
              <Link to="/register" className="text-emerald text-sm font-mono hover:underline">
                Register the first one →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs font-mono text-muted-foreground mb-6">
                {agents.length} agent{agents.length !== 1 ? 's' : ''} found
              </p>
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="glass rounded-xl p-6 hover:border-emerald/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{agent.name}</h3>
                      <p className="text-xs font-mono text-muted-foreground break-all">{agent.endpoint}</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded-full bg-emerald/10 text-emerald shrink-0">
                      {agent.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {agent.capabilities.map(cap => (
                      <button
                        key={cap}
                        onClick={() => { setQuery(cap); search(cap); }}
                        className="text-xs font-mono px-2 py-1 rounded-full glass border border-glass-border text-muted-foreground hover:text-emerald hover:border-emerald/40 transition-all"
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    ID: {agent.id}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  )
}
