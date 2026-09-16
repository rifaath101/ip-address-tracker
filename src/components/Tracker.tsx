import L from "leaflet"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { getIpAddress, isValidInput } from "../api/getIpAddress"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

const defaultMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const FALLBACK_CENTER: L.LatLngExpression = [40.6892, -73.9857]

function Tracker() {
  type Location = {
    country: string
    region: string
    timezone: string
  }

  const [isLocating, setIsLocating] = useState(true)
  const [position, setPosition] = useState<L.LatLngExpression>(FALLBACK_CENTER)
  const [ipAddress, setIpAddress] = useState("")
  const [location, setLocation] = useState<Location>()
  const [input, setInput] = useState("")
  const [inputError, setInputError] = useState(false)
  const [isp, setIsp] = useState("")

  useEffect(() => {
    getIpAddress()
      .then((data) => {
        setPosition([data.location.lat, data.location.lng])
        setIsLocating(false)
        setIpAddress(data.ip)
        setLocation(data.location)
        setIsp(data.isp)
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputError(false)
    setInput(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidInput(input)) {
      setInput("Invalid IP Address or Domain name")
      setInputError(true)
      return
    }

    setIsLocating(true)

    try {
      const data = await getIpAddress(input)
      setPosition([data.location.lat, data.location.lng])
      setIsLocating(false)
      setIpAddress(data.ip)
      setLocation(data.location)
      setIsp(data.isp)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return (
    <div className="relative min-h-screen font-rubik">
      <header className="relative z-[1] h-[280px] shrink-0 bg-[url('/images/pattern-bg-mobile.png')] bg-cover bg-center bg-no-repeat md:h-[300px] md:bg-[url('/images/pattern-bg-desktop.png')]">
        <div className="mx-auto flex h-full max-w-[1110px] flex-col items-center px-6 pt-12 md:pt-[49px]">
          <h1 className="mb-8 text-[26px] font-medium leading-none tracking-wide text-white md:mb-[38px] md:text-[32px]">
            IP Address Tracker
          </h1>

          <form
            className="bg-white flex w-full max-w-[555px] overflow-hidden rounded-[15px] shadow-[0_7px_29px_0_rgba(100,100,111,0.2)]"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              className={`min-w-0 flex-1 px-6 py-5 text-lg outline-none placeholder:text-gray-400 md:py-[22px] md:pr-4 ${
                inputError ? "text-red-600" : "text-gray-950"
              }`}
              aria-label="Search for an IP address or domain"
              value={input}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="flex w-[58px] shrink-0 items-center justify-center bg-gray-950 transition-colors hover:bg-[hsl(0,0%,30%)] md:w-[80px]"
              aria-label="Search"
            >
              <img
                src="/images/icon-arrow.svg"
                alt=""
                className="h-[14px] w-[11px]"
              />
            </button>
          </form>
        </div>
      </header>

      <div className="absolute inset-x-0 top-[280px] bottom-0 z-0 md:top-[300px]">
        {!isLocating ? (
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS &amp; others"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            />
            <Marker position={position} icon={defaultMarkerIcon}>
              <Popup>Your location</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center gap-3 py-72">
            <svg
              className="h-5 w-5 animate-spin text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-lg font-medium text-gray-400">
              Loading...
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 -mt-[72px] px-6 md:-mt-[56px]">
        <div className="mx-auto max-w-[1110px] rounded-[15px] bg-white px-6 py-6 shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] md:px-8 md:py-[37px]">
          <dl className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:gap-0">
            <div className="flex w-full flex-col items-center text-center md:flex-1 md:items-start md:pl-0 md:px-8 md:text-left md:border-r md:border-black/10">
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 md:mb-3 md:text-xs">
                IP Address
              </dt>
              {ipAddress && (
                <dd className="text-xl font-medium leading-snug text-gray-950 md:text-[26px]">
                  {ipAddress}
                </dd>
              )}
            </div>

            <div className="flex w-full flex-col items-center text-center md:flex-1 md:items-start md:px-8 md:text-left md:border-r md:border-black/10">
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 md:mb-3 md:text-xs">
                Location
              </dt>
              {location && (
                <dd className="text-xl font-medium leading-snug text-gray-950 md:text-[26px]">
                  {location?.country}, {location?.region}
                </dd>
              )}
            </div>

            <div className="flex w-full flex-col items-center text-center md:flex-1 md:items-start md:px-8 md:text-left md:border-r md:border-black/10">
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 md:mb-3 md:text-xs">
                Timezone
              </dt>
              <dd className="text-xl font-medium leading-snug text-gray-950 md:text-[26px]">
                {location?.timezone}
              </dd>
            </div>

            <div className="flex w-full flex-col items-center text-center md:flex-1 md:items-start md:px-8 md:text-left ">
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 md:mb-3 md:text-xs">
                ISP
              </dt>

              {ipAddress && (
                <dd className="text-xl font-medium leading-snug text-gray-950 md:text-[26px]">
                  {isp ? isp : "No ISP Available"}
                </dd>
              )}
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Tracker
