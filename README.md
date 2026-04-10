# Fetch-Quest-Lab

## Overview

You have completed the guided walkthrough for fetching data from an external API using React. You understand how `useEffect` works, how to manage a loading state, and how to display data returned from an API call.

This assignment is the next step. You are going to build a React application independently using a public API of your choosing. There is no guide this time. You are expected to research, make decisions, and build on your own.

This is how real development work happens.

## Research is Part of the Assignment

You will run into things in this project that were not covered in the lab. That is intentional.

Part of being a developer is knowing how to find answers - reading documentation, searching for examples, and figuring out how something works on your own before asking for help. You are expected to do that here.

When you hit something unfamiliar your first move should be to look it up. Check the API documentation. Read the MDN docs. Search for examples. If you have spent real time researching and are still stuck, then ask your instructor.

Getting comfortable with that process is just as important as the code you write.

## Objective

Build a functional React application that integrates with a public API. Your app should demonstrate that you understand the concepts covered in the lab - not just that you can get something on the screen.

## Requirements

The following are non-negotiable. All items must be present in your final submission.

### Functionality

- [ ] Fetches data from a real public API
- [ ] Uses `useEffect` to load data automatically on mount
- [ ] Includes at least one button that triggers a new fetch
- [ ] Handles and displays a loading state while data is being fetched
- [ ] Renders the fetched data on screen in a clear, readable format

### Code

- [ ] Written in React using functional components
- [ ] State managed with `useState`
- [ ] No console errors on load or interaction

### Styling

- [ ] Application is styled with intention - not a blank page with text on it

### Version Control

- [ ] Project is pushed to GitHub
- [ ] Commit history reflects incremental progress - small, focused commits as features were added
- [ ] Commit messages are clear and descriptive

### README

- [ ] README.md exists in the root of the project
- [ ] Contains the following:
  1. Application name
  2. Brief description of what the app does (2-3 sentences)
  3. The API used and a link to its documentation
  4. Steps to run the project locally
  5. At least one technical challenge you encountered and how you resolved it

## Commit History Expectations

Your commit history is part of your submission and will be reviewed.

A single commit with everything in it is not acceptable. Your commits should tell the story of how you built the project. A reasonable commit history for an assignment like this might look something like:

```text
- Initial project setup
- Add base component structure and state
- Fetch data from API on load using useEffect
- Add loading state
- Add refresh button
- Style layout and card component
- Add README
```

Commits like `final`, `done`, `fix stuff`, or one commit with everything in it are a sign that the work was not done incrementally.

## A Note on AI Tools

You are entering a field where AI tools exist and you will eventually use them. However, this assignment is about proving to yourself - and to your instructor - that you understand what you built.

Do not prompt an AI tool to build your application for you. If you cannot explain every line of your code during the presentation, it will be evident.

Use AI the way you would use documentation or a search engine - to understand something, look something up, or get unstuck on a specific problem. Do not use it to write your features for you.

At any point during the build your instructor may ask you to show your prompt history. Be prepared for that. If your prompts look like "build me a weather app in React with a loading state and a button" that is a problem. If they look like "what does response.json() return" or "why would useEffect run twice" that is how you are supposed to be using it.

If you are stuck, do some research first. If you are still stuck, ask your instructor.

## Presentation

You will present your project in a small group. Come prepared to:

- Demo your running application
- Explain what your app does and which API you used
- Walk through your code and explain your implementation - specifically `useEffect`, your fetch logic, and your loading state
- Discuss one technical challenge you ran into and how you worked through it

As an audience member you are not just watching. For every presenter in your group you are required to ask at least one question and offer one piece of verbal feedback. This is not optional. Engaged, thoughtful participation in peer presentations is part of your evaluation.

There are no slides. Open your app, open your code, and be ready to talk about it.

## Submission

When your project is complete, open a GitHub Issue on this repository to submit your work. Do not email your link or post it in chat - issues only.

Issue title format:

```text
[Submission] Your Full Name - App Name
```

Example:

```text
[Submission] Jordan Eldridge - Weather App
```

Your issue body must include the following:

```md
**Name:** Your Full Name
**App Name:** The name of your application
**Repo Link:** https://github.com/yourusername/your-repo
**API Used:** Name of the API and link to its documentation
**What your app does:** 2-3 sentences describing your app
**One thing you struggled with:** Describe a technical challenge you hit and how you worked through it
```

Before you submit make sure:

- [ ] Your project is pushed to GitHub with your full commit history visible
- [ ] Your README is complete
- [ ] Your repo is set to public so it can be reviewed
