import { useState } from 'react'


const Gallery = ({ images }) => {

  const [slideNumber, setSlideNumber] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (index) => {
    setSlideNumber(index)
    setOpenModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0 
    ? setSlideNumber( images.length -1 ) 
    : setSlideNumber( slideNumber - 1 )
  }

  // Next Image  
  const nextSlide = () => {
    slideNumber + 1 === images.length 
    ? setSlideNumber(0) 
    : setSlideNumber(slideNumber + 1)
  }

  return (
    <div>

      {openModal && 
        <div className='slider-wrap'>
        <span onClick={handleCloseModal} className="btn-close material-symbols-outlined">
            close
        </span>
        <span onClick={prevSlide} className="btn-prev arrow material-symbols-outlined">
            chevron_left
        </span>
          <span onClick={nextSlide} className="btn-next arrow material-symbols-outlined">
            chevron_right
        </span>
          <div className='full-screen-image'>
            {/* <img src={tab[slideNumber].img} alt='' /> */}
            <img src={images[slideNumber]} alt='' />
          </div>
        </div>
      }

      <div className='gallery-wrap'>
        {
            images && images.map((slide, index) => {
            return(
              <div 
                className='single' 
                key={index}
                onClick={ () => handleOpenModal(index) }
              >
                {/* <img src={slide.img} alt='' /> */}
                <img src={slide} alt='' />
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Gallery