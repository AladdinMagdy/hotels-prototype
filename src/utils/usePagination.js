import React from 'react'

const paginationReducer = (state, action) => {
  const dataSlicer = (dataArray) => {
    const section = [...dataArray].slice((action.count * state.perPage) - state.perPage, (action.count * state.perPage))
    return section
  }
  if (action.type === 'initialStep') {
    return {
      ...state,
      count: action.count,
      data: action.data,
      desiredSection: dataSlicer(action.data),
    }
  } else if (action.type === 'step') {
    return {
      ...state,
      count: action.count,
      desiredSection: dataSlicer(state.data),
    }
  } else {
    throw new Error(`unknown Action type`);
  }
}

const usePagination = (data = [], perPage, filterFor, sortBy) => {
  const [state, dispatch] = React.useReducer(
    paginationReducer,
    { count: 0, desiredSection: [], perPage }
  )

  React.useEffect(() => {
    if (data) {
      const sortedData = data[filterFor].sort((a, b) => {
        if (sortBy === 'highest') {
          return b.score - a.score
        } else if (sortBy === 'lowest') {
          return a.score - b.score
        } else {
          return data[filterFor];
        }
      })
      dispatch({
        type: 'initialStep',
        data: sortedData,
        count: 1
      })
    }
  }, [data, filterFor, sortBy])

  return {
    numberOfPages: data && Math.ceil(data[filterFor].length / perPage),
    pageContent: state.desiredSection,
    currentPage: state.count,
    dispatch
  }

}

export default usePagination
