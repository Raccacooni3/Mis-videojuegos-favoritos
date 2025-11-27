const items = document.querySelectorAll('.card');
const menus = document.querySelectorAll('.menu');

items.forEach(item => {
    item.addEventListener('click', () => {
        
        // 1. Log to console
        const title = item.querySelector('h3')?.textContent;
        console.log('Selected item:', title);
        // 2. Highlight card
        items.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
    });
});
        // 3. Smooth scrolling for menu links
menus.forEach(menu => {
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});