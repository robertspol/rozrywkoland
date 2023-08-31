const wrapperTouchscreen = document.querySelector('.wrapper-touchscreen');
const wrapperDesktop = document.querySelector('.wrapper-desktop');
const sections = document.querySelectorAll('.section');
const numbers = document.querySelectorAll('.contact__number');
const emailPortrait = document.querySelector('.contact__email--portrait');
const emailLandscape = document.querySelector('.contact__email--landscape');
const fbTouchscreen = document.querySelectorAll('.wrapper-touchscreen .section__fb');
const fbDesktop = document.querySelectorAll('.wrapper-desktop .section__fb');
const linksTouchscreen = document.querySelector('.nav__links--touchscreen');
const upArrow = document.querySelector('.fa-angle-double-up');
const downArrow = document.querySelector('.fa-angle-double-down');
const linksDesktop = document.querySelector('.nav__links--desktop');
const leftArrow = document.querySelector('.fa-angle-double-left');
const rightArrow = document.querySelector('.fa-angle-double-right');
const hand = document.querySelector('.fa-hand-pointer');

const names = ['Rozrywkoland', 'Laser Tag', 'Arkamed'];

downArrow.classList.add('active-arrow');
rightArrow.classList.add('active-arrow');

const touchscreenLinksArray = [];
const desktopLinksArray = [];

let position = 0;
let visibleSubpageIndex = 0;

const sectionHeight = sections[0].offsetHeight;

const contact = way => {
    switch (way) {
        case 'number1':
            window.open('tel:+48725229214');
            break;

        case 'number2':
            window.open('tel:+48797199971');
            break;

        case 'email':
            window.location.href = 'mailto:arkadiusz_marcin_g@onet.pl';
            break;

        case 'fb1':
            window.open('https://www.facebook.com/profile.php?id=100054508568716');
            break;

        case 'fb2':
            window.open('https://www.facebook.com/LASER-TAG-arena-%C5%9Awidnica-112241267909322');
            break;

        case 'fb3':
            window.open('https://www.facebook.com/Prywatne-Pogotowie-Ratunkowe-Arkamed-107195931082549');
            break;
    }
}

const isArrowActiveOnTouchscreen = () => {
    if (window.scrollY > 0 && !upArrow.classList.contains('active-arrow')) {
        upArrow.classList.add('active-arrow');
        hand.classList.add('active-hand');
    }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        downArrow.classList.remove('active-arrow');
    } else if (window.scrollY === 0) {
        upArrow.classList.remove('active-arrow');
        hand.classList.remove('active-hand');
    } else {
        downArrow.classList.add('active-arrow');
    }
}

const isArrowActiveOnDesktop = () => {
    if (visibleSubpageIndex > 0 && !leftArrow.classList.contains('active-arrow')) {
        leftArrow.classList.add('active-arrow');
    }

    if (visibleSubpageIndex === 0) {
        leftArrow.classList.remove('active-arrow');
        rightArrow.classList.add('active-arrow');
    } else if (visibleSubpageIndex === names.length - 1) {
        rightArrow.classList.remove('active-arrow');
    } else if (!rightArrow.classList.contains('active-arrow')) {
        rightArrow.classList.add('active-arrow');
    } else return;
}

const linkActionOnTouchscreen = index => {
    if (visibleSubpageIndex !== index) {

        visibleSubpageIndex = index;

        const top = sections[index].offsetTop;

        window.scrollTo({
            left: 0,
            top,
            behavior: 'smooth'
        });
    }
}

const linkActionOnDesktop = index => {
    if (visibleSubpageIndex !== index) {
        desktopLinksArray[visibleSubpageIndex].classList.remove('active-link');
        desktopLinksArray[index].classList.add('active-link');

        const indexDifference = index - visibleSubpageIndex;
        const newPosition = indexDifference * 100;
        position -= newPosition;

        wrapperDesktop.style.transform = `translateX(${position}%)`;
        visibleSubpageIndex = index;

        isArrowActiveOnDesktop();
    } else return;
}

const arrowActionOnTouchscreen = sign => {
    let top;

    if (sign === '-' && scrollY > 0) {
        if (scrollY === 0) return;
        if (visibleSubpageIndex > 0) visibleSubpageIndex--;
        top = window.scrollY - sectionHeight;

    } else if (sign === '+') {
        if (visibleSubpageIndex < names.length - 1) {
            visibleSubpageIndex++;
        }

        top = window.scrollY + sectionHeight;
    }

    window.scrollTo({
        left: 0,
        top,
        behavior: 'smooth'
    });
}

const arrowActionOnDesktop = sign => {
    if (sign === '-' && position < 0) {
        position += 100;
        desktopLinksArray[visibleSubpageIndex].classList.remove('active-link');
        visibleSubpageIndex--;
    } else if (sign === '+') {
        const maxPosition = -(names.length - 1) * 100;

        if (position > maxPosition) {
            position -= 100;
            desktopLinksArray[visibleSubpageIndex].classList.remove('active-link');
            visibleSubpageIndex++;
        }
    } else return;

    desktopLinksArray[visibleSubpageIndex].classList.add('active-link');
    wrapperDesktop.style.transform = `translateX(${position}%)`;

    isArrowActiveOnDesktop();
}

const goToTop = () => {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    });
}

names.forEach((name, i) => {
    const touchscreenLink = document.createElement('h1');
    touchscreenLink.classList.add(`nav__link${i + 1}`);
    touchscreenLink.textContent = name;
    touchscreenLink.addEventListener('click', () => linkActionOnTouchscreen(i));
    touchscreenLinksArray.push(touchscreenLink);
    linksTouchscreen.appendChild(touchscreenLink);

    const desktopLink = document.createElement('h1');
    desktopLink.classList.add(`nav__link${i + 1}`);
    desktopLink.textContent = name;
    desktopLink.addEventListener('click', () => linkActionOnDesktop(i));
    desktopLinksArray.push(desktopLink);
    linksDesktop.appendChild(desktopLink);
});

desktopLinksArray[0].classList.add('active-link');

document.addEventListener('scroll', isArrowActiveOnTouchscreen);

numbers.forEach((number, i) => {
    number.addEventListener('click', () => contact(`number${i + 1}`))
});

fbTouchscreen.forEach((icon, i) => {
    icon.addEventListener('click', () => contact(`fb${i + 1}`));
});

fbDesktop.forEach((icon, i) => {
    icon.addEventListener('click', () => contact(`fb${i + 1}`));
});

emailPortrait.addEventListener('click', () => contact('email'));
emailLandscape.addEventListener('click', () => contact('email'));

upArrow.addEventListener('click', () => arrowActionOnTouchscreen('-'));
downArrow.addEventListener('click', () => arrowActionOnTouchscreen('+'));

leftArrow.addEventListener('click', () => arrowActionOnDesktop('-'));
rightArrow.addEventListener('click', () => arrowActionOnDesktop('+'));

hand.addEventListener('click', goToTop);