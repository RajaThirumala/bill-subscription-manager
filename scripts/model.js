// scripts/model.js
const STORAGE_KEY = 'bills';

function loadData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error loading data:', e);
        return [];
    }
}

function saveData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving data:', e);
    }
}

function addItem(item) {
    const data = loadData();
    data.push(item);
    saveData(data);
}

function updateItem(id, updatedItem) {
    let data = loadData();
    data = data.map(item => item.id === id ? { ...item, ...updatedItem } : item);
    saveData(data);
}

function deleteItem(id) {
    let data = loadData();
    data = data.filter(item => item.id !== id);
    saveData(data);
}

function calculateTotals(data) {
    const monthlyTotal = data.reduce((sum, item) => {
        if (item.frequency === 'monthly') return sum + item.amount;
        if (item.frequency === 'yearly') return sum + item.amount / 12;
        return sum;
    }, 0);
    return monthlyTotal.toFixed(2);
}

function getNextDue(data) {
    const upcoming = data.filter(item => new Date(item.dueDate) >= new Date());
    if (!upcoming.length) return 'None';
    upcoming.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return `${upcoming[0].name} on ${upcoming[0].dueDate}`;
}

function getStatus(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    if (due < today) return 'overdue';
    return 'upcoming';
}

function saveDraft(formData) {
    sessionStorage.setItem('draft', JSON.stringify(formData));
}

function loadDraft() {
    const draft = sessionStorage.getItem('draft');
    return draft ? JSON.parse(draft) : null;
}

function clearDraft() {
    sessionStorage.removeItem('draft');
}
