# GitHub Actions Trigger via Apps Script

This project uses Google Apps Script as a scheduler (Cron Job) to periodically trigger a GitHub Actions workflow.

## Project Purpose

This project leverages Google Apps Script's stable and free "Time-driven triggers" to actively call the GitHub API's `repository_dispatch` event. This allows for more precise and reliable scheduling (e.g., every 10 minutes).

## How It Works

1.  **Google Apps Script:** A script is created and configured with a "Time-driven trigger" (e.g., every 10 minutes).
2.  **Trigger Execution:** When the time comes, the Apps Script function executes, sending a `repository_dispatch` request to the GitHub API.
3.  **GitHub Actions:** The repository receives the `repository_dispatch` event, which in turn triggers the corresponding workflow to run (e.g., fetch weather data).

## Setup Guide

You will need to configure both GitHub and Google Apps Script.

### Step 1: GitHub Setup (Action Workflow)

You must have an Action Workflow file (e.g., `.github/workflows/main.yml`) that listens for the `repository_dispatch` event.

Your `event_type` is set to `run-weather-tasks` in the script, so your `.yml` file should look like this:

**.github/workflows/main.yml**
```yaml
name: Run Weather Tasks

# Key: Set to listen for the repository_dispatch event
on:
  repository_dispatch:
    # Only trigger if the event_type is 'run-weather-tasks'
    types: [run-weather-tasks]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run your task
        run: |
          echo "GitHub Action was triggered by Apps Script!"
          # Execute your Python script or backend task here
          # ...
