'use client'

import { MoveUpRightIcon } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import type { Campaign } from '@/utils/types'

interface CampaignFormProps {
  campaign: Campaign
}

export function CampaignForm({ campaign }: CampaignFormProps) {
  const [isHovered, setIsHovered] = useState(false)

  const btnBackgroundColor = {
    backgroundColor: isHovered ? `${campaign.accentColor}BF` : campaign.accentColor,
  }

  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
