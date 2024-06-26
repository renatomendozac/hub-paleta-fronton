'use client'

import Input from '@/components/Input'
import RadioGroup from '@/components/RadioGroup'
import Select from '@/components/Select'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { TypesOfAction, formInitialValues, formReducer } from './reducer'
import { ErrorMessages, checkIfIsDouble, checkIfIsSingle, delay, genderOptions, genericTime, getCurrentDate, getNumberOfPlayers, modalityOptions, selectorDefaultValue } from './constants'
import Button from '@/components/Button'
import useDebounce from '@/hooks/useDebounce'
import { getVideoIdFromUrl } from '@/utils/get-video-id-from-url'
import Preview from '@/components/Preview'
import PlayersForm from '@/components/PlayersForm'
import AutoComplete from '@/components/AutoComplete'
import { supabase } from '@/lib/supabase'
import TagsForm from './TagsForm'
import { handleError } from '@/utils/handle-error'
import useAlert from '@/hooks/useAlert'
import Link from 'next/link'
import Modal from '@/components/Modal'
import { useRouter } from 'next/navigation'

const getCompetitionId = async (competitionName, competitions = []) => {
  const index = competitions.findIndex(({ name }) => name === competitionName)
  if (index !== -1) {
    return competitions[index].id
  }

  const competitionDate = `${getCurrentDate()}${genericTime}`

  const newCompetition = {
    name: competitionName,
    points: 0,
    is_tcn: false,
    start_date: new Date(competitionDate).toISOString(),
    end_date: new Date(competitionDate).toISOString()
  }

  const { data, error } = await supabase
    .from('competition')
    .insert([newCompetition])
    .select()

  if (error) {
    throw error
  }

  return data[0].id
}

const getPlayersId = async ({ first, second, third, fourth }, players = []) => {
  const findPlayerId = async (playerName) => {
    const playerIndex = players.findIndex(({ full_name: fullName }) => fullName === playerName)
    if (playerIndex !== -1) {
      return players[playerIndex].id
    }

    const { data, error } = await supabase
      .from('player')
      .insert([{ full_name: playerName }])
      .select()

    if (error) {
      throw error
    }

    return data[0].id
  }

  const playersId = [await findPlayerId(first), await findPlayerId(second)]
  if (third && fourth) {
    playersId.push(await findPlayerId(third), await findPlayerId(fourth))
  }

  return playersId
}

const getPlayersName = ({ first, second, third, fourth }) => {
  const results = [first, second]
  if (third && fourth) {
    results.push(third, fourth)
  }

  if (results.length === 4) {
    const firstTeam = results.slice(0, 2).join(' & ')
    const secondTeam = results.slice(2).join(' & ')
    return `${firstTeam} vs ${secondTeam}`
  }

  return `${results[0]} vs ${results[1]}`
}

