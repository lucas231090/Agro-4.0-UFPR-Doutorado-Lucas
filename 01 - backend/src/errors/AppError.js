
class Error ({

  message: String,

  statusCode: Number,

  constructor(message, statusCode = 400),
  message = message,
  statusCode = statusCode

})

export default Error
