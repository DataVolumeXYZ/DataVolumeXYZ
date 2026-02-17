---
layout: post
title: "Axons for Agents: Building a Brain-Inspired Memory System for AI"
summary: How I'm using a graph database to give AI agents a memory system modeled after the human brain, and why flat markdown files just aren't cutting it anymore
author: JamesDBartlett3
feature-img: "assets/img/pexels/pexels-pixabay-373543_dark.jpg"
thumbnail: "assets/img/pexels/pexels-tara-winstead-8386440_cropped.jpg"
tags:
  - AI
  - Agents
  - Claude
  - Data Governance
  - GitHub Copilot
  - Graph
  - LadybugDB
  - MCP
  - Memory
  - Model Context Protocol
  - Neural Networks
  - Open Source
  - Python
excerpt_start: <!--excerpt-->
excerpt_separator: <!--more-->
published: true
---

<!--excerpt-->

If you've spent any significant amount of time working with AI agents, you've probably run into a frustrating limitation: they can remember individual facts between sessions, but they have no understanding of how those facts relate to each other. It's a lot like Leonard Shelby in _Memento_, who literally _marks down_ his memories on paper, polaroid photos, and tattoos. He can read any individual memory and know what it says, but he can't piece together how they all connect.

![Leonard Shelby from Memento](/assets/img/animated/memento-quotes-14-1025334382.gif) That's basically what your AI agent is doing with its markdown memory files: storing a flat collection of facts with no relational structure between them. It works for simple use cases, but it falls apart once your project's knowledge starts looking more like a web than a list. So, I've been building something I think is fundamentally better. I call it [**Axons for Agents**](https://github.com/JamesDBartlett3/Axons_4_Agents){:target="\_blank"}: a graph-based memory system modeled after how human brains actually store and retrieve information, with brain-like plasticity, memory compartmentalization, and an MCP server that lets AI agents use it as a native tool.

<!--more-->

> **⚠️ Disclaimer:** Axons for Agents is a brand-new, experimental project in active early-stage development. It is provided **as-is**, strictly for **testing and experimentation purposes only**. It is **not** production-ready, and should **not** be relied upon for any critical, commercial, or sensitive workloads. The APIs, schema, and data formats are subject to breaking changes without notice. The author makes no warranties, express or implied, regarding the software's fitness for any particular purpose, and assumes no liability for any damages, data loss, or other issues arising from its use. **Use at your own risk.**

# Table of Contents

<!-- prettier-ignore-start -->

- TOC
{:toc}
<!-- prettier-ignore-end -->

# Why I Started This Project

The **Axons for Agents** idea came from a very specific frustration. I'd been using AI agents extensively in my day-to-day work and hobbies, and I kept running into the same wall over and over: **context rot**. Not the kind where the AI forgets everything (markdown memory files handle basic recall well enough), but the kind where the AI can recite your project's facts back to you individually without understanding how any of them fit together. The relationships between decisions, constraints, trade-offs, and lessons learned were getting lost, and those relationships were often more valuable than the facts themselves.

![Memento](/assets/img/animated/memento-gifs-8-484607361.gif)

To stretch the _Memento_ analogy a bit further: imagine your AI agent has been working with you for several months on a complex project. Over that time, you've made dozens of architectural decisions, each one informed by specific constraints, trade-offs, and lessons learned. You've established standards and conventions, discovered edge cases, and built up a rich web of interconnected knowledge. Your AI's markdown memory file is like Leonard's collection of annotated polaroids. Each one captures a single fact with a handwritten note, and he can pick up any photo and read it. But he can't trace how one photo connects to another. He can't follow the thread from "this project's data model" to "general dimensional modeling best practices" to "our decision to use a star schema" to "the trade-off between query performance and storage efficiency." And just like Leonard's tattoos, those memory entries are static. There's no mechanism for them to change, strengthen, weaken, or be removed based on whether they're still relevant. Every fact is treated equally, regardless of where it came from, how recently it was added, what other facts it's connected to, how often it's been useful, etc.

