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
      <form onSubmit={handleSubmit} className="bg-gray-700/20 rounded-2xl overflow-hidden py-2 px-3 space-y-5">
        <input 
        type="email"
        name="email"
        value={form.email}
        placeholder="ingresa tu correo"
        onChange={handleChange}
        className="dark:text-gray-200 text-neutral-900 w-full px-4 py-2 rounded-md bg-gray-700/30 focus:outline-none focus:ring-2 focus:ring-amber-600/60"
        required
        />
        <input 
        type="text" 
        name="subject"
        placeholder="ingresa el asunto"
        value={form.subject}
        onChange={handleChange}
        className="dark:text-gray-200 text-neutral-900 w-full px-4 py-2 rounded-md bg-gray-700/30 focus:outline-none focus:ring-2 focus:ring-amber-600/60"
        required
        />
        <textarea
        name="message"
        placeholder="ingresa tu mensaje"
        value={form.message}
        onChange={handleChange}
        className="dark:text-gray-200 text-neutral-900 w-full px-4 py-2 rounded-md bg-gray-700/30 focus:outline-none focus:ring-2 focus:ring-amber-600/60"
        required
        />

    <div className="overflow-hidden">
        <button type="submit" className="dark:bg-amber-600/40 bg-amber-600/80  cursor-pointer text-white px-4 py-2 w-full rounded-b-2xl transition-all duration-200 ease-in-out hover:scale-110 active:scale-130">
            enviar
        </button>
    </div>
    {status && <p className="dark:text-cyan-600 ">{status}</p>}    


      </form>
    </>
  )
}

export default Form