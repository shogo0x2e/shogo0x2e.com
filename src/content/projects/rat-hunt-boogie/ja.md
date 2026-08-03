---
slug: rat-hunt-boogie
locale: ja
title: Rat Hunt Boogie
description: 手を猫の前脚として扱い，猫として移動・操作する感覚を探るハンドトラッキングVRサンドボックス．
date: 2024-12-01
year: 2024
tags: [Project]
keywords: [KTH, Sweden, Interactive Systems, Unity, VR]
role: チームリード，インタラクション開発
hero: /images/rat-hunt-boogie.png
sourceUrl: https://lopsided-omelet-c8a.notion.site/Rat-Hunt-Boogie-17a0fcaf651c80d8841fe110fb0f2f47
youtubeId: 21oNk0SB0WI
repositoryUrl: https://github.com/shogo0x2e/RatHuntBoogie
---

Rat Hunt Boogieは，猫として日常空間を体験する一人用VRサンドボックスです．手を仮想的な前脚として使い，ネズミを捕まえる，テーブルから物を落とす，テレビを操作するなど，猫らしい遊びと探索を行います．

## インタラクションと実装

- ハンドトラッキングによる，猫らしい歩行，ジャンプ，つかむ，食べる操作．
- ネズミ，家電，可動物体，空間音響を組み合わせた室内環境．
- UnityとMeta XR SDKによるVR実装と，Blenderによるモデル・アニメーションの検討．
- ライティング，反射，水，草，毛の表現に関するグラフィックス実装．

## 試行錯誤と制約

当初のRaycastを用いた移動方式は速度が不足したため，Gorilla Tagを参考にしながら猫の動きへ適応した方式に作り直しました．描画負荷に対しては，ベイクとリアルタイムを組み合わせたライティング，草の削減，高負荷な毛のアニメーションの不採用によって対応しました．

Black Hole Boogieで始めたハンドトラッキングの探究を発展させ，人間の手の動きによって動物の身体をどこまで感じられるかを試したプロジェクトです．
