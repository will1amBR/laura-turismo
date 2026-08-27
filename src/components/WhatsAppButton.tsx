export function WhatsAppButton() {
  const phone = '5511998170951'
  const message = encodeURIComponent(
    'Olá Laura! Gostaria de mais informações sobre os grupos de viagem para o Chile.',
  )
  const url = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-400/50"
    >
      {/* Pulse ring effect */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:opacity-100 pointer-events-none" />

      {/* WhatsApp SVG Icon */}
      <svg
        className="w-7 h-7 relative z-10 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.176.2-.351.226-.653.075-.301-.15-1.272-.469-2.423-1.497-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.508-.678-.517-.175-.009-.376-.011-.577-.011s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.511s1.079 2.912 1.23 3.113c.15.201 2.124 3.243 5.145 4.548.718.311 1.279.497 1.716.636.721.23 1.377.197 1.895.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 21.78a9.71 9.71 0 0 1-4.96-1.354l-.356-.211-3.687.967.984-3.595-.232-.369A9.704 9.704 0 0 1 2.3 12.04c0-5.378 4.375-9.753 9.753-9.753 2.606 0 5.056 1.015 6.899 2.858a9.71 9.71 0 0 1 2.858 6.895c0 5.38-4.375 9.74-9.77 9.74zm0-17.74c-4.406 0-7.99 3.584-7.99 7.99 0 1.41.368 2.784 1.066 3.996l.165.286-.632 2.308 2.365-.62.277.164a7.95 7.95 0 0 0 4.749 1.546c4.406 0 7.99-3.584 7.99-7.99 0-2.136-.832-4.145-2.344-5.657A7.95 7.95 0 0 0 12.04 4.04z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold text-sm transition-all duration-300 group-hover:max-w-xs group-hover:pr-1">
        Fale no WhatsApp
      </span>
    </a>
  )
}