If you've seen the film, then you know why this is so disorienting. The entire movie is structured in reverse, so the audience experiences Leonard's confusion firsthand. Each individual scene makes perfect sense on its own, but the connections between scenes are stripped away. You have all the pieces of the puzzle, but no picture on the box. That's what flat-file memory feels like from the AI's perspective: a pile of correct facts with no structure linking them together.

After numerous attempts to address this issue with various workarounds, I had a bit of a "light bulb" moment.
![Light bulb moment](/assets/img/animated/light-bulb-gru-1927168673.gif)

**Humans are innately adept at forming and navigating complex networks of connections between abstract concepts. What if an AI agent's memory system could be structured more like a human brain?**

# How the Human Brain Stores Memories

I'm not a neuroscientist, so I can't provide a detailed explanation of the underlying biology, but here's the basic idea: In the human brain, memories aren't stored in neat little files in a filing cabinet. They're stored as patterns of connections between neurons. When you recall a memory, you're not "opening a file." You're reactivating a specific pattern of neural connections. The key thing is that those connections are shared. The concept of "coffee" might be connected to "morning routine," "caffeine," "that cozy little bookshop/café in Denver," "the time I spilled a mochaccino on my laptop," and dozens of other memories and concepts. Each of those connected memories has its own connections to even more memories and concepts, forming a dense web of associations. This is why a smell can trigger a vivid childhood memory, or why hearing a song can remind you of a specific person. Rather than searching through a flat list of memories looking for a keyword match, your brain traverses a graph of associations, following connections from one memory to another.

The brain also actively manages its connections over time. Connections that get used frequently become stronger, while unused connections gradually weaken, and can eventually be pruned away entirely. On top of that, the brain can compartmentalize information, so you don't accidentally mix up your knowledge of French cooking with your knowledge of French grammar, even though both are stored in the same place and share some underlying neural structures. These are the concepts of **neural plasticity** and **compartmentalization**, and they're both central to what sets Axons for Agents apart from both the flat markdown file approach and other graph-based memory systems (more on that later).

# What Is Axons for Agents?

