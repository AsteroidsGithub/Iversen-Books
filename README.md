# 🎬 qLive - Google docs for light and sound production teams

![GitHub top language](https://img.shields.io/github/languages/top/asteroidsgithub/qlive) ![GitHub commit activity](https://img.shields.io/github/commit-activity/w/asteroidsgithub/qlive) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/asteroidsgithub/qlive/format) ![GitHub](https://img.shields.io/github/license/asteroidsgithub/qlive)

## 🏗 Project Outline

A web app that allows my clients to create edit and annotate cues lists in real-time and then use those cue lists to control a range of hardware and software (Lightning console, sound board). With a user account and permission system like google docs

## 🍜 Other links

-   Figma Brainstorming - [qLive Brainstorming.jam](https://www.figma.com/file/cqfBiyFSEVm2BuyANZe2ij/Untitled?node-id=0%3A1)
-   Figma Interface Mockups - [qLive interface.fig](https://www.figma.com/file/Jvg5RPiN0nmmbKcLigaVkB/qLive-Interface)
-   Trello Board - [qLive Development](https://trello.com/b/Tayuzhnp/qlive-development)

## 🎢 Development Milestones

This project has a deadline for 8 months

-   [ ] Minimal working demo

## 💾 Client notes

> “would u be able to make it so each cue can be assigned a onyx or cue lab option?”

> "would be kinda cool to be able to see time remaining for actions. like time in a song or progress thru an onyx fade”

> “Yes, Vern is in love with authenticated pages”

## 👨‍🏭 Technology breakdown

Little idea but how about 2 next servers????? One for the website and it’s api and then another that is just pure api

### OSC backend

-   OSC: nothing says controlling a lighting console like “open sound control”
-   Typescript: it’s like JavaScript but bigger
-   Redis: Float like a butterfly, sting like a bee. Basically a second cache database so that information can be streamed for web sockets. Redis is much better than Postgres for this purpose

### Website backend

-   PostgresSQL: because elephants are better at storing in memory than dolphins
-   Redis: Float like a butterfly, sting like a bee. Basically a second cache database so that information can be streamed for web sockets. Redis is much better than Postgres for this purpose
-   Typescript: it’s like JavaScript but bigger
-   Socket.io: rumours has it putting a fork in a power outlet is less painful

### Website frontend

-   Next.js: React but not by meta which is always a good thing
-   Typescript: it’s like JavaScript but bigger
-   Tailwindcss: This is the only way I know to how to do css. Not even joking I forgot how
-   Socket.io-client: how else is it gonna talk to 10 other clients at the same time

## ✨ User interface

This is subject to change based on Bens mood

### Pages

-   Documents overview
-   Editing document
-   Playing document

### Colour

-   Neutral tones.
-   High contrast action Color? Perhaps a green or blue something that isn’t aggressive
-   Dark/light mode
-   Full black in playing page because of show lighting demands
