type GeolocationPosition = {
  coords: GeolocationCoordinates
  timestamp: EpochTimeStamp // number (ms since epoch)
}

type GeolocationCoordinates = {
  readonly accuracy: number
  readonly altitude: number | null
  readonly altitudeAccuracy: number | null
  readonly heading: number | null
  readonly latitude: number
  readonly longitude: number
  readonly speed: number | null
}

type IpLookupResponse = {
  ip: string
  location: {
    country: string
    region: string
    timezone: string
  }
  domains: string[]
  as: {
    asn: number
    name: string
    route: string
    domain: string
    type: string
  }
  isp: string
}

export type { GeolocationPosition, IpLookupResponse }
