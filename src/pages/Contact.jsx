import { useState } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#2e0003] mb-8 text-center">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-[#2e0003] mt-2" />
                  <div>
                    <h3 className="font-bold text-[#2e0003] mb-1">Phone</h3>
                    <p className="text-gray-600">+91 9876543210</p>
                    <p className="text-gray-600">Mon-Fri, 9AM-6PM IST</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-[#2e0003] mt-2" />
                  <div>
                    <h3 className="font-bold text-[#2e0003] mb-1">Email</h3>
                    <p className="text-gray-600">info@desizaika.com</p>
                    <p className="text-gray-600">support@desizaika.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#2e0003] mt-2" />
                  <div>
                    <h3 className="font-bold text-[#2e0003] mb-1">Address</h3>
                    <p className="text-gray-600">Mumbai, India</p>
                    <p className="text-gray-600">Available Worldwide</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold text-[#2e0003] mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-[#2e0003] hover:text-[#4a0a10] text-2xl">f</a>
                  <a href="#" className="text-[#2e0003] hover:text-[#4a0a10] text-2xl">𝕏</a>
                  <a href="#" className="text-[#2e0003] hover:text-[#4a0a10] text-2xl">📷</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2e0003]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2e0003]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2e0003]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2e0003]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2e0003]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2e0003] text-[#D8cfbc] font-bold py-3 rounded-lg hover:bg-[#4a0a10] flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
