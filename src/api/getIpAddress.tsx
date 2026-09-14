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

async function getIpAddress(domain: string): Promise<IpLookupResponse> {
  const modifiedDomain = new URL(domain).hostname
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_fEbbCasdjRiDBFSvDcji3Vos4NaiF&domain=${modifiedDomain}`,
  )

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return (await response.json()) as IpLookupResponse
}

export { getUserIpAddress, getIpAddress }
