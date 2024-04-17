import { useState } from 'react'

function useAddressSearch<T>(): [Array<T>, (value: string) => void] {
  const [options, setOptions] = useState<Array<T>>([])

  const searchForAddress = (value: string) => {
    fetch(
      `https://api-adresse.data.gouv.fr/search/?${new URLSearchParams({
        q: value,
        autocomplete: '1',
        limit: '10',
      } as Record<string, string>)}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.features?.length) {
          const transformedList = data.features.map(
            (item: Record<string, any>) => ({
              label: item.properties.label,
              year: item.properties.id,
              rowData: item,
            }),
          )

          setOptions(transformedList)
        }
      })
      .catch(() => {
        setOptions([])
      })
  }

  return [options, searchForAddress]
}

export default useAddressSearch
