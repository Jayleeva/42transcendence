export const petTypes = [
  { value: 'DOG', label: 'Chien' },
  { value: 'CAT', label: 'Chat' },
  { value: 'BUNNY', label: 'Lapin' },
  { value: 'BIRD', label: 'Oiseau' },
  { value: 'HAMSTER', label: 'Hamster' },
  { value: 'GINEAPIG', label: 'Cochon d’Inde' },
  { value: 'MOUSE', label: 'Souris' },
  { value: 'RAT', label: 'Rat' },
  { value: 'FISH', label: 'Poisson' },
  { value: 'LIZARD', label: 'Lezard' },
  { value: 'SNAKE', label: 'Serpent' },
  { value: 'TURTLE', label: 'Tortue' },
  { value: 'OTHER', label: 'Autre' },
];

export function getPetTypeLabel(value: string) {
  return petTypes.find((t) => t.value === value)?.label ?? value;
}