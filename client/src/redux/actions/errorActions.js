export const returnErrors = (msg, status, id = null) => ({
  type: "GET_ERRORS",
  payload: {
    msg,
    status,
    id,
  },
})

export const clearErrors = () => ({ type: "CLEAR_ERRORS" })
