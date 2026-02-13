// Récupérer le formulaire et la notification
const form = document.getElementById('contactForm');
const notification = document.getElementById('notification');

// La clé est chargée depuis .env
// IMPORTANT: Ne jamais écrire la clé directement ici !
const WEB3FORMS_KEY = window.WEB3FORMS_KEY || null;

// Vérifier que la clé est présente
if (!WEB3FORMS_KEY) {
    console.error('❌ Clé Web3Forms manquante! Vérifiez votre fichier .env');
    showNotification('Erreur de configuration', 'error');
}

// Fonction pour afficher les notifications
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
}

// Fonction pour valider l'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Gérer l'envoi du formulaire
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        showNotification('Tous les champs sont obligatoires', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez entrer un email valide', 'error');
        return;
    }
    
    const submitButton = form.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';
    
    const formData = {
        access_key: WEB3FORMS_KEY,
        name: name,
        email: email,
        message: message,
        subject: `Nouveau message de ${name} - Smart Campus`,
        from_name: 'Smart Campus Form',
        replyto: email
    };
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Message envoyé avec succès ! ✅', 'success');
            form.reset();
        } else {
            showNotification('Erreur lors de l\'envoi. Réessayez.', 'error');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('Erreur de connexion. Vérifiez votre réseau.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Envoyer';
    }
});


