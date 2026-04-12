import { requestJson } from '#/services/crud.service'

export async function fetchTestimonials(): Promise<TestimonialDto[]> {
  const res = await requestJson<{ testimonials: TestimonialDto[] }>(
    '/testimonials',
    { method: 'GET' },
  )
  return res.testimonials
}

export async function createTestimonial(
  fields: TestimonialFormFields,
  avatarFile: File,
): Promise<TestimonialDto> {
  const fd = new FormData()
  fd.append('avatar', avatarFile)
  fd.append('name', fields.name.trim())
  fd.append('role', fields.role.trim())
  fd.append('description', fields.description.trim())
  fd.append('isFeatured', String(fields.isFeatured))
  fd.append('yearOfExperience', String(fields.yearOfExperience))
  fd.append('rating', String(fields.rating))

  const res = await requestJson<{ testimonial: TestimonialDto }>('/testimonials', {
    method: 'POST',
    body: fd,
  })
  return res.testimonial
}

export async function updateTestimonial(
  id: string,
  fields: TestimonialFormFields,
  avatarFile?: File | null,
): Promise<TestimonialDto> {
  if (avatarFile) {
    const fd = new FormData()
    fd.append('avatar', avatarFile)
    fd.append('name', fields.name.trim())
    fd.append('role', fields.role.trim())
    fd.append('description', fields.description.trim())
    fd.append('isFeatured', String(fields.isFeatured))
    fd.append('yearOfExperience', String(fields.yearOfExperience))
    fd.append('rating', String(fields.rating))
    const res = await requestJson<{ testimonial: TestimonialDto }>(
      `/testimonials/${encodeURIComponent(id)}`,
      { method: 'PATCH', body: fd },
    )
    return res.testimonial
  }

  const res = await requestJson<{ testimonial: TestimonialDto }>(
    `/testimonials/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        name: fields.name.trim(),
        role: fields.role.trim(),
        description: fields.description.trim(),
        isFeatured: fields.isFeatured,
        yearOfExperience: fields.yearOfExperience,
        rating: fields.rating,
      }),
    },
  )
  return res.testimonial
}

export async function deleteTestimonial(id: string): Promise<void> {
  await requestJson<{ message?: string }>(
    `/testimonials/${encodeURIComponent(id)}`,
    { method: 'DELETE' },
  )
}
