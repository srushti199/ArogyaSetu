import { useEffect, useState } from "react";

import {
  Building2,
  CalendarDays,
  Droplet,
  FileText,
  Hospital,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Pill,
  Stethoscope,
  TestTube,
} from "lucide-react";

import PageShell from "../components/PageShell";
import { Card, PageHeader } from "../components/UI";

// ============================================================
// NAVIGATION
// ============================================================

const nav = [
  {
    to: "/patient/dashboard",
    label: "Dashboard",
    icon: CalendarDays,
  },
  {
    to: "/patient/appointments",
    label: "Appointments",
    icon: CalendarDays,
  },
  {
    to: "/patient/facilities",
    label: "Find Facilities",
    icon: MapPin,
  },
  {
    to: "/patient/medical-history",
    label: "Medical History",
    icon: FileText,
  },
];

// ============================================================
// FACILITY OPTIONS
// ============================================================

const FACILITY_OPTIONS = [
  {
    value: "hospital",
    label: "Hospitals",
  },
  {
    value: "pharmacy",
    label: "Medical Stores / Pharmacies",
  },
  {
    value: "blood_bank",
    label: "Blood Banks",
  },
  {
    value: "diagnostic",
    label: "Diagnostic Centres",
  },
  {
    value: "clinic",
    label: "Clinics",
  },
  {
    value: "doctors",
    label: "Doctors / Medical Practitioners",
  },
];

const SEARCH_RADIUS = 5000;

// ============================================================
// GET CURRENT LOCATION
// ============================================================

function requestCurrentLocation(onSuccess, onError) {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    onError({
      code: 0,
      message: "Geolocation is not supported.",
    });

    return;
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0,
  });
}

// ============================================================
// DISTANCE CALCULATION
// ============================================================

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;

  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((R * c).toFixed(2));
}

// ============================================================
// FORMAT ADDRESS
// ============================================================

function formatAddress(tags = {}) {
  const parts = [
    tags["addr:housenumber"],
    tags["addr:street"],
    tags["addr:suburb"],
    tags["addr:city"],
  ].filter(Boolean);

  if (parts.length === 0) {
    return "Address not available";
  }

  return parts.join(", ");
}

// ============================================================
// CREATE OVERPASS QUERY
// ============================================================

function createOverpassQuery(latitude, longitude, type) {
  const radius = SEARCH_RADIUS;

  if (type === "hospital") {
    return `
      [out:json];
      (
        node["amenity"="hospital"]
          (around:${radius},${latitude},${longitude});
        way["amenity"="hospital"]
          (around:${radius},${latitude},${longitude});
        relation["amenity"="hospital"]
          (around:${radius},${latitude},${longitude});
      );
      out center;
    `;
  }

  if (type === "pharmacy") {
    return `
      [out:json];
      (
        node["amenity"="pharmacy"]
          (around:${radius},${latitude},${longitude});
        way["amenity"="pharmacy"]
          (around:${radius},${latitude},${longitude});
      );
      out center;
    `;
  }

  if (type === "blood_bank") {
    return `
      [out:json];
      (
        node["healthcare"="blood_bank"]
          (around:${radius},${latitude},${longitude});
        node["amenity"="blood_bank"]
          (around:${radius},${latitude},${longitude});
        way["healthcare"="blood_bank"]
          (around:${radius},${latitude},${longitude});
      );
      out center;
    `;
  }

  if (type === "diagnostic") {
    return `
      [out:json];
      (
        node["healthcare"="laboratory"]
          (around:${radius},${latitude},${longitude});
        node["amenity"="laboratory"]
          (around:${radius},${latitude},${longitude});
        way["healthcare"="laboratory"]
          (around:${radius},${latitude},${longitude});
      );
      out center;
    `;
  }

  if (type === "clinic") {
    return `
      [out:json];
      (
        node["amenity"="clinic"]
          (around:${radius},${latitude},${longitude});
        node["healthcare"="clinic"]
          (around:${radius},${latitude},${longitude});
        way["amenity"="clinic"]
          (around:${radius},${latitude},${longitude});
      );
      out center;
    `;
  }

  if (type === "doctors") {
    return `
      [out:json];
      (
        node["amenity"="doctors"]
          (around:${radius},${latitude},${longitude});
        node["healthcare"="doctor"]
          (around:${radius},${latitude},${longitude});
      );
      out center;
    `;
  }

  return "";
}

// ============================================================
// SEARCH FACILITIES
// ============================================================

async function fetchNearbyFacilities(latitude, longitude, type) {
  const query = createOverpassQuery(latitude, longitude, type);

  if (!query) {
    return [];
  }

  const response = await fetch(
    `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Facility API failed");
  }

  const data = await response.json();

  const results = data.elements
    .map((item) => {
      const tags = item.tags || {};

      const facilityLatitude = item.lat ?? item.center?.lat;

      const facilityLongitude = item.lon ?? item.center?.lon;

      if (facilityLatitude === undefined || facilityLongitude === undefined) {
        return null;
      }

      const distance = calculateDistance(latitude, longitude, facilityLatitude, facilityLongitude);

      return {
        id: `${item.type}-${item.id}`,
        name: tags.name || "Unnamed Healthcare Facility",
        latitude: facilityLatitude,
        longitude: facilityLongitude,
        phone: tags.phone || tags["contact:phone"] || "",
        address: formatAddress(tags),
        distance,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.distance - b.distance);

  return results;
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function PatientFacilities() {
  const [facilityType, setFacilityType] = useState("hospital");

  const [location, setLocation] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(true);

  const [loadingFacilities, setLoadingFacilities] = useState(false);

  const [facilities, setFacilities] = useState([]);

  const [error, setError] = useState("");

  // ==========================================================
  // LOCATION ERROR
  // ==========================================================

  const handleLocationError = (locationError) => {
    setLoadingLocation(false);

    if (locationError.code === 1) {
      setError("Location permission denied. Please allow location access in your browser.");
    } else if (locationError.code === 2) {
      setError("Location information is unavailable.");
    } else if (locationError.code === 3) {
      setError("Location request timed out. Please try again.");
    } else {
      setError("Your browser does not support location services.");
    }
  };

  // ==========================================================
  // SEARCH FACILITIES
  // ==========================================================

  const searchFacilities = async (latitude, longitude, type) => {
    setLoadingFacilities(true);
    setError("");

    try {
      const results = await fetchNearbyFacilities(latitude, longitude, type);

      setFacilities(results);
    } catch (err) {
      console.error("Facility search error:", err);

      setFacilities([]);

      setError("Unable to load nearby facilities. Please try again.");
    } finally {
      setLoadingFacilities(false);
    }
  };

  // ==========================================================
  // GET CURRENT LOCATION
  // ==========================================================

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    setError("");

    requestCurrentLocation((position) => {
      const currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setLocation(currentLocation);
      setLoadingLocation(false);

      searchFacilities(currentLocation.latitude, currentLocation.longitude, facilityType);
    }, handleLocationError);
  };

  // ==========================================================
  // INITIAL LOCATION
  // ==========================================================

  useEffect(() => {
    requestCurrentLocation((position) => {
      const currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setLocation(currentLocation);
      setLoadingLocation(false);
      setLoadingFacilities(true);

      fetchNearbyFacilities(currentLocation.latitude, currentLocation.longitude, "hospital")
        .then((results) => {
          setFacilities(results);
        })
        .catch((err) => {
          console.error("Initial facility search error:", err);

          setFacilities([]);

          setError("Unable to load nearby facilities. Please try again.");
        })
        .finally(() => {
          setLoadingFacilities(false);
        });
    }, handleLocationError);
  }, []);

  // ==========================================================
  // CHANGE FACILITY TYPE
  // ==========================================================

  const handleFacilityChange = (event) => {
    const selectedType = event.target.value;

    setFacilityType(selectedType);

    if (location) {
      searchFacilities(location.latitude, location.longitude, selectedType);
    }
  };

  // ==========================================================
  // GOOGLE MAPS DIRECTIONS
  // ==========================================================

  const openDirections = (facility) => {
    if (!location) {
      return;
    }

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${location.latitude},${location.longitude}` +
      `&destination=${facility.latitude},${facility.longitude}`;

    window.open(url, "_blank");
  };

  // ==========================================================
  // CURRENT FACILITY LABEL
  // ==========================================================

  const currentFacilityLabel = FACILITY_OPTIONS.find((item) => item.value === facilityType)?.label;

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <PageShell role='patient' items={nav}>
      {/* Page Header */}
      <PageHeader
        eyebrow='Local care access'
        title='Find Nearby Facilities'
        description='Find healthcare services near your current location.'
        action={
          <button
            onClick={getCurrentLocation}
            disabled={loadingLocation}
            className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#27966b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#21845e] disabled:cursor-not-allowed disabled:opacity-70'
          >
            <LocateFixed size={16} />

            {loadingLocation ? "Detecting..." : "Use My Location"}
          </button>
        }
      />

      {/* Search Controls */}
      <Card className='mt-6 p-5'>
        <div className='grid gap-4 md:grid-cols-[1fr_auto]'>
          {/* Facility Type */}
          <div>
            <label className='mb-2 block text-[10px] font-semibold uppercase tracking-wide text-[#718078]'>
              What are you looking for?
            </label>

            <select
              value={facilityType}
              onChange={handleFacilityChange}
              className='w-full rounded-xl border border-[#dce8df] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#27966b]'
            >
              {FACILITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Button */}
          <div className='flex items-end'>
            <button
              onClick={getCurrentLocation}
              disabled={loadingLocation}
              className='flex w-full items-center justify-center gap-2 rounded-xl border border-[#cddbd3] bg-white px-5 py-3 text-xs font-semibold text-[#17372d] transition hover:bg-[#eef8f2] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto'
            >
              <LocateFixed size={15} />

              {loadingLocation ? "Detecting..." : "Use My Location"}
            </button>
          </div>
        </div>

        {/* Location Status */}
        <div className='mt-4 flex items-center gap-2 rounded-xl bg-[#f5faf6] p-3'>
          <MapPin size={15} className='shrink-0 text-[#27966b]' />

          {location ? (
            <p className='text-xs text-[#718078]'>
              Your location has been detected. Showing facilities within 5 km.
            </p>
          ) : (
            <p className='text-xs text-[#718078]'>
              Allow location access to find facilities near you.
            </p>
          )}
        </div>
      </Card>

      {/* Error */}
      {error && (
        <div className='mt-5 rounded-xl border border-red-200 bg-red-50 p-4'>
          <p className='text-xs text-red-600'>{error}</p>
        </div>
      )}

      {/* Results */}
      <section className='mt-7'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h2 className='text-lg font-semibold'>Nearby {currentFacilityLabel}</h2>

            <p className='mt-1 text-xs text-[#718078]'>Results sorted by distance</p>
          </div>

          {location && <span className='text-xs font-medium text-[#27966b]'>Within 5 km</span>}
        </div>

        {/* Loading */}
        {loadingFacilities ? (
          <Card className='mt-5 py-12 text-center'>
            <div className='mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#dcece4] border-t-[#27966b]' />

            <p className='mt-3 text-xs text-[#718078]'>Searching nearby facilities...</p>
          </Card>
        ) : facilities.length === 0 ? (
          /* No Results */
          <Card className='mt-5 py-12 text-center'>
            <MapPin size={30} className='mx-auto text-gray-300' />

            <p className='mt-3 text-xs text-[#718078]'>
              {location
                ? "No facilities found within 5 km."
                : "Allow location access to search nearby facilities."}
            </p>

            <button
              onClick={getCurrentLocation}
              disabled={loadingLocation}
              className='mt-4 rounded-xl bg-[#27966b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#21845e] disabled:opacity-70'
            >
              {loadingLocation ? "Detecting..." : "Search Again"}
            </button>
          </Card>
        ) : (
          /* Facility Cards */
          <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                type={facilityType}
                onDirections={() => openDirections(facility)}
              />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

// ============================================================
// FACILITY CARD
// ============================================================

function FacilityCard({ facility, type, onDirections }) {
  const getIcon = () => {
    if (type === "pharmacy") {
      return <Pill size={20} />;
    }

    if (type === "blood_bank") {
      return <Droplet size={20} />;
    }

    if (type === "diagnostic") {
      return <TestTube size={20} />;
    }

    if (type === "clinic") {
      return <Building2 size={20} />;
    }

    if (type === "doctors") {
      return <Stethoscope size={20} />;
    }

    return <Hospital size={20} />;
  };

  return (
    <Card className='p-5'>
      {/* Icon + Distance */}
      <div className='flex items-start justify-between gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f4ed] text-[#27966b]'>
          {getIcon()}
        </div>

        <span className='rounded-full bg-[#edf7f1] px-2.5 py-1 text-[9px] font-medium text-[#27966b]'>
          {facility.distance} km
        </span>
      </div>

      {/* Facility Name */}
      <h3 className='mt-4 line-clamp-2 text-sm font-semibold'>{facility.name}</h3>

      {/* Address */}
      <div className='mt-3 flex items-start gap-2'>
        <MapPin size={14} className='mt-0.5 shrink-0 text-gray-400' />

        <p className='text-[10px] leading-4 text-[#718078]'>{facility.address}</p>
      </div>

      {/* Phone */}
      {facility.phone && (
        <div className='mt-2 flex items-center gap-2'>
          <Phone size={13} className='shrink-0 text-gray-400' />

          <p className='text-[10px] text-[#718078]'>{facility.phone}</p>
        </div>
      )}

      {/* Directions */}
      <button
        onClick={onDirections}
        disabled={!facility.latitude}
        className='mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#27966b] py-2.5 text-xs font-semibold text-[#27966b] transition hover:bg-[#e8f6ee] disabled:cursor-not-allowed disabled:opacity-50'
      >
        <Navigation size={14} />
        Get Directions
      </button>
    </Card>
  );
}
