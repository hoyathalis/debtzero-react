
import React from 'react';

interface PersonaSelectionProps {
  personas: string[];
  selectedPersona: string | null;
  handlePersonaClick: (persona: string) => void;
}

export default function PersonaSelection({
  personas,
  selectedPersona,
  handlePersonaClick
}: PersonaSelectionProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {personas.map((persona) => (
        <button
          key={persona}
          onClick={() => handlePersonaClick(persona)}
          className={`p-2 rounded ${
            selectedPersona === persona
              ? 'bg-blue-600 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {persona}
        </button>
      ))}
    </div>
  );
}