const items = document.querySelectorAll('.card');
const cardsView = document.getElementById('cardsView');
const detailView = document.getElementById('detailView');
const backBtns = document.querySelectorAll('.backBtn');

items.forEach(item => {
    item.addEventListener('click', () => {

        
        // 1. Log to console
        const title = item.querySelector('h3')?.textContent;
        console.log('Selected item:', title);  



        // 2. Highlight card
        items.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
    
        // Hide cards and show detail
        cardsView.style.display = 'none';
        detailView.classList.add('active');
        // Hide all sections
        document.querySelectorAll('.menu').forEach(sec => {
            sec.classList.remove('active');
        });
        // show the corresponding section
        const targetId = item.dataset.target;
        const section = document.getElementById(targetId);
        if (section) {
            section.classList.add('active');       
        }
        // add togglebtn functionality for checklists
        const toggleBtns = section.querySelectorAll('.toggleBtn');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const checklist = btn.nextElementSibling;
                if (checklist) {
                    checklist.classList.toggle('active');
                    checklist.classList.toggle('hidden');
                }
            });
        });
    });
        
});

// back buttons
backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        detailView.classList.remove('active');
        cardsView.style.display = 'block';
    });
});



    
