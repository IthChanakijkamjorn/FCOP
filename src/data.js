export const PACKS = [
  {
    id: 'bronze-booster',
    name: 'Bronze Booster',
    tagline: 'Academy potential and gritty starters.',
    costLabel: 'Demo Cost: 2,000 Coins',
    themeClass: 'bronze',
    dropRates: [
      { cardClass: 'Bronze', weight: 60, label: 'Bronze 60%' },
      { cardClass: 'Silver', weight: 28, label: 'Silver 28%' },
      { cardClass: 'Gold', weight: 10, label: 'Gold 10%' },
      { cardClass: 'Elite', weight: 2, label: 'Elite 2%' }
    ]
  },
  {
    id: 'silver-surge',
    name: 'Silver Surge',
    tagline: 'Balanced value with surprise peaks.',
    costLabel: 'Demo Cost: 5,500 Coins',
    themeClass: 'silver',
    dropRates: [
      { cardClass: 'Bronze', weight: 22, label: 'Bronze 22%' },
      { cardClass: 'Silver', weight: 48, label: 'Silver 48%' },
      { cardClass: 'Gold', weight: 22, label: 'Gold 22%' },
      { cardClass: 'Elite', weight: 7, label: 'Elite 7%' },
      { cardClass: 'Legend', weight: 1, label: 'Legend 1%' }
    ]
  },
  {
    id: 'gold-gala',
    name: 'Gold Gala',
    tagline: 'Top-flight quality with rare icons.',
    costLabel: 'Demo Cost: 12,000 Coins',
    themeClass: 'gold',
    dropRates: [
      { cardClass: 'Silver', weight: 18, label: 'Silver 18%' },
      { cardClass: 'Gold', weight: 52, label: 'Gold 52%' },
      { cardClass: 'Elite', weight: 24, label: 'Elite 24%' },
      { cardClass: 'Legend', weight: 6, label: 'Legend 6%' }
    ]
  },
  {
    id: 'elite-ignition',
    name: 'Elite Ignition',
    tagline: 'High ceiling pull with premium shine.',
    costLabel: 'Demo Cost: 22,000 Coins',
    themeClass: 'elite',
    dropRates: [
      { cardClass: 'Gold', weight: 34, label: 'Gold 34%' },
      { cardClass: 'Elite', weight: 48, label: 'Elite 48%' },
      { cardClass: 'Legend', weight: 18, label: 'Legend 18%' }
    ]
  },
  {
    id: 'legend-vault',
    name: 'Legend Vault',
    tagline: 'Only stars and storybook legends.',
    costLabel: 'Demo Cost: 35,000 Coins',
    themeClass: 'legend',
    dropRates: [
      { cardClass: 'Elite', weight: 68, label: 'Elite 68%' },
      { cardClass: 'Legend', weight: 32, label: 'Legend 32%' }
    ]
  }
]

export const PLAYERS = [
  { name: 'Arin Kovac', position: 'ST', nation: '🇭🇷', team: 'Riverport FC', rating: 72, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.18M' },
  { name: 'Liam Tan', position: 'CM', nation: '🇸🇬', team: 'Harbor United', rating: 71, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.16M' },
  { name: 'Diego Ramires', position: 'RB', nation: '🇧🇷', team: 'Aurora Club', rating: 69, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.14M' },
  { name: 'Noah Bell', position: 'CB', nation: '🏴', team: 'Northbridge AFC', rating: 73, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.21M' },
  { name: 'Yuto Sera', position: 'LW', nation: '🇯🇵', team: 'Mizu Athletic', rating: 74, cardClass: 'Silver', valueLabel: 'Demo Value: 0.39M' },
  { name: 'Matteo Vela', position: 'CAM', nation: '🇪🇸', team: 'Valento SC', rating: 77, cardClass: 'Silver', valueLabel: 'Demo Value: 0.54M' },
  { name: 'Jonas Krall', position: 'CDM', nation: '🇩🇪', team: 'Bergstadt 04', rating: 75, cardClass: 'Silver', valueLabel: 'Demo Value: 0.47M' },
  { name: 'Omar Haddad', position: 'GK', nation: '🇲🇦', team: 'Atlas Pulse', rating: 76, cardClass: 'Silver', valueLabel: 'Demo Value: 0.51M' },
  { name: 'Mikael Anders', position: 'RW', nation: '🇸🇪', team: 'Fjordline FK', rating: 81, cardClass: 'Gold', valueLabel: 'Demo Value: 1.10M' },
  { name: 'Rafa Quintana', position: 'ST', nation: '🇦🇷', team: 'Rosal City', rating: 83, cardClass: 'Gold', valueLabel: 'Demo Value: 1.48M' },
  { name: 'Ibrahim Nassar', position: 'CB', nation: '🇪🇬', team: 'Delta Strikers', rating: 82, cardClass: 'Gold', valueLabel: 'Demo Value: 1.32M' },
  { name: 'Theo Marchand', position: 'CM', nation: '🇫🇷', team: 'Meridian FC', rating: 84, cardClass: 'Gold', valueLabel: 'Demo Value: 1.66M' },
  { name: 'Kaito Ren', position: 'CAM', nation: '🇯🇵', team: 'Orbit Eleven', rating: 88, cardClass: 'Elite', valueLabel: 'Demo Value: 3.90M' },
  { name: 'Luca Moretti', position: 'ST', nation: '🇮🇹', team: 'Torrena Calcio', rating: 89, cardClass: 'Elite', valueLabel: 'Demo Value: 4.25M' },
  { name: 'Amir Solberg', position: 'CDM', nation: '🇳🇴', team: 'Polar Crown', rating: 87, cardClass: 'Elite', valueLabel: 'Demo Value: 3.74M' },
  { name: 'Gabriel Stone', position: 'CB', nation: '🇺🇸', team: 'Liberty Rovers', rating: 90, cardClass: 'Elite', valueLabel: 'Demo Value: 4.70M' },
  { name: 'Zined Rami', position: 'CAM', nation: '🇩🇿', team: 'Eclipse Royale', rating: 93, cardClass: 'Legend', valueLabel: 'Demo Value: 9.80M' },
  { name: 'Soren Vale', position: 'ST', nation: '🇩🇰', team: 'Crown Legacy', rating: 94, cardClass: 'Legend', valueLabel: 'Demo Value: 11.40M' },
  { name: 'Thiago Aurum', position: 'RW', nation: '🇵🇹', team: 'Nova Imperium', rating: 95, cardClass: 'Legend', valueLabel: 'Demo Value: 12.20M' }
]

export const CLASS_STYLES = {
  Bronze: { accent: '#c9894f', label: 'Bronze Class' },
  Silver: { accent: '#b6c9de', label: 'Silver Class' },
  Gold: { accent: '#f4c344', label: 'Gold Class' },
  Elite: { accent: '#7c85ff', label: 'Elite Class' },
  Legend: { accent: '#ff4ec3', label: 'Legend Class' }
}
