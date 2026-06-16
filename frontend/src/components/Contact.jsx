import { useState } from "react";
import "./Contact.css";

const WEB3FORMS_ACCESS_KEY = "c4b18920-fee4-4d7a-bdb8-3a3fdcc9c9c7";

const Contact = () => {
    // Gestion de l'état local des champs du formulaire
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    // Gestion des messages de statut (sending | success | error | null)
    const [status, setStatus] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");

    // Met à jour l'état du formulaire lors de la saisie de l'utilisateur
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    // Fonction de gestion de la soumission du formulaire vers Web3Forms
    const handleSubmit = (e) => {
        e.preventDefault();

        // Réinitialisation des états de statut
        setStatus(null);
        setStatusMessage("");

        // 1. Validation du nom
        if (!formData.name.trim()) {
            setStatus("error");
            setStatusMessage("Veuillez renseigner votre nom.");
            return;
        }

        // 2. Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setStatus("error");
            setStatusMessage("Veuillez entrer une adresse e-mail valide.");
            return;
        }

        // 3. Validation du message
        if (!formData.message.trim()) {
            setStatus("error");
            setStatusMessage("Veuillez écrire un message.");
            return;
        }

        // Début de l'envoi
        setStatus("sending");
        setStatusMessage("Envoi en cours...");

        // Envoi de la requête POST vers Web3Forms
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                name: formData.name,
                email: formData.email,
                subject: formData.subject || "(Sans objet)",
                message: formData.message
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setStatus("success");
                    setStatusMessage("Votre message a bien été envoyé !");
                    setFormData({ name: "", email: "", subject: "", message: "" });
                } else {
                    throw new Error(data.message || "Erreur de soumission");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi Web3Forms :", error);
                setStatus("error");
                setStatusMessage("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
            });
    };

    return (
        <section className="contact" id="contact">
            <div className="contact__inner">
                {/* Colonne gauche : informations de contact */}
                <div className="contact__info">
                    <h2 className="contact__info-title">Contact Information</h2>
                    <div className="contact__cards-list">
                      <a href="mailto:gnamienemmanuel@gmail.com" className="contact__card">
                          <span className="contact__card-icon">✉</span>
                          <div>
                              <p className="contact__card-label">Email</p>
                              <p className="contact__card-value">gnamienemmanuel@gmail.com</p>
                          </div>
                      </a>

                      <a
                          href="https://github.com/gnamien-emmanuel"
                          target="_blank"
                          rel="noreferrer"
                          className="contact__card"
                      >
                          <span className="contact__card-icon">⌥</span>
                          <div>
                              <p className="contact__card-label">GitHub</p>
                              <p className="contact__card-value">github.com/gnamien-emmanuel</p>
                          </div>
                      </a>

                      <a
                          href="https://linkedin.com/in/gnamien-bi-emmanuel"
                          target="_blank"
                          rel="noreferrer"
                          className="contact__card"
                      >
                          <span className="contact__card-icon">in</span>
                          <div>
                              <p className="contact__card-label">LinkedIn</p>
                              <p className="contact__card-value">linkedin.com/in/gnamien-bi-emmanuel</p>
                          </div>
                      </a>
                    </div>
                </div>

                {/* ── Colonne droite : formulaire ── */}
                <div className="contact__form-wrapper">
                    <h2 className="contact__form-title">Send me a message</h2>

                    <div className="contact__form-body">
                      <form className="contact__form" onSubmit={handleSubmit}>
                          {/* Champ : Nom */}
                          <div className="form-group">
                              <label className="form-label" htmlFor="name">
                                  Name
                              </label>
                              <input
                                  id="name"
                                  type="text"
                                  className="form-input"
                                  placeholder="Your name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  disabled={status === "sending"}
                                  required
                              />
                          </div>

                          {/* Champ : Email */}
                          <div className="form-group">
                              <label className="form-label" htmlFor="email">
                                  Email
                              </label>
                              <input
                                  id="email"
                                  type="email"
                                  className="form-input"
                                  placeholder="your@email.com"
                                  value={formData.email}
                                  onChange={handleChange}
                                  disabled={status === "sending"}
                                  required
                              />
                          </div>

                          {/* Champ : Objet */}
                          <div className="form-group">
                              <label className="form-label" htmlFor="subject">
                                  Subject
                              </label>
                              <input
                                  id="subject"
                                  type="text"
                                  className="form-input"
                                  placeholder="Subject of your message"
                                  value={formData.subject}
                                  onChange={handleChange}
                                  disabled={status === "sending"}
                              />
                          </div>

                          {/* Champ : Message */}
                          <div className="form-group">
                              <label className="form-label" htmlFor="message">
                                  Message
                              </label>
                              <textarea
                                  id="message"
                                  className="form-input form-input--textarea"
                                  placeholder="Your message..."
                                  rows={5}
                                  value={formData.message}
                                  onChange={handleChange}
                                  disabled={status === "sending"}
                                  required
                              />
                          </div>

                          {/* Notification de statut */}
                          {statusMessage && (
                              <div className={`contact__status contact__status--${status}`}>
                                  {statusMessage}
                              </div>
                          )}

                          {/* Bouton de soumission */}
                          <button
                              type="submit"
                              className="btn btn--primary contact__submit"
                              disabled={status === "sending"}
                          >
                              {status === "sending" ? "Sending..." : "Send Message"}
                          </button>
                      </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
