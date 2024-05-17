import Input from '@/components/Input'

const TagsForm = ({ tags = [], handleTags }) => {
  const onChange = ({ target }) => {
    if (target.value) {
      const values = `${target.value}`.split(',').map(item => item.trim()).filter(Boolean)
      handleTags(values)
    } else {
      handleTags([])
    }
  }

  return (
    <Input
      label="Etiquetas:"
      name="tags"
      placeholder="final, mipaginaenfb, micanalEnYTB, ..."
      onChange={onChange}
      additionalInformation={
        <>
          Opcionalmente, puedes agregar información adicional.<br />
          Separalo por coma ( , ) cada etiqueta.<br />
          <b># Etiquetas creadas: {tags.length}</b>
        </>
      }
    />
  )
}

export default TagsForm
