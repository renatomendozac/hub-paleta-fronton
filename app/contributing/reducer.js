import { genderOptions, getCurrentDate, modalityOptions, selectorDefaultValue } from './constants'

const formInitialValues = {
  url: null,
  date: getCurrentDate(),
  tags: [],
  competition: selectorDefaultValue,
  modality: modalityOptions[0].value,
  gender: genderOptions[0].value,
  category: selectorDefaultValue,
  players: {
    first: null,
    second: null,
    third: null,
    fourth: null
  }
}

const TypesOfAction = {
  SetUrl: 'Set_url',
  SetDate: 'Set_date',
  SetTags: 'Set_tags',
  SetCompetition: 'Set_competition',
  SetModality: 'Set_modality',
  SetGender: 'Set_gender',
  SetCategory: 'Set_category',
  SetPlayers: 'Set_players'
}

const formReducer = (state, { type, value }) => {
  const newState = { ...state }
  switch (type) {
    case TypesOfAction.SetUrl:
      newState.url = value
      break
    case TypesOfAction.SetDate:
      newState.date = value
      break
    case TypesOfAction.SetTags:
      newState.tags = value
      break
    case TypesOfAction.SetCompetition:
      newState.competition = value
      break
    case TypesOfAction.SetGender:
      newState.gender = value
      break
    case TypesOfAction.SetModality:
      newState.modality = value
      break
    case TypesOfAction.SetCategory:
      newState.category = value
      break
    case TypesOfAction.SetPlayers:
      newState.players = { ...state.players, ...value }
      break
  }

  return newState
}

export {
  formInitialValues,
  TypesOfAction,
  formReducer
}
