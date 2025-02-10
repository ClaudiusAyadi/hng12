# NumberFacts API - Number Classification and Fun Facts

## Overview

The **NumberFacts API** is a RESTful API built with Hono.js (Bun.sh) that provides interesting mathematical properties and a fun fact about a given integer. It classifies numbers based on properties like primality, perfect number status, Armstrong number status, and parity (odd/even). It also retrieves a fun math fact about the number from the [Numbers API](http://numbersapi.com/).

## Features

- **Number Classification:** Determines if a number is prime (primality test), perfect, and/or an Armstrong number.
- **Parity Check:** Identifies if a number is odd or even.
- **Digit Sum Calculation:** Calculates the sum of the digits of the number.
- **Fun Fact Retrieval:** Fetches an interesting math fact about the number from the Numbers API.
- **Error Handling:** Provides appropriate error responses for invalid input.
- **CORS Support:** Enables Cross-Origin Resource Sharing for easy integration with frontend applications and REST Clients like Bruno, Postman, etc.

## Technologies Used

- **Backend Framework:** [Hono](https://hono.dev/) (Fast, lightweight web framework for building scalable APIs)
- **Runtime Environment:** [Bun.sh](https://bun.sh/) (Fast JavaScript runtime, bundler, and package manager)
- **External API:** [Numbers API](http://numbersapi.com/) (For retrieving fun facts)
- **Containerization:** [Docker](https://www.docker.com/) (For consistent and portable deployment)
- **Orchestration:** [Docker Compose](https://docs.docker.com/compose/) (For managing multi-container applications)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions) (For automated building, testing, and deployment)

## API Endpoints

### Classify Number

- **Endpoint:** `GET /api/classify-number`
- **Query Parameter:** `number` (required) - An integer to classify.
- **Example:** `GET /api/classify-number?number=371`

#### Successful Response (200 OK)

```json
{
	"number": 371,
	"is_prime": false,
	"is_perfect": false,
	"properties": ["armstrong", "odd"],
	"digit_sum": 11,
	"fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### Error Response (400 Bad Request)

```json
{
	"number": "alphabet",
	"error": true
}
```

## Prerequisites

- Bun installed (if running locally without Docker)
- Docker installed (if using Docker)
- Docker Compose installed (if using Docker Compose)

## Getting Started

### Running Locally (Without Docker)

1. Clone the repository:

   ```bash
   git clone https://github.com/claudiusayadi/hng12.git
   cd hng12/stage_1
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

   This will start the API server, typically on `http://localhost:3001`.

### Running with Docker Compose (Recommended)

1. Clone the repository:

   ```bash
   git clone https://github.com/claudiusayadi/hng12.git
   cd hng12/stage_1
   ```

2. Build and run the Docker Compose project:

   ```bash
   docker compose -f compose.dev.yml up -d --build
   ```

   This will build the Docker image and start the container in detached mode. The API will be accessible on `http://localhost:3001`.

## Deployment

The API is designed to be easily deployed using Docker and Docker Compose. The provided `Dockerfile` and `compose.yml` files can be used to containerize and orchestrate the application.

### Using GitHub Actions

The `.github/workflows/stage_1.yaml` file provides a GitHub Actions workflow for automatically building and pushing the Docker image to GitHub Container Registry (GHCR) whenever changes are pushed to the `main` branch.

#### To configure the workflow:

1. **Create a Personal Access Token (PAT) in GitHub:**

   - Go to your GitHub profile -> Settings -> Developer settings -> Personal access tokens -> Generate new token.
   - Give the token a descriptive name.
   - Grant the token the following scopes: `read:packages`, `write:packages`, and `delete:packages`.
   - Copy the generated token.

2. **Add the token as a secret in your repository:**

   - Go to your GitHub repository -> Settings -> Secrets and variables -> Actions -> New repository secret.
   - Name the secret `GHRC` (or any name you like, but update the workflow accordingly).
   - Paste the token as the secret value.

3. **Enable GitHub Actions in your repository:**
   - Go to your GitHub repository -> Settings -> Actions -> General.
   - Make sure "Allow all actions and reusable workflows" is selected (or configure it according to your needs).

## Traefik Integration (Production)

The `compose.yml` file demonstrates how to deploy the API behind a Traefik reverse proxy. This allows for automatic SSL certificate management (using Let's Encrypt) and load balancing.

### Prerequisites

- A running Traefik instance with a configured Let's Encrypt certificate resolver.
- A Docker network shared between the Traefik instance and the API container (e.g., `proxy`).
- DNS records for your domain name pointing to the IP address of the server where Traefik is running (e.g., using Cloudflare, add proxied A and CNAME records).

## Contributing

Contributions are welcome! Please submit pull requests with clear descriptions of the changes.

## License

This project is licensed under the MIT License.
