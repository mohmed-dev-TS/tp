CODE — Formulaire de Contact avec Web3Forms
README.md
# Smart Campus - Formulaire de Contact

![GitHub](https://img.shields.io/badge/version-1.0-blue)
![GitHub](https://img.shields.io/badge/GitHub-Pages-success)
![GitHub](https://img.shields.io/badge/Web3Forms-API-orange)

## 📋 Description

Projet collaboratif de formulaire de contact avec envoi d'email automatique via Web3Forms.  
Développé dans le cadre de la séance **"Maîtriser le Travail d'Équipe Technique"**.

**Objectif :** Apprendre à collaborer sur Git/GitHub en équipe de 3.

---

## 🚀 Fonctionnalités

- ✅ Formulaire responsive (nom, email, message)
- ✅ Design moderne avec CSS
- ✅ Envoi d'email automatique (API Web3Forms)
- ✅ Notifications de succès/erreur
- ✅ Sécurisation des clés API (.gitignore)
- ✅ Déploiement GitHub Pages

---

## 👥 Équipe & Rôles

| Rôle | Responsabilité | Branche |
|------|---------------|---------|
| Développeur HTML | Structure du formulaire | `feature/html` |
| Développeur CSS | Style et responsive | `feature/css` |
| Développeur JS | Intégration API Web3Forms | `feature/js` |

---

## 🛠️ Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-compte/contact-form-project.git
cd contact-form-project

index.html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire de Contact - Smart Campus</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Contactez-nous</h1>
        <p>Projet Smart Campus</p>
        <form id="contactForm">
            <div class="form-group">
                <label for="name">Nom complet</label>
                <input type="text" id="name" name="name" placeholder="Votre nom" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="votre@email.com" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Votre message..." required></textarea>
            </div>
            <button type="submit">Envoyer</button>
        </form>
        <div id="notification" class="notification hidden"></div>
    </div>
    <script src="script.js"></script>
</body></html>
style.css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
.container {
    background: white;
    border-radius: 10px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    padding: 40px;
    width: 100%;
    max-width: 500px;
}
h1 {
    color: #333;
    margin-bottom: 10px;
    text-align: center;
    font-size: 28px;
}
.container p {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
    font-style: italic;
}
.form-group {
    margin-bottom: 20px;
}
label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    font-weight: 500;
}
input, textarea {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 16px;
    transition: border 0.3s ease;
    font-family: inherit;
}
input:focus, textarea:focus {
    outline: none;
    border-color: #667eea;
}
button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}
.notification {
    margin-top: 20px;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: 500;
    display: block;
}
.notification.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}
.notification.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
.notification.hidden {
    display: none;
}
@media (max-width: 600px) {
    .container {
        padding: 25px;
    }
    h1 {
        font-size: 24px;
    }}
script.js (avec .env)
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


