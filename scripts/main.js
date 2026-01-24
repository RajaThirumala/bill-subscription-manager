// scripts/main.js
function renderApp() {
    const data = loadData();
    data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    renderList(data);
    updateDashboard(data);
}

function init() {
    initEvents();
    renderApp();

    // Load draft if exists
    const draft = loadDraft();
    if (draft) {
        document.getElementById('name').value = draft.name || '';
        document.getElementById('amount').value = draft.amount || '';
        document.getElementById('due-date').value = draft.dueDate || '';
        document.getElementById('frequency').value = draft.frequency || 'monthly';
        document.getElementById('category').value = draft.category || '';
        document.getElementById('notes').value = draft.notes || '';
    }
}

document.addEventListener('DOMContentLoaded', init);