import DOMPurify from 'isomorphic-dompurify'

export async function CampaignDescription({ description }: { description: string }) {
  function sanitize(text: string) {
    const sanitizedText = text.replaceAll('\n', '<br/>')

    return DOMPurify.sanitize(sanitizedText, { ALLOWED_TAGS: ['br'] })
  }

  const descriptionParsed = description.split('\n')

  return (
    <div className="space-y-3">
      {descriptionParsed.map((text, index) => (
        <p
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          className="font-light md:font-normal text-md md:text-lg text-foreground/85"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: sanitize(text) }}
        />
      ))}
    </div>
  )
}
