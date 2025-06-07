// Dummy data for demonstrating cards in the template
export const cardListData = [
  ...Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Card Title ${i + 1}`,
    description: `This is a description for card ${i + 1}. It provides a brief summary of the card content.`,
    date: `2025-06-${(i + 1).toString().padStart(2, '0')}`,
  })),
];
