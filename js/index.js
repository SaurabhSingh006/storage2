import 'intl-tel-input/build/css/intlTelInput.css';

import intlTelInput from 'intl-tel-input';


const phone = document.querySelectorAll('.phone');
const [home, uae1, uae2, emergency] = [...phone];
intlTelInput(home, {
    // any initialisation options go here
    utilsScript: 'build/js/utils.js',
    separateDialCode: true  
}); 
intlTelInput(uae1, {
    // any initialisation options go here
    utilsScript: 'build/js/utils.js',
    separateDialCode: true 
}); 
intlTelInput(uae2, {
    // any initialisation options go here
    utilsScript: 'build/js/utils.js',
    separateDialCode: true  
}); 
intlTelInput(emergency, {
    // any initialisation options go here
    utilsScript: 'build/js/utils.js',
    separateDialCode: true  
}); 

// PHONE INPUT BUG
[...phone].forEach((ph) => {
    ph.addEventListener('change', function() {
        const label = ph.closest('.form__field').querySelector('.form__label');
        if(this.value == '') {
            label.style.display = null;
        } else {
            label.style.display = 'block';
        }
        //ph.closest('.form__field').querySelector('.form__label').style.display = 'block';
    }); 
});

// DATE INPUT BUG
const dates = [...document.querySelectorAll('.input__date')];
dates.forEach((date) => {
    date.addEventListener('focus', function() {
        this.type = 'date';
    });
    date.addEventListener('focusout', function() {
        this.type = 'text';
    });
});

//=======================================================================
// SLIDER LOGIC
let currentSlide = 0;    
const form = document.querySelector('.form');
const slides = document.querySelectorAll(".form__slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const progressNum = document.querySelectorAll('.form__step--number');
const root = document.querySelector(':root');

//Event Handler
prevBtn.addEventListener('click', () => prevNext(-1));
nextBtn.addEventListener('click', () => prevNext(1));
form.addEventListener('change', (e) => showError(e));

function showSlide(currSlide) {
    //Progress bar 
    progressNum[currSlide].style.backgroundColor = '#0217f5';
    progressNum[currSlide].style.color = '#f4f4f5'; 

    //For showing slide
    slides[currentSlide].style.display = 'block';

    //For showing buttons
    if(currSlide == '0') { 
        prevBtn.style.display = 'none';
    } else if (currSlide < (slides.length - 1)) {
        prevBtn.style.display = null; 
    } else {
        prevBtn.style.display = null; 
        nextBtn.innerHTML = 'Submit';  
    } 
}

function prevNext (n) {
    //Go back to top
    form.scrollIntoView();

    //For Previous btn
    if (n == -1) {
        progressNum[currentSlide].style.backgroundColor = '#f4f4f5';
        progressNum[currentSlide].style.color = '#0217f5';
        progressNum[(currentSlide - 1)].classList.remove('verify'); 
    } 

    //validation 
    console.log(validateForm());
    if(n == 1 && !validateForm()) return false; 

    if(validateForm()) {
        progressNum[currentSlide].classList.add('verify');
        progressNum[currentSlide].style.color = 'transparent';
    }

    //Submit
    if(n == 1 && currentSlide >= (slides.length-1)) {
        form.submit();
        alert('Confirm form submission');  
        return false;  
    }  

    //Update Slide
    slides[currentSlide].style.display = null;  
    currentSlide += n;
    showSlide(currentSlide);
}

function validateForm() {
    let valid = true;
    const arrInput = [...slides[currentSlide].querySelectorAll('.form__input')];

    arrInput.map((input) => {
        valid = input.checkValidity();
    });
    return valid;
}

function showError(e) { 
    const input = e.target;
    const parentEl = input.parentElement;
    const label = parentEl.querySelector('.form__label');
    const errorEl = document.createElement('small');
    
    //For not repeating the small tag
    if(parentEl.querySelector('small')) {
        parentEl.querySelector('small').remove();
        input.style.border = 'none';
        label.style.color = null;
    }
    
    //Exception
    if(input.value == '') return false;

    // if(input.checkValidity()) {
    //     //parentEl.remove(errorEl);
    //     console.log(parentEl); 
    //     parentEl.querySelector('small').remove(); 
    //     input.style.border = 'none';
    // }

    if(!input.checkValidity()) {
        input.style.border = '1px solid red';
        errorEl.style.color = 'red';
        errorEl.innerText = '';
        errorEl.innerText = `Error: ${input.title}`;
        parentEl.appendChild(errorEl);
        label.style.color = 'red';
    }
}

showSlide(currentSlide);  

