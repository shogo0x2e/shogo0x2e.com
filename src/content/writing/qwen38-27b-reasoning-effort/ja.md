---
slug: qwen38-27b-reasoning-effort
locale: ja
title: Qwen3.8 27B に Reasoning Effort を実装してみる
description: Qwen3.8 27B の thinking が生成上限で打ち切られる問題を，llama.cpp の per-request reasoning budget で解決し，OptimalThinkingBench で検証した記事．
date: 2026-08-16
type: Article
tags: [Writing]
keywords: [Qwen, llama.cpp, Local LLM, Reasoning, OpenCode, LiteLLM]
externalUrl: https://zenn.dev/shogo0x2e/articles/qwen38-27b-stop-overthinking
---

llama.cpp の per-request reasoning budget を使って Qwen3.8 27B の thinking を制御し，考えすぎて生成上限に達する問題を解消した取り組みです．
