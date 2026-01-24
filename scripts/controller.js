// scripts/controller.js
function initEvents() {
    const form = document.getElementById('bill-form');
    form.addEventListener('submit', handleSubmit);

    document.getElementById('cancel-edit').addEventListener('click', resetForm);

    document.getElementById('list').addEventListener('click', handleListClick);

    const search = document.getElementById('search');
    search.addEventListener('input', handleSearch);

    // Draft handling
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', handleDraft);
    });
}

function handleSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const item = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('name').value,
        amount: parseFloat(document.getElementById('amount').value),
        dueDate: document.getElementById('due-date').value,
        frequency: document.getElementById('frequency').value,
        category: document.getElementById('category').value,
        notes: document.getElementById('notes').value
    };

    if (!item.name || !item.amount || !item.dueDate) {
        alert('Please fill required fields.');
        return;
    }

    if (id) {
        updateItem(item.id, item);
    } else {
        addItem(item);
    }

    resetForm();
    renderApp();
}

function handleListClick(e) {
    const id = parseInt(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains('edit')) {
        const data = loadData();
        const item = data.find(i => i.id === id);
        if (item) populateForm(item);
    } else if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            deleteItem(id);
            renderApp();
        }
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const data = loadData();
    const filtered = data.filter(item => 
        item.name.toLowerCase().includes(query) || 
        (item.category && item.category.toLowerCase().includes(query))
    );
    renderList(filtered);
    updateDashboard(filtered);
}

function handleDraft() {
    const formData = {
        name: document.getElementById('name').value,
        amount: document.getElementById('amount').value,
        dueDate: document.getElementById('due-date').value,
        frequency: document.getElementById('frequency').value,
        category: document.getElementById('category').value,
        notes: document.getElementById('notes').value
    };
    saveDraft(formData);
}