export const petTypes = [
  { value: 'dog', label: 'Chien' },
  { value: 'cat', label: 'Chat' },
  { value: 'bunny', label: 'Lapin' },
  { value: 'bird', label: 'Oiseau' },
  { value: 'hamster', label: 'Hamster' },
  { value: 'gineapig', label: 'Cochon d’Inde' },
  { value: 'mouse', label: 'Souris' },
  { value: 'rat', label: 'Rat' },
  { value: 'fish', label: 'Poisson' },
  { value: 'lizard', label: 'Lezard' },
  { value: 'snake', label: 'Serpent' },
  { value: 'turtle', label: 'Tortue' },
  { value: 'other', label: 'Autre' },
];

export function getPetTypeLabel(value: string) {
  return petTypes.find((t) => t.value === value)?.label ?? value;
}