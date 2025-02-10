'use client'

import { MoveUpRightIcon } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { fetcher } from '@/utils/fetcher'
import type { Campaign } from '@/utils/types'
import { useRouter } from 'next/navigation'

interface CampaignFormProps {
  campaign: Campaign
  leadsApiUrl: string
}

export function CampaignForm({ campaign, leadsApiUrl }: CampaignFormProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const btnBackgroundColor = {
    backgroundColor: isHovered ? `${campaign.accentColor}BF` : campaign.accentColor,
  }

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const [response, error] = await fetcher(
      axios.post(`${leadsApiUrl}/api/campaigns/${campaign.id}/leads`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    )

    if (error) {
      toast.error(error.message)
      return
    }

    if (response.status === 404) {
      toast.error('Campanha não encontrada')
      return
    }

    if (response.status === 400) {
      toast.error(response.data.message)
      return
    }

    if (campaign.onSuccess.type === 'message') {
      toast.success(campaign.onSuccess.data)
      return
    }

    toast.success('Enviado com sucesso!')

    if (campaign.onSuccess.type === 'redirect') {
      router.push(campaign.onSuccess.data)
      return
    }

    if (campaign.onSuccess.type === 'whatsapp') {
      window.open(`https://wa.me/55${campaign.onSuccess.data.replaceAll(' ', '')}`, '_blank')
      return
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleOnSubmit}>
      <div className="space-y-2">
        {campaign.fields.map((field) => {
          return (
            <div className="space-y-2" key={field.slug}>
              <Label htmlFor={field.slug} className="capitalize">
                {field.name}
              </Label>
              <Input
                type={field.type}
                id={field.slug}
                name={field.slug}
                placeholder={field.name}
                className="bg-white dark:bg-zinc-950"
                required
              />
            </div>
          )
        })}
      </div>

      <Button
        className="w-full h-12 rounded-3xl p-1"
        style={btnBackgroundColor}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="flex-grow text-center ml-7 font-normal text-2xl">{campaign.callToAction}</span>
        <div
          className="size-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: campaign.accentColor }}
        >
          <MoveUpRightIcon className="size-6 text-foreground/85 invert" />
        </div>
      </Button>
    </form>
  )
}
