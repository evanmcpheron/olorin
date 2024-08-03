export const success = (message, statusCode, results) => ({
  message,
  code: statusCode,
  severity: 'success',
  error: false,
  results,
})

export const error = (message, statusCode, results) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500]

  // Get matched code
  const findCode = codes.find((code) => code === statusCode)

  if (!findCode) statusCode = 500
  else statusCode = findCode

  return {
    message,
    code: statusCode,
    severity: 'error',
    error: true,
    results,
  }
}
