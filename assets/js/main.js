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
	setTimeout(() => {
		collapse.classList = 'collapsing';
		collapse.style.maxHeight = '0px';
	}, 10);
	setTimeout(() => {
		collapse.classList = 'collapse';
		collapse.style.maxHeight = '';
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
