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
      <form onSubmit={handleSubmit} className="backdrop-blur-md bg-amber-900/80 rounded-2xl overflow-hidden py-4 px-5 space-y-4 shadow-lg border border-amber-600/20">
        <input 
        type="email"
        name="email"
        value={form.email}
        placeholder="Ingresa tu correo"
        onChange={handleChange}
        className="text-gray-200 w-full px-4 py-3 rounded-xl bg-amber-800/90 border border-amber-600/30 focus:outline-none focus:ring-2 focus:ring-amber-600/60 transition-all duration-300 ease-in-out hover:border-amber-500/50"
        required
        />
        <input 
        type="text" 
        name="subject"
        placeholder="Ingresa el asunto"
        value={form.subject}
        onChange={handleChange}
        className="text-gray-200 w-full px-4 py-3 rounded-xl bg-amber-800/90 border border-amber-600/30 focus:outline-none focus:ring-2 focus:ring-amber-600/60 transition-all duration-300 ease-in-out hover:border-amber-500/50"
        required
        />
        <textarea
        name="message"
        placeholder="Ingresa tu mensaje"
        value={form.message}
        onChange={handleChange}
        className="text-gray-200 w-full px-4 py-3 rounded-xl bg-amber-800/90 border border-amber-600/30 focus:outline-none focus:ring-2 focus:ring-amber-600/60 transition-all duration-300 ease-in-out hover:border-amber-500/50 min-h-[120px] resize-y"
        required
        />

        <div className="overflow-hidden pt-2">
          <button type="submit" className="dark:bg-amber-600/60 bg-amber-600/90 cursor-pointer text-white font-medium px-6 py-3 w-full rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-amber-500/90 dark:hover:bg-amber-500/70 shadow-md hover:shadow-amber-600/30">
            Enviar
          </button>
        </div>
        {status && <p className="text-center py-2 text-amber-400 font-medium transition-all duration-300 ease-in-out">{status}</p>}    
      </form>
    </>
  )
}

export default Form