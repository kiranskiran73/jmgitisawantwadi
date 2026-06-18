(function(){
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  let current = 0;
  let interval = null;
  if(!track || slides.length===0) return;

  // create indicators
  slides.forEach((s, i)=>{
    const btn = document.createElement('button');
    btn.setAttribute('role','tab');
    btn.setAttribute('aria-selected', i===0 ? 'true' : 'false');
    btn.dataset.index = i;
    btn.addEventListener('click', ()=>{
      goToSlide(i);
      restart();
    });
    indicatorsContainer.appendChild(btn);
  });

  function goToSlide(index){
    current = (index + slides.length) % slides.length;
    const offset = -current * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateIndicators();
  }

  function updateIndicators(){
    const buttons = indicatorsContainer.querySelectorAll('button');
    buttons.forEach((b, i)=> b.setAttribute('aria-selected', i===current ? 'true' : 'false'));
  }

  function next(){ goToSlide(current+1); }
  function start(){ interval = setInterval(next, 4000); }
  function stop(){ clearInterval(interval); interval = null; }
  function restart(){ stop(); start(); }

  // pause on hover/focus
  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);
  track.addEventListener('focusin', stop);
  track.addEventListener('focusout', start);

  // init
  goToSlide(0);
  start();
})();

// Animated Counters for Statistics Section
(function(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.3});

  const keyFactsSection = document.querySelector('.key-facts');
  if(keyFactsSection){
    observer.observe(keyFactsSection);
  }

  function animateCounters(){
    const counterElements = document.querySelectorAll('.stat-value');
    counterElements.forEach(element=>{
      const target = parseInt(element.dataset.target);
      let current = 0;
      const increment = target / 50; // animate over 50 frames
      const duration = 2000; // 2 seconds total
      const stepTime = duration / 50;

      const interval = setInterval(()=>{
        current += increment;
        if(current >= target){
          current = target;
          clearInterval(interval);
        }
        element.textContent = Math.floor(current).toLocaleString();
      }, stepTime);
    });
  }
})();

// Admission Modal
(function(){
  const modal = document.querySelector('#admissionModal');
  const closeBtn = document.querySelector('.modal-close');
  const overlay = document.querySelector('.modal-overlay');

  if(!modal) return;

  // Show modal on page load
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      modal.classList.add('show');
    }, 500); // Delay of 500ms before showing modal
  });

  // Close modal functions
  function closeModal(){
    modal.classList.remove('show');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Close modal with Escape key
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && modal.classList.contains('show')){
      closeModal();
    }
  });
})();
