const toggle = document.querySelector('.header__btn');
const header = document.querySelector('.header');

toggle.addEventListener('click', () => {
    header.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > header.style.height) {
        return header.classList.add('scroll');
    }
    header.classList.remove('scroll');
});

const tabBtns = [...document.querySelectorAll('.tabBtn')];
const tabslides = [...document.querySelectorAll('.slide')];

tabBtns.map((tabBtn, tabId) => {
    tabBtn.addEventListener('click', () => {
        tabBtns.forEach((btn) => btn.classList.remove('active'));
        tabBtn.classList.add('active');

        tabslides.map((slideBtn, slideId) => {
            if (slideId == tabId) {
                slideBtn.classList.remove('hidden');
            } else {
                slideBtn.classList.add('hidden');
            }
            slideBtn.style.transform = 'translateX(' + -tabId * 100 + '%)';
        });
    });
});

const accordion = [...document.querySelectorAll('.accordion__header')];
const speed = 300;

function closeAccordionItem(collapse) {
    collapse.style.maxHeight = collapse.scrollHeight + 'px';
    collapse.classList = 'collapsing';
    setTimeout(() => {
        collapse.style.maxHeight = '';
    }, 0);
    setTimeout(() => {
        collapse.classList = 'collapse';
    }, speed);
}

function openAccordionItem(collapse) {
    collapse.classList = 'collapsing';
    collapse.style.maxHeight = collapse.scrollHeight + 'px';
    setTimeout(() => {
        collapse.classList = 'collapse show';
        collapse.style.maxHeight = '';
    }, speed);
}

accordion.map((item) => {
    item.addEventListener('click', () => {
        const activeItem = item;
        const activeBody = item.nextElementSibling;
        if (activeItem.classList.contains('active')) {
            closeAccordionItem(activeBody);
        } else {
            openAccordionItem(activeBody);
        }
        activeItem.classList.toggle('active');
    });
});

let myForm = document.querySelector('form.form');

const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(myForm);
    if (!checkInput()) return;
    await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
    })
    .then(() => console.log('Form successfully submitted'))
    .then(() => myForm.reset())
    .catch();
}

myForm.addEventListener('submit', handleSubmit);

function checkInput() {
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const nameValue = document.querySelector('input[name="name"]').value;
    const emailValue = document.querySelector('input[name="email"]').value;
    let failedValidation = false;

    if (nameValue === '') {
        setErrorFor(nameInput, 'Name Field can not be blank!');
        failedValidation = true;
    }

    if (emailValue === '') {
        setErrorFor(emailInput, 'Email Field can not be blank!');
        failedValidation = true;
    } else if (!isEmail(emailValue)) {
        setErrorFor(emailInput, 'Whoops, make sure it’s an email');
        failedValidation = true;
    }

    return !failedValidation ? true : false;
}

function setErrorFor(input, message) {
    setTimeout(() => {
        input.parentElement.classList.remove('error');
        input.nextElementSibling.innerText = '';
    }, 4500);
    input.parentElement.classList.add('error');
    input.nextElementSibling.innerText = message;
}
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}
