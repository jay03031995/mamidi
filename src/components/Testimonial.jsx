import React from 'react'
import Horse from '../assets/rockinghorse.jpg'

const Testimonial = () => {
  return (
    <div>
      {/* ================= DESKTOP VIEW ================= */}
      <section className="bg-[#FFC64F] p-8 rounded-2xl my-10 mx-auto w-[90%] h-[780px] hidden md:block">
        <div className="grid grid-cols-2">

          {/* LEFT 2-Column Stack */}
          <div className='flex gap-[36px]'>

            {/* Column 1 */}
            <div className="space-y-[36px] relative -top-20 w-fit">
              <div className="bg-white p-4 rounded-b-xl h-[193px] w-[292px]">
                <div className='flex flex-col justify-center items-center'>
                  <p className="text-gray-700 text-sm text-center mt-10">
                    “Hey, just wanted to say the packaging was super cute and eco-friendly too 🌱 Loved that detail.
                    Unboxing it felt like opening a gift.”
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md h-[279px] w-[292px]">
                <img src={Horse} alt="Rocking Horse Chain" className="w-full h-[223px]" />
                <p className="p-2 text-center text-gray-800 font-medium">Rocking Horse Chain</p>
              </div>

              <div className="bg-white rounded-xl shadow-md h-[239px] w-[292px]">
                <div className="flex items-center gap-2 mb-2 bg-gray-400 h-[40px] rounded-t-xl px-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <p className="text-sm font-semibold">Meera, Delhi</p>
                </div>
                <p className="text-gray-700 text-sm p-5">
                  “I’m in love with your brand 😍 The rocking horse ornament brought back childhood memories.
                  Such a thoughtful piece. Thank you so much!”
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-[36px] w-fit">
              <div className="bg-white rounded-xl h-[239px] w-[292px]">
                <div className="flex items-center gap-2 mb-2 bg-gray-400 h-[40px] rounded-t-xl px-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <p className="text-sm font-semibold">Riya, Delhi</p>
                </div>
                <p className="text-gray-700 text-sm p-5 text-center">
                  “Hey, just wanted to say the packaging was super cute and eco-friendly too 🌱 Loved that detail.
                  Unboxing it felt like opening a gift.”
                </p>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md h-[279px] w-[292px]">
                <img src={Horse} alt="Rocking Horse Chain" className="w-full h-[223px]" />
                <p className="p-2 text-center text-gray-800 font-medium">Rocking Horse Chain</p>
              </div>

              <div className="bg-white rounded-xl h-[239px] w-[292px]">
                <div className="flex items-center gap-2 mb-2 bg-gray-400 h-[40px] rounded-t-xl px-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <p className="text-sm font-semibold">Meera, Delhi</p>
                </div>
                <p className="text-gray-700 text-sm p-5">
                  “I’m in love with your brand 😍 The rocking horse ornament brought back childhood memories.
                  Such a thoughtful piece. Thank you so much!”
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE TAGS */}
          <div className="space-y-4 absolute h-[720px] w-[40%] right-35">
            <div className="bg-white p-3 rounded-xl shadow-md max-w-xs relative left-75 top-[50px]">
              <p className="text-gray-700 text-[20px] font-semibold text-center">“This made my day 🌸”</p>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-md max-w-xs relative top-[100px]">
              <p className="text-gray-700 text-[20px] font-semibold text-center">“So much love in the details 💌”</p>
            </div>

            <div className='relative top-[150px] w-[260px] left-40'>
              <p className='font-bold text-[22px] text-center'>
                “Over 200+ happy customers 💬 Tap to read what they’re saying!”
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-md max-w-xs relative left-45 top-[200px]">
              <p className="text-gray-700 text-[20px] font-semibold text-center">“Cutest thing I’ve ever ordered 😍”</p>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-md max-w-xs relative top-[250px]">
              <p className="text-gray-700 text-[20px] font-semibold text-center">“Felt like opening a gift from a friend 🎁”</p>
            </div>
          </div>
        </div>
      </section>


      {/* ================= MOBILE VIEW ================= */}
      <section className="bg-[#FFC64F] p-6 rounded-xl my-10 mx-auto w-[95%] block md:hidden">
        
        <h2 className="font-bold text-xl text-center mb-4">
          What our customers say 💬
        </h2>

        <div className="space-y-5">

          {/* Cards stacked */}
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-700">
              “The packaging was super cute and eco-friendly 🌱 Loved it!”
            </p>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow">
            <img src={Horse} className="w-full h-[200px] object-cover" />
            <p className="p-2 text-center font-medium">Rocking Horse Chain</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-700">
              “Brought back childhood memories 😍 Loved the details!”
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-700">
              “Cutest thing I’ve ordered! Felt like a gift 🎁”
            </p>
          </div>

        </div>

        <p className="text-center font-semibold mt-6">
          Over 200+ Happy Customers ❤️
        </p>
      </section>
    </div>
  )
}

export default Testimonial
