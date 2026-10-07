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

const PLAYER_ASSET_PATH = '/assets/players'
const TEAM_ASSET_PATH = '/assets/teams'

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const withAssets = (player) => ({
  ...player,
  portrait: `${PLAYER_ASSET_PATH}/${slugify(player.name)}.svg`,
  teamLogo: `${TEAM_ASSET_PATH}/${slugify(player.team)}.svg`
})

export const PLAYERS = [
  { name: 'Bart Verbruggen', position: 'GK', nation: '🇳🇱', team: 'Brighton', rating: 72, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.29M' },
  { name: 'Lucas Chevalier', position: 'GK', nation: '🇫🇷', team: 'Lille', rating: 71, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.25M' },
  { name: 'Anatoliy Trubin', position: 'GK', nation: '🇺🇦', team: 'Benfica', rating: 70, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.22M' },
  { name: 'James Trafford', position: 'GK', nation: '🏴', team: 'Burnley', rating: 69, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.19M' },
  { name: 'Leny Yoro', position: 'CB', nation: '🇫🇷', team: 'Manchester United', rating: 73, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.31M' },
  { name: 'Giorgio Scalvini', position: 'CB', nation: '🇮🇹', team: 'Atalanta', rating: 72, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.28M' },
  { name: 'Rico Lewis', position: 'RB', nation: '🏴', team: 'Manchester City', rating: 71, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.24M' },
  { name: 'Jorrel Hato', position: 'LB', nation: '🇳🇱', team: 'Ajax', rating: 70, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.21M' },
  { name: 'Levi Colwill', position: 'CB', nation: '🏴', team: 'Chelsea', rating: 73, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.30M' },
  { name: 'Tino Livramento', position: 'RB', nation: '🏴', team: 'Newcastle United', rating: 72, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.27M' },
  { name: 'Kobbie Mainoo', position: 'CM', nation: '🏴', team: 'Manchester United', rating: 74, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.32M' },
  { name: 'Archie Gray', position: 'CDM', nation: '🏴', team: 'Tottenham Hotspur', rating: 70, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.20M' },
  { name: 'Arda Guler', position: 'CAM', nation: '🇹🇷', team: 'Real Madrid', rating: 74, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.33M' },
  { name: 'Warren Zaire-Emery', position: 'CM', nation: '🇫🇷', team: 'Paris Saint-Germain', rating: 73, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.30M' },
  { name: 'Romeo Lavia', position: 'CDM', nation: '🇧🇪', team: 'Chelsea', rating: 71, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.23M' },
  { name: 'Bilal El Khannouss', position: 'CAM', nation: '🇲🇦', team: 'Leicester City', rating: 69, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.18M' },
  { name: 'Endrick', position: 'ST', nation: '🇧🇷', team: 'Real Madrid', rating: 74, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.34M' },
  { name: 'Benjamin Sesko', position: 'ST', nation: '🇸🇮', team: 'RB Leipzig', rating: 73, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.31M' },
  { name: 'Alejandro Garnacho', position: 'LW', nation: '🇦🇷', team: 'Manchester United', rating: 72, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.28M' },
  { name: 'Savio', position: 'RW', nation: '🇧🇷', team: 'Manchester City', rating: 70, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.22M' },
  { name: 'Youssoufa Moukoko', position: 'ST', nation: '🇩🇪', team: 'Nice', rating: 69, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.17M' },
  { name: 'Karim Konate', position: 'ST', nation: '🇨🇮', team: 'Red Bull Salzburg', rating: 68, cardClass: 'Bronze', valueLabel: 'Demo Value: 0.15M' },

  { name: 'Diogo Costa', position: 'GK', nation: '🇵🇹', team: 'Porto', rating: 79, cardClass: 'Silver', valueLabel: 'Demo Value: 0.98M' },
  { name: 'Gregor Kobel', position: 'GK', nation: '🇨🇭', team: 'Borussia Dortmund', rating: 78, cardClass: 'Silver', valueLabel: 'Demo Value: 0.90M' },
  { name: 'Unai Simon', position: 'GK', nation: '🇪🇸', team: 'Athletic Club', rating: 77, cardClass: 'Silver', valueLabel: 'Demo Value: 0.84M' },
  { name: 'Giorgi Mamardashvili', position: 'GK', nation: '🇬🇪', team: 'Valencia', rating: 76, cardClass: 'Silver', valueLabel: 'Demo Value: 0.78M' },
  { name: 'Ronald Araujo', position: 'CB', nation: '🇺🇾', team: 'Barcelona', rating: 80, cardClass: 'Silver', valueLabel: 'Demo Value: 0.97M' },
  { name: 'William Saliba', position: 'CB', nation: '🇫🇷', team: 'Arsenal', rating: 79, cardClass: 'Silver', valueLabel: 'Demo Value: 0.92M' },
  { name: 'Alessandro Bastoni', position: 'CB', nation: '🇮🇹', team: 'Inter', rating: 78, cardClass: 'Silver', valueLabel: 'Demo Value: 0.88M' },
  { name: 'Jeremie Frimpong', position: 'RB', nation: '🇳🇱', team: 'Bayer Leverkusen', rating: 77, cardClass: 'Silver', valueLabel: 'Demo Value: 0.81M' },
  { name: 'Alphonso Davies', position: 'LB', nation: '🇨🇦', team: 'Bayern Munich', rating: 80, cardClass: 'Silver', valueLabel: 'Demo Value: 0.99M' },
  { name: 'Declan Rice', position: 'CDM', nation: '🏴', team: 'Arsenal', rating: 80, cardClass: 'Silver', valueLabel: 'Demo Value: 0.98M' },
  { name: 'Federico Valverde', position: 'CM', nation: '🇺🇾', team: 'Real Madrid', rating: 80, cardClass: 'Silver', valueLabel: 'Demo Value: 0.99M' },
  { name: 'Martin Odegaard', position: 'CAM', nation: '🇳🇴', team: 'Arsenal', rating: 79, cardClass: 'Silver', valueLabel: 'Demo Value: 0.91M' },
  { name: 'Nicolo Barella', position: 'CM', nation: '🇮🇹', team: 'Inter', rating: 78, cardClass: 'Silver', valueLabel: 'Demo Value: 0.86M' },
  { name: 'Hakan Calhanoglu', position: 'CM', nation: '🇹🇷', team: 'Inter', rating: 77, cardClass: 'Silver', valueLabel: 'Demo Value: 0.79M' },
  { name: 'Bruno Guimaraes', position: 'CM', nation: '🇧🇷', team: 'Newcastle United', rating: 78, cardClass: 'Silver', valueLabel: 'Demo Value: 0.85M' },
  { name: 'Victor Osimhen', position: 'ST', nation: '🇳🇬', team: 'Galatasaray', rating: 80, cardClass: 'Silver', valueLabel: 'Demo Value: 0.99M' },
  { name: 'Lautaro Martinez', position: 'ST', nation: '🇦🇷', team: 'Inter', rating: 80, cardClass: 'Silver', valueLabel: 'Demo Value: 0.98M' },
  { name: 'Rafael Leao', position: 'LW', nation: '🇵🇹', team: 'AC Milan', rating: 79, cardClass: 'Silver', valueLabel: 'Demo Value: 0.92M' },
  { name: 'Bukayo Saka', position: 'RW', nation: '🏴', team: 'Arsenal', rating: 80, cardClass: 'Silver', valueLabel: 'Demo Value: 0.99M' },
  { name: 'Khvicha Kvaratskhelia', position: 'LW', nation: '🇬🇪', team: 'Paris Saint-Germain', rating: 78, cardClass: 'Silver', valueLabel: 'Demo Value: 0.87M' },
  { name: 'Ousmane Dembele', position: 'RW', nation: '🇫🇷', team: 'Paris Saint-Germain', rating: 77, cardClass: 'Silver', valueLabel: 'Demo Value: 0.80M' },
  { name: 'Son Heung-min', position: 'LW', nation: '🇰🇷', team: 'Tottenham Hotspur', rating: 79, cardClass: 'Silver', valueLabel: 'Demo Value: 0.93M' },

  { name: 'Alisson Becker', position: 'GK', nation: '🇧🇷', team: 'Liverpool', rating: 85, cardClass: 'Gold', valueLabel: 'Demo Value: 2.60M' },
  { name: 'Ederson', position: 'GK', nation: '🇧🇷', team: 'Manchester City', rating: 84, cardClass: 'Gold', valueLabel: 'Demo Value: 2.45M' },
  { name: 'Jan Oblak', position: 'GK', nation: '🇸🇮', team: 'Atletico Madrid', rating: 83, cardClass: 'Gold', valueLabel: 'Demo Value: 2.30M' },
  { name: 'Mike Maignan', position: 'GK', nation: '🇫🇷', team: 'AC Milan', rating: 82, cardClass: 'Gold', valueLabel: 'Demo Value: 2.18M' },
  { name: 'Virgil van Dijk', position: 'CB', nation: '🇳🇱', team: 'Liverpool', rating: 86, cardClass: 'Gold', valueLabel: 'Demo Value: 2.95M' },
  { name: 'Antonio Rudiger', position: 'CB', nation: '🇩🇪', team: 'Real Madrid', rating: 85, cardClass: 'Gold', valueLabel: 'Demo Value: 2.78M' },
  { name: 'Marquinhos', position: 'CB', nation: '🇧🇷', team: 'Paris Saint-Germain', rating: 84, cardClass: 'Gold', valueLabel: 'Demo Value: 2.50M' },
  { name: 'Ruben Dias', position: 'CB', nation: '🇵🇹', team: 'Manchester City', rating: 85, cardClass: 'Gold', valueLabel: 'Demo Value: 2.80M' },
  { name: 'Theo Hernandez', position: 'LB', nation: '🇫🇷', team: 'AC Milan', rating: 83, cardClass: 'Gold', valueLabel: 'Demo Value: 2.35M' },
  { name: 'Jude Bellingham', position: 'CAM', nation: '🏴', team: 'Real Madrid', rating: 86, cardClass: 'Gold', valueLabel: 'Demo Value: 2.98M' },
  { name: 'Kevin De Bruyne', position: 'CM', nation: '🇧🇪', team: 'Manchester City', rating: 86, cardClass: 'Gold', valueLabel: 'Demo Value: 3.00M' },
  { name: 'Bernardo Silva', position: 'CM', nation: '🇵🇹', team: 'Manchester City', rating: 84, cardClass: 'Gold', valueLabel: 'Demo Value: 2.42M' },
  { name: 'Pedri', position: 'CM', nation: '🇪🇸', team: 'Barcelona', rating: 84, cardClass: 'Gold', valueLabel: 'Demo Value: 2.40M' },
  { name: 'Frenkie de Jong', position: 'CM', nation: '🇳🇱', team: 'Barcelona', rating: 83, cardClass: 'Gold', valueLabel: 'Demo Value: 2.32M' },
  { name: 'Ilkay Gundogan', position: 'CM', nation: '🇩🇪', team: 'Barcelona', rating: 82, cardClass: 'Gold', valueLabel: 'Demo Value: 2.20M' },
  { name: 'Mohamed Salah', position: 'RW', nation: '🇪🇬', team: 'Liverpool', rating: 86, cardClass: 'Gold', valueLabel: 'Demo Value: 2.99M' },
  { name: 'Harry Kane', position: 'ST', nation: '🏴', team: 'Bayern Munich', rating: 86, cardClass: 'Gold', valueLabel: 'Demo Value: 3.00M' },
  { name: 'Robert Lewandowski', position: 'ST', nation: '🇵🇱', team: 'Barcelona', rating: 85, cardClass: 'Gold', valueLabel: 'Demo Value: 2.82M' },
  { name: 'Antoine Griezmann', position: 'CF', nation: '🇫🇷', team: 'Atletico Madrid', rating: 84, cardClass: 'Gold', valueLabel: 'Demo Value: 2.46M' },
  { name: 'Phil Foden', position: 'RW', nation: '🏴', team: 'Manchester City', rating: 85, cardClass: 'Gold', valueLabel: 'Demo Value: 2.75M' },
  { name: 'Rodrygo', position: 'RW', nation: '🇧🇷', team: 'Real Madrid', rating: 83, cardClass: 'Gold', valueLabel: 'Demo Value: 2.30M' },
  { name: 'Leroy Sane', position: 'RW', nation: '🇩🇪', team: 'Bayern Munich', rating: 82, cardClass: 'Gold', valueLabel: 'Demo Value: 2.12M' },

  { name: 'Thibaut Courtois', position: 'GK', nation: '🇧🇪', team: 'Real Madrid', rating: 90, cardClass: 'Elite', valueLabel: 'Demo Value: 6.30M' },
  { name: 'Marc-Andre ter Stegen', position: 'GK', nation: '🇩🇪', team: 'Barcelona', rating: 89, cardClass: 'Elite', valueLabel: 'Demo Value: 6.05M' },
  { name: 'Gianluigi Donnarumma', position: 'GK', nation: '🇮🇹', team: 'Paris Saint-Germain', rating: 88, cardClass: 'Elite', valueLabel: 'Demo Value: 5.80M' },
  { name: 'Emiliano Martinez', position: 'GK', nation: '🇦🇷', team: 'Aston Villa', rating: 87, cardClass: 'Elite', valueLabel: 'Demo Value: 5.40M' },
  { name: 'Trent Alexander-Arnold', position: 'RB', nation: '🏴', team: 'Liverpool', rating: 88, cardClass: 'Elite', valueLabel: 'Demo Value: 5.72M' },
  { name: 'Joao Cancelo', position: 'RB', nation: '🇵🇹', team: 'Al Hilal', rating: 87, cardClass: 'Elite', valueLabel: 'Demo Value: 5.20M' },
  { name: 'Achraf Hakimi', position: 'RB', nation: '🇲🇦', team: 'Paris Saint-Germain', rating: 89, cardClass: 'Elite', valueLabel: 'Demo Value: 6.10M' },
  { name: 'Eder Militao', position: 'CB', nation: '🇧🇷', team: 'Real Madrid', rating: 88, cardClass: 'Elite', valueLabel: 'Demo Value: 5.90M' },
  { name: 'Kim Min-jae', position: 'CB', nation: '🇰🇷', team: 'Bayern Munich', rating: 87, cardClass: 'Elite', valueLabel: 'Demo Value: 5.35M' },
  { name: 'Rodri', position: 'CDM', nation: '🇪🇸', team: 'Manchester City', rating: 91, cardClass: 'Elite', valueLabel: 'Demo Value: 6.80M' },
  { name: 'Toni Kroos', position: 'CM', nation: '🇩🇪', team: 'Real Madrid', rating: 89, cardClass: 'Elite', valueLabel: 'Demo Value: 6.08M' },
  { name: 'Luka Modric', position: 'CM', nation: '🇭🇷', team: 'Real Madrid', rating: 88, cardClass: 'Elite', valueLabel: 'Demo Value: 5.85M' },
  { name: 'Jamal Musiala', position: 'CAM', nation: '🇩🇪', team: 'Bayern Munich', rating: 89, cardClass: 'Elite', valueLabel: 'Demo Value: 6.02M' },
  { name: 'Florian Wirtz', position: 'CAM', nation: '🇩🇪', team: 'Bayer Leverkusen', rating: 88, cardClass: 'Elite', valueLabel: 'Demo Value: 5.88M' },
  { name: 'Martin Zubimendi', position: 'CDM', nation: '🇪🇸', team: 'Real Sociedad', rating: 87, cardClass: 'Elite', valueLabel: 'Demo Value: 5.25M' },
  { name: 'Kylian Mbappe', position: 'ST', nation: '🇫🇷', team: 'Real Madrid', rating: 91, cardClass: 'Elite', valueLabel: 'Demo Value: 6.75M' },
  { name: 'Erling Haaland', position: 'ST', nation: '🇳🇴', team: 'Manchester City', rating: 91, cardClass: 'Elite', valueLabel: 'Demo Value: 6.78M' },
  { name: 'Vinicius Junior', position: 'LW', nation: '🇧🇷', team: 'Real Madrid', rating: 90, cardClass: 'Elite', valueLabel: 'Demo Value: 6.35M' },
  { name: 'Lamine Yamal', position: 'RW', nation: '🇪🇸', team: 'Barcelona', rating: 88, cardClass: 'Elite', valueLabel: 'Demo Value: 5.92M' },
  { name: 'Neymar Jr', position: 'LW', nation: '🇧🇷', team: 'Al Hilal', rating: 88, cardClass: 'Elite', valueLabel: 'Demo Value: 5.82M' },
  { name: 'Julian Alvarez', position: 'ST', nation: '🇦🇷', team: 'Atletico Madrid', rating: 87, cardClass: 'Elite', valueLabel: 'Demo Value: 5.38M' },
  { name: 'Cole Palmer', position: 'RW', nation: '🏴', team: 'Chelsea', rating: 88, cardClass: 'Elite', valueLabel: 'Demo Value: 5.95M' },

  { name: 'Lev Yashin', position: 'GK', nation: '🇷🇺', team: 'Dynamo Moscow Legends', rating: 94, cardClass: 'Legend', valueLabel: 'Demo Value: 12.80M' },
  { name: 'Gianluigi Buffon', position: 'GK', nation: '🇮🇹', team: 'Juventus Legends', rating: 93, cardClass: 'Legend', valueLabel: 'Demo Value: 12.10M' },
  { name: 'Iker Casillas', position: 'GK', nation: '🇪🇸', team: 'Real Madrid Legends', rating: 92, cardClass: 'Legend', valueLabel: 'Demo Value: 11.60M' },
  { name: 'Peter Schmeichel', position: 'GK', nation: '🇩🇰', team: 'Manchester United Legends', rating: 92, cardClass: 'Legend', valueLabel: 'Demo Value: 11.40M' },
  { name: 'Paolo Maldini', position: 'CB', nation: '🇮🇹', team: 'AC Milan Legends', rating: 95, cardClass: 'Legend', valueLabel: 'Demo Value: 14.40M' },
  { name: 'Franz Beckenbauer', position: 'CB', nation: '🇩🇪', team: 'Bayern Munich Legends', rating: 95, cardClass: 'Legend', valueLabel: 'Demo Value: 14.20M' },
  { name: 'Sergio Ramos', position: 'CB', nation: '🇪🇸', team: 'Real Madrid Legends', rating: 93, cardClass: 'Legend', valueLabel: 'Demo Value: 12.35M' },
  { name: 'Cafu', position: 'RB', nation: '🇧🇷', team: 'AC Milan Legends', rating: 93, cardClass: 'Legend', valueLabel: 'Demo Value: 12.20M' },
  { name: 'Roberto Carlos', position: 'LB', nation: '🇧🇷', team: 'Real Madrid Legends', rating: 94, cardClass: 'Legend', valueLabel: 'Demo Value: 13.10M' },
  { name: 'Zinedine Zidane', position: 'CAM', nation: '🇫🇷', team: 'Real Madrid Legends', rating: 96, cardClass: 'Legend', valueLabel: 'Demo Value: 15.40M' },
  { name: 'Andrea Pirlo', position: 'CM', nation: '🇮🇹', team: 'Juventus Legends', rating: 93, cardClass: 'Legend', valueLabel: 'Demo Value: 12.45M' },
  { name: 'Xavi', position: 'CM', nation: '🇪🇸', team: 'Barcelona Legends', rating: 94, cardClass: 'Legend', valueLabel: 'Demo Value: 13.20M' },
  { name: 'Andres Iniesta', position: 'CM', nation: '🇪🇸', team: 'Barcelona Legends', rating: 94, cardClass: 'Legend', valueLabel: 'Demo Value: 13.35M' },
  { name: 'Lothar Matthaus', position: 'CDM', nation: '🇩🇪', team: 'Bayern Munich Legends', rating: 94, cardClass: 'Legend', valueLabel: 'Demo Value: 13.18M' },
  { name: 'Ronaldinho', position: 'CAM', nation: '🇧🇷', team: 'Barcelona Legends', rating: 95, cardClass: 'Legend', valueLabel: 'Demo Value: 14.50M' },
  { name: 'Lionel Messi', position: 'RW', nation: '🇦🇷', team: 'Barcelona Legends', rating: 97, cardClass: 'Legend', valueLabel: 'Demo Value: 15.80M' },
  { name: 'Cristiano Ronaldo', position: 'ST', nation: '🇵🇹', team: 'Real Madrid Legends', rating: 97, cardClass: 'Legend', valueLabel: 'Demo Value: 15.75M' },
  { name: 'Pele', position: 'CF', nation: '🇧🇷', team: 'Santos Legends', rating: 97, cardClass: 'Legend', valueLabel: 'Demo Value: 15.70M' },
  { name: 'Diego Maradona', position: 'CAM', nation: '🇦🇷', team: 'Napoli Legends', rating: 96, cardClass: 'Legend', valueLabel: 'Demo Value: 15.00M' },
  { name: 'Ronaldo Nazario', position: 'ST', nation: '🇧🇷', team: 'Real Madrid Legends', rating: 96, cardClass: 'Legend', valueLabel: 'Demo Value: 15.10M' },
  { name: 'Thierry Henry', position: 'ST', nation: '🇫🇷', team: 'Arsenal Legends', rating: 94, cardClass: 'Legend', valueLabel: 'Demo Value: 13.40M' },
  { name: 'Johan Cruyff', position: 'CF', nation: '🇳🇱', team: 'Barcelona Legends', rating: 95, cardClass: 'Legend', valueLabel: 'Demo Value: 14.60M' }
].map(withAssets)

export const CLASS_STYLES = {
  Bronze: { accent: '#c9894f', label: 'Bronze Class' },
  Silver: { accent: '#b6c9de', label: 'Silver Class' },
  Gold: { accent: '#f4c344', label: 'Gold Class' },
  Elite: { accent: '#7c85ff', label: 'Elite Class' },
  Legend: { accent: '#ff4ec3', label: 'Legend Class' }
}
