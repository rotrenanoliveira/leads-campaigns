import { notFound } from 'next/navigation'
import Image from 'next/image'

import { CampaignDescription } from '@/components/campaigns/campaign-description'
import { CampaignForm } from '@/components/campaigns/campaign-form'
import { getCampaign } from '@/server/data/get-campaign'
import { env } from '@/env'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  const [campaign, _] = await getCampaign(id)

  if (campaign === null) return notFound()
  if (campaign.active === false) return notFound()

  return {
    title: campaign.title,
    description: `${campaign.subtitle} ・ ${campaign.description}`,
  }
}

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  if (!params) return notFound()

  const id = (await params).id
  if (!id) return notFound()

  const [campaign, _] = await getCampaign(id)

  if (campaign === null) return notFound()
  if (campaign.active === false) return notFound()

  const campaignImageUrl = new URL(campaign.imageUrl).toString()

  return (
    <section className="w-full max-w-screen-xl box-border p-4">
      <div className="mt-8 2xl:mt-16 space-y-4 text-center capitalize items-center">
        <p className="font-normal text-xl md:text-3xl lg:text-4xl">{campaign.title}</p>
        <p className="font-light text-lg md:text-xl lg:text-2xl">{campaign.subtitle}</p>
        <div className="w-32 h-1 mx-auto rounded-full" style={{ backgroundColor: campaign.accentColor }} />
      </div>

      <div className="mx-auto max-w-screen-lg flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-32 mt-10 2xl:mt-32">
        <div
          className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl relative"
          style={{ backgroundColor: `${campaign.accentColor}0D` }}
        >
          <div
            className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute rotate-12"
            style={{ backgroundColor: `${campaign.accentColor}26` }}
          />

          <div
            className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute rotate-6"
            style={{ backgroundColor: `${campaign.accentColor}42` }}
          />

          <div className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute">
            <Image
              className="w-80 h-96 md:w-[352px] md:h-[448px] rounded-2xl absolute"
              src={campaignImageUrl}
              width={352}
              height={448}
              alt=""
            />
          </div>
        </div>

        <div className="w-full max-w-[384px] space-y-4">
          <CampaignDescription description={campaign.description} />
          <CampaignForm leadsApiUrl={env.LEADS_API_URL} campaign={campaign} />
        </div>
      </div>
    </section>
  )
}
