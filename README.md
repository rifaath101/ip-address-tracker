# IP Address Tracker

A responsive web app that shows your own IP address, location, timezone, and ISP on load, and lets you look up that same information for any other IP address or domain — plotted on an interactive map.

This is a solution to a [Frontend Mentor](https://www.frontendmentor.io/) challenge.

## Overview

### Features

- On load, automatically detects and displays the user's own:
  - IP address
  - Location (country, region)
  - Timezone
  - ISP
- Search for any IP address or domain to get the same info
- Client-side input validation — invalid input shows an error message instead of firing a request
- Interactive map (via Leaflet) that re-centers on the searched location
- Fully responsive layout

### Built with

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) / [React Leaflet](https://react-leaflet.js.org/)
- [ipify Geolocation API](https://geo.ipify.org/)

## Project structure

The project is intentionally minimal — a single-page app with no routing, so each folder holds just one file:

```
src/
├── api/
│   └── getIpAddress.ts       # Single GET request, used for both the initial
│                              # lookup and searched IP/domain lookups
├── components/
│   └── Tracker.tsx            # The only page — search bar + info panel + map
└── types/
    └── GeoLocation.ts         # Type signature for the API response
```

## How it works

1. **On page load**, `getIpAddress()` is called with no argument, which hits the ipify API without an `ipAddress` or `domain` param — resolving to the caller's own IP. The result populates the IP, location, timezone, and ISP fields, and centers the map on that location.
2. **On search**, the entered value is validated (checked against IPv4, IPv6, and domain patterns). If invalid, an error message is shown and no request is made.
3. If valid, `getIpAddress(value)` is called with the input, which builds the correct query param (`ipAddress` or `domain`) depending on the detected input type, fetches the data, and updates the UI and map accordingly.

## Running locally

```bash
git clone <repo-url>
cd <project-folder>
npm install
npm run dev
```

You'll need an API key from [ipify](https://geo.ipify.org/) — add it to a `.env` file and reference it in `api/getIpAddress.ts` rather than hardcoding it.

## Acknowledgments

Challenge by [Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH2).
