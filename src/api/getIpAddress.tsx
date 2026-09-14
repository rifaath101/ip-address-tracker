import type { IpLookupResponse } from "../types/GeoLocation"

async function getUserIpAddress(): Promise<IpLookupResponse> {
  const response = await fetch(
    "https://geo.ipify.org/api/v2/country?apiKey=at_fEbbCasdjRiDBFSvDcji3Vos4NaiF",
  )

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return (await response.json()) as IpLookupResponse
}

function getInputType(input: string): "ipv4" | "ipv6" | "domain" | "invalid" {
  const trimmed = input.trim()

  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|:(:[0-9a-fA-F]{1,4}){1,7})$/
  const domainRegex =
    /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/

  if (ipv4Regex.test(trimmed)) {
    // Optional: add extra check to ensure octets are <= 255
    const parts = trimmed.split(".").map(Number)
    if (parts.every((p) => p >= 0 && p <= 255)) return "ipv4"
  }

  if (ipv6Regex.test(trimmed)) {
    return "ipv6"
  }

  if (domainRegex.test(trimmed)) {
    return "domain"
  }

  return "invalid"
}

async function getIpAddress(value: string): Promise<IpLookupResponse> {
  const valueType = getInputType(value)

  const param =
    valueType === "ipv4" || valueType === "ipv6"
      ? `ipAddress=${value}`
      : valueType === "domain"
        ? `domain=${new URL(value.startsWith("http") ? value : `https://${value}`).hostname}`
        : null

  if (param === null) {
    throw new Error(`Invalid input: ${value}`)
  }

  const response = await fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_fEbbCasdjRiDBFSvDcji3Vos4NaiF&${param}`,
  )

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return (await response.json()) as IpLookupResponse
}

export { getUserIpAddress, getIpAddress }
