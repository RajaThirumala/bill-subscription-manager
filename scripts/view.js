// scripts/view.js
function renderList(items) {
    const list = document.getElementById('list');
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        const li = document.createElement('li');
        const status = getStatus(item.dueDate);
        li.classList.add(status);
        li.innerHTML = `
            <span>${item.name} - $${item.amount} - Due: ${item.dueDate} - ${item.frequency} - ${item.category || 'N/A'}</span>
            <div>
                <button class="edit" data-id="${item.id}">Edit</button>
                <button class="delete" data-id="${item.id}">Delete</button>
            </div>
        `;
        if (item.notes) {
            const notes = document.createElement('p');
            notes.textContent = `Notes: ${item.notes}`;
            li.appendChild(notes);
        }
        fragment.appendChild(li);
    });

    list.appendChild(fragment);
}

function updateDashboard(data) {
    document.getElementById('total-expenses').textContent = calculateTotals(data);
    document.getElementById('next-due').textContent = getNextDue(data);
}

function populateForm(item) {
    document.getElementById('edit-id').value = item.id;
    document.getElementById('name').value = item.name;
    document.getElementById('amount').value = item.amount;
    document.getElementById('due-date').value = item.dueDate;
    document.getElementById('frequency').value = item.frequency;
    document.getElementById('category').value = item.category || '';
    document.getElementById('notes').value = item.notes || '';
    document.getElementById('cancel-edit').style.display = 'inline';
}

function resetForm() {
    document.getElementById('bill-form').reset();
    document.getElementById('edit-id').value = '';
    document.getElementById('cancel-edit').style.display = 'none';
    clearDraft();
}