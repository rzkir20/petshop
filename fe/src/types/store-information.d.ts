type StoreInformationDto = {
    _id: string
    storeName: string
    businessEmail: string
    description: string
    storeAddress: string
    city: string
    zipCode: string
    businessHoursOpen: string
    businessHoursClose: string
    mapEmbedSrc: string
    createdAt: string
    updatedAt: string
}

type PatchStoreInformationBody = {
    storeName?: string
    businessEmail?: string
    description?: string
    storeAddress?: string
    city?: string
    zipCode?: string
    businessHoursOpen?: string
    businessHoursClose?: string
    mapEmbedSrc?: string
    mapIframeHtml?: string
}