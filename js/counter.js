const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {

    const target = parseFloat(counter.dataset.target);

    const isDecimal = target % 1 !== 0;

    const duration = 2000;

    const startTime = performance.now();

    function update(currentTime){

        const progress = Math.min((currentTime - startTime) / duration, 1);

        const value = target * progress;

        if(isDecimal){

            counter.textContent = value.toFixed(1) + "%";

        }else{

            if(target >= 1000){

                counter.textContent = Math.floor(value / 1000) + "K+";

            }else{

                counter.textContent = Math.floor(value);

            }

        }

        if(progress < 1){

            requestAnimationFrame(update);

        }else{

            if(target === 25000){

                counter.textContent = "25K+";

            }

            if(target === 50000){

                counter.textContent = "50K+";

            }

            if(target === 500){

                counter.textContent = "500+";

            }

            if(target === 99.9){

                counter.textContent = "99.9%";

            }

        }

    }

    requestAnimationFrame(update);

};

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

},{threshold:.5});

counters.forEach(counter=>observer.observe(counter));