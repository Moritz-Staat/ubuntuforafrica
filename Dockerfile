# Testumgebung auf 192.168.178.166 (https://ubuntu.staatsprojekte.uk).
#
# Bewusst ein Produktions-Build, kein `next dev`: im Dev-Modus scheitert hinter
# dem Nginx-Proxy der HMR-WebSocket, die Seite hydriert dann nie und alles
# Interaktive ist tot – das mobile Menü ließ sich deshalb nicht öffnen.
#
# node:22 wie bei Vercel. Unter node:20 (npm 10.8) scheitert `npm ci` an der
# Lockfile-Auflösung von @swc/helpers.
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

# .env* ist per .dockerignore ausgeschlossen, damit keine Tokens im Image
# landen. Die beiden NEXT_PUBLIC_-Werte werden zur Bauzeit in den Client-Code
# eingesetzt und müssen deshalb hier vorliegen – beides sind keine Geheimnisse.
# Alles andere (SANITY_API_TOKEN, Stripe, Resend) kommt zur Laufzeit über
# env_file und wird nicht mitgebaut.
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET

COPY . .
RUN npm run build

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
CMD ["npm", "start"]
