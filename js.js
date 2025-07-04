// --- Карта и метки --- //
ymaps.ready(() => {
    const map = new ymaps.Map("map", {
        center: [59.97, 30.24],
        zoom: 11,
        controls: ['zoomControl']
    });

    map.behaviors.disable('scrollZoom');

    const createPlacemark = (coords, hint, balloon) => {
        const iconSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                <circle cx="20" cy="20" r="10" fill="white" stroke="green" stroke-width="4"/>
                <circle cx="20" cy="20" r="4" fill="green"/>
            </svg>
        `;

        return new ymaps.Placemark(coords, {
            hintContent: hint,
            balloonContent: balloon
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconSvg),
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -20],
            iconContentOffset: [0, 40]
        });
    };

    const placemarks = [
        {
            coords: [60.02, 30.24],
            hint: 'КинZа на Комендантском',
            balloon: 'Санкт-Петербург, пр. Комендантский, 31, кор. 1 +7 (812) 306 45 54 +7 (911) 036 98 33'
        },
        {
            coords: [59.95, 30.28],
            hint: 'КинZa на Чкаловском',
            balloon: 'Санкт-Петербург, пр. Чкаловский, 8 11:00 – 00:00 каждый день +7 (812) 955 52 62'
        }
    ];

    placemarks.forEach(({ coords, hint, balloon }) => {
        map.geoObjects.add(createPlacemark(coords, hint, balloon));
    });
});

// --- Интерфейс: бургер-меню и анимация карусели --- //
document.addEventListener("DOMContentLoaded", () => {
    // Бургер-меню
    const burger = document.querySelector('.burger-btn');
    const navWrapper = document.querySelector('.nav__wrapper');

    burger?.addEventListener('click', () => {
        burger.classList.toggle('active');
        navWrapper.classList.toggle('active');
    });

    // Анимация карусели
    const karusel = document.querySelector('.karusel');

    if (karusel) {
        setInterval(() => {
            const first = karusel.firstElementChild;

            karusel.classList.add('animate');

            setTimeout(() => {
                karusel.classList.remove('animate');
                karusel.appendChild(first);
                karusel.style.transform = 'translateX(0)';
            }, 600);
        }, 5000);
    }
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// отзывы

document.addEventListener("DOMContentLoaded", () => {
    const reviews = [
    {
        text: `"Очень спонтанно выбрали ваш ресторан для отмечания девичника,и ни разу не пожалели)))) Спасибо большое за тёплый приём, за уютную и добрую атмосферу! Так же спасибо за вкусную кухню и бесподобное домашнее вино)))) Спасибо всему коллективу за обслуживание и отдельное спасибо Вашему певцу за внимание и волшебное исполнение песен! Будем теперь чаще Вас посещать ))))"`,
        user: "Гулечка Дулатова",
        role: "Постоянный посетитель"
    },
    {
        text: `"Полное ДЕРЬМИЩЕ!!!"`,
        user: "Владислав Григорьев",
        role: "Гость"
    },
    {
        text: `"В прошлом году выбрали ваше заведение, чтобы отметить наш важны праздник - свадьбу. Были самые близкие родственники, а ваша уютная семейная атмосфера оставила у всех только положительные эмоции. А что говорить про еду! Это просто необыкновенно вкусно! Сегодня ровно год как мы создали нашу семью, и мы вновь идем к вам праздновать нашу годовщину!!! Спасибо)"`,
        user: "Валерия Петрухина",
        role: "Гость"
    },
    {
        text: `"22 декабря 2019 г. отмечали в ресторане Кинза на Чкаловском 85-летний юбилей нашей мамочки. На банкете были люди, в основном, ее возраста, которым очень трудно угодить. Гости были в полном восторге от уютного интерьера, чудесной, вкуснейшей, грузинской еды и домашнего вина. Спасибо большое за изумительный праздник. Процветания вам, успехов, удачи и всего самого наилучшего!!!"`,
        user: "Светлана Сова",
        role: "Гость"
    },
    {
        text: `"ОБОЖАЮ МАЙОНЕЗ В ДАННОМ ЗАВЕДЕНИИ, ЕМ ПО 5 ВЕДЕР"`,
        user: "Иван Старцев",
        role: "Постоянный клиент"
    }
    ];

    let current = 0;

    const textEl = document.querySelector(".text_review");
    const userEl = document.querySelector(".user:first-of-type");
    const roleEl = document.querySelector(".user:last-of-type");
    const counterEl = document.querySelector(".review-counter");
    const block = document.querySelector(".block-reviews");

    const updateReview = () => {
        block.classList.add("fade-out");

    setTimeout(() => {
        const review = reviews[current];
        textEl.textContent = review.text;
        userEl.textContent = review.user;
        roleEl.innerHTML = `<i>${review.role}</i>`;
        counterEl.textContent = `${current + 1} / ${reviews.length}`;

        block.classList.remove("fade-out");
        }, 500); // Должно совпадать с CSS transition
    };

    document.querySelectorAll(".button-reviews a").forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            current = i === 0 ? (current - 1 + reviews.length) % reviews.length : (current + 1) % reviews.length;
            updateReview();
        });
    });

  // Первый вызов при загрузке страницы
    updateReview();
});


// Анимация при скролле
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        
        entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => a.target.offsetTop - b.target.offsetTop) // сортируем сверху вниз
            .forEach((entry, index) => {
                const element = entry.target;
                const elementDelay = parseInt(element.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay + elementDelay);
                
                delay += 300; // увеличиваем задержку для следующего элемента
                observer.unobserve(element);
            });
    }, { threshold: 0.05 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
});
