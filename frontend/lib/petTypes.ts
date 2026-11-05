export const petTypes = [
  { value: 'dog', label: 'Chien' },
  { value: 'cat', label: 'Chat' },
  { value: 'bird', label: 'Oiseau' },
  { value: 'rodent', label: 'Rongeur (hamster, cochon d’Inde...)' },
  { value: 'rabbit', label: 'Lapin' },
  { value: 'fish', label: 'Poisson' },
  { value: 'reptile', label: 'Reptile' },
  { value: 'other', label: 'Autre' },
];

export function getPetTypeLabel(value: string) {
  return petTypes.find((t) => t.value === value)?.label ?? value;
}