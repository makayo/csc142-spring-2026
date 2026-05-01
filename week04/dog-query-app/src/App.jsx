import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBreeds, getBreed, getFacts, getGroups } from "./api/dogApi";
import "./App.css";

function Attr({ label, value }) {
  return (
    <div>
      <span className="attr-label">{label}</span>
      <span className="attr-value">{value}</span>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div className="section">
      {label && <span className="section-label">{label}</span>}
      {children}
    </div>
  );
}

export default function App() {
  const [selectedBreedId, setSelectedBreedId] = useState("");
  const [showFacts, setShowFacts] = useState(false);
  const [showGroups, setShowGroups] = useState(false);

  const {
    data: breedsData,
    isPending: breedsLoading,
    isError: breedsError,
    isSuccess: breedsSuccess,
  } = useQuery({
    queryKey: ["breeds"],
    queryFn: getBreeds,
  });

  const {
    data: breedData,
    isPending: breedLoading,
    isError: breedError,
    isSuccess: breedSuccess,
  } = useQuery({
    queryKey: ["breed", selectedBreedId],
    queryFn: () => getBreed(selectedBreedId),
    enabled: !!selectedBreedId,
  });

  const {
    data: factsData,
    isPending: factsLoading,
    isError: factsError,
    isSuccess: factsSuccess,
    refetch: loadFacts,
  } = useQuery({
    queryKey: ["facts"],
    queryFn: getFacts,
    enabled: false,
  });

  const {
    data: groupsData,
    isPending: groupsLoading,
    isError: groupsError,
    isSuccess: groupsSuccess,
    refetch: loadGroups,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
    enabled: false,
  });

  const breeds = breedsData?.data ?? [];
  const selectedBreed = breedData?.data;

  if (breedsLoading)
    return (
      <div
        style={{ display: "grid", placeItems: "center", minHeight: "100svh" }}
      >
        <div className="spinner" />
      </div>
    );

  if (breedsError)
    return (
      <div
        style={{ display: "grid", placeItems: "center", minHeight: "100svh" }}
      >
        <p className="error-text">Failed to load breeds.</p>
      </div>
    );

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Dog Explorer</h1>
        <span className="app-badge">dogapi.dog / v2</span>
      </header>

      <Section label="Breed">
        <select
          className="breed-select"
          value={selectedBreedId}
          onChange={(e) => setSelectedBreedId(e.target.value)}
        >
          <option value="">Select a breed...</option>
          {breeds.map((b) => (
            <option key={b.id} value={b.id}>
              {b.attributes?.name}
            </option>
          ))}
        </select>

        {breedLoading && <div className="spinner" />}
        {breedError && <p className="error-text">Failed to load breed.</p>}

        {breedSuccess && selectedBreed && (
          <div className="card">
            <h2 className="card-title">{selectedBreed.attributes?.name}</h2>
            <p className="card-text">
              {selectedBreed.attributes?.description ||
                "No description available."}
            </p>
            <div className="attr-grid">
              <Attr
                label="Min life"
                value={
                  selectedBreed.attributes?.life?.min
                    ? `${selectedBreed.attributes.life.min} yrs`
                    : "—"
                }
              />
              <Attr
                label="Max life"
                value={
                  selectedBreed.attributes?.life?.max
                    ? `${selectedBreed.attributes.life.max} yrs`
                    : "—"
                }
              />
              <Attr
                label="Min weight"
                value={
                  selectedBreed.attributes?.weight?.metric
                    ? `${selectedBreed.attributes.weight.metric.split(" - ")[0]} kg`
                    : "—"
                }
              />
              <Attr
                label="Max weight"
                value={
                  selectedBreed.attributes?.weight?.metric
                    ? `${selectedBreed.attributes.weight.metric.split(" - ")[1]} kg`
                    : "—"
                }
              />
              <Attr
                label="Hypoallergenic"
                value={selectedBreed.attributes?.hypoallergenic ? "Yes" : "No"}
              />
            </div>
          </div>
        )}
      </Section>

      <hr className="divider" />

      <div className="btn-row">
        <button
          className={`btn${showFacts ? "" : " inactive"}`}
          onClick={() => {
            if (!showFacts) loadFacts();
            setShowFacts((v) => !v);
          }}
        >
          facts
        </button>
        <button
          className={`btn${showGroups ? "" : " inactive"}`}
          onClick={() => {
            if (!showGroups) loadGroups();
            setShowGroups((v) => !v);
          }}
        >
          groups
        </button>
      </div>

      {(showFacts || showGroups) && (
        <div className="panel-stack">
          {showFacts && (
            <div className="panel-card">
              <p className="panel-card-title">Dog Facts</p>
              {factsLoading && <div className="spinner" />}
              {factsError && (
                <p className="error-text">Failed to load facts.</p>
              )}
              {factsSuccess && factsData?.data && (
                <ul className="item-list">
                  {factsData.data.map((f) => (
                    <li key={f.id}>{f.attributes?.body || "—"}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {showGroups && (
            <div className="panel-card">
              <p className="panel-card-title">Breed Groups</p>
              {groupsLoading && <div className="spinner" />}
              {groupsError && (
                <p className="error-text">Failed to load groups.</p>
              )}
              {groupsSuccess && groupsData?.data && (
                <ul className="item-list columnar">
                  {groupsData.data.map((g) => (
                    <li key={g.id}>{g.attributes?.name || "—"}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
