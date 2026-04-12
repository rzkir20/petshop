type TestimonialDto = {
  _id: string
  avatar: string
  description: string
  name: string
  role: string
  isFeatured: boolean
  yearOfExperience: number
  rating: number
  createdAt: string
  updatedAt: string
}

type TestimonialFormFields = {
  name: string
  role: string
  description: string
  isFeatured: boolean
  yearOfExperience: number
  rating: number
}