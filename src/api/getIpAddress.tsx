import type { IpLookupResponse } from "../types/GeoLocation"

function getInputType(input: string): "ipv4" | "ipv6" | "domain" | "invalid" {
  const trimmed = input.trim()

  // Strip scheme + path/query/hash so we only classify the host part
  let candidate = trimmed
  try {
    const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)
    candidate = new URL(hasScheme ? trimmed : `https://${trimmed}`).hostname
  } catch {
    // not URL-parseable at all — fall through with original trimmed value,
    // regexes below will correctly reject genuinely invalid input
  }

  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|:(:[0-9a-fA-F]{1,4}){1,7})$/
  const domainRegex =
    /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/

  if (ipv4Regex.test(candidate)) {
    const parts = candidate.split(".").map(Number)
    if (parts.every((p) => p >= 0 && p <= 255)) return "ipv4"
  }

  if (ipv6Regex.test(candidate)) {
    return "ipv6"
  }

  if (domainRegex.test(candidate)) {
    return "domain"
  }

  return "invalid"
}

function isValidInput(input: string): boolean {
  return getInputType(input) !== "invalid"
}

async function getIpAddress(value?: string): Promise<IpLookupResponse> {
  const params = new URLSearchParams({
    apiKey: "at_PJ5c46cqNLSqu7qjhafLMWt9nOy5D",
  })

  if (value !== undefined) {
    const valueType = getInputType(value)

    if (valueType === "ipv4" || valueType === "ipv6") {
      params.set("ipAddress", value)
    } else if (valueType === "domain") {
      const hasScheme = value.startsWith("http")
      params.set(
        "domain",
        new URL(hasScheme ? value : `https://${value}`).hostname,
      )
    } else {
      throw new Error(`Invalid input: ${value}`)
    }
  }

  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?${params.toString()}`,
  )

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return (await response.json()) as IpLookupResponse
}

export { getIpAddress, isValidInput }
