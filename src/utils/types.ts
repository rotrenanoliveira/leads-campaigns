import { z } from 'zod'

/**
 * Make some property optional on type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Optional<Post, 'id' | 'email'>
 * ```
 **/

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

/** campaign fields type */
export const campaignFieldsTypesSchema = z.union([
  z.literal('text'),
  z.literal('email'),
  z.literal('phone'),
  z.literal('number'),
])

/** campaign fields */
export const campaignFieldsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  type: campaignFieldsTypesSchema,
})

/** campaign on success */
export const campaignOnSuccess = z.object({
  type: z.union([z.literal('message'), z.literal('redirect'), z.literal('whatsapp')]),
  data: z.string(),
})

/** campaign */
export const campaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  callToAction: z.string(),
  accentColor: z.string(),
  fields: z.array(campaignFieldsSchema),
  onSuccess: campaignOnSuccess,
  imageUrl: z.string().url(),
  active: z.coerce.boolean().default(true),
})

/** standard response error */
export const responseError = z.object({
  success: z.literal(false),
  message: z.string(),
})

/** campaign */
export type Campaign = z.infer<typeof campaignSchema>
/** standard response error */
export type ResponseError = z.infer<typeof responseError>
