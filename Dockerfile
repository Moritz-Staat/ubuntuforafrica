# Testumgebung auf 192.168.178.166 (https://ubuntu.staatsprojekte.uk).
#
# Bewusst ein Produktions-Build, kein `next dev`: im Dev-Modus scheitert hinter
# dem Nginx-Proxy der HMR-WebSocket, die Seite hydriert dann nie und alles
# Interaktive ist tot – das mobile Menü ließ sich deshalb nicht öffnen.
# node:22 wie bei Vercel. Unter node:20 (npm 10.8) scheitert `npm ci` an der
# Lockfile-Auflösung von @swc/helpers.
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

# .env.local muss vor dem Build da sein: NEXT_PUBLIC_*-Werte werden zur
# Bauzeit in den Client-Code eingesetzt.
COPY . .
RUN npm run build

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
CMD ["npm", "start"]
