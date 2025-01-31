# InfoDove

**_Swift, Simple, and Smart Info Retrieval_**

InfoDove is a public API built using [Bun](https://bun.sh/) and [Hono](https://github.com/honojs/hono) that returns basic information in JSON format. It is part of the Stage 0 Backend task for HNG12, designed to provide a quick and efficient way to access essential details such as an intern registered email, the current date and time (in ISO 8601 UTC format), and the GitHub URL of the project's codebase.

## Table of Contents

- [Overview](#overview)
- [API Specification](#api-specification)
- [Setup Instructions](#setup-instructions)
- [Deployment](#deployment)
- [Automated Deployment](#automated-deployment)
- [Additional Resources](#additional-resources)
- [Contact](#contact)

## Overview

InfoDove is a lightweight, fast, and efficient API that meets all the acceptance criteria for the Stage 0 Backend task. It handles CORS appropriately, ensuring it can be accessed from any origin, and returns all responses in a consistent JSON format.

The API returns:

- **Email:** My registered email address on the HNG12 Slack workspace.
- **Current Datetime:** Dynamically generated current datetime in ISO 8601 format (UTC).
- **GitHub URL:** The URL of the project's code repository on GitHub.

## API Specification

### Endpoint

```http

GET https://infodove.claudiusa.xyz/api/v1

```

### Response Format (200 OK)

```json
{
	"email": "ayadiclaudius@gmail.com",
	"current_datetime": "2025-01-31T23:50:00Z",
	"github_url": "https://github.com/ClaudiusAyadi/hng12/blob/main/stage_0"
}
```

- **email:** My registered email address on the HNG12 Slack workspace.
- **current_datetime:** Dynamically generated current datetime in ISO 8601 format (UTC).
- **github_url:** The URL of the project's GitHub repository.

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- [Git](https://git-scm.com/) for version control.
- [Docker](https://www.docker.com/) (optional, for containerized deployment).

### Running the API Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ClaudiusAyadi/hng12.git
   cd hng12/stage_0
   ```

2. **Install Dependencies**

   Use Bun to install the project dependencies:

   ```bash
   bun install
   ```

3. **Run the API**

   Start the API using Bun:

   ```bash
   bun dev
   ```

   The API should now be running locally. Test it by accessing [http://localhost:3000/api/v1](http://localhost:3000/api/v1) in your browser or using `curl`:

   ```bash
   curl http://localhost:3000/api/v1
   ```

### Using Docker

If you prefer a containerized deployment, build and run the Docker image.

1. **Build and Run the Docker Container**

   ```bash
   docker compose up --build -d
   ```

   The Dockerfile uses the official Bun image to ensure a streamlined build process and fast startup.

## Deployment

The API is deployed to a publicly accessible endpoint:

[https://infodove.claudiusa.xyz/api/v1](https://infodove.claudiusa.xyz/api/v1)

It meets the deployment requirements with fast response times (< 500ms) and proper CORS handling.

## Automated Deployment

My current setup allows for manual deployment (cloning, pulling changes, and running via Docker), if you want to take things a little bit up, you can automate deployments using CI/CD pipelines. One common approach is to use GitHub Actions to trigger a deployment script on every push.

### Example: GitHub Actions Workflow

Create a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main] # Adjust the branch as necessary

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up SSH
        uses: webfactory/ssh-agent@v0.5.3
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Deploy to VPS
        run: |
          ssh -o StrictHostKeyChecking=no youruser@your-vps-ip "cd /path/to/infodove-repo && git pull && docker compose up --build -d"
```

> **Note:**
>
> - Replace `youruser`, `your-vps-ip`, and `/path/to/infodove-repo` with your actual VPS username, IP address, and repository path.
> - Save your SSH private key in GitHub Secrets as `SSH_PRIVATE_KEY` (ensure the corresponding public key is added to your VPS’s `~/.ssh/authorized_keys`).

## Additional Resources

If you're looking for seasoned developers in your chosen stack, consider exploring:

- [Hiring Node.js Developers](https://hng.tech/hire/nodejs-developers)

This is a great resource to find expert talent to support your development needs.

## Contact

If you have any questions, encounter issues, or would like to contribute, feel free to open an issue on GitHub or [contact](mailto:ayadiclaudius@gmail.com) me directly.

4 more stages to go!

Good luck, and happy coding!
