import React from 'react'
import styles from '../../styles/styles'

const CheckoutSteps = ({active}) => {
    console.log(active);
  return (
    <div className='w-full flex justify-center'>
        <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
               <div className={`${styles.noramlFlex}`}>
                <div className={`bg-black w-[50px] h-[50px] rounded-full flex justify-center items-center`}>
                       <span className={`${styles.cart_button_text}`}>1</span>
                </div>
                <div className={`${
                    active > 1 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#000000]"
                    : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#000000]"
                }`} />
               </div>

               <div className={`${styles.noramlFlex}`}>
                <div className={`${active > 1 ? `bg-black w-[50px] h-[50px] rounded-full flex justify-center items-center` : `  w-[50px] h-[50px] flex justify-center items-center rounded-full border-2 border-black border-solid !bg-[#ffffff]`}`}>
                    <span className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#000000]`}`}>
                        2
                    </span>
                </div>
               </div>

               <div className={`${styles.noramlFlex}`}>
               <div className={`${
                    active > 3 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#000000]"
                    : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#000000]"
                }`} />
                <div className={`${active > 2 ? `${styles.cart_button}` : ` w-[50px] h-[50px] rounded-full border-2 border-black border-solid flex justify-center items-center !bg-[#ffffff]`}`}>
                    <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#000000]`}`}>
                        3
                    </span>
                </div>
               </div>
        </div>
    </div>
  )
}

export default CheckoutSteps