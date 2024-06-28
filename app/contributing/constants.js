const selectorDefaultValue = -1
const delay = 750

const genericTime = 'T12:00+00:00'

const getCurrentDate = () => {
  const date = new Date()
  const MMDDYYYY = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
  const [month, day, year] = MMDDYYYY.split('/')
  const YYYYMMDD = [year, month, day].join('-')
  return YYYYMMDD
}

const modalityOptions = [
  { label: 'Individual', value: 'singles' },
  { label: 'Dobles', value: 'dobles' }
]

const checkIfIsSingle = (name) => name === 'singles'
const checkIfIsDouble = (name) => name === 'dobles'

const getNumberOfPlayers = (modality) => {
  const numberOfPlayersForSingles = 2
  const numberOfPlayersForDoubles = 4

  return checkIfIsDouble(modality)
    ? numberOfPlayersForDoubles
    : numberOfPlayersForSingles
}

const genderOptions = [
  { label: 'Varones', value: 'Varones' },
  { label: 'Damas', value: 'Damas' },
  { label: 'Mixto', value: 'Mixto' }
]

const ErrorMessages = {
  NoCategory: 'Selecciona una categoria.',
  NoCompetition: 'Selecciona una competición.',
  NoURL: 'Ingresa el enlace del video.',
  InvalidURL: 'URL inválido.',
  NoPlayer: 'Ingresa el nombre del jugador.',
  DuplicatePlayer: 'El nombre está duplicado.',
  NoVideo: 'No se ha encontrado un video.'
}

export {
  delay,
  genericTime,
  getCurrentDate,
  selectorDefaultValue,
  modalityOptions,
  checkIfIsSingle,
  checkIfIsDouble,
  getNumberOfPlayers,
  genderOptions,
  ErrorMessages
}
