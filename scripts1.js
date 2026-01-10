// --- MOCK DATA ---
const pets = [
    { id: 1, name: 'Bella', species: 'Dog', breed: 'Golden Retriever', age: '2 years', location: 'New York', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', status: 'Available' },
    { id: 2, name: 'Milo', species: 'Cat', breed: 'Siamese', age: '1 year', location: 'Brooklyn', img: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', status: 'Available' },
    { id: 3, name: 'Rocky', species: 'Dog', breed: 'Bulldog', age: '4 years', location: 'New York', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', status: 'Pending' },
    { id: 4, name: 'Luna', species: 'Cat', breed: 'Tabby', age: '6 months', location: 'Queens', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', status: 'Available' },
    { id: 5, name: 'Charlie', species: 'Dog', breed: 'Beagle', age: '3 years', location: 'Jersey City', img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', status: 'Available' },
    { id: 6, name: 'Oreo', species: 'Other', breed: 'Rabbit', age: '1 year', location: 'New York', img: 'https://images.unsplash.com/photo-1585110396000-c9285742770f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', status: 'Available' },
    { id: 7, name: 'Max', species: 'Dog', breed: 'German Shepherd', age: '5 years', location: 'Bronx', img: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', status: 'Available' },
    { id: 8, name: 'Simba', species: 'Cat', breed: 'Maine Coon', age: '2 years', location: 'Manhattan', img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', status: 'Available' },
];

const requests = [
    { id: 101, pet: 'Rocky', applicant: 'John Doe', status: 'Pending' },
    { id: 102, pet: 'Luna', applicant: 'Sarah Smith', status: 'Approved' },
    { id: 103, pet: 'Bella', applicant: 'Mike Ross', status: 'Pending' },
];

// --- RENDER FUNCTIONS ---

function renderPets(filterLoc = '', filterSpec = '') {
    const grid = document.getElementById('petGrid');
    const noRes = document.getElementById('noResults');
    grid.innerHTML = '';

    let count = 0;

    pets.forEach(pet => {
        // Filter Logic
        if (filterLoc && !pet.location.toLowerCase().includes(filterLoc.toLowerCase())) return;
        if (filterSpec && pet.species !== filterSpec) return;

        count++;

        const card = document.createElement('div');
        card.className = 'glass-card rounded-2xl overflow-hidden flex flex-col h-full group cursor-pointer';
        card.innerHTML = `
                    <div class="h-56 overflow-hidden relative">
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition z-10"></div>
                        <img src="${pet.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110">
                        <div class="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                            ${pet.status}
                        </div>
                    </div>
                    <div class="p-5 flex-1 flex flex-col relative bg-white/40">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h3 class="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition">${pet.name}</h3>
                                <p class="text-sm text-gray-500">${pet.breed}</p>
                            </div>
                            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm">
                                <i class="fa-solid ${pet.species === 'Dog' ? 'fa-dog' : pet.species === 'Cat' ? 'fa-cat' : 'fa-carrot'}"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-2 mt-2 mb-6">
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fa-solid fa-location-dot w-5 text-center text-pink-500 mr-2"></i> ${pet.location}
                            </div>
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fa-solid fa-hourglass-half w-5 text-center text-blue-500 mr-2"></i> ${pet.age}
                            </div>
                        </div>

                        <button onclick="openAdoptModal(${pet.id})" class="mt-auto w-full bg-white border border-gray-200 text-gray-700 hover:bg-pink-500 hover:text-white hover:border-pink-500 font-bold py-2.5 rounded-xl transition duration-300 shadow-sm">
                            Adopt Me
                        </button>
                    </div>
                `;
        grid.appendChild(card);
    });

    if (count === 0) noRes.classList.remove('hidden');
    else noRes.classList.add('hidden');
}

function renderAdminTable() {
    const tbody = document.getElementById('adminTableBody');
    tbody.innerHTML = '';
    requests.forEach(req => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-gray-200/50 hover:bg-white/50 transition';
        let statusColor = req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700';

        tr.innerHTML = `
                    <td class="py-4 font-medium text-gray-800">${req.pet}</td>
                    <td class="py-4 text-gray-600">${req.applicant}</td>
                    <td class="py-4"><span class="px-2.5 py-1 rounded-full text-xs font-bold ${statusColor}">${req.status}</span></td>
                    <td class="py-4 text-right">
                        <button class="text-green-600 hover:bg-green-100 p-2 rounded-lg transition"><i class="fa-solid fa-check"></i></button>
                        <button class="text-red-500 hover:bg-red-100 p-2 rounded-lg ml-1 transition"><i class="fa-solid fa-xmark"></i></button>
                    </td>
                `;
        tbody.appendChild(tr);
    });
}

// --- INTERACTION LOGIC ---

function toggleView() {
    const customerView = document.getElementById('customerView');
    const adminView = document.getElementById('adminView');
    const btn = document.getElementById('viewToggleBtn');

    if (adminView.classList.contains('hidden')) {
        // Switch to Admin
        customerView.classList.add('hidden');
        adminView.classList.remove('hidden');
        btn.innerHTML = '<i class="fa-solid fa-user mr-2"></i>Customer View';
        renderAdminTable();
    } else {
        // Switch to Customer
        adminView.classList.add('hidden');
        customerView.classList.remove('hidden');
        btn.innerHTML = '<i class="fa-solid fa-user-shield mr-2"></i>Admin Login';
    }
}

function filterPets() {
    const loc = document.getElementById('locationInput').value;
    const spec = document.getElementById('speciesInput').value;
    renderPets(loc, spec);
}

function openAdoptModal(id) {
    const pet = pets.find(p => p.id === id);
    document.getElementById('modalPetName').innerText = pet.name;
    document.getElementById('modalPetImg').src = pet.img;
    document.getElementById('adoptModal').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function handleAdoption(e) {
    e.preventDefault();
    closeModal('adoptModal');
    showToast("Application submitted successfully!", "REQ-" + Math.floor(Math.random() * 10000));
}

function handleSurrender(e) {
    e.preventDefault();
    closeModal('surrenderModal');
    showToast("Surrender request received.", "SUR-" + Math.floor(Math.random() * 10000));
}

function showToast(msg, ref) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').innerText = msg;
    document.getElementById('toastRef').innerText = ref;
    toast.classList.remove('translate-y-40');
    setTimeout(() => {
        toast.classList.add('translate-y-40');
    }, 4000);
}

// --- INIT ---
window.onload = function () {
    renderPets();
};
