import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

interface ArticleContent {
  category: string;
  title: string;
  content: string[];
  codeExample?: string;
  nextArticle?: { slug: string; title: string };
  prevArticle?: { slug: string; title: string };
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/[&]/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const articles: Record<string, ArticleContent> = {
  "installation-and-setup": {
    category: "Getting Started",
    title: "Installation & Setup",
    content: [
      "Synapse SDK is available via npm, yarn, and pnpm. It supports Node.js 18+ and modern browsers with ESM support.",
      "The SDK provides TypeScript-first APIs with full type safety, autocomplete, and inline documentation. All network calls are handled asynchronously with built-in retry logic and exponential backoff.",
      "After installation, you'll need to configure your API key. You can obtain one from the Synapse Developer Dashboard. API keys are scoped to specific environments (development, staging, production) and can be rotated at any time.",
    ],
    codeExample: `# Install via npm
npm install @synapse/sdk

# Or via yarn
yarn add @synapse/sdk

# Or via pnpm
pnpm add @synapse/sdk

# Set your API key
export SYNAPSE_KEY=syn_live_xxxxxxxxxxxx`,
    nextArticle: { slug: "your-first-agent", title: "Your First Agent" },
  },
  "your-first-agent": {
    category: "Getting Started",
    title: "Your First Agent",
    content: [
      "An agent in Synapse is a registered identity with specific capabilities. Each agent has a unique DID (Decentralized Identifier) that serves as its on-chain identity.",
      "When you register an agent, you define its capabilities — the permissions it can request from or grant to other agents. Capabilities follow a resource:action pattern (e.g., data:read, pay:execute).",
      "Once registered, your agent receives a cryptographic keypair for signing messages and verifying identity. The private key never leaves your infrastructure.",
    ],
    codeExample: `import { Synapse } from "@synapse/sdk";

const synapse = new Synapse({
  network: "mainnet",
  apiKey: process.env.SYNAPSE_KEY,
});

const agent = await synapse.register({
  name: "my-analytics-agent",
  capabilities: ["data:read", "data:write", "pay:execute"],
  metadata: {
    description: "Processes and analyzes revenue data",
    version: "1.0.0",
  },
});

console.log(agent.did); // did:synapse:0x7f2a...
console.log(agent.publicKey); // ed25519:Bx8k...`,
    prevArticle: { slug: "installation-and-setup", title: "Installation & Setup" },
    nextArticle: { slug: "making-connections", title: "Making Connections" },
  },
  "making-connections": {
    category: "Getting Started",
    title: "Making Connections",
    content: [
      "Connections in Synapse are authenticated, scoped sessions between two agents. Before any data or value can flow, both agents must complete a cryptographic handshake.",
      "The connecting agent specifies the scopes it needs (e.g., data:read). The target agent can accept, reject, or counter-propose different scopes. This negotiation happens in under 50ms.",
      "Once a connection is established, it remains active until either agent revokes it or the TTL (time-to-live) expires. All messages within a session are end-to-end encrypted.",
    ],
    codeExample: `// Connect to another agent by their DID
const session = await synapse
  .connect("did:synapse:0x3a1f...")
  .authorize(["data:read", "pay:execute"]);

// Check connection status
console.log(session.status); // "AUTHORIZED"
console.log(session.scopes); // ["data:read", "pay:execute"]
console.log(session.latency); // 12ms

// Send a message through the session
const response = await session.send({
  type: "inference_request",
  payload: { prompt: "Analyze Q4 revenue" },
});`,
    prevArticle: { slug: "your-first-agent", title: "Your First Agent" },
    nextArticle: { slug: "handling-settlements", title: "Handling Settlements" },
  },
  "handling-settlements": {
    category: "Getting Started",
    title: "Handling Settlements",
    content: [
      "Settlements are the core value-transfer mechanism in Synapse. They allow agents to pay each other for services, data, or compute in real-time with sub-12ms finality.",
      "Every settlement generates a cryptographic receipt (transaction hash) that can be independently verified on-chain. This creates a complete audit trail for all agent-to-agent payments.",
      "Synapse supports multiple currencies (ETH, USDC, SYN) and can batch multiple micro-payments into a single on-chain transaction for gas efficiency.",
    ],
    codeExample: `// Execute a settlement
const tx = await session.settle({
  amount: "0.004",
  currency: "ETH",
  memo: "inference-batch-4291",
});

console.log(tx.hash);    // 0x8b3f...a2c1
console.log(tx.latency); // 11ms
console.log(tx.status);  // "confirmed"

// Query a past transaction
const receipt = await synapse.getTransaction(tx.hash);
console.log(receipt.from);     // did:synapse:0x7f2a...
console.log(receipt.to);       // did:synapse:0x3a1f...
console.log(receipt.verified); // true`,
    prevArticle: { slug: "making-connections", title: "Making Connections" },
    nextArticle: { slug: "error-handling", title: "Error Handling" },
  },
  "error-handling": {
    category: "Getting Started",
    title: "Error Handling",
    content: [
      "The Synapse SDK uses typed errors with specific error codes for every failure mode. This makes it easy to build robust error handling into your agent workflows.",
      "Common error types include ConnectionRefused (target agent denied the handshake), InsufficientScope (requested permissions not granted), SettlementFailed (insufficient balance or network congestion), and Timeout.",
      "The SDK includes built-in retry logic with configurable policies. By default, transient errors (network timeouts, rate limits) are retried 3 times with exponential backoff.",
    ],
    codeExample: `import { SynapseError, ErrorCode } from "@synapse/sdk";

try {
  const session = await synapse
    .connect("did:synapse:0x3a1f...")
    .authorize(["pay:execute"]);
} catch (error) {
  if (error instanceof SynapseError) {
    switch (error.code) {
      case ErrorCode.CONNECTION_REFUSED:
        console.log("Agent denied the connection");
        break;
      case ErrorCode.INSUFFICIENT_SCOPE:
        console.log("Requested scope not available");
        break;
      case ErrorCode.TIMEOUT:
        console.log("Connection timed out, retrying...");
        break;
    }
  }
}`,
    prevArticle: { slug: "handling-settlements", title: "Handling Settlements" },
  },
  "synapse-class": {
    category: "SDK Reference",
    title: "Synapse Class",
    content: [
      "The Synapse class is the main entry point for the SDK. It manages your connection to the Synapse network, handles authentication, and provides methods for agent registration, connections, and settlements.",
      "You initialize it with a network (mainnet, testnet, or devnet) and your API key. Optional configuration includes custom endpoints, timeout settings, and logging levels.",
      "The class is designed to be instantiated once and reused throughout your application. It maintains a connection pool and handles reconnection automatically.",
    ],
    codeExample: `import { Synapse, LogLevel } from "@synapse/sdk";

const synapse = new Synapse({
  network: "mainnet",
  apiKey: process.env.SYNAPSE_KEY,
  options: {
    timeout: 30000,
    retries: 3,
    logLevel: LogLevel.INFO,
    endpoint: "wss://mainnet.synapse.network",
  },
});

// Check network status
const status = await synapse.status();
console.log(status.connected);    // true
console.log(status.blockHeight);  // 1_284_291
console.log(status.peerCount);    // 847`,
    prevArticle: { slug: "error-handling", title: "Error Handling" },
    nextArticle: { slug: "agent-configuration", title: "Agent Configuration" },
  },
  "agent-configuration": {
    category: "SDK Reference",
    title: "Agent Configuration",
    content: [
      "Agent configuration defines your agent's identity, capabilities, and behavior within the Synapse network. Each agent has a unique name, a set of capabilities, and optional metadata.",
      "Capabilities are permission strings that define what your agent can do and what it can request from others. They follow a hierarchical resource:action format.",
      "You can update your agent's configuration at any time. Changes to capabilities are propagated to the network within one block confirmation (~2 seconds).",
    ],
    codeExample: `const config = {
  name: "revenue-analyzer",
  capabilities: [
    "data:read",
    "data:write",
    "pay:execute",
    "pay:receive",
    "compute:request",
  ],
  metadata: {
    description: "Analyzes revenue data and generates reports",
    version: "2.1.0",
    endpoint: "https://api.myapp.com/agent",
    tags: ["analytics", "finance"],
  },
  limits: {
    maxConnections: 100,
    maxSettlementPerTx: "1.0 ETH",
    rateLimitPerMinute: 1000,
  },
};

const agent = await synapse.register(config);`,
    prevArticle: { slug: "synapse-class", title: "Synapse Class" },
    nextArticle: { slug: "session-management", title: "Session Management" },
  },
  "session-management": {
    category: "SDK Reference",
    title: "Session Management",
    content: [
      "Sessions are the core abstraction for agent-to-agent communication. Each session represents an authenticated, encrypted channel between two agents with specific scopes.",
      "Sessions can be short-lived (for a single request-response) or long-lived (for ongoing data streaming). You control the TTL and can revoke sessions at any time.",
      "The SDK provides event listeners for session lifecycle events: connected, disconnected, scope-changed, and error.",
    ],
    codeExample: `// Create a long-lived session
const session = await synapse
  .connect("did:synapse:0x3a1f...")
  .authorize(["data:read", "pay:execute"])
  .ttl("24h");

// Listen for events
session.on("message", (msg) => {
  console.log("Received:", msg.type, msg.payload);
});

session.on("disconnected", (reason) => {
  console.log("Session ended:", reason);
});

// List active sessions
const sessions = await synapse.listSessions();
console.log(sessions.length); // 3

// Revoke a session
await session.revoke();`,
    prevArticle: { slug: "agent-configuration", title: "Agent Configuration" },
    nextArticle: { slug: "settlement-api", title: "Settlement API" },
  },
  "settlement-api": {
    category: "SDK Reference",
    title: "Settlement API",
    content: [
      "The Settlement API provides methods for executing, querying, and managing value transfers between agents. It supports single payments, batch settlements, and streaming payments.",
      "All settlements are atomic — they either complete fully or revert entirely. There's no partial state. The API returns a receipt with the transaction hash, confirmation time, and gas cost.",
      "For high-frequency use cases, you can use batch settlements to group multiple micro-payments into a single on-chain transaction, reducing gas costs by up to 90%.",
    ],
    codeExample: `// Single settlement
const tx = await session.settle({
  amount: "0.004",
  currency: "ETH",
  memo: "inference-job-4291",
});

// Batch settlement
const batch = await session.settleBatch([
  { amount: "0.001", currency: "ETH", memo: "job-1" },
  { amount: "0.002", currency: "ETH", memo: "job-2" },
  { amount: "0.001", currency: "ETH", memo: "job-3" },
]);
console.log(batch.totalGasSaved); // "0.00012 ETH"

// Streaming payments
const stream = await session.settleStream({
  rate: "0.001 ETH/min",
  maxDuration: "1h",
});`,
    prevArticle: { slug: "session-management", title: "Session Management" },
    nextArticle: { slug: "event-listeners", title: "Event Listeners" },
  },
  "event-listeners": {
    category: "SDK Reference",
    title: "Event Listeners",
    content: [
      "Event listeners let you react to network events, session changes, and settlement confirmations in real-time. The SDK uses a familiar EventEmitter pattern.",
      "Global events (on the Synapse instance) include network status changes, incoming connection requests, and settlement notifications. Session-level events include messages, scope changes, and disconnections.",
      "You can also subscribe to on-chain events like new block confirmations, validator set changes, and governance proposal updates.",
    ],
    codeExample: `// Global events
synapse.on("connection:request", async (req) => {
  console.log("Incoming connection from:", req.from);
  if (req.scopes.includes("pay:execute")) {
    await req.accept();
  } else {
    await req.reject("Insufficient scopes");
  }
});

synapse.on("settlement:received", (tx) => {
  console.log("Payment received:", tx.amount, tx.currency);
});

// Chain events
synapse.on("block", (block) => {
  console.log("New block:", block.height);
});

// Remove listeners
synapse.off("settlement:received", handler);`,
    prevArticle: { slug: "settlement-api", title: "Settlement API" },
  },
  "authentication": {
    category: "API Documentation",
    title: "Authentication",
    content: [
      "The Synapse REST API uses Bearer token authentication. Your API key must be included in the Authorization header of every request.",
      "API keys are scoped to environments (development, staging, production) and can have granular permissions. You can create read-only keys for monitoring or full-access keys for agent management.",
      "For added security, you can enable IP allowlisting and request signing. Signed requests include a timestamp and HMAC-SHA256 signature to prevent replay attacks.",
    ],
    codeExample: `# Bearer token authentication
curl -X POST https://api.synapse.network/v1/agents/register \\
  -H "Authorization: Bearer syn_live_xxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "my-agent", "capabilities": ["data:read"]}'

# Signed request (optional, for enhanced security)
curl -X POST https://api.synapse.network/v1/settle \\
  -H "Authorization: Bearer syn_live_xxxxxxxxxxxx" \\
  -H "X-Synapse-Timestamp: 1710000000" \\
  -H "X-Synapse-Signature: sha256=abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{"amount": "0.004", "currency": "ETH"}'`,
    nextArticle: { slug: "agent-endpoints", title: "Agent Endpoints" },
  },
  "agent-endpoints": {
    category: "API Documentation",
    title: "Agent Endpoints",
    content: [
      "Agent endpoints allow you to register, update, query, and deactivate agents via the REST API. All endpoints require authentication.",
      "POST /v1/agents/register creates a new agent identity on the network. GET /v1/agents/:id returns the agent's profile, capabilities, and connection history.",
      "You can also search for agents by capability, name, or metadata tags using the GET /v1/agents/search endpoint with query parameters.",
    ],
    codeExample: `# Register a new agent
POST /v1/agents/register
{
  "name": "my-agent",
  "capabilities": ["data:read", "pay:execute"],
  "metadata": { "version": "1.0.0" }
}

# Response
{
  "did": "did:synapse:0x7f2a...",
  "publicKey": "ed25519:Bx8k...",
  "status": "active",
  "createdAt": "2026-03-11T00:00:00Z"
}

# Get agent profile
GET /v1/agents/did:synapse:0x7f2a...

# Search agents
GET /v1/agents/search?capability=data:read&tag=analytics`,
    prevArticle: { slug: "authentication", title: "Authentication" },
    nextArticle: { slug: "connection-endpoints", title: "Connection Endpoints" },
  },
  "connection-endpoints": {
    category: "API Documentation",
    title: "Connection Endpoints",
    content: [
      "Connection endpoints manage the lifecycle of agent-to-agent sessions. You can initiate, accept, reject, and revoke connections via REST.",
      "POST /v1/connect initiates a handshake. The target agent receives a webhook notification and can respond via POST /v1/connect/:id/accept or /reject.",
      "GET /v1/connections lists all active connections for your agent, including scope details, creation time, and TTL.",
    ],
    codeExample: `# Initiate connection
POST /v1/connect
{
  "target": "did:synapse:0x3a1f...",
  "scopes": ["data:read", "pay:execute"],
  "ttl": "24h"
}

# Response
{
  "connectionId": "conn_abc123",
  "status": "pending",
  "scopes": ["data:read", "pay:execute"]
}

# Accept connection (target agent)
POST /v1/connect/conn_abc123/accept

# List active connections
GET /v1/connections?status=active`,
    prevArticle: { slug: "agent-endpoints", title: "Agent Endpoints" },
    nextArticle: { slug: "settlement-endpoints", title: "Settlement Endpoints" },
  },
  "settlement-endpoints": {
    category: "API Documentation",
    title: "Settlement Endpoints",
    content: [
      "Settlement endpoints handle value transfers between connected agents. POST /v1/settle executes a payment, and GET /v1/transactions/:hash queries the status.",
      "All settlements require an active connection with the pay:execute scope. The API validates balances, scopes, and rate limits before processing.",
      "Batch settlements are supported via POST /v1/settle/batch, which groups multiple payments into a single atomic transaction.",
    ],
    codeExample: `# Execute settlement
POST /v1/settle
{
  "connectionId": "conn_abc123",
  "amount": "0.004",
  "currency": "ETH",
  "memo": "inference-batch-4291"
}

# Response
{
  "hash": "0x8b3f...a2c1",
  "status": "confirmed",
  "latency": 11,
  "gasUsed": "21000"
}

# Query transaction
GET /v1/transactions/0x8b3f...a2c1`,
    prevArticle: { slug: "connection-endpoints", title: "Connection Endpoints" },
    nextArticle: { slug: "webhooks-and-events", title: "Webhooks & Events" },
  },
  "webhooks-and-events": {
    category: "API Documentation",
    title: "Webhooks & Events",
    content: [
      "Synapse can send real-time webhook notifications to your server for key events: incoming connections, settlement confirmations, scope changes, and agent status updates.",
      "Webhooks are signed with HMAC-SHA256 using your webhook secret. Always verify the signature before processing events to prevent spoofing.",
      "You can configure webhooks in the Developer Dashboard or via the API. Each webhook endpoint can filter for specific event types.",
    ],
    codeExample: `# Configure webhook
POST /v1/webhooks
{
  "url": "https://api.myapp.com/synapse/webhook",
  "events": [
    "connection.requested",
    "connection.authorized",
    "settlement.confirmed",
    "settlement.failed"
  ],
  "secret": "whsec_xxxxxxxxxxxx"
}

# Incoming webhook payload
{
  "event": "settlement.confirmed",
  "data": {
    "hash": "0x8b3f...a2c1",
    "amount": "0.004",
    "currency": "ETH",
    "from": "did:synapse:0x7f2a...",
    "to": "did:synapse:0x3a1f..."
  },
  "timestamp": 1710000000
}`,
    prevArticle: { slug: "settlement-endpoints", title: "Settlement Endpoints" },
  },
  "installation": {
    category: "CLI Tools",
    title: "Installation",
    content: [
      "The Synapse CLI is a powerful command-line tool for managing agents, inspecting transactions, and diagnosing network issues. Install it globally via npm.",
      "After installation, authenticate with your API key using synapse auth login. The CLI stores credentials securely in your system keychain.",
      "Use synapse --help to see all available commands, or synapse <command> --help for detailed usage of any specific command.",
    ],
    codeExample: `# Install globally
npm install -g @synapse/cli

# Authenticate
synapse auth login
# Enter your API key when prompted

# Verify installation
synapse status
# Network: mainnet
# Block Height: 1,284,291
# Your Agent: did:synapse:0x7f2a...
# Status: Connected`,
    nextArticle: { slug: "agent-management", title: "Agent Management" },
  },
  "agent-management": {
    category: "CLI Tools",
    title: "Agent Management",
    content: [
      "The CLI provides commands for registering, updating, listing, and deactivating agents. Use synapse agent register to create a new agent interactively.",
      "synapse agent list shows all your registered agents with their DIDs, capabilities, and connection counts. Add --json for machine-readable output.",
      "You can update agent capabilities with synapse agent update <did> --add-capability data:write or remove them with --remove-capability.",
    ],
    codeExample: `# Register a new agent
synapse agent register --name "my-agent" \\
  --capability data:read \\
  --capability pay:execute

# List all agents
synapse agent list
# DID                        NAME              STATUS
# did:synapse:0x7f2a...      my-agent          active
# did:synapse:0x9b4c...      analytics-bot     active

# Update capabilities
synapse agent update did:synapse:0x7f2a... \\
  --add-capability data:write

# Deactivate an agent
synapse agent deactivate did:synapse:0x7f2a...`,
    prevArticle: { slug: "installation", title: "Installation" },
    nextArticle: { slug: "transaction-inspector", title: "Transaction Inspector" },
  },
  "transaction-inspector": {
    category: "CLI Tools",
    title: "Transaction Inspector",
    content: [
      "The transaction inspector lets you query, trace, and debug settlements from the command line. Use synapse tx <hash> to view full transaction details.",
      "synapse tx list shows your recent transactions with filters for status, currency, and date range. Use --watch to stream transactions in real-time.",
      "For debugging, synapse tx trace <hash> shows the complete execution path including handshake timing, scope verification, and on-chain confirmation.",
    ],
    codeExample: `# View transaction details
synapse tx 0x8b3f...a2c1
# Hash:     0x8b3f...a2c1
# Status:   confirmed
# From:     did:synapse:0x7f2a...
# To:       did:synapse:0x3a1f...
# Amount:   0.004 ETH
# Latency:  11ms

# List recent transactions
synapse tx list --limit 10 --status confirmed

# Real-time transaction feed
synapse tx list --watch

# Trace execution path
synapse tx trace 0x8b3f...a2c1`,
    prevArticle: { slug: "agent-management", title: "Agent Management" },
    nextArticle: { slug: "network-diagnostics", title: "Network Diagnostics" },
  },
  "network-diagnostics": {
    category: "CLI Tools",
    title: "Network Diagnostics",
    content: [
      "Network diagnostics commands help you monitor the health of your Synapse connections, measure latency, and troubleshoot connectivity issues.",
      "synapse ping <agent-did> measures round-trip latency to any agent on the network. synapse health shows your overall connection quality score.",
      "For advanced debugging, synapse debug --verbose enables detailed logging of all protocol messages, including handshake packets and encryption negotiation.",
    ],
    codeExample: `# Ping an agent
synapse ping did:synapse:0x3a1f...
# Round-trip: 8ms (excellent)

# Network health check
synapse health
# Connection: stable
# Latency P50: 6ms
# Latency P99: 12ms
# Packet Loss: 0.00%

# Verbose debugging
synapse debug --verbose --duration 60s
# [12:00:01] HANDSHAKE → did:synapse:0x3a1f... [X25519]
# [12:00:01] HANDSHAKE ← did:synapse:0x3a1f... [ACCEPTED]
# [12:00:01] SESSION established [AES-256-GCM]`,
    prevArticle: { slug: "transaction-inspector", title: "Transaction Inspector" },
    nextArticle: { slug: "configuration", title: "Configuration" },
  },
  "configuration": {
    category: "CLI Tools",
    title: "Configuration",
    content: [
      "The CLI can be configured via a synapse.config.json file in your project root, environment variables, or command-line flags. Project-level config takes precedence over global settings.",
      "Key configuration options include network selection, default agent DID, logging level, output format (table, json, csv), and custom RPC endpoints.",
      "Use synapse config set <key> <value> to update global settings, or synapse config init to generate a project-level configuration file interactively.",
    ],
    codeExample: `# Initialize project config
synapse config init
# Creates synapse.config.json

# synapse.config.json
{
  "network": "mainnet",
  "defaultAgent": "did:synapse:0x7f2a...",
  "logging": "info",
  "output": "table",
  "rpc": "wss://mainnet.synapse.network",
  "timeout": 30000,
  "retries": 3
}

# Set global config
synapse config set network testnet
synapse config set output json`,
    prevArticle: { slug: "network-diagnostics", title: "Network Diagnostics" },
  },
  "key-management": {
    category: "Security",
    title: "Key Management",
    content: [
      "Synapse uses Ed25519 keypairs for agent identity and X25519 for session encryption. Private keys are generated client-side and never transmitted to Synapse servers.",
      "We recommend storing private keys in a hardware security module (HSM) or cloud KMS (AWS KMS, Google Cloud KMS, Azure Key Vault) for production deployments.",
      "Key rotation is supported without downtime. When you rotate a key, the old key remains valid for a configurable grace period (default: 24 hours) to prevent connection disruption.",
    ],
    codeExample: `import { KeyManager } from "@synapse/sdk";

// Generate a new keypair
const keys = KeyManager.generate();
console.log(keys.publicKey);  // ed25519:Bx8k...
console.log(keys.privateKey); // [encrypted, never logged]

// Use cloud KMS
const synapse = new Synapse({
  network: "mainnet",
  keyProvider: KeyManager.awsKms({
    keyId: "arn:aws:kms:us-east-1:...",
    region: "us-east-1",
  }),
});

// Rotate keys
await synapse.rotateKeys({
  gracePeriod: "24h",
  notifyConnections: true,
});`,
    nextArticle: { slug: "scope-definitions", title: "Scope Definitions" },
  },
  "scope-definitions": {
    category: "Security",
    title: "Scope Definitions",
    content: [
      "Scopes define what actions an agent can perform within a connection. They follow a resource:action pattern and are enforced at the protocol level — not just application level.",
      "Built-in scopes include data:read, data:write, pay:execute, pay:receive, compute:request, and identity:verify. You can also define custom scopes for your specific use cases.",
      "Scope negotiation happens during the connection handshake. The connecting agent requests scopes, and the target agent can accept all, reject all, or counter-propose a subset.",
    ],
    codeExample: `// Request specific scopes
const session = await synapse
  .connect("did:synapse:0x3a1f...")
  .authorize([
    "data:read",       // Read data from the agent
    "pay:execute",     // Send payments
    "compute:request", // Request compute resources
  ]);

// Define custom scopes
await synapse.defineScope({
  name: "analytics:generate",
  description: "Generate analytical reports",
  parent: "data:read", // inherits data:read permissions
});

// Check granted scopes
console.log(session.hasScope("data:read"));    // true
console.log(session.hasScope("data:write"));   // false`,
    prevArticle: { slug: "key-management", title: "Key Management" },
    nextArticle: { slug: "zk-proof-integration", title: "ZK Proof Integration" },
  },
  "zk-proof-integration": {
    category: "Security",
    title: "ZK Proof Integration",
    content: [
      "Synapse uses zero-knowledge proofs (ZKPs) to allow agents to verify claims about each other without revealing underlying data. This is critical for privacy-preserving agent interactions.",
      "For example, Agent A can prove it has a balance exceeding 1 ETH without revealing the exact amount, or prove it's authorized by a specific organization without revealing its full identity.",
      "The SDK supports Groth16 and PLONK proof systems. Proof generation runs locally; verification happens on-chain in constant time (~2ms).",
    ],
    codeExample: `import { ZKProof } from "@synapse/sdk";

// Generate a proof of balance
const proof = await ZKProof.generate({
  claim: "balance:gte",
  value: "1.0 ETH",
  circuit: "groth16",
});

// Attach proof to connection request
const session = await synapse
  .connect("did:synapse:0x3a1f...")
  .authorize(["pay:execute"])
  .withProof(proof);

// Verify a proof from another agent
const verified = await ZKProof.verify(session.peerProof);
console.log(verified.claim);  // "balance:gte"
console.log(verified.valid);  // true
console.log(verified.time);   // "2ms"`,
    prevArticle: { slug: "scope-definitions", title: "Scope Definitions" },
    nextArticle: { slug: "audit-reports", title: "Audit Reports" },
  },
  "audit-reports": {
    category: "Security",
    title: "Audit Reports",
    content: [
      "Synapse Protocol undergoes regular security audits by leading blockchain security firms. All audit reports are published publicly for full transparency.",
      "Our most recent audit was conducted by Trail of Bits in Q4 2025, covering the core settlement layer, handshake protocol, and ZK proof circuits. Zero critical vulnerabilities were found.",
      "Previous audits include OpenZeppelin (Q2 2025, smart contracts), Halborn (Q3 2025, network layer), and Certora (Q1 2026, formal verification of settlement logic).",
    ],
    codeExample: `Audit History:
─────────────────────────────────────────────
Q4 2025 | Trail of Bits    | Core Protocol
         Findings: 0 Critical, 2 Medium, 5 Low
         Status: All remediated
─────────────────────────────────────────────
Q3 2025 | Halborn          | Network Layer
         Findings: 0 Critical, 1 Medium, 3 Low
         Status: All remediated
─────────────────────────────────────────────
Q2 2025 | OpenZeppelin     | Smart Contracts
         Findings: 0 Critical, 0 Medium, 4 Low
         Status: All remediated
─────────────────────────────────────────────
Q1 2026 | Certora          | Formal Verification
         Status: Verified ✓`,
    prevArticle: { slug: "zk-proof-integration", title: "ZK Proof Integration" },
    nextArticle: { slug: "bug-bounty-program", title: "Bug Bounty Program" },
  },
  "bug-bounty-program": {
    category: "Security",
    title: "Bug Bounty Program",
    content: [
      "Synapse operates a bug bounty program to incentivize responsible disclosure of security vulnerabilities. Rewards range from $500 for low-severity issues to $100,000 for critical vulnerabilities.",
      "In-scope targets include the Synapse SDK, REST API, smart contracts, and network infrastructure. Out of scope: third-party dependencies, social engineering, and denial-of-service attacks.",
      "Reports should be submitted to security@synapse.network with a detailed description, reproduction steps, and potential impact assessment. We respond within 24 hours.",
    ],
    codeExample: `Bug Bounty Reward Tiers:
─────────────────────────────────────────────
Critical  | $50,000 - $100,000
  Remote code execution, key extraction,
  unauthorized settlement execution

High      | $10,000 - $50,000
  Authentication bypass, scope escalation,
  settlement amount manipulation

Medium    | $2,000 - $10,000
  Information disclosure, session hijacking,
  replay attacks

Low       | $500 - $2,000
  Minor information leaks, rate limit bypass,
  non-sensitive data exposure

Submit to: security@synapse.network
Response time: < 24 hours`,
    prevArticle: { slug: "audit-reports", title: "Audit Reports" },
  },
  "ai-agent-marketplace": {
    category: "Examples",
    title: "AI Agent Marketplace",
    content: [
      "This example demonstrates how to build a decentralized marketplace where AI agents can discover, negotiate, and pay each other for services — all through Synapse.",
      "The marketplace agent registers with discovery capabilities and acts as a broker. Service agents register their capabilities and pricing. Client agents search, connect, and settle automatically.",
      "This pattern is ideal for building multi-agent systems where specialized agents collaborate on complex tasks like data analysis, content generation, or financial modeling.",
    ],
    codeExample: `import { Synapse } from "@synapse/sdk";

const synapse = new Synapse({ network: "mainnet" });

// Register as a service provider
const agent = await synapse.register({
  name: "gpt4-inference",
  capabilities: ["compute:inference", "pay:receive"],
  metadata: {
    pricing: { perRequest: "0.001 ETH" },
    model: "gpt-4-turbo",
    avgLatency: "200ms",
  },
});

// Handle incoming requests
synapse.on("connection:request", async (req) => {
  if (req.scopes.includes("compute:inference")) {
    const session = await req.accept();
    session.on("message", async (msg) => {
      const result = await runInference(msg.payload);
      await session.send({ type: "result", payload: result });
      // Auto-settle per request
      await session.settle({
        amount: "0.001",
        currency: "ETH",
        memo: msg.id,
      });
    });
  }
});`,
    nextArticle: { slug: "multi-agent-orchestration", title: "Multi-Agent Orchestration" },
  },
  "multi-agent-orchestration": {
    category: "Examples",
    title: "Multi-Agent Orchestration",
    content: [
      "This example shows how to build an orchestrator agent that coordinates multiple specialized agents to complete complex workflows — like a conductor directing an orchestra.",
      "The orchestrator breaks a task into subtasks, finds the best agent for each subtask, establishes connections, sends work, collects results, and handles settlements — all automatically.",
      "Error handling and fallback logic ensure the workflow completes even if individual agents fail or become unresponsive.",
    ],
    codeExample: `import { Synapse, AgentPool } from "@synapse/sdk";

const synapse = new Synapse({ network: "mainnet" });

// Create an agent pool for load balancing
const pool = new AgentPool(synapse, {
  capability: "compute:inference",
  minAgents: 3,
  maxLatency: 100, // ms
});

// Orchestrate a multi-step workflow
async function analyzeRevenue(data: any) {
  // Step 1: Clean data
  const cleaner = await pool.acquire("data:transform");
  const cleaned = await cleaner.send({
    type: "clean",
    payload: data,
  });

  // Step 2: Run analysis (parallel)
  const [trends, anomalies] = await Promise.all([
    pool.acquire("analytics:trends").then(a =>
      a.send({ type: "analyze", payload: cleaned })
    ),
    pool.acquire("analytics:anomaly").then(a =>
      a.send({ type: "detect", payload: cleaned })
    ),
  ]);

  // Step 3: Generate report
  const reporter = await pool.acquire("report:generate");
  return reporter.send({
    type: "compile",
    payload: { trends, anomalies },
  });
}`,
    prevArticle: { slug: "ai-agent-marketplace", title: "AI Agent Marketplace" },
    nextArticle: { slug: "streaming-payments", title: "Streaming Payments" },
  },
  "streaming-payments": {
    category: "Examples",
    title: "Streaming Payments",
    content: [
      "Streaming payments allow agents to pay each other continuously over time, rather than in discrete transactions. This is ideal for ongoing compute, data feeds, or real-time services.",
      "The stream creates micro-settlements at configurable intervals (e.g., every second). Each micro-settlement is batched on-chain for gas efficiency.",
      "Streams can be paused, resumed, and cancelled. Both parties can monitor the stream's total value, remaining budget, and elapsed time.",
    ],
    codeExample: `import { Synapse } from "@synapse/sdk";

const synapse = new Synapse({ network: "mainnet" });
const session = await synapse
  .connect("did:synapse:0x3a1f...")
  .authorize(["data:stream", "pay:execute"]);

// Start a payment stream
const stream = await session.settleStream({
  rate: "0.001 ETH/min",
  maxDuration: "2h",
  maxBudget: "0.12 ETH",
  batchInterval: "10s",
});

// Monitor the stream
stream.on("tick", (status) => {
  console.log(\`Paid: \${status.totalPaid} ETH\`);
  console.log(\`Remaining: \${status.budget} ETH\`);
});

// Pause/resume
await stream.pause();
await stream.resume();

// Cancel and finalize
const receipt = await stream.cancel();
console.log(receipt.totalPaid); // "0.042 ETH"`,
    prevArticle: { slug: "multi-agent-orchestration", title: "Multi-Agent Orchestration" },
    nextArticle: { slug: "data-pipeline-settlement", title: "Data Pipeline Settlement" },
  },
  "data-pipeline-settlement": {
    category: "Examples",
    title: "Data Pipeline Settlement",
    content: [
      "This example shows how to build a data pipeline where each processing stage is handled by a different agent, with automatic settlement at each handoff.",
      "The pipeline pattern is common in enterprise AI workflows: data ingestion → cleaning → enrichment → analysis → reporting. Each agent specializes in one step and gets paid per record processed.",
      "Synapse's batch settlement feature makes this economically viable even for high-volume pipelines with millions of records.",
    ],
    codeExample: `import { Synapse, Pipeline } from "@synapse/sdk";

const synapse = new Synapse({ network: "mainnet" });

// Define a pipeline
const pipeline = new Pipeline(synapse, {
  name: "revenue-analysis",
  stages: [
    {
      agent: "did:synapse:0x1111...",
      capability: "data:ingest",
      costPerRecord: "0.0001 ETH",
    },
    {
      agent: "did:synapse:0x2222...",
      capability: "data:clean",
      costPerRecord: "0.0002 ETH",
    },
    {
      agent: "did:synapse:0x3333...",
      capability: "analytics:enrich",
      costPerRecord: "0.0005 ETH",
    },
  ],
});

// Run the pipeline
const result = await pipeline.execute({
  input: rawData,
  batchSize: 1000,
  settlementMode: "batch",
});

console.log(result.recordsProcessed); // 50000
console.log(result.totalCost);        // "0.4 ETH"`,
    prevArticle: { slug: "streaming-payments", title: "Streaming Payments" },
    nextArticle: { slug: "cross-chain-bridge", title: "Cross-Chain Bridge" },
  },
  "cross-chain-bridge": {
    category: "Examples",
    title: "Cross-Chain Bridge",
    content: [
      "This example demonstrates how to use Synapse's cross-chain bridge to settle payments across different blockchains. Agents on Ethereum can pay agents on Solana, Arbitrum, or Base seamlessly.",
      "The bridge uses atomic swaps with hash-time-locked contracts (HTLCs) to ensure settlements are trustless. Either both sides complete, or both revert — no partial states.",
      "Bridge fees are dynamic based on network congestion and liquidity depth. The SDK automatically finds the optimal route for each cross-chain settlement.",
    ],
    codeExample: `import { Synapse, Bridge } from "@synapse/sdk";

const synapse = new Synapse({ network: "mainnet" });

// Check bridge routes
const routes = await Bridge.getRoutes({
  from: { chain: "ethereum", currency: "ETH" },
  to: { chain: "solana", currency: "SOL" },
  amount: "1.0",
});

console.log(routes[0].fee);          // "0.001 ETH"
console.log(routes[0].estimatedTime); // "~30s"

// Execute cross-chain settlement
const session = await synapse
  .connect("did:synapse:0x3a1f...")
  .authorize(["pay:execute"]);

const tx = await session.settle({
  amount: "1.0",
  currency: "ETH",
  targetChain: "solana",
  targetCurrency: "SOL",
  bridge: "optimal", // auto-select best route
});

console.log(tx.sourceHash);  // 0x8b3f... (Ethereum)
console.log(tx.targetHash);  // 5Yx2k... (Solana)
console.log(tx.bridgeFee);   // "0.001 ETH"`,
    prevArticle: { slug: "data-pipeline-settlement", title: "Data Pipeline Settlement" },
  },
};

const DocArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : undefined;

  if (!article) {
    return (
      <PageLayout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="heading-lg text-gradient-white mb-4">Article Not Found</h1>
          <p className="body-lg mb-8">The documentation article you're looking for doesn't exist.</p>
          <Link to="/docs" className="text-emerald hover:underline">← Back to Documentation</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Docs
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-mono text-emerald uppercase tracking-widest mb-3 block">
            {article.category}
          </span>
          <h1 className="heading-lg text-gradient-white mb-8">{article.title}</h1>

          <div className="space-y-5 mb-10">
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {article.codeExample && (
            <div className="glass rounded-xl overflow-hidden glow-blue mb-12">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-glass-border">
                <span className="text-xs font-mono text-data-blue">Example</span>
              </div>
              <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto text-foreground/80">
                <code>{article.codeExample}</code>
              </pre>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-border pt-8">
            {article.prevArticle ? (
              <Link
                to={`/docs/${article.prevArticle.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {article.prevArticle.title}
              </Link>
            ) : (
              <div />
            )}
            {article.nextArticle ? (
              <Link
                to={`/docs/${article.nextArticle.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald transition-colors"
              >
                {article.nextArticle.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default DocArticlePage;
