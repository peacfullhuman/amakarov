const plusBtn = document.getElementById('plus-btn')
const minusBtn = document.getElementById('minus-btn')
const firstOne = document.getElementById('one-block')
const secondOne = document.getElementById('sub-one-block')

const toFormBtn = document.getElementById('button-msg')
const oneForm = document.getElementById('five-block')
const twoForm = document.getElementById('sub-five-block')

plusBtn.addEventListener('click', function(a){
    firstOne.style.display = 'none'
    secondOne.style.display = 'flex'
})

minusBtn.addEventListener('click', function(a){
    firstOne.style.display = 'flex'
    secondOne.style.display = 'none'
})

toFormBtn.addEventListener('click', function(a){
    oneForm.style.display = 'none'
    twoForm.style.display = 'block'
})

// прокрутка по горизонтали без удержания

document.querySelector('.main-wrapper').addEventListener('wheel', function(e) {
  // Отключаем стандартную вертикальную прокрутку
  e.preventDefault();

  // Прокручиваем горизонтально
  this.scrollLeft += e.deltaY;
});

// функция перелистывания для право и лево
const photos = document.querySelectorAll('.four-img')

function slider (phot, orientation) {

    for(let i = 0; i < phot.length; i++){
        
        if (phot[i].classList.length > 1) { 
            phot[i].classList.remove('four-active');

            if (orientation === '.right'){
                return i == phot.length-1 ? phot[0].classList.add('four-active') : phot[i+1].classList.add('four-active')
            }
            if (orientation === '.left'){
                return i == 0 ? photos[photos.length-1].classList.add('four-active') : photos[i-1].classList.add('four-active')
            }
            break
        }
    }
}
// фото влево
// document.querySelector('.left').addEventListener('click', (a) => {

//     slider(photos, '.left')
    
// })
// // фото вправо
// document.querySelector('.right').addEventListener('click', (a) => {

//     slider(photos, '.right')
// })
