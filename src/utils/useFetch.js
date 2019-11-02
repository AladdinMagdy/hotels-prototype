import React from 'react'


const fetchingReducer = (state, action) => {
  if (action.type === 'fetch') {
    return {
      ...state,
      loading: true
    }
  } else if (action.type === 'success') {
    return {
      data: action.data,
      error: null,
      loading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: 'Error fetching data. Try again',
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

const useFetch = (url) => {
  const [state, dispatch] = React.useReducer(
    fetchingReducer,
    { data: null, error: null, loading: true }
  )

  React.useEffect(() => {
    dispatch({ type: 'fetch' })

    fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'success', data }))
      .catch((e) => {
        console.warn(e.message)
        dispatch({ type: 'error' })
      })
  }, [url])

  return {
    loading: state.loading,
    data: state.data,
    error: state.error
  }
}

export default useFetch
