const ErrorCodes = {
  RequiredFields: '23502',
  AlreadyExists: '23505'
}

const formatter = (title, message) => <>{title}<br />{message}</>

const handleError = ({ code = '', details = '', message = '' }) => {
  let info

  switch (code) {
    case ErrorCodes.RequiredFields:
      info = formatter('Error: Campo Requerido Faltante.', 'Lo revisaremos pronto 😅')
      break
    case ErrorCodes.AlreadyExists: {
      info = formatter('Error: Campo Duplicado.', 'El valor que has ingresado ya existe en nuestro sistema 👀')
      break
    }
    default:
      info = formatter('Error: Algo Salió Mal', 'Lo revisaremos lo antes posible! ⚡️')
  }

  return info
}

export { handleError }
