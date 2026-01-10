const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const track = document.querySelector('.pet-cards');
const cards = track.children;
let width = 0;

for (let i = 0; i < cards.length / 2; i++) {
    width += cards[i].offsetWidth + 16;
}

track.style.setProperty('--loop-width', width + 'px');

document.addEventListener('DOMContentLoaded', () => {

    const roleChange = document.getElementById('role-change-text');
    const roleChangeBox = document.querySelector('.role-change');
    const infoForUsers = document.querySelector('.info-for-users');
    const infoForShelters = document.querySelector('.info-for-shelters');

    roleChangeBox.addEventListener('click', () => {
        if (roleChange.textContent === 'For Users') {
            roleChangeBox.style.paddingRight = '25px';
            roleChangeBox.style.backgroundColor = '#b45700';
            roleChange.textContent = 'For Shelters';

            infoForUsers.classList.add('hidden');
            infoForShelters.classList.remove('hidden');

        } else {
            roleChange.textContent = 'For Users';
            roleChangeBox.style.paddingRight = '15px';
            roleChangeBox.style.backgroundColor = '#336604';

            infoForShelters.classList.add('hidden');
            infoForUsers.classList.remove('hidden');
        }
    });

});