---
slug: rat-hunt-boogie
locale: en
title: Rat Hunt Boogie
description: A hand-tracked VR sandbox that explores animal embodiment by letting players move and interact as a cat.
date: 2024-12-01
year: 2024
tags: [Project]
keywords: [KTH, Sweden, Interactive Systems, Unity, VR]
role: Team lead, interaction development
hero: /images/rat-hunt-boogie.png
sourceUrl: https://lopsided-omelet-c8a.notion.site/Rat-Hunt-Boogie-17a0fcaf651c80d8841fe110fb0f2f47
youtubeId: 21oNk0SB0WI
repositoryUrl: https://github.com/shogo0x2e/RatHuntBoogie
---

Rat Hunt Boogie is a single-player VR sandbox that lets players experience everyday space as a cat. Players hunt rats, knock objects from tables, operate a television, and explore the environment using their hands as virtual paws.

## Interaction and implementation

- Paw-like locomotion, jumping, grabbing, and eating gestures using hand tracking.
- An interactive domestic environment with rats, appliances, movable objects, and spatial sound.
- Unity and Meta XR SDK for the VR experience, with Blender used for models and animation experiments.
- Graphics work covering lighting, reflections, water, grass, and experiments with fur.

## Iteration and constraints

The original raycast-based locomotion was too slow, so the team redesigned it using an approach inspired by Gorilla Tag and adapted it to feline movement. Performance testing also led to a mix of baked and real-time lighting, fewer grass elements, and the removal of expensive animated fur.

The project extended the hand-tracking work begun in Black Hole Boogie toward a different question: how directly can human hand movement evoke the feeling of inhabiting an animal body?
