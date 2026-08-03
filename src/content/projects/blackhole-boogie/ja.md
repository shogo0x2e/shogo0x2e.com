---
slug: blackhole-boogie
locale: ja
title: Black Hole Boogie
description: ハンドトラッキング，無重力インタラクション，空間音響を組み合わせた，90秒間の宇宙救助VRゲーム．
date: 2024-10-01
year: 2024
tags: [Project]
keywords: [KTH, Sweden, Interactive Systems, Unity, VR]
role: チームリード，インタラクション開発
hero: /images/blackhole-boogie.jpeg
sourceUrl: https://lopsided-omelet-c8a.notion.site/Black-Hole-Boogie-1300fcaf651c80cdbd4af7a8dd2c7d7e?pvs=73
youtubeId: keLRNXNYGfc
repositoryUrl: https://github.com/shogo0x2e/BlackHoleBoogie
---

Black Hole Boogieは，スウェーデンで多国籍チームと制作した一人用の宇宙アクションVRゲームです．プレイヤーは90秒間で，ブラックホールの周囲を漂う宇宙飛行士を救助し，小惑星などの危険から守ります．

## インタラクションと実装

- Meta XR SDKを用いた，叩く，殴る，つかむ，銃を撃つハンドジェスチャー．
- 宇宙飛行士，小惑星，エイリアンがランダムに出現する無重力環境．
- ブラックホールや武器表現のためのShaderとVFX Graph．
- プレイヤーの位置と向きに応じて変化する空間音響．

## 制約への対応

身長や腕の長さによる体験差を考慮してインタラクションを調整しました．Meta Quest 3の処理性能に合わせた視覚効果の最適化や，手の遮蔽によって認識しづらい射撃ジェスチャーの改善にも取り組みました．

異なる文化や専門性を持つメンバーとの制作プロセスそのものが，最終成果と同じくらい重要な経験になりました．