const Form = ({ competitions = [], categories = [], players = [] }) => {
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [urlNewMatch, setUrlNewMatch] = useState(null)
  const [formValues, formDispatch] = useReducer(formReducer, formInitialValues)
  const videoUrl = useDebounce(formValues.url, delay)
  const { open: openAlert, holder } = useAlert()
  const [{ videoId, platform }, videoError] = getVideoIdFromUrl(videoUrl)

  const submit = async () => {
    const newErrors = {}

    if (formValues.category === selectorDefaultValue) {
      newErrors.category = ErrorMessages.NoCategory
    }
    if (!formValues.competition) {
      newErrors.competition = ErrorMessages.NoCompetition
    }
    if (videoError) {
      newErrors.url = videoError
    }
    if (!formValues.url) {
      newErrors.url = ErrorMessages.NoURL
    }

    const numberOfPlayers = getNumberOfPlayers(formValues.modality)
    Object.entries(formValues.players)
      .filter((_, index) => index < numberOfPlayers)
      .forEach(([fieldName, playerName], index, array) => {
        if (!playerName) {
          newErrors[`${fieldName}Player`] = ErrorMessages.NoPlayer
          return
        }

        const isDuplicate = array.slice(0, index).find(([, name]) => name === playerName)
        if (isDuplicate) {
          newErrors[`${fieldName}Player`] = ErrorMessages.DuplicatePlayer
        }
      })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setDisabled(true)

    try {
      const newMatch = {
        title: [getPlayersName(formValues.players), formValues.competition].join(' | '),
        platform,
        link: videoId,
        category: formValues.category,
        competition: await getCompetitionId(formValues.competition, competitions),
        players: await getPlayersId(formValues.players, players),
        date: new Date(`${formValues.date}${genericTime}`).toISOString(),
        tags: formValues.tags
      }

      const { error, data } = await supabase
        .from('match')
        .insert([newMatch])
        .select()

      if (error) {
        throw error
      }

      openAlert({ content: 'Se registro con exito.', type: 'success' })

      const [match] = data
      setUrlNewMatch(`/match/${match.title}`)
      setIsVisible(true)
    } catch (error) {
      setDisabled(false)

      openAlert({
        content: handleError(error),
        type: 'error'
      })
    }
  }

  const handleCompetition = ({ target }) => {
    setErrors({ ...errors, competition: null })
    formDispatch({ type: TypesOfAction.SetCompetition, value: target.value })
  }

  const handleCategory = ({ target }) => {
    setErrors({ ...errors, category: null })
    formDispatch({ type: TypesOfAction.SetCategory, value: target.value })
  }

  const handleUrl = ({ target }) => {
    formDispatch({ type: TypesOfAction.SetUrl, value: target.value })
  }

  const handleDate = ({ target }) => {
    formDispatch({ type: TypesOfAction.SetDate, value: target.value })
  }

  const handlePlayers = (value) => {
    const name = Object.keys(value)[0]
    setErrors({ ...errors, [`${name}Player`]: null })
    formDispatch({ type: TypesOfAction.SetPlayers, value })
  }

  const handleTags = (value) => {
    formDispatch({ type: TypesOfAction.SetTags, value })
  }

  useEffect(() => {
    setErrors({ ...errors, url: videoError })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl, videoError])

  const filteredCategories = useMemo(() => {
    formDispatch({ type: TypesOfAction.SetCategory, value: selectorDefaultValue })

    return categories
      .filter((item) => (
        (checkIfIsSingle(formValues.modality) && item.is_single) ||
        (checkIfIsDouble(formValues.modality) && !item.is_single)
      ))
      .filter((item) => `${item.name}`.includes(formValues.gender))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.modality, formValues.gender])

  const secondaryButtonText = 'Ver match'

  return (
    <div>
      <Modal
        title="Registro exitoso ✅"
        primaryButtonText="Registrar nuevo match"
        primaryButtonAction={() => router.push('/refresh?to=/contributing')}
        secondaryButtonText={secondaryButtonText}
        secondaryButtonAction={() => router.push(urlNewMatch)}
        isVisible={isVisible}
      >
        El match ha sido registrado con éxito. Agracedemos tu contribución a la comunidad ✨. <br />
        En las proximas horas será revisado antes de hacerse público, sin embargo, si deseas ver el juego presiona en {`"${secondaryButtonText}"`}.
      </Modal>
      <h1 className='text-xl font-bold text-center mb-6'>Registrar un match</h1>

      <form className="w-full max-w-xl m-auto">
        <AutoComplete
          label="* Competencia:"
          name="competition"
          onChange={handleCompetition}
          error={errors.competition}
          placeholder="Selecciona una opción"
        >
          <option key="Amistoso" value='Amistoso' />
          {...competitions
            .filter(({ name }) => name !== 'Amistoso')
            .map(({ id, name }) => <option key={id} value={name} />)}
        </AutoComplete>

        <Input
          label="* Enlace:"
          name="url"
          placeholder="Enlace del video"
          additionalInformation={
            <>
              Ej 1: https://www.facebook.com/FDPPF/videos/965171261639308<br />
              Ej 2: https://www.facebook.com/watch/live/?ref=watch_permalink&v=965171261639308<br />
              Ej 3: https://www.youtube.com/watch?v=Dbu-j00WEhk
            </>
          }
          onChange={handleUrl}
          error={errors.url}
        />

        { videoId && <Preview videoId={videoId} platform={platform} /> }

        <Input
          label="Fecha del juego:"
          name="date"
          placeholder="Fecha del partido"
          type='date'
          defaultValue={getCurrentDate()}
          onChange={handleDate}
          additionalInformation="DD/MM/YYYY. Ej: 28/02/2024"
        />

        <RadioGroup
          label="Modalidad:"
          name="modality"
          options={modalityOptions}
          defaultValue={formValues.modality}
          onChange={({ target }) => formDispatch({ type: TypesOfAction.SetModality, value: target.value })}
        />

        <RadioGroup
          label="Genero:"
          name="gender"
          options={genderOptions}
          defaultValue={formValues.gender}
          onChange={({ target }) => formDispatch({ type: TypesOfAction.SetGender, value: target.value })}
        />

        <Select
          label="* Categoria:"
          name="category"
          onChange={handleCategory}
          value={formValues.category}
          error={errors.category}
        >
          <option disabled key={selectorDefaultValue} value={selectorDefaultValue}>
            Selecciona una opción
          </option>
          {filteredCategories.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </Select>

        <PlayersForm
          isSingle={checkIfIsSingle(formValues.modality)}
          players={players}
          handlePlayers={handlePlayers}
          errors={errors}
        />

        <TagsForm tags={formValues.tags} handleTags={handleTags} />

        <Button onClick={submit} disabled={disabled}>
          Registrar
        </Button>

        <div className="md:flex md:items-center mb-4">
          <div className="md:w-1/3" />
          <div className="md:w-2/3 text-xs mt-4">
            <span className='text-gray-600 italic mt-1 break-words'>
              Los partidos registrados deben ser revisados antes de hacerse publico.{' '}
            </span>
            <Link className='underline underline-offset-8 mt-1 text-white' href="/pending">
              Ver pendientes de aprobación.
            </Link>
          </div>
        </div>
      </form>

      {holder}
    </div>
  )
}

export default Form