[Axons for Agents](https://github.com/JamesDBartlett3/Axons_4_Agents){:target="\_blank"} is a graph-based memory system for AI agents, powered by [LadybugDB](https://github.com/LadybugDB/ladybug){:target="\_blank"}, an embedded graph database that runs entirely within a Python process. It stores memories as "nodes" with rich relationships ("edges") between them, enabling associative recall based on shared concepts, keywords, topics, entities, and more. The name comes from [axons](https://en.wikipedia.org/wiki/Axon){:target="\_blank"}, the long, threadlike parts of nerve cells that transmit signals to other neurons. In the same way that axons connect neurons in the brain, the relationships in the Axons for Agents graph connect memories to each other and to the concepts, keywords, and entities that give them meaning.

## Flat Markdown Memory vs. Graph-Based Memory

If you've used AI Agents like [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview){:target="\_blank"} or [GitHub Copilot](https://github.com/features/copilot){:target="\_blank"}, you've probably seen their built-in memory features. These typically store memories as entries in a markdown file, simple key-value pairs or short notes that persist between sessions. It works, and for basic use cases it works fine. But there are some fundamental limitations:

### What Flat Files Can't Do

1. **No native relationships.** Finding related memories requires text search, which misses semantic connections entirely. If Memory A is about "data lineage" and Memory B is about "ETL pipelines," a flat file system won't know they're related unless both happen to contain the same keyword.
2. **No traversal.** You can't ask, "What memories are two hops away from this concept?" With a graph, you can follow the connections from a memory to its concepts, and from those concepts to other memories that share them, revealing connections that would be invisible in a flat file.
3. **No contradiction detection.** When new information conflicts with old, a flat file has no mechanism to flag the conflict. You just end up with two contradictory entries sitting side by side, and the AI has no way to know which one is current.
4. **No learning from usage.** Flat files treat all memories equally. There's no mechanism for frequently-used memories to become more prominent, or for stale, irrelevant memories to fade away. Every entry has the same weight, regardless of how often or recently it's been useful.
5. **No isolation.** Everything is in one file. There's no way to keep your personal project memories separate from your work project memories, or to prevent sensitive information from leaking across contexts.

### What the Graph Gives You

With the Axons for Agents approach, you get:

- **Associative recall**: Find all memories related to a concept within _N_ relationship hops, even if they don't share any keywords.
- **Decision tracing**: Follow the chain from a decision back through the memories that informed it.
- **Contradiction awareness**: When a new memory conflicts with an existing one, the system can flag it explicitly and track the resolution.
- **Contextual disambiguation**: The same keyword can mean different things in different project contexts, and the graph preserves that distinction.
- **Temporal queries**: Find memories from a specific time period, or trace the sequence of events that led to a particular outcome.
- **Adaptive learning**: Connections strengthen or weaken based on actual usage, so the most relevant memories naturally surface first.
- **Compartmentalized isolation**: Memories can be grouped and isolated with fine-grained data flow control.

## Architecture Overview

The system is structured as a proper Python package (`axons/`) with several key components:

1. **LadybugDB**: An embedded graph database written in C++ that runs in-process. No server, no Docker, no background services. Data is stored in a local directory (default: `~/.axons_memory_db`), and setup is just `pip install real_ladybug`.
2. **Python Client** (`axons/client.py`): The core client library that provides a clean API for creating, querying, and managing memories and their relationships, including brain plasticity operations and compartmentalization controls.
3. **MCP Server** (`axons/mcp/server.py`): A [Model Context Protocol](https://modelcontextprotocol.io/){:target="\_blank"} server built with [FastMCP](https://gofastmcp.com/){:target="\_blank"} that exposes 20+ memory operations as native tools for AI agents like Claude Code, GitHub Copilot, etc.
4. **Markdown Directory** (`src/directory.md`): A lightweight index of all nodes in the graph, exported as a markdown file for quick scanning at the start of a new conversation.

```
┌─────────────────────────────────────────────────────────┐
│  AI Agent (Claude, GitHub Copilot, etc.)                │
│  - Calls memory tools via MCP protocol                  │
└──────────────────────┬──────────────────────────────────┘
                       │
               MCP (JSON-RPC 2.0)
                       │
┌──────────────────────▼──────────────────────────────────┐
│  Axons MCP Server (axons/mcp/server.py)                 │
│  - 20+ tools: store, recall, search, plasticity, etc.   │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  Axons Client (axons/client.py)                         │
│  - Graph CRUD, plasticity, compartmentalization         │
│  - PlasticityConfig with 30+ tuneable parameters        │
└──────────────────────┬──────────────────────────────────┘
                       │
              In-process (embedded)
                       │
┌──────────────────────▼──────────────────────────────────┐
│  LadybugDB (embedded graph database)                    │
│  - C++, cross-platform, Cypher queries                  │
│  - Data persisted to ~/.axons_memory_db                 │
└─────────────────────────────────────────────────────────┘
```

## The Memory Graph Schema

The memory graph is a richly typed, multi-layered knowledge structure with 14 distinct node types. Here's what they represent:

### Core Nodes

- **Memory**: The fundamental unit. A piece of information with full content, a summary, a confidence score, access tracking metadata, and its own permeability setting.
- **Concept**: Abstract ideas that memories relate to (e.g., "data lineage," "performance optimization"). These provide semantic grouping.
- **Keyword**: Specific terms for exact matching (e.g., "star schema," "DAX"). These enable precise lookups.
- **Topic**: Broader subject areas (e.g., "Software Architecture," "User Preferences"). These give you high-level categorization.

### Entity and Source Nodes

- **Entity**: People, organizations, projects, tools, and technologies. These create natural hubs in the graph, since many memories tend to mention the same people, tools, and projects.
- **Source**: Where information came from (conversations, files, URLs). This enables provenance tracking, so the AI agent can answer questions like, "where did I learn this?", "what else do I know from that source?", and "how reliable is that source based on past interactions?"

### Intentional Nodes

- **Decision**: Choices made and their rationale. These can be traced back to the memories that informed them.
- **Goal**: User objectives with status tracking (active, achieved, abandoned).
- **Question**: Unresolved items and things to investigate, which can be partially answered by multiple memories.

### Contextual and Meta Nodes

- **Context**: Projects, tasks, conversations, and sessions. These are used for disambiguation, since the same keyword might mean different things in different projects.
- **Preference**: User likes/dislikes and working styles, accumulated over time.
- **TemporalMarker**: Time periods and sequences for time-based queries.
- **Contradiction**: Explicit tracking of when new information conflicts with old, preventing the system from serving outdated information.
- **Compartment**: Named boundaries for memory isolation with permeability controls, enabling data governance boundaries and context separation between projects.

All of these node types are connected by a rich set of typed relationships with properties like `relevance`, `strength`, `completeness`, `role`, and `permeability`. A single memory might be connected to several concepts, a handful of keywords, one or two topics, multiple entities, a decision it informed, a goal it supports, a context it belongs to, and a compartment that controls its data flow boundaries. Each of those nodes also has its own connections, creating the kind of multi-dimensional associative web that makes graph-based recall so powerful.

## The Database: LadybugDB

Axons for Agents is powered by [LadybugDB](https://github.com/LadybugDB/ladybug){:target="\_blank"}, an embedded graph database that runs in-process like SQLite. Data persists to a local directory, and the same code works identically on Windows, macOS, and Linux.

<details markdown="1">
<summary><b> How I ended up on LadybugDB (click to expand)</b></summary>

This project has actually gone through three different graph databases, each time for good reason.

I started with [Memgraph](https://memgraph.com/){:target="\_blank"}, a fast C++ graph database. It worked great for queries, but it required a client-server architecture, which meant running a separate database server, configuring WSL2 on Windows (Memgraph doesn't have a native Windows binary), setting up systemd services, and creating Windows Task Scheduler tasks to auto-start everything on boot. That was a nine-step setup process, and it was a non-starter for anyone who just wanted to experiment with **Axons for Agents** without having to spin up a database server and deal with platform-specific issues. I wanted something that was truly plug-and-play, with zero infrastructure requirements.

So, I then migrated to [KùzuDB](https://kuzudb.com/){:target="\_blank"}, an embedded graph database that solved all of those problems. It worked great on Windows, macOS, and Linux. But [Kùzu Inc. archived the project](https://www.theregister.com/2025/10/14/kuzudb_abandoned/){:target="\_blank"} recently, leaving the community without active maintenance, and no clear path forward for long-term stability. So, I was once again on the hunt for a new database, hopefully using the same API and Cypher dialect.

That brought me to [LadybugDB](https://github.com/LadybugDB/ladybug){:target="\_blank"}, the most active community fork of KùzuDB. It's led by Arun Sharma (ex-Facebook, ex-Google), has 400+ stars, ships monthly releases, and maintains an identical API and Cypher dialect to its predecessor. Fortunately, the migration was trivial: I only had to change the `pip` package name and `import` statement, and we were back in business with zero code changes to the client library or MCP server.

I did consider other options, but LadybugDB was really the only one that met all of my criteria for an embedded, cross-platform graph database with a Cypher query interface. Here's a quick rundown of the alternatives I evaluated:

| Database      | Why It Did or Didn't Make the Cut                                      |
| ------------- | ---------------------------------------------------------------------- |
| **Neo4j**     | JVM-based, 500MB+ RAM at idle, requires server setup                   |
| **Memgraph**  | Requires WSL on Windows, requires server, complicated setup            |
| **ArangoDB**  | AQL less intuitive for graphs, requires server                         |
| **SurrealDB** | Very new, still maturing                                               |
| **LadybugDB** | ✅ **Winner**: embedded, cross-platform, `pip install`, Cypher support |

</details>

# Brain Plasticity: Connections That Learn

This is probably the feature I'm most proud of, because it directly emulates how the human brain works. In your brain, synaptic connections aren't static. They change over time based on usage patterns. Connections that get used frequently become stronger (a process called **synaptic potentiation**), while connections that go unused gradually weaken (**synaptic depression**) and can eventually be removed entirely (**synaptic pruning**). There's also a well-known principle called **Hebbian learning**, often summarized as "neurons that fire together wire together," which means that memories that are frequently accessed together will develop stronger connections between them.

Axons for Agents implements all of these concepts:

```python
# Hebbian learning: memories accessed together strengthen their connection
client.apply_hebbian_learning([memory_id_1, memory_id_2, memory_id_3])

# Manual strengthening (synaptic potentiation)
client.strengthen_memory_link(memory_id_1, memory_id_2, amount=0.1)

# Weakening unused connections (synaptic depression)
client.weaken_memory_link(memory_id_1, memory_id_2, amount=0.1)

# Time-based decay of weak connections
client.decay_weak_connections(threshold=0.3, decay_amount=0.05)

# Prune near-zero connections (synaptic pruning)
client.prune_dead_connections(min_strength=0.01)

# Run a full maintenance cycle (decay + auto-prune)
client.run_maintenance_cycle()
```

### Why This Matters

Without plasticity, all connections are equally weighted. This loses critical information. A memory that mentioned Python once shouldn't be as connected to the Python concept as a memory entirely about Python. Memories frequently accessed together should become more strongly linked. And weak, rarely-reinforced connections can be pruned to focus on what matters. This lets the memory system learn and adapt based on actual usage patterns, not just how things were initially stored.

### Tuneable Configuration

All plasticity behavior is controlled by `PlasticityConfig`, which has 30+ tuneable parameters covering learning rates, strengthening curves, decay settings, pruning thresholds, retrieval effects, and Hebbian learning. Everything is on a clean 0-1 scale, and there are five built-in presets for common scenarios:

```python
from axons import MemoryGraphClient, PlasticityConfig, Curve

# Use a preset
client = MemoryGraphClient(plasticity_config=PlasticityConfig.aggressive_learning())

# Or go fully custom
config = PlasticityConfig(
    learning_rate=1.0,
    strengthen_amount=0.15,
    curve=Curve.EXPONENTIAL,        # Diminishing returns near limits
    decay_curve=Curve.LOGARITHMIC,  # Slow, gradual decay
    retrieval_strengthens=True,     # Accessing a memory strengthens its links
    retrieval_weakens_competitors=True,  # And weakens competing memories
    hebbian_creates_connections=True,    # Co-access creates new links
)
client = MemoryGraphClient(plasticity_config=config)
```

The five presets are: `default()` (balanced), `aggressive_learning()` (fast adaptation), `conservative_learning()` (slow and stable), `no_plasticity()` (manual control only), and `high_decay()` (aggressive forgetting for working-memory-like scenarios).

# Compartmentalization: Memory Isolation with Controlled Data Flow

The other major brain-inspired feature is compartmentalization. In your human brain, you keep your work for Client A separated from your work for Client B, even if the work you're doing for both clients is nearly identical, because you know that keeping sensitive data isolated and secure is crucial. Axons for Agents brings the same concept to AI memory with a system that combines compartments (virtual boundaries) and permeability (data flow rules) to tightly regulate the propagation of data between different nodes in the memory graph.

Each compartment has a **permeability** setting that controls the direction of data flow:

| Permeability      | Data Flows In? | Data Flows Out? | Use Case                                                           |
| ----------------- | -------------- | --------------- | ------------------------------------------------------------------ |
| `OPEN`            | Yes            | Yes             | Default — no restrictions                                          |
| `CLOSED`          | No             | No              | Complete isolation (e.g., PII, connection strings)                 |
| `OSMOTIC_INWARD`  | Yes            | No              | Secure projects that can _read_ external data but don't _leak_     |
| `OSMOTIC_OUTWARD` | No             | Yes             | Read-only knowledge bases that _share_ out but aren't _influenced_ |

The system implements a five-layer permeability check: source memory → source compartment(s) → connection → destination compartment(s) → destination memory. Any layer that blocks will block the entire data flow, and when a memory belongs to multiple compartments, **all** of them must allow the flow direction. With these fail-secure logic gates in place, you can create secure compartments for sensitive projects, shared compartments for common knowledge, and everything in between, all within the same memory graph. For example, you could create a secure compartment for a project that contains sensitive information, set its permeability to `OSMOTIC_INWARD` so it can read from the global knowledge but won't leak anything out, and then all memories created while that compartment is active will automatically be isolated within it:

```python
from axons import MemoryGraphClient, Compartment, Permeability

client = MemoryGraphClient()

# Create a secure project compartment
secure = Compartment(
    name="Project Q",
    permeability=Permeability.OSMOTIC_INWARD,
    allow_external_connections=False
)
compartment_id = client.create_compartment(secure)

# Set it as active — all new memories go here automatically
client.set_active_compartment(compartment_id)

# These memories are automatically isolated in Project Q
quick_store_memory(client, content="Secret architecture design", summary="Design doc")

# Clear active compartment to go back to global scope
client.set_active_compartment(None)
```

This is incredibly useful for scenarios where you're working on multiple projects with an AI agent and don't want sensitive information from one project leaking into the context of another.

# MCP Server: AI-Native Memory Access

The MCP server is implemented and working.[<sup>\*</sup>](#disclaimer) I think it really ties the whole project together. [Model Context Protocol (MCP)](https://modelcontextprotocol.io/){:target="\_blank"} is an open standard by Anthropic for connecting AI agents to external data sources and tools. The Axons MCP server exposes 20+ memory operations as native tools that AI agents can call directly.

So you can say things like "remember that our fact tables use INT64 surrogate keys" or "what do you know about the sales data model?" and your AI agent will interact with the memory graph behind the scenes, storing memories, querying related information, managing compartments, and running plasticity operations, all through natural conversation.

The MCP server is built with [FastMCP](https://gofastmcp.com/){:target="\_blank"} and exposes tools in four categories:

1. **Memory Tools**: `store_memory`, `recall_memory`, `search_memories`, `get_related`
2. **Association Tools**: `create_concept`, `create_keyword`, `create_topic`, `create_entity`, `link_concept`, and query methods for each
3. **Plasticity Tools**: `strengthen_connection`, `weaken_connection`, `run_maintenance`, `get_connection_stats`, `configure_plasticity`
4. **Compartmentalization Tools**: `create_compartment`, `add_to_compartment`, `set_active_compartment`, `set_permeability`, `check_data_flow`

# How Axons for Agents Compares to Other Graph-Based Solutions

I'm not the only one who's had the idea of using a graph database for AI memory. There are some impressive projects out there tackling the same problem from different angles. The two most prominent are [Mem0](https://github.com/mem0ai/mem0){:target="\_blank"} (47K+ GitHub stars, Y Combinator-backed) and [Graphiti](https://github.com/getzep/graphiti){:target="\_blank"} by Zep (22K+ stars). Both are excellent projects with strong communities. Where Axons for Agents differs most is in its brain-inspired plasticity system, multi-layer compartmentalization with permeability controls, zero-infrastructure embedded architecture, and the fact that it works through the agent's existing tool-use capabilities rather than requiring a separate LLM API.

<details markdown="1">
<summary><b>Detailed comparisons with Mem0 and Graphiti (click to expand)</b></summary>

## Mem0

[Mem0](https://github.com/mem0ai/mem0){:target="\_blank"} (pronounced "mem-zero") is a popular open-source project that provides a "universal memory layer for AI agents." It's backed by Y Combinator, has over 47,000 stars on GitHub, and offers both a self-hosted option and a managed platform.

Mem0's approach centers around automatic memory extraction: you feed it conversations, and it uses an LLM to identify and store relevant memories. It supports graph-based storage (via Neo4j) as an option, alongside vector stores for semantic search.

**Where Mem0 shines:**

- Mature, well-funded project with a large community
- Automatic memory extraction from conversations
- Multi-level memory (User, Session, Agent)
- Cross-platform SDKs (Python and JavaScript)
- Managed platform option for production deployments

**Where Axons for Agents differs:**

- **Schema richness**: Axons for Agents uses a much more granular schema with 14 distinct node types (Memory, Compartment, Concept, Keyword, Topic, Entity, Source, Decision, Goal, Question, Context, Preference, TemporalMarker, Contradiction) versus Mem0's more streamlined approach. This means more precise categorization and richer relationship tracking.
- **Brain plasticity**: Axons for Agents has a full plasticity system with Hebbian learning, synaptic potentiation/depression, configurable decay curves, and automatic pruning, none of which Mem0 offers.
- **Compartmentalization**: Axons for Agents provides multi-layer permeability controls for memory isolation, with fail-secure logic for overlapping compartments. Mem0 doesn't have an equivalent feature.
- **Explicit intentional modeling**: Axons for Agents has dedicated node types for Decisions, Goals, and Questions, capturing what was learned, why decisions were made, what the user is trying to achieve, and what remains unknown.
- **Zero infrastructure**: LadybugDB is embedded, and the agent interacts with it through its existing tool-use capabilities, so there's nothing extra to set up. Mem0 requires either their managed platform or a self-hosted Neo4j instance plus a separate LLM API.

## Graphiti (by Zep)

[Graphiti](https://github.com/getzep/graphiti){:target="\_blank"} is an open-source framework by [Zep](https://www.getzep.com/){:target="\_blank"} for building "temporally-aware knowledge graphs for AI agents." It has over 22,000 GitHub stars and powers the core of Zep's commercial context engineering platform.

Graphiti's key innovation is its bi-temporal data model. It explicitly tracks both when an event occurred and when it was ingested into the graph, enabling accurate point-in-time queries. It supports multiple graph backends (Neo4j, FalkorDB, Kuzu, Amazon Neptune) and uses a combination of semantic embeddings, keyword (BM25), and graph traversal for retrieval.

**Where Graphiti shines:**

- Sophisticated temporal modeling with bi-temporal tracking
- Real-time incremental updates without batch recomputation
- Multiple graph database backend options
- Hybrid retrieval combining semantic, keyword, and graph-based search
- Custom entity definitions via Pydantic models
- Enterprise-grade scalability with parallel processing

**Where Axons for Agents differs:**

- **Scope and complexity**: Graphiti is a production-grade framework designed for enterprise environments. Axons for Agents is intentionally simpler and more personal, designed for individual developers who want a powerful memory system without the overhead of a full enterprise platform.
- **Brain plasticity**: Axons for Agents has weighted connections that strengthen and weaken over time based on usage, with 30+ tuneable parameters and five presets. Graphiti handles temporal invalidation differently, through edge versioning rather than dynamic connection weights.
- **Compartmentalization**: Axons for Agents has a dedicated permeability system for memory isolation. Graphiti uses group-based organization, but doesn't have the same directional data flow controls.
- **No additional LLM calls**: Graphiti relies on its own LLM inference calls for tasks like entity extraction and edge invalidation, requiring a separate API key and adding to your token costs. Axons for Agents works through the agent's existing tool-use capabilities, so all memory operations ride on the LLM the agent is already using. No separate API key, no extra token costs, no additional rate limit concerns.
- **Zero infrastructure**: Axons for Agents setup is just a single command, whereas Graphiti requires both a graph database server and a separate LLM API, both of which require setup.
- **Direct control**: With Axons for Agents, the user (or agent) explicitly defines the concepts, keywords, topics, and entities associated with each memory. This gives you precise control over how memories are categorized and connected, rather than relying on a separate LLM pipeline's interpretation.

## Summary Comparison

| Feature                     | Markdown Files      | Mem0                | Graphiti                 | Axons for Agents                    |
| --------------------------- | ------------------- | ------------------- | ------------------------ | ----------------------------------- |
| **Relationship tracking**   | ❌ None             | ✅ Via graph option | ✅ Native                | ✅ Native                           |
| **Associative recall**      | ❌ Text search only | ✅ Semantic search  | ✅ Hybrid search         | ✅ Graph traversal                  |
| **Brain plasticity**        | ❌ No               | ❌ No               | ❌ No                    | ✅ Hebbian learning, decay, pruning |
| **Compartmentalization**    | ❌ No               | ❌ No               | ⚠️ Groups                | ✅ Multi-layer permeability         |
| **Contradiction detection** | ❌ No               | ❌ No               | ✅ Temporal invalidation | ✅ Explicit node type               |
| **Decision/Goal tracking**  | ❌ No               | ❌ No               | ❌ No                    | ✅ First-class nodes                |
| **Temporal awareness**      | ❌ Basic timestamps | ✅ Basic            | ✅ Bi-temporal           | ✅ TemporalMarker nodes             |
| **MCP server**              | ❌ No               | ❌ No               | ✅ Yes                   | ✅ Yes (20+ tools)                  |
| **Separate LLM API needed** | ❌ No               | ✅ Yes              | ✅ Yes                   | ❌ No (uses agent's own LLM)        |
| **Resource footprint**      | ✅ Minimal          | ⚠️ Moderate         | ⚠️ Heavy                 | ✅ Minimal (embedded)               |
| **Setup complexity**        | ✅ None             | ⚠️ Moderate         | ⚠️ High                  | ✅ `pip install` only               |
| **Schema granularity**      | ❌ Flat             | ⚠️ Moderate         | ✅ Rich                  | ✅ Very rich (14 node types)        |

</details>

# What's Next

The core memory system, plasticity engine, compartmentalization layer, and MCP server are all functional.[<sup>\*</sup>](#disclaimer) There are also still plenty of new features and enhancements on the roadmap, and the project's [PLAN.md](https://github.com/JamesDBartlett3/Axons_4_Agents/blob/main/PLAN.md){:target="\_blank"} outlines a comprehensive multi-phase plan that includes:

- **Bug fixes and hardening**: duplicate edge prevention, input validation, better error handling
- **Performance optimizations**: batch operations, secondary indexes, connection pooling
- **Full test suite migration to pytest**: comprehensive coverage of all 14 node types and 19 relationship types
- **Advanced MCP features**: resource endpoints for the directory and stats, bulk operations, and safe Cypher query execution
- **Real-world simulation framework**: an orchestrator that runs simulated multi-turn conversations between a user agent and an LLM agent, scoring the system's recall accuracy, contradiction detection rate, compartment integrity, and plasticity health across ten different scenario categories

That last one is what I'm looking forward to most, because it's basically a way to stress-test the entire system under realistic conditions and measure how well it actually performs at the thing it's supposed to do: helping an AI agent remember and learn.

# Try It Out

If this sounds interesting, check out the [Axons for Agents repository on GitHub](https://github.com/JamesDBartlett3/Axons_4_Agents){:target="\_blank"}. Getting started is simple:

```bash
git clone https://github.com/JamesDBartlett3/Axons_4_Agents.git
cd Axons_4_Agents
pip install -r requirements.txt
```

The README includes detailed usage examples, and the `docs/` folder has comprehensive guides for the [schema](https://github.com/JamesDBartlett3/Axons_4_Agents/blob/main/docs/schema.md){:target="\_blank"}, [design decisions](https://github.com/JamesDBartlett3/Axons_4_Agents/blob/main/docs/design-decisions.md){:target="\_blank"}, [plasticity configuration](https://github.com/JamesDBartlett3/Axons_4_Agents/blob/main/docs/plasticity-config.md){:target="\_blank"}, and [compartmentalization](https://github.com/JamesDBartlett3/Axons_4_Agents/blob/main/docs/compartmentalization.md){:target="\_blank"}.

I'm building this in the open because I think better memory systems are one of the biggest missing pieces in the AI agent ecosystem right now. Flat files got us started, but if we want AI agents that can actually learn and remember the way humans do, we need graph-based approaches with real plasticity, real compartmentalization, and real associative recall.

If you have questions, ideas, or feedback, feel free to reach out on [LinkedIn](https://www.linkedin.com/in/jamesdbartlett3){:target="\_blank"}, [Bluesky](https://jamesdbartlett3.bsky.social){:target="\_blank"}, or [Mastodon](https://techhub.social/@JamesDBartlett3){:target="\_blank"}, or open an issue on the [GitHub repo](https://github.com/JamesDBartlett3/Axons_4_Agents/issues){:target="\_blank"}.

---

> <a id="disclaimer"></a><sup></sup>**⚠️ Reminder:** Axons for Agents is an early-stage experimental project in active development. Everything described in this article is as of the time of writing, and any of it could break or change by the time you read it. The project is provided as-is, without warranty of any kind, and is intended solely for testing and experimentation, **not** for production use or any scenario where data integrity, security, or reliability is required. The author disclaims all liability for any damages or losses arising from the use of this software, including but not limited to data loss, security vulnerabilities, or integration failures. APIs, schemas, and data formats may change at any time without notice or migration support. If you choose to experiment with it, please do so in a sandboxed environment and do not entrust it with any data you cannot afford to lose.
