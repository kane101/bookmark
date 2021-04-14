const toggle = document.querySelector('.header__btn');
const header = document.querySelector('.header');

toggle.addEventListener('click', () => {
	header.classList.toggle('active');
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
	item.addEventListener('click', (e) => {
		const activeItem = e.currentTarget;
		const activeBody = e.currentTarget.nextElementSibling;
		if (activeItem.classList.contains('active')) {
			closeAccordionItem(activeBody);
		} else {
			openAccordionItem(activeBody);
		}
		activeItem.classList.toggle('active');
	});
});

const form = document.querySelector('form');
let formValue = document.querySelector('.contact__input').value;

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
}

const showError = () => {
	setTimeout(() => {
		form.classList.remove('error');
	}, 4500);
	form.classList.add('error');
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (!isEmail(formValue)) {
		showError();
	}
});
window.addEventListener('scroll', () => {
	if (window.scrollY > document.querySelector('.header').style.height) {
		return document.querySelector('.header').classList.add('scroll');
	}
	document.querySelector('.header').classList.remove('scroll');
});
