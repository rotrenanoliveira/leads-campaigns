import 'server-only'
import { env } from '@/env'
import { handle } from '@/utils/functions'
import { type Campaign, type ResponseError, campaignSchema } from '@/utils/types'
import { CacheRepository } from '../cache/redis-cache-repository'

export async function getCampaign(campaignId: string): Promise<[Campaign, null] | [null, ResponseError]> {
  const [onCache, onCacheError] = await handle(CacheRepository.get(campaignId))

  if (onCacheError) {
    return [null, onCacheError]
  }

  if (onCache) {
    return [campaignSchema.parse(onCache), null]
  }

  const [fetchCampaign, fetchCampaignError] = await handle(fetch(`${env.LEADS_API_URL}/api/campaigns/${campaignId}`))

  if (fetchCampaignError) {
    return [null, fetchCampaignError]
  }

  const data = await fetchCampaign.json()
  const campaign = campaignSchema.parse(data)

  return [campaign, null]
}
