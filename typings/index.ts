export interface IEvent {
  id: number
  name: string
  slug: string
  venue: string
  address: string
  date: string
  time: string
  performers: string
  description: string
  user: User
  published_at: string
  created_at: string
  updated_at: string
  image: Image
}
interface User {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: number
  created_at: string
  updated_at: string
}
interface Image {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: null
  provider: string
  provider_metadata: ProviderMetadata
  created_at: string
  updated_at: string
}
interface Formats {
  thumbnail: ThumbnailOrLargeOrMediumOrSmall
  large: ThumbnailOrLargeOrMediumOrSmall
  medium: ThumbnailOrLargeOrMediumOrSmall
  small: ThumbnailOrLargeOrMediumOrSmall
}
interface ThumbnailOrLargeOrMediumOrSmall {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path?: null
  url: string
  provider_metadata: ProviderMetadata
}
interface ProviderMetadata {
  public_id: string
  resource_type: string
}
