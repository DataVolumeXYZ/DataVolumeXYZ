---
layout: post
title: "Axons for Agents: Building a Brain-Inspired Memory System for AI"
summary: How I'm using a graph database to give AI agents a memory system modeled after the human brain, and why flat markdown files just aren't cutting it anymore
author: JamesDBartlett3
feature-img: "assets/img/pexels/abstract-768169.jpg"
thumbnail: "assets/img/pexels/console-3866088.jpg"
tags:
  - AI
  - Agents
  - Memory
  - Graph Database
  - Memgraph
  - MCP
  - Model Context Protocol
  - Open Source
  - Python
excerpt_start: <!--excerpt-->
excerpt_separator: <!--more-->
published: true
---

<!--excerpt-->
If you've spent any significant amount of time working with AI coding agents, you've probably noticed a frustrating pattern: they forget *everything* between sessions. You teach them your preferences, explain your project's architecture, walk them through your coding conventions, and then the next day... it's like talking to a stranger all over again. Most AI tools attempt to solve this problem with markdown-based memory files, and while that approach works well enough for simple use cases, it breaks down quickly as your needs grow more complex. So I've been building something I think is fundamentally better: [**Axons for Agents**](https://github.com/JamesDBartlett3/Axons_4_Agents){:target="_blank"} — a graph-based memory system that models the way human brains actually store and retrieve information.
<!--more-->

# Why I Started This Project

The idea for Axons for Agents came from a very specific frustration. I'd been using AI coding assistants extensively in my day-to-day work, and I kept running into the same wall: **context loss**. Every new conversation was a blank slate. Sure, I could paste in a summary of previous work, or maintain a markdown file with notes about my preferences and project details, but that approach has some serious limitations that became more and more painful over time.

Here's what I mean. Imagine you've been working with an AI assistant for several months on a complex project. Over that time, you've made dozens of architectural decisions, each one informed by specific constraints, trade-offs, and lessons learned. You've established coding conventions, discovered edge cases, and built up a rich web of interconnected knowledge about your project. Now try to capture all of that — not just the *facts*, but the *relationships* between them — in a flat markdown file. It's like trying to draw a three-dimensional object on a single sheet of paper. You can do it, but you're going to lose a lot of important information in the process.

That realization led me to ask a question that changed the whole trajectory of this project: **What if an AI agent's memory system was structured more like a human brain?**

# How the Human Brain Stores Memories

I'm not a neuroscientist, so I'll keep this simple. In the human brain, memories aren't stored in neat little files in a filing cabinet. Instead, they're stored as patterns of connections between neurons. When you recall a memory, you're not "opening a file" — you're reactivating a specific pattern of neural connections. And here's the really important part: those connections are *shared*. The concept of "coffee" might be connected to "morning routine," "caffeine," "that café in Seattle," "the time I spilled it on my laptop," and dozens of other memories and concepts. Each of those connected memories has its *own* connections, forming a rich, multi-dimensional web of associations.

This is why a smell can trigger a vivid childhood memory, or why hearing a song can remind you of a specific person. Your brain doesn't search through a flat list of memories looking for a keyword match — it *traverses* a graph of associations, following the connections from one memory to another.

And that's exactly the principle behind Axons for Agents.

# What Is Axons for Agents?

