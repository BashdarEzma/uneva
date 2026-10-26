import './WhatsAppButton.css'

const PHONE = '9647717308080' // +964 771 730 8080
const MESSAGE = 'Hello Uneva, I would like to know more about your products.'

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <a
      className="whatsapp-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="whatsapp-tip">Call us on WhatsApp</span>
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.04 3.2c-7.1 0-12.86 5.76-12.86 12.86 0 2.27.6 4.49 1.73 6.44L3.2 28.8l6.46-1.69a12.8 12.8 0 0 0 6.38 1.63h.01c7.1 0 12.86-5.76 12.86-12.86 0-3.44-1.34-6.67-3.77-9.1A12.78 12.78 0 0 0 16.04 3.2Zm0 23.4h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.83 1 1.02-3.73-.25-.39a10.56 10.56 0 0 1-1.62-5.64c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.87-4.77 10.64-10.63 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.64 0 1.56 1.14 3.06 1.3 3.27.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"
        />
      </svg>
    </a>
  )
}
