import L from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
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

const MAP_CENTER: L.LatLngExpression = [40.6892, -73.9857]

function Tracker() {
  return (
    <div className="relative min-h-screen font-rubik">
      <header className="relative z-[1] h-[280px] shrink-0 bg-[url('/images/pattern-bg-mobile.png')] bg-cover bg-center bg-no-repeat md:h-[300px] md:bg-[url('/images/pattern-bg-desktop.png')]">
        <div className="mx-auto flex h-full max-w-[1110px] flex-col items-center px-6 pt-12 md:pt-[49px]">
          <h1 className="mb-8 text-[26px] font-medium leading-none tracking-wide text-white md:mb-[38px] md:text-[32px]">
            IP Address Tracker
          </h1>

          <form
            className="bg-white flex w-full max-w-[555px] overflow-hidden rounded-[15px] shadow-[0_7px_29px_0_rgba(100,100,111,0.2)]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              className="min-w-0 flex-1 px-6 py-5 text-lg text-gray-950 outline-none placeholder:text-gray-400 md:py-[22px] md:pr-4"
              aria-label="Search for an IP address or domain"
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
        <MapContainer
          center={MAP_CENTER}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={MAP_CENTER} icon={defaultMarkerIcon}>
            <Popup>Brooklyn, NY 10001</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="relative z-10 -mt-[72px] px-6 md:-mt-[56px]">
        <div className="mx-auto max-w-[1110px] rounded-[15px] bg-white px-6 py-6 shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] md:px-8 md:py-[37px]">
          <dl className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:gap-0">
            <div className="flex w-full flex-col items-center text-center md:flex-1 md:items-start md:pl-0 md:px-8 md:text-left md:border-r md:border-black/10">
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 md:mb-3 md:text-xs">
                IP Address
              </dt>
              <dd className="text-xl font-medium leading-snug text-gray-950 md:text-[26px]">
                __
              </dd>
            </div>

            <div className="flex w-full flex-col items-center text-center md:flex-1 md:items-start md:px-8 md:text-left md:border-r md:border-black/10">
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 md:mb-3 md:text-xs">
                Location
              </dt>
              <dd className="text-xl font-medium leading-snug text-gray-950 md:text-[26px]">
                __
              </dd>
            </div>

            <div className="flex w-full flex-col items-center text-center md:flex-1 md:items-start md:px-8 md:text-left md:border-r md:border-black/10">
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 md:mb-3 md:text-xs">
                Timezone
              </dt>
              <dd className="text-xl font-medium leading-snug text-gray-950 md:text-[26px]">
                __
              </dd>
            </div>

            <div className="flex w-full flex-col items-center text-center md:flex-1 md:items-start md:pr-0 md:px-8 md:text-left">
              <dt className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 md:mb-3 md:text-xs">
                ISP
              </dt>
              <dd className="text-xl font-medium leading-snug text-gray-950 md:text-[26px]">
                __
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Tracker
