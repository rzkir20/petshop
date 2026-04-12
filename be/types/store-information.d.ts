interface StoreInformation {
  _id: string;
  storeName: string;
  businessEmail: string;
  description: string;
  storeAddress: string;
  city: string;
  zipCode: string;
  businessHoursOpen: string;
  businessHoursClose: string;
  /** Google Maps embed URL (`iframe` `src`), e.g. https://www.google.com/maps/embed?pb=... */
  mapEmbedSrc: string;
  createdAt: Date;
  updatedAt: Date;
}

type UpdateStoreInformationBody = {
  storeName?: string;
  businessEmail?: string;
  description?: string;
  storeAddress?: string;
  city?: string;
  zipCode?: string;
  businessHoursOpen?: string;
  businessHoursClose?: string;
  mapEmbedSrc?: string;
  /**
   * Full `<iframe ...></iframe>` snippet; server extracts `src` and stores as `mapEmbedSrc`.
   * Ignored if `mapEmbedSrc` is also sent (explicit URL wins).
   */
  mapIframeHtml?: string;
};
