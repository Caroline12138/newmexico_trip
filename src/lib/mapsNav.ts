/** Google Maps 驾车导航深链（统一用 Google，不走 Apple Maps）。 */
export function googleMapsDriveUrl(lat: number, lng: number) {
  const q = new URLSearchParams({
    api: '1',
    destination: `${lat},${lng}`,
    travelmode: 'driving',
  })
  return `https://www.google.com/maps/dir/?${q}`
}

export function preferredDriveUrl(lat: number, lng: number) {
  return googleMapsDriveUrl(lat, lng)
}
