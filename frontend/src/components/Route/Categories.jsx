import React from 'react'
import { brandingData , categoriesData} from '../../static/data'
import { useNavigate } from 'react-router-dom/dist'

const Categories = () => {
    const navigate = useNavigate();
  return (
    <div>

    <div className='flex justify-center items-center'>
    <div className='w-[70%] bg-white rounded-md flex flex-row flex-wrap justify-center items-center gap-14 py-7 mt-10'>
    {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex gap-1 items-center justify-center" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
    </div>

    </div>

    <div className='flex justify-center items-center'>
    <div className='w-[70%] bg-white rounded-md flex flex-row flex-wrap justify-center items-center gap-14 py-7 mt-10'>
    {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-[200px] h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[120px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}

    </div>
    </div>
      
    </div>
  )
}

export default Categories