[Axons for Agents](https://github.com/JamesDBartlett3/Axons_4_Agents){:target="_blank"} is a graph-based memory system for AI agents, using [Memgraph](https://memgraph.com/){:target="_blank"} as the backend database. It stores memories as nodes with rich relationships between them, enabling associative recall based on shared concepts, keywords, topics, entities, and more. The name is a reference to [axons](https://en.wikipedia.org/wiki/Axon){:target="_blank"} — the long, threadlike parts of nerve cells that transmit signals to other neurons. In the same way that axons connect neurons in the brain, the relationships in the Axons for Agents graph connect memories to each other and to the concepts, keywords, and entities that give them meaning.

## Architecture Overview

The system has three main components:

1. **Memgraph Database**: An in-memory graph database written in C++ that speaks the [Bolt protocol](https://en.wikipedia.org/wiki/Bolt_(network_protocol)){:target="_blank"} (the same protocol used by [Neo4j](https://neo4j.com/){:target="_blank"}). It stores all the nodes and relationships that make up the memory graph.
2. **Python Client** (`memory_client.py`): A client library that connects to Memgraph via the Bolt protocol and provides a clean API for creating, querying, and managing memories and their relationships.
3. **Markdown Directory** (`directory.md`): A lightweight index of all nodes in the graph, exported as a markdown file for quick scanning at the start of a new conversation. Think of it as a table of contents for the memory graph.

```
┌─────────────────────────────────────────────────────┐
│  Python Client (memory_client.py)                   │
│  - Creates/queries memories and relationships       │
│  - Exports directory.md for quick scanning          │
└──────────────────────┬──────────────────────────────┘
                       │
                Bolt Protocol
                       │
┌──────────────────────▼──────────────────────────────┐
│  Memgraph Database                                  │
│  - In-memory with WAL persistence                   │
│  - Listens on port 7687                             │
└─────────────────────────────────────────────────────┘
```

## The Memory Graph Schema

This is where things get really interesting. The memory graph isn't just a collection of memories — it's a richly typed, multi-layered knowledge structure. Here's a breakdown of the node types and what they represent:

### Core Nodes
- **Memory**: The fundamental unit — a piece of information with full content, a summary, a confidence score, and access tracking metadata.
- **Concept**: Abstract ideas that memories relate to (e.g., "authentication," "performance optimization"). These provide *semantic* grouping.
- **Keyword**: Specific terms for exact matching (e.g., "OAuth2," "JWT"). These enable *precise* lookups.
- **Topic**: Broader subject areas (e.g., "Software Architecture," "User Preferences"). These give you *high-level* categorization.

### Entity and Source Nodes
- **Entity**: People, organizations, projects, tools, and technologies. These create natural hubs in the graph — many memories tend to mention the same people, tools, and projects.
- **Source**: Where information came from (conversations, files, URLs). This enables provenance tracking — "where did I learn this?"

### Intentional Nodes
- **Decision**: Choices made and their rationale. These can be traced back to the memories that informed them.
- **Goal**: User objectives with status tracking (active, achieved, abandoned).
- **Question**: Unresolved items and things to investigate, which can be partially answered by multiple memories.

### Contextual and Meta Nodes
- **Context**: Projects, tasks, conversations, and sessions. These disambiguate — the same keyword might mean different things in different projects.
- **Preference**: User likes/dislikes and working styles, accumulated over time.
- **TemporalMarker**: Time periods and sequences for time-based queries.
- **Contradiction**: Explicit tracking of when new information conflicts with old, preventing the system from serving outdated information.

All of these node types are connected by a rich set of typed relationships with properties like `relevance`, `strength`, `completeness`, and `role`. A single memory might be connected to several concepts, a handful of keywords, one or two topics, multiple entities, a decision it informed, a goal it supports, and a context it belongs to. And each of *those* nodes has its own connections, creating the kind of multi-dimensional associative web that makes graph-based recall so powerful.

## Why Memgraph?

I evaluated several graph databases before settling on Memgraph, and the decision came down to a few key factors:

| Database | Why It Lost |
|----------|-------------|
| **Neo4j** | JVM-based, 500MB+ RAM at idle, 10-30 second startup |
| **ArangoDB** | AQL query language is less intuitive for graphs |
| **SurrealDB** | Very new, still maturing |
| **FalkorDB** | Limited Cypher support |

Memgraph won because it's written in C++ (fast, low memory), starts up in about a second, uses only ~100-200MB of RAM at idle, and speaks the same Cypher query language as Neo4j. That last point is huge — it means all of the Cypher knowledge, tutorials, and documentation out there for Neo4j applies directly to Memgraph.

The trade-off is a smaller community and fewer tutorials, but for this project, the performance and resource efficiency benefits were well worth it.

# Flat Markdown Memory vs. Graph-Based Memory

If you've used AI coding tools like [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview){:target="_blank"} or [GitHub Copilot](https://github.com/features/copilot){:target="_blank"}, you've probably seen their built-in memory features. These typically store memories as entries in a markdown file — simple key-value pairs or short notes that persist between sessions. It works, and for basic use cases, it works *fine*. But there are some fundamental limitations:

### What Flat Files Can't Do

1. **No native relationships.** Finding related memories requires text search, which misses semantic connections entirely. If Memory A is about "authentication" and Memory B is about "security," a flat file system won't know they're related unless both happen to contain the same keyword.
2. **No traversal.** You can't ask, "What memories are two hops away from this concept?" With a graph, you can follow the connections from a memory to its concepts, and from those concepts to other memories that share them — revealing connections that would be invisible in a flat file.
3. **No contradiction detection.** When new information conflicts with old, a flat file has no mechanism to flag the conflict. You just end up with two contradictory entries sitting side by side, and the AI has no way to know which one is current.
4. **Scaling issues.** As the number of memories grows, searching a flat file gets slower and less precise. A graph database, on the other hand, is specifically optimized for traversing relationships, and its query performance scales much more gracefully.

### What the Graph Gives You

With the Axons for Agents approach, you get:
- **Associative recall**: Find all memories related to a concept within *N* relationship hops, even if they don't share any keywords.
- **Decision tracing**: Follow the chain from a decision back through the memories that informed it.
- **Contradiction awareness**: When a new memory conflicts with an existing one, the system can flag it explicitly and track the resolution.
- **Contextual disambiguation**: The same keyword can mean different things in different project contexts, and the graph preserves that distinction.
- **Temporal queries**: Find memories from a specific time period, or trace the sequence of events that led to a particular outcome.

# How Axons for Agents Compares to Other Graph-Based Solutions

I'm not the only one who's had the idea of using a graph database for AI memory. There are some impressive projects out there tackling the same problem from different angles. Here's how Axons for Agents compares to two of the most prominent ones:

## Mem0

[Mem0](https://github.com/mem0ai/mem0){:target="_blank"} (pronounced "mem-zero") is a popular open-source project that provides a "universal memory layer for AI agents." It's backed by Y Combinator, has over 47,000 stars on GitHub, and offers both a self-hosted option and a managed platform.

Mem0's approach centers around automatic memory extraction — you feed it conversations, and it uses an LLM to identify and store relevant memories. It supports graph-based storage (via Neo4j) as an option, alongside vector stores for semantic search.

**Where Mem0 shines:**
- Mature, well-funded project with a large community
- Automatic memory extraction from conversations
- Multi-level memory (User, Session, Agent)
- Cross-platform SDKs (Python and JavaScript)
- Managed platform option for production deployments

**Where Axons for Agents differs:**
- **Schema richness**: Axons for Agents uses a much more granular schema with 13 distinct node types (Memory, Concept, Keyword, Topic, Entity, Source, Decision, Goal, Question, Context, Preference, TemporalMarker, Contradiction) versus Mem0's more streamlined approach. This means more precise categorization and richer relationship tracking.
- **Explicit intentional modeling**: Axons for Agents has dedicated node types for Decisions, Goals, and Questions — capturing not just *what* was learned, but *why* decisions were made, *what* the user is trying to achieve, and *what* remains unknown.
- **Contradiction tracking**: Axons for Agents explicitly models contradictions as first-class nodes, enabling systematic detection and resolution of conflicting information.
- **Lightweight infrastructure**: Memgraph's C++ implementation uses significantly less memory than Neo4j, making Axons for Agents more practical for individual developers running everything locally.

## Graphiti (by Zep)

[Graphiti](https://github.com/getzep/graphiti){:target="_blank"} is an open-source framework by [Zep](https://www.getzep.com/){:target="_blank"} for building "temporally-aware knowledge graphs for AI agents." It has over 22,000 GitHub stars and powers the core of Zep's commercial context engineering platform.

Graphiti's key innovation is its bi-temporal data model — it explicitly tracks both when an event *occurred* and when it was *ingested* into the graph, enabling accurate point-in-time queries. It supports multiple graph backends (Neo4j, FalkorDB, Kuzu, Amazon Neptune) and uses a combination of semantic embeddings, keyword (BM25), and graph traversal for retrieval.

**Where Graphiti shines:**
- Sophisticated temporal modeling with bi-temporal tracking
- Real-time incremental updates without batch recomputation
- Multiple graph database backend options
- Hybrid retrieval combining semantic, keyword, and graph-based search
- Custom entity definitions via Pydantic models
- Enterprise-grade scalability with parallel processing
- Published research paper on arXiv

**Where Axons for Agents differs:**
- **Scope and complexity**: Graphiti is a production-grade framework designed for enterprise environments. Axons for Agents is intentionally simpler and more personal — it's designed for individual developers who want a powerful memory system without the overhead of a full enterprise platform.
- **LLM independence**: Graphiti relies on LLM inference for tasks like entity extraction and edge invalidation. Axons for Agents currently operates without requiring an LLM for its core operations, which keeps costs at zero and avoids API rate limit concerns.
- **Resource footprint**: Running Graphiti with Neo4j requires significantly more resources than Axons for Agents with Memgraph. For a developer running everything on their local machine, that difference matters.
- **Direct control**: With Axons for Agents, the user (or agent) explicitly defines the concepts, keywords, topics, and entities associated with each memory. This gives you precise control over how memories are categorized and connected, rather than relying on an LLM's interpretation.

## Summary Comparison

| Feature | Markdown Files | Mem0 | Graphiti | Axons for Agents |
|---------|---------------|------|----------|-----------------|
| **Relationship tracking** | ❌ None | ✅ Via graph option | ✅ Native | ✅ Native |
| **Associative recall** | ❌ Text search only | ✅ Semantic search | ✅ Hybrid search | ✅ Graph traversal |
| **Contradiction detection** | ❌ No | ❌ No | ✅ Temporal invalidation | ✅ Explicit node type |
| **Decision/Goal tracking** | ❌ No | ❌ No | ❌ No | ✅ First-class nodes |
| **Temporal awareness** | ❌ Basic timestamps | ✅ Basic | ✅ Bi-temporal | ✅ TemporalMarker nodes |
| **LLM required** | ❌ No | ✅ Yes | ✅ Yes | ❌ No |
| **Resource footprint** | ✅ Minimal | ⚠️ Moderate | ⚠️ Heavy | ✅ Low (~200MB) |
| **Setup complexity** | ✅ None | ⚠️ Moderate | ⚠️ High | ⚠️ Moderate |
| **Schema granularity** | ❌ Flat | ⚠️ Moderate | ✅ Rich | ✅ Very rich (13 node types) |

# What's Next: MCP Integration

The most exciting thing on the roadmap right now is [Model Context Protocol (MCP)](https://modelcontextprotocol.io/){:target="_blank"} integration. MCP is an open standard (by Anthropic) for connecting AI assistants to external data sources and tools. Once the MCP server is complete, AI assistants will be able to interact with the memory graph directly through native tool calls — storing memories, querying related information, tracking goals and decisions, and flagging contradictions, all without the user needing to run Python scripts manually.

The MCP server will wrap the existing Python client with [FastMCP](https://gofastmcp.com/){:target="_blank"}, exposing each memory operation as a tool that AI assistants can call. This means you'll be able to say something like "store this as a memory" or "what do you know about authentication?" and your AI assistant will interact with the memory graph behind the scenes.

# Try It Out

If any of this sounds interesting to you, I'd encourage you to check out the [Axons for Agents repository on GitHub](https://github.com/JamesDBartlett3/Axons_4_Agents){:target="_blank"}. The project is still in its early stages, but the core memory system is functional and well-documented. The README includes setup instructions, a detailed schema reference, design decision documentation, and a comprehensive usage guide.

I'm building this project in the open because I genuinely believe that better memory systems are one of the most important missing pieces in the AI agent ecosystem right now. Flat files got us started, but graph-based approaches are where we need to go if we want AI agents that can truly *learn* and *remember* in the way that humans do.

If you have questions, ideas, or feedback, I'd love to hear from you! Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/jamesdbartlett3){:target="_blank"}, [Bluesky](https://jamesdbartlett3.bsky.social){:target="_blank"}, or [Mastodon](https://techhub.social/@JamesDBartlett3){:target="_blank"}, or open an issue on the [GitHub repo](https://github.com/JamesDBartlett3/Axons_4_Agents/issues){:target="_blank"}.
