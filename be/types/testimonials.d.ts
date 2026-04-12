interface Testimonial {
  _id: string;
  avatar: string;
  description: string;
  name: string;
  role: string;
  isFeatured: boolean;
  yearOfExperience: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

/** avatar: unggah file field `avatar` (multipart) → URL ImageKit, atau string URL jika JSON */
type CreateTestimonialBody = {
  avatar?: string;
  description: string;
  name: string;
  role: string;
  isFeatured?: boolean;
  yearOfExperience?: number;
  rating?: number;
};

type UpdateTestimonialBody = {
  avatar?: string;
  description?: string;
  name?: string;
  role?: string;
  isFeatured?: boolean;
  yearOfExperience?: number;
  rating?: number;
};

type UpdateTestimonialInput = UpdateTestimonialBody;
