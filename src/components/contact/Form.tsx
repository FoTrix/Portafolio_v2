import { useState, type FormEvent } from "react"

const Form = () => {

  const [form, setForm] = useState({
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState("")

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("Enviando...")
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form),
    })

    const data = await res.json()
    setStatus(data.message)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white dark:bg-neutral-800/90 p-6 sm:p-8 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 space-y-6 transition-all duration-300 hover:shadow-blue-500/10">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Correo Electrónico</label>
          <input 
            type="email"
            name="email"
            id="email"
            value={form.email}
            placeholder="tu@ejemplo.com"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 transition-all duration-300 ease-in-out placeholder-neutral-400 dark:placeholder-neutral-500 hover:border-sky-400 dark:hover:border-sky-400 transform hover:translate-y-[-2px]"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Asunto</label>
          <input 
            type="text" 
            name="subject"
            id="subject"
            placeholder="Asunto de tu mensaje"
            value={form.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 transition-all duration-300 ease-in-out placeholder-neutral-400 dark:placeholder-neutral-500 hover:border-sky-400 dark:hover:border-sky-400 transform hover:translate-y-[-2px]"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Mensaje</label>
          <textarea
            name="message"
            id="message"
            placeholder="Escribe tu mensaje aquí..."
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 transition-all duration-300 ease-in-out min-h-[150px] resize-y placeholder-neutral-400 dark:placeholder-neutral-500 hover:border-sky-400 dark:hover:border-sky-400 transform hover:translate-y-[-2px]"
            required
            rows={5}
          />
        </div>

        <div className="pt-2">
          <button type="submit" className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 dark:from-sky-400 dark:to-blue-500 dark:hover:from-sky-500 dark:hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 shadow-md hover:shadow-xl">
            {status === "Enviando..." ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : "Enviar Mensaje"}
          </button>
        </div>
        {status && status !== "Enviando..." && <p className={`text-center py-2 font-medium transition-all duration-300 ease-in-out ${status.toLowerCase().includes('error') || status.toLowerCase().includes('fallo') ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{status}</p>}    
      </form>
    </>
  )
}

export default Form