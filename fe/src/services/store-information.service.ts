import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useEffect, useMemo, useRef, useState } from 'react'

import { requestJson } from '#/services/crud.service'

export const storeInformationQueryKeys = {
    all: ['store-information'] as const,
    detail: () => [...storeInformationQueryKeys.all, 'detail'] as const,
}

export async function fetchStoreInformation(): Promise<StoreInformationDto> {
    const res = await requestJson<{ storeInformation: StoreInformationDto }>(
        '/store-information',
        { method: 'GET' },
    )
    return res.storeInformation
}

export async function patchStoreInformation(
    body: PatchStoreInformationBody,
): Promise<StoreInformationDto> {
    const res = await requestJson<{
        message?: string
        storeInformation: StoreInformationDto
    }>('/store-information', {
        method: 'PATCH',
        body: JSON.stringify(body),
    })
    return res.storeInformation
}

/** For iframe preview: read `src` from pasted HTML or accept a bare embed URL. */
export function extractGoogleMapsEmbedSrc(raw: string): string | null {
    const s = raw.trim()
    if (!s) return null
    if (/^https:\/\/(www\.)?google\.com\/maps\/embed/i.test(s)) {
        return s
    }
    const m = /src\s*=\s*["']([^"']+)["']/i.exec(s)
    const url = m?.[1]?.trim()
    if (url && /^https:\/\/(www\.)?google\.com\/maps\/embed/i.test(url)) {
        return url
    }
    return null
}

export function useStoreInformationQuery() {
    return useQuery({
        queryKey: storeInformationQueryKeys.detail(),
        queryFn: fetchStoreInformation,
        staleTime: 30_000,
        gcTime: 10 * 60_000,
        refetchOnWindowFocus: false,
    })
}

export function usePatchStoreInformationMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: patchStoreInformation,
        onSuccess: (data) => {
            queryClient.setQueryData(storeInformationQueryKeys.detail(), data)
        },
    })
}

/** Form state + save flow for store information (e.g. dashboard settings). */
export function useStoreInformationEditor() {
    const storeQuery = useStoreInformationQuery()
    const patchStore = usePatchStoreInformationMutation()
    const hydrated = useRef(false)

    const [storeName, setStoreName] = useState('')
    const [businessEmail, setBusinessEmail] = useState('')
    const [storeDescription, setStoreDescription] = useState('')
    const [storeAddress, setStoreAddress] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [hoursOpen, setHoursOpen] = useState('')
    const [hoursClose, setHoursClose] = useState('')
    const [mapField, setMapField] = useState('')

    useEffect(() => {
        const d = storeQuery.data
        if (!d || hydrated.current) return
        hydrated.current = true
        setStoreName(d.storeName)
        setBusinessEmail(d.businessEmail)
        setStoreDescription(d.description)
        setStoreAddress(d.storeAddress)
        setCity(d.city)
        setZip(d.zipCode)
        setHoursOpen(d.businessHoursOpen)
        setHoursClose(d.businessHoursClose)
        setMapField(d.mapEmbedSrc)
    }, [storeQuery.data])

    const mapPreviewSrc = useMemo(
        () => extractGoogleMapsEmbedSrc(mapField),
        [mapField],
    )

    const storeFieldsDisabled = storeQuery.isPending

    async function saveStoreInformation(): Promise<StoreInformationDto> {
        const map = mapField.trim()
        const mapPart =
            map === ''
                ? { mapEmbedSrc: '' as const }
                : map.toLowerCase().includes('<iframe')
                  ? { mapIframeHtml: map }
                  : { mapEmbedSrc: map }

        const updated = await patchStore.mutateAsync({
            storeName,
            businessEmail,
            description: storeDescription,
            storeAddress,
            city,
            zipCode: zip,
            businessHoursOpen: hoursOpen,
            businessHoursClose: hoursClose,
            ...mapPart,
        })

        setMapField(updated.mapEmbedSrc)
        return updated
    }

    return {
        storeQuery,
        patchStore,
        storeName,
        setStoreName,
        businessEmail,
        setBusinessEmail,
        storeDescription,
        setStoreDescription,
        storeAddress,
        setStoreAddress,
        city,
        setCity,
        zip,
        setZip,
        hoursOpen,
        setHoursOpen,
        hoursClose,
        setHoursClose,
        mapField,
        setMapField,
        mapPreviewSrc,
        storeFieldsDisabled,
        saveStoreInformation,
    }
}
