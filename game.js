'use strict';

// ---------------------------------------------------------------- data
// TEF-oriented themes: the situations the exam (and life in French) actually tests
const THEME_ICON = { travail:'💼', logement:'🏠', sante:'🩺', demarches:'📋',
  argent:'💶', etudes:'🎓', opinion:'💬', quotidien:'🛒', verbes:'⚡' };

const VOCAB = [
  // 💼 le travail
  { fr:"l'entreprise", es:'la empresa', theme:'travail' }, { fr:'le salaire', es:'el sueldo', theme:'travail' },
  { fr:"l'entretien", es:'la entrevista (de trabajo)', theme:'travail' }, { fr:'le patron', es:'el jefe', theme:'travail' },
  { fr:'la réunion', es:'la reunión', theme:'travail' }, { fr:'le congé', es:'el permiso / las vacaciones', theme:'travail' },
  { fr:'la formation', es:'la formación', theme:'travail' }, { fr:'embaucher', es:'contratar', theme:'travail' },
  { fr:'démissionner', es:'renunciar', theme:'travail' },
  // 🏠 le logement
  { fr:'le loyer', es:'el alquiler', theme:'logement' }, { fr:'le bail', es:'el contrato de alquiler', theme:'logement' },
  { fr:'le propriétaire', es:'el propietario', theme:'logement' }, { fr:'le locataire', es:'el inquilino', theme:'logement' },
  { fr:'le quartier', es:'el barrio', theme:'logement' }, { fr:'les charges', es:'los gastos (del piso)', theme:'logement' },
  { fr:'déménager', es:'mudarse', theme:'logement' }, { fr:'meublé', es:'amueblado', theme:'logement' },
  { fr:'la colocation', es:'el piso compartido', theme:'logement' },
  // 🩺 la santé
  { fr:'le médecin', es:'el médico', theme:'sante' }, { fr:"l'ordonnance", es:'la receta médica', theme:'sante' },
  { fr:'la douleur', es:'el dolor', theme:'sante' }, { fr:"l'assurance", es:'el seguro', theme:'sante' },
  { fr:'le traitement', es:'el tratamiento', theme:'sante' }, { fr:'guérir', es:'curarse', theme:'sante' },
  { fr:"la salle d'attente", es:'la sala de espera', theme:'sante' }, { fr:'le vaccin', es:'la vacuna', theme:'sante' },
  { fr:'blessé', es:'herido', theme:'sante' },
  // 📋 les démarches (papeleo / trámites)
  { fr:'le dossier', es:'el expediente', theme:'demarches' }, { fr:'le formulaire', es:'el formulario', theme:'demarches' },
  { fr:'la demande', es:'la solicitud', theme:'demarches' }, { fr:'le délai', es:'el plazo', theme:'demarches' },
  { fr:'la mairie', es:'el ayuntamiento', theme:'demarches' }, { fr:'le justificatif', es:'el comprobante', theme:'demarches' },
  { fr:'la carte de séjour', es:'el permiso de residencia', theme:'demarches' }, { fr:'renouveler', es:'renovar', theme:'demarches' },
  { fr:'signer', es:'firmar', theme:'demarches' },
  // 💶 l'argent
  { fr:'le compte', es:'la cuenta (bancaria)', theme:'argent' }, { fr:'le virement', es:'la transferencia', theme:'argent' },
  { fr:'les frais', es:'las comisiones / los gastos', theme:'argent' }, { fr:"l'impôt", es:'el impuesto', theme:'argent' },
  { fr:'le prêt', es:'el préstamo', theme:'argent' }, { fr:'la facture', es:'la factura', theme:'argent' },
  { fr:'économiser', es:'ahorrar', theme:'argent' }, { fr:'dépenser', es:'gastar', theme:'argent' },
  { fr:'le reçu', es:'el recibo', theme:'argent' },
  // 🎓 les études
  { fr:"l'inscription", es:'la inscripción', theme:'etudes' }, { fr:'le diplôme', es:'el título', theme:'etudes' },
  { fr:'le niveau', es:'el nivel', theme:'etudes' }, { fr:'la note', es:'la nota', theme:'etudes' },
  { fr:"l'épreuve", es:'la prueba / el examen', theme:'etudes' }, { fr:'réussir', es:'aprobar', theme:'etudes' },
  { fr:'échouer', es:'reprobar / suspender', theme:'etudes' }, { fr:'la bourse', es:'la beca', theme:'etudes' },
  { fr:'le stage', es:'las prácticas', theme:'etudes' },
  // 💬 l'opinion — conectores, oro puro para el TEF oral y escrito
  { fr:'cependant', es:'sin embargo', theme:'opinion' }, { fr:"d'abord", es:'primero / en primer lugar', theme:'opinion' },
  { fr:'ensuite', es:'luego / después', theme:'opinion' }, { fr:'enfin', es:'finalmente', theme:'opinion' },
  { fr:'donc', es:'por lo tanto', theme:'opinion' }, { fr:'par contre', es:'en cambio', theme:'opinion' },
  { fr:'malgré', es:'a pesar de', theme:'opinion' }, { fr:"d'ailleurs", es:'además / por cierto', theme:'opinion' },
  { fr:'selon moi', es:'en mi opinión', theme:'opinion' },
  // 🛒 le quotidien
  { fr:'les courses', es:'las compras', theme:'quotidien' }, { fr:"l'horaire", es:'el horario', theme:'quotidien' },
  { fr:'le trajet', es:'el trayecto', theme:'quotidien' }, { fr:'la météo', es:'el clima / el tiempo', theme:'quotidien' },
  { fr:'le voisin', es:'el vecino', theme:'quotidien' }, { fr:'les embouteillages', es:'el atasco / el tráfico', theme:'quotidien' },
  { fr:'en retard', es:'atrasado / tarde', theme:'quotidien' }, { fr:'tôt', es:'temprano', theme:'quotidien' },
  { fr:'la grève', es:'la huelga', theme:'quotidien' },
  // ⚡ les verbes utiles
  { fr:'postuler', es:'postularse / solicitar (empleo)', theme:'verbes' }, { fr:'remplir', es:'rellenar', theme:'verbes' },
  { fr:'joindre', es:'adjuntar', theme:'verbes' }, { fr:'prévenir', es:'avisar', theme:'verbes' },
  { fr:'exiger', es:'exigir', theme:'verbes' }, { fr:'améliorer', es:'mejorar', theme:'verbes' },
  { fr:'augmenter', es:'aumentar', theme:'verbes' }, { fr:'éviter', es:'evitar', theme:'verbes' },
  { fr:'obtenir', es:'conseguir / obtener', theme:'verbes' },
  // --- extension ---
  // 💼 travail
  { fr:'le chômage', es:'el desempleo', theme:'travail' }, { fr:'le contrat', es:'el contrato', theme:'travail' },
  { fr:'le collègue', es:'el compañero de trabajo', theme:'travail' }, { fr:'le poste', es:'el puesto', theme:'travail' },
  { fr:'la candidature', es:'la candidatura', theme:'travail' }, { fr:'le CV', es:'el currículum', theme:'travail' },
  { fr:"l'équipe", es:'el equipo', theme:'travail' }, { fr:'le syndicat', es:'el sindicato', theme:'travail' },
  { fr:'la retraite', es:'la jubilación', theme:'travail' }, { fr:'gérer', es:'gestionar', theme:'travail' },
  { fr:'licencier', es:'despedir', theme:'travail' },
  // 🏠 logement
  { fr:"l'immeuble", es:'el edificio', theme:'logement' }, { fr:"l'ascenseur", es:'el ascensor', theme:'logement' },
  { fr:'le rez-de-chaussée', es:'la planta baja', theme:'logement' }, { fr:'la pièce', es:'la habitación / el cuarto', theme:'logement' },
  { fr:'le chauffage', es:'la calefacción', theme:'logement' }, { fr:'les travaux', es:'las obras', theme:'logement' },
  { fr:'la caution', es:'la fianza', theme:'logement' }, { fr:"l'étage", es:'la planta / el piso', theme:'logement' },
  { fr:'emménager', es:'instalarse (en una casa)', theme:'logement' }, { fr:'louer', es:'alquilar', theme:'logement' },
  { fr:'le voisinage', es:'el vecindario', theme:'logement' },
  // 🩺 santé
  { fr:'la maladie', es:'la enfermedad', theme:'sante' }, { fr:'la fièvre', es:'la fiebre', theme:'sante' },
  { fr:'le rhume', es:'el resfriado', theme:'sante' }, { fr:'la pharmacie', es:'la farmacia', theme:'sante' },
  { fr:'le comprimé', es:'la pastilla', theme:'sante' }, { fr:'les urgences', es:'las urgencias', theme:'sante' },
  { fr:"l'infirmier", es:'el enfermero', theme:'sante' }, { fr:'tousser', es:'toser', theme:'sante' },
  { fr:'se sentir', es:'sentirse', theme:'sante' }, { fr:'la grippe', es:'la gripe', theme:'sante' },
  { fr:'la piqûre', es:'la inyección', theme:'sante' },
  // 📋 démarches
  { fr:'le passeport', es:'el pasaporte', theme:'demarches' }, { fr:'la préfecture', es:'la prefectura (extranjería)', theme:'demarches' },
  { fr:"l'attestation", es:'el certificado', theme:'demarches' }, { fr:"la pièce d'identité", es:'el documento de identidad', theme:'demarches' },
  { fr:'le rendez-vous', es:'la cita', theme:'demarches' }, { fr:'la photocopie', es:'la fotocopia', theme:'demarches' },
  { fr:'valable', es:'válido', theme:'demarches' }, { fr:'expirer', es:'caducar', theme:'demarches' },
  { fr:'déposer', es:'presentar / entregar', theme:'demarches' }, { fr:'la naissance', es:'el nacimiento', theme:'demarches' },
  { fr:'la signature', es:'la firma', theme:'demarches' },
  // 💶 argent
  { fr:'la banque', es:'el banco', theme:'argent' }, { fr:'le distributeur', es:'el cajero automático', theme:'argent' },
  { fr:'les espèces', es:'el efectivo', theme:'argent' }, { fr:'la carte bancaire', es:'la tarjeta bancaria', theme:'argent' },
  { fr:'le montant', es:'el importe', theme:'argent' }, { fr:'la dette', es:'la deuda', theme:'argent' },
  { fr:'le budget', es:'el presupuesto', theme:'argent' }, { fr:'gratuit', es:'gratis', theme:'argent' },
  { fr:'cher', es:'caro', theme:'argent' }, { fr:'rembourser', es:'reembolsar', theme:'argent' },
  { fr:'le retrait', es:'el retiro (de dinero)', theme:'argent' },
  // 🎓 études
  { fr:'le cours', es:'la clase / el curso', theme:'etudes' }, { fr:'le devoir', es:'la tarea / el deber', theme:'etudes' },
  { fr:'la rentrée', es:'la vuelta a clases', theme:'etudes' }, { fr:"l'élève", es:'el alumno', theme:'etudes' },
  { fr:'la matière', es:'la asignatura', theme:'etudes' }, { fr:'la moyenne', es:'el promedio', theme:'etudes' },
  { fr:'le concours', es:'la oposición / el concurso', theme:'etudes' }, { fr:'la lecture', es:'la lectura', theme:'etudes' },
  { fr:"l'écriture", es:'la escritura', theme:'etudes' }, { fr:'la traduction', es:'la traducción', theme:'etudes' },
  { fr:'enseigner', es:'enseñar', theme:'etudes' },
  // 💬 opinion
  { fr:'pourtant', es:'no obstante', theme:'opinion' }, { fr:'en revanche', es:'en cambio (formal)', theme:'opinion' },
  { fr:'grâce à', es:'gracias a', theme:'opinion' }, { fr:'à cause de', es:'por culpa de', theme:'opinion' },
  { fr:'afin de', es:'con el fin de', theme:'opinion' }, { fr:'bien que', es:'aunque', theme:'opinion' },
  { fr:'tandis que', es:'mientras que', theme:'opinion' }, { fr:'en effet', es:'en efecto', theme:'opinion' },
  { fr:'du coup', es:'así que (coloquial)', theme:'opinion' }, { fr:'autrement dit', es:'dicho de otro modo', theme:'opinion' },
  { fr:'néanmoins', es:'sin embargo (formal)', theme:'opinion' },
  // 🛒 quotidien
  { fr:'la boulangerie', es:'la panadería', theme:'quotidien' }, { fr:'le marché', es:'el mercado', theme:'quotidien' },
  { fr:'la poubelle', es:'la basura', theme:'quotidien' }, { fr:'le ménage', es:'la limpieza (del hogar)', theme:'quotidien' },
  { fr:'la lessive', es:'la colada / lavar la ropa', theme:'quotidien' }, { fr:'le repas', es:'la comida', theme:'quotidien' },
  { fr:'le loisir', es:'el pasatiempo', theme:'quotidien' }, { fr:'la randonnée', es:'la caminata / el senderismo', theme:'quotidien' },
  { fr:'le covoiturage', es:'el coche compartido', theme:'quotidien' }, { fr:"la file d'attente", es:'la cola / la fila', theme:'quotidien' },
  { fr:'quotidien', es:'diario / cotidiano', theme:'quotidien' },
  // ⚡ verbes
  { fr:'il faut', es:'hace falta / hay que', theme:'verbes' }, { fr:'devoir', es:'deber', theme:'verbes' },
  { fr:'pouvoir', es:'poder', theme:'verbes' }, { fr:'savoir', es:'saber', theme:'verbes' },
  { fr:'connaître', es:'conocer', theme:'verbes' }, { fr:'comprendre', es:'entender', theme:'verbes' },
  { fr:'attendre', es:'esperar', theme:'verbes' }, { fr:'chercher', es:'buscar', theme:'verbes' },
  { fr:'trouver', es:'encontrar', theme:'verbes' }, { fr:'envoyer', es:'enviar', theme:'verbes' },
  { fr:'recevoir', es:'recibir', theme:'verbes' },
];

// example sentence per word: [french, spanish] — shown when learning and after answering
const EX = {
  // 💼 travail
  "l'entreprise": ["Je travaille dans une grande entreprise.", "Trabajo en una empresa grande."],
  "le salaire": ["Le salaire est payé à la fin du mois.", "El sueldo se paga a fin de mes."],
  "l'entretien": ["J'ai un entretien d'embauche demain matin.", "Tengo una entrevista de trabajo mañana por la mañana."],
  "le patron": ["Mon patron est très exigeant.", "Mi jefe es muy exigente."],
  "la réunion": ["La réunion commence à neuf heures.", "La reunión empieza a las nueve."],
  "le congé": ["Je prends un congé la semaine prochaine.", "Tomo vacaciones la semana que viene."],
  "la formation": ["L'entreprise offre une formation en ligne.", "La empresa ofrece una formación en línea."],
  "embaucher": ["Ils veulent embaucher trois personnes.", "Quieren contratar a tres personas."],
  "démissionner": ["Elle a décidé de démissionner hier.", "Ella decidió renunciar ayer."],
  "le chômage": ["Il est au chômage depuis deux mois.", "Está desempleado desde hace dos meses."],
  "le contrat": ["J'ai signé un contrat d'un an.", "Firmé un contrato de un año."],
  "le collègue": ["Mes collègues sont sympathiques.", "Mis compañeros de trabajo son simpáticos."],
  "le poste": ["Ce poste demande de l'expérience.", "Este puesto requiere experiencia."],
  "la candidature": ["J'ai envoyé ma candidature lundi.", "Envié mi candidatura el lunes."],
  "le CV": ["Mettez votre CV à jour.", "Actualice su currículum."],
  "l'équipe": ["Notre équipe travaille bien ensemble.", "Nuestro equipo trabaja bien junto."],
  "le syndicat": ["Le syndicat a organisé une réunion.", "El sindicato organizó una reunión."],
  "la retraite": ["Mon père prend sa retraite cette année.", "Mi padre se jubila este año."],
  "gérer": ["Elle sait gérer les problèmes au travail.", "Ella sabe gestionar los problemas en el trabajo."],
  "licencier": ["L'usine va licencier vingt employés.", "La fábrica va a despedir a veinte empleados."],
  // 🏠 logement
  "le loyer": ["Le loyer est trop cher dans ce quartier.", "El alquiler es demasiado caro en este barrio."],
  "le bail": ["Nous avons signé un bail de trois ans.", "Firmamos un contrato de alquiler de tres años."],
  "le propriétaire": ["Le propriétaire doit réparer la porte.", "El propietario debe reparar la puerta."],
  "le locataire": ["Le locataire paie le premier du mois.", "El inquilino paga el primero de mes."],
  "le quartier": ["J'habite dans un quartier calme.", "Vivo en un barrio tranquilo."],
  "les charges": ["Les charges sont comprises dans le loyer.", "Los gastos están incluidos en el alquiler."],
  "déménager": ["Nous allons déménager en septembre.", "Nos vamos a mudar en septiembre."],
  "meublé": ["Je cherche un appartement meublé.", "Busco un apartamento amueblado."],
  "la colocation": ["La colocation coûte moins cher.", "El piso compartido cuesta menos."],
  "l'immeuble": ["L'immeuble a dix étages.", "El edificio tiene diez plantas."],
  "l'ascenseur": ["L'ascenseur est en panne aujourd'hui.", "El ascensor está averiado hoy."],
  "le rez-de-chaussée": ["La boulangerie est au rez-de-chaussée.", "La panadería está en la planta baja."],
  "la pièce": ["Cet appartement a trois pièces.", "Este apartamento tiene tres habitaciones."],
  "le chauffage": ["Le chauffage ne marche pas en hiver.", "La calefacción no funciona en invierno."],
  "les travaux": ["Il y a des travaux dans la rue.", "Hay obras en la calle."],
  "la caution": ["La caution est d'un mois de loyer.", "La fianza es de un mes de alquiler."],
  "l'étage": ["J'habite au troisième étage.", "Vivo en la tercera planta."],
  "emménager": ["Ils vont emménager la semaine prochaine.", "Van a instalarse la semana que viene."],
  "louer": ["Je veux louer un studio près du métro.", "Quiero alquilar un estudio cerca del metro."],
  "le voisinage": ["Le voisinage est très agréable ici.", "El vecindario es muy agradable aquí."],
  // 🩺 santé
  "le médecin": ["Je dois voir le médecin cet après-midi.", "Tengo que ver al médico esta tarde."],
  "l'ordonnance": ["Le médecin m'a donné une ordonnance.", "El médico me dio una receta."],
  "la douleur": ["J'ai une douleur au dos.", "Tengo un dolor de espalda."],
  "l'assurance": ["Mon assurance rembourse les médicaments.", "Mi seguro reembolsa los medicamentos."],
  "le traitement": ["Le traitement dure deux semaines.", "El tratamiento dura dos semanas."],
  "guérir": ["Tu vas guérir vite avec du repos.", "Te vas a curar rápido con descanso."],
  "la salle d'attente": ["La salle d'attente est pleine.", "La sala de espera está llena."],
  "le vaccin": ["Ce vaccin est obligatoire pour voyager.", "Esta vacuna es obligatoria para viajar."],
  "blessé": ["Il est blessé à la jambe.", "Está herido en la pierna."],
  "la maladie": ["C'est une maladie très rare.", "Es una enfermedad muy rara."],
  "la fièvre": ["L'enfant a de la fièvre depuis hier.", "El niño tiene fiebre desde ayer."],
  "le rhume": ["J'ai attrapé un rhume ce week-end.", "Pesqué un resfriado este fin de semana."],
  "la pharmacie": ["La pharmacie ferme à vingt heures.", "La farmacia cierra a las ocho de la noche."],
  "le comprimé": ["Prenez un comprimé après le repas.", "Tome una pastilla después de la comida."],
  "les urgences": ["Nous sommes allés aux urgences hier soir.", "Fuimos a urgencias anoche."],
  "l'infirmier": ["L'infirmier prend ma tension.", "El enfermero me toma la tensión."],
  "tousser": ["Il n'arrête pas de tousser la nuit.", "No para de toser por la noche."],
  "se sentir": ["Je me sens beaucoup mieux aujourd'hui.", "Me siento mucho mejor hoy."],
  "la grippe": ["La grippe arrive chaque hiver.", "La gripe llega cada invierno."],
  "la piqûre": ["L'infirmière m'a fait une piqûre.", "La enfermera me puso una inyección."],
  // 📋 démarches
  "le dossier": ["Votre dossier est complet, monsieur.", "Su expediente está completo, señor."],
  "le formulaire": ["Remplissez ce formulaire en majuscules.", "Rellene este formulario en mayúsculas."],
  "la demande": ["J'ai fait une demande de visa.", "Hice una solicitud de visado."],
  "le délai": ["Le délai est de deux semaines.", "El plazo es de dos semanas."],
  "la mairie": ["La mairie ouvre à huit heures et demie.", "El ayuntamiento abre a las ocho y media."],
  "le justificatif": ["Il faut un justificatif de domicile.", "Hace falta un comprobante de domicilio."],
  "la carte de séjour": ["Ma carte de séjour expire en juin.", "Mi permiso de residencia caduca en junio."],
  "renouveler": ["Je dois renouveler mon passeport.", "Tengo que renovar mi pasaporte."],
  "signer": ["Signez ici, en bas de la page.", "Firme aquí, al final de la página."],
  "le passeport": ["Mon passeport est encore valable.", "Mi pasaporte todavía es válido."],
  "la préfecture": ["J'ai rendez-vous à la préfecture jeudi.", "Tengo cita en la prefectura el jueves."],
  "l'attestation": ["L'école m'a donné une attestation.", "La escuela me dio un certificado."],
  "la pièce d'identité": ["Montrez une pièce d'identité, s'il vous plaît.", "Muestre un documento de identidad, por favor."],
  "le rendez-vous": ["J'ai pris rendez-vous en ligne.", "Pedí cita por internet."],
  "la photocopie": ["Apportez une photocopie du contrat.", "Traiga una fotocopia del contrato."],
  "valable": ["Ce billet est valable une journée.", "Este billete es válido por un día."],
  "expirer": ["Ma carte va expirer le mois prochain.", "Mi tarjeta va a caducar el mes que viene."],
  "déposer": ["Je vais déposer mon dossier demain.", "Voy a entregar mi expediente mañana."],
  "la naissance": ["Quelle est votre date de naissance ?", "¿Cuál es su fecha de nacimiento?"],
  "la signature": ["Il manque votre signature ici.", "Falta su firma aquí."],
  // 💶 argent
  "le compte": ["J'ai ouvert un compte à la banque.", "Abrí una cuenta en el banco."],
  "le virement": ["Le virement arrive demain matin.", "La transferencia llega mañana por la mañana."],
  "les frais": ["Cette banque ne prend pas de frais.", "Este banco no cobra comisiones."],
  "l'impôt": ["On paie les impôts au printemps.", "Pagamos los impuestos en primavera."],
  "le prêt": ["La banque a accepté mon prêt.", "El banco aceptó mi préstamo."],
  "la facture": ["La facture d'électricité a augmenté.", "La factura de la luz subió."],
  "économiser": ["J'économise pour acheter une voiture.", "Ahorro para comprar un coche."],
  "dépenser": ["Il dépense trop au restaurant.", "Gasta demasiado en el restaurante."],
  "le reçu": ["Gardez le reçu pour l'échange.", "Guarde el recibo para el cambio."],
  "la banque": ["La banque ferme à dix-sept heures.", "El banco cierra a las cinco de la tarde."],
  "le distributeur": ["Il y a un distributeur à côté du métro.", "Hay un cajero al lado del metro."],
  "les espèces": ["Vous payez en espèces ou par carte ?", "¿Paga en efectivo o con tarjeta?"],
  "la carte bancaire": ["J'ai perdu ma carte bancaire.", "Perdí mi tarjeta bancaria."],
  "le montant": ["Quel est le montant total ?", "¿Cuál es el importe total?"],
  "la dette": ["Il a remboursé toute sa dette.", "Pagó toda su deuda."],
  "le budget": ["Notre budget est très serré ce mois-ci.", "Nuestro presupuesto está muy justo este mes."],
  "gratuit": ["Le musée est gratuit le dimanche.", "El museo es gratis los domingos."],
  "cher": ["Ce restaurant est trop cher pour nous.", "Este restaurante es demasiado caro para nosotros."],
  "rembourser": ["Ils vont me rembourser le billet.", "Me van a reembolsar el billete."],
  "le retrait": ["Le retrait est limité à cinq cents euros.", "El retiro está limitado a quinientos euros."],
  // 🎓 études
  "l'inscription": ["L'inscription se fait en ligne.", "La inscripción se hace por internet."],
  "le diplôme": ["Elle a obtenu son diplôme en juin.", "Ella obtuvo su título en junio."],
  "le niveau": ["Mon niveau de français s'améliore.", "Mi nivel de francés mejora."],
  "la note": ["J'ai eu une bonne note à l'examen.", "Saqué una buena nota en el examen."],
  "l'épreuve": ["L'épreuve orale dure quinze minutes.", "La prueba oral dura quince minutos."],
  "réussir": ["Je vais réussir le TEF !", "¡Voy a aprobar el TEF!"],
  "échouer": ["Il a échoué à cause du stress.", "Reprobó por culpa del estrés."],
  "la bourse": ["Elle étudie grâce à une bourse.", "Ella estudia gracias a una beca."],
  "le stage": ["Je fais un stage dans une banque.", "Hago prácticas en un banco."],
  "le cours": ["Le cours de français commence à midi.", "La clase de francés empieza a mediodía."],
  "le devoir": ["J'ai des devoirs pour demain.", "Tengo tarea para mañana."],
  "la rentrée": ["La rentrée est début septembre.", "La vuelta a clases es a principios de septiembre."],
  "l'élève": ["Cet élève pose beaucoup de questions.", "Este alumno hace muchas preguntas."],
  "la matière": ["Ma matière préférée est l'histoire.", "Mi asignatura preferida es la historia."],
  "la moyenne": ["Il faut dix de moyenne pour passer.", "Hace falta un promedio de diez para pasar."],
  "le concours": ["Le concours est très difficile.", "La oposición es muy difícil."],
  "la lecture": ["La lecture aide à apprendre le français.", "La lectura ayuda a aprender francés."],
  "l'écriture": ["L'épreuve d'écriture dure une heure.", "La prueba de escritura dura una hora."],
  "la traduction": ["Cette traduction n'est pas correcte.", "Esta traducción no es correcta."],
  "enseigner": ["Elle veut enseigner le français.", "Ella quiere enseñar francés."],
  // 💬 opinion
  "cependant": ["C'est cher, cependant la qualité est bonne.", "Es caro, sin embargo la calidad es buena."],
  "d'abord": ["D'abord, je voudrais me présenter.", "Primero, quisiera presentarme."],
  "ensuite": ["Ensuite, nous parlerons du budget.", "Luego, hablaremos del presupuesto."],
  "enfin": ["Enfin, je voudrais conclure.", "Finalmente, quisiera concluir."],
  "donc": ["Il pleut, donc je reste à la maison.", "Llueve, por lo tanto me quedo en casa."],
  "par contre": ["J'aime la ville, par contre c'est bruyant.", "Me gusta la ciudad, en cambio es ruidosa."],
  "malgré": ["Il travaille malgré la grève.", "Trabaja a pesar de la huelga."],
  "d'ailleurs": ["D'ailleurs, il parle très bien français.", "Además, habla muy bien francés."],
  "selon moi": ["Selon moi, c'est la meilleure solution.", "En mi opinión, es la mejor solución."],
  "pourtant": ["C'est simple, pourtant il n'a pas compris.", "Es sencillo, no obstante no entendió."],
  "en revanche": ["Le loyer est cher ; en revanche, le quartier est superbe.", "El alquiler es caro; en cambio, el barrio es estupendo."],
  "grâce à": ["J'ai trouvé un emploi grâce à mon CV.", "Encontré un empleo gracias a mi currículum."],
  "à cause de": ["Le train est en retard à cause de la neige.", "El tren llega tarde por culpa de la nieve."],
  "afin de": ["Il étudie afin de réussir l'examen.", "Estudia con el fin de aprobar el examen."],
  "bien que": ["Bien que ce soit difficile, je continue.", "Aunque sea difícil, sigo."],
  "tandis que": ["Il travaille tandis que je cuisine.", "Él trabaja mientras que yo cocino."],
  "en effet": ["C'est utile, en effet.", "Es útil, en efecto."],
  "du coup": ["Il pleuvait, du coup on est restés.", "Llovía, así que nos quedamos."],
  "autrement dit": ["C'est complet ; autrement dit, il faut attendre.", "Está completo; dicho de otro modo, hay que esperar."],
  "néanmoins": ["Le projet est risqué ; néanmoins, il accepte.", "El proyecto es arriesgado; sin embargo, él acepta."],
  // 🛒 quotidien
  "les courses": ["Je fais les courses le samedi matin.", "Hago las compras el sábado por la mañana."],
  "l'horaire": ["Vérifie l'horaire du bus.", "Verifica el horario del autobús."],
  "le trajet": ["Le trajet dure quarante minutes.", "El trayecto dura cuarenta minutos."],
  "la météo": ["La météo annonce de la pluie.", "El pronóstico anuncia lluvia."],
  "le voisin": ["Mon voisin fait trop de bruit.", "Mi vecino hace demasiado ruido."],
  "les embouteillages": ["Il y a des embouteillages le matin.", "Hay atascos por la mañana."],
  "en retard": ["Désolé, je suis en retard !", "¡Perdón, llego tarde!"],
  "tôt": ["Je me lève tôt pour le travail.", "Me levanto temprano para el trabajo."],
  "la grève": ["Il y a une grève des transports aujourd'hui.", "Hay una huelga de transportes hoy."],
  "la boulangerie": ["La boulangerie ouvre à sept heures.", "La panadería abre a las siete."],
  "le marché": ["Le marché a lieu le dimanche.", "El mercado es los domingos."],
  "la poubelle": ["Sors la poubelle, s'il te plaît.", "Saca la basura, por favor."],
  "le ménage": ["Je fais le ménage le week-end.", "Hago la limpieza el fin de semana."],
  "la lessive": ["Il fait la lessive deux fois par semaine.", "Lava la ropa dos veces por semana."],
  "le repas": ["Le repas est prêt à midi.", "La comida está lista a mediodía."],
  "le loisir": ["Mon loisir préféré est la lecture.", "Mi pasatiempo preferido es la lectura."],
  "la randonnée": ["On fait une randonnée en montagne dimanche.", "Hacemos una caminata en la montaña el domingo."],
  "le covoiturage": ["Le covoiturage coûte moins cher que le train.", "El coche compartido cuesta menos que el tren."],
  "la file d'attente": ["La file d'attente est très longue.", "La cola es muy larga."],
  "quotidien": ["C'est mon trajet quotidien.", "Es mi trayecto diario."],
  // ⚡ verbes
  "postuler": ["Je vais postuler à cette offre.", "Voy a postularme a esta oferta."],
  "remplir": ["Il faut remplir toutes les cases.", "Hay que rellenar todas las casillas."],
  "joindre": ["N'oubliez pas de joindre votre CV.", "No olvide adjuntar su currículum."],
  "prévenir": ["Préviens-moi si tu es en retard.", "Avísame si llegas tarde."],
  "exiger": ["Le patron exige des résultats.", "El jefe exige resultados."],
  "améliorer": ["Je veux améliorer mon français.", "Quiero mejorar mi francés."],
  "augmenter": ["Les prix augmentent chaque année.", "Los precios aumentan cada año."],
  "éviter": ["Évite le centre-ville à cette heure.", "Evita el centro a esta hora."],
  "obtenir": ["Elle a obtenu la nationalité française.", "Ella obtuvo la nacionalidad francesa."],
  "il faut": ["Il faut arriver dix minutes avant.", "Hay que llegar diez minutos antes."],
  "devoir": ["Tu dois signer le contrat.", "Debes firmar el contrato."],
  "pouvoir": ["Est-ce que je peux payer par carte ?", "¿Puedo pagar con tarjeta?"],
  "savoir": ["Je sais parler trois langues.", "Sé hablar tres idiomas."],
  "connaître": ["Je connais bien ce quartier.", "Conozco bien este barrio."],
  "comprendre": ["Je ne comprends pas cette question.", "No entiendo esta pregunta."],
  "attendre": ["J'attends le bus depuis vingt minutes.", "Espero el autobús desde hace veinte minutos."],
  "chercher": ["Je cherche un appartement meublé.", "Busco un apartamento amueblado."],
  "trouver": ["J'ai trouvé un travail près de chez moi.", "Encontré un trabajo cerca de mi casa."],
  "envoyer": ["Envoyez le formulaire avant vendredi.", "Envíe el formulario antes del viernes."],
  "recevoir": ["J'ai reçu une lettre de la préfecture.", "Recibí una carta de la prefectura."],
};

const JOKERS = [
  { id:'perfect', icon:'💯', name:'Perfectionniste', desc:'+3 mult si toutes les réponses sont bonnes', cost:6 },
  { id:'prof', icon:'🎓', name:'Le Professeur', desc:'Les mauvaises réponses marquent quand même la moitié des jetons', cost:6 },
  { id:'chance', icon:'🎰', name:'La Chance', desc:'1 chance sur 4 : mult ×2', cost:4 },
  { id:'etoile', icon:'⭐', name:"L'Étoile", desc:'+1 mult par mot Or joué', cost:7 },
  { id:'flamme', icon:'🔥', name:'La Flamme', desc:'+6 jetons × ta meilleure série de bonnes réponses', cost:4 },
  { id:'marchand', icon:'💰', name:'Le Marchand', desc:'+€3 quand tu bats une mise', cost:4 },
];

const BLIND_NAMES = ['Petite Mise', 'Grosse Mise', 'Le Perroquet'];
const BLIND_ICONS = ['🪙', '💎', '🦜'];

// ---------------------------------------------------------------- pure logic
// bold the headword inside its example sentence — strips the article, then shrinks
// the stem until it matches, so plurals and conjugations still highlight
const BOLD_FORM = { recevoir:'reçu', pouvoir:'peux', savoir:'sais', devoir:'dois' };
function boldEx(sentence, fr) {
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const base = (BOLD_FORM[fr] || fr).replace(/^(le |la |les |l'|se )/i, '');
  for (let len = base.length; len >= Math.min(3, base.length); len--) {
    const re = new RegExp(esc(base.slice(0, len)) + '[a-zà-öø-ÿ-]*', 'i');
    if (re.test(sentence)) return sentence.replace(re, '<b>$&</b>');
  }
  return sentence;
}

function tierOf(okCount) {
  if (okCount >= 15) return 'gold';
  if (okCount >= 7) return 'silver';
  if (okCount >= 3) return 'bronze';
  return null;
}

const TIER_CHIPS = { gold:25, silver:12, bronze:5 };

function chipsFor(card, mastery) {
  const m = mastery[card.fr];
  const tier = tierOf(m ? m.ok : 0);
  return 10 + (tier ? TIER_CHIPS[tier] : 0);
}

function blindTarget(ante, blindNo) {
  const idx = (ante - 1) * 3 + (blindNo - 1);
  return Math.round(150 * Math.pow(1.5, idx));
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------- browser game
if (typeof window !== 'undefined') {

  const $ = id => document.getElementById(id);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ---------- audio: synth SFX (no files) + French TTS for pronunciation ----------
  const AC = new (window.AudioContext || window.webkitAudioContext)();
  addEventListener('pointerdown', () => AC.resume(), { once:true });
  function beep(freq, dur = 0.08, type = 'square', vol = 0.15, when = 0) {
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, AC.currentTime + when);
    g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + when + dur);
    o.connect(g).connect(AC.destination);
    o.start(AC.currentTime + when); o.stop(AC.currentTime + when + dur);
  }
  const SFX = {
    select:   () => beep(520, .05),
    deselect: () => beep(340, .05),
    chip:     () => beep(700 + Math.random() * 400, .05, 'triangle', .18),
    right:    () => { beep(620, .08); beep(930, .12, 'square', .15, .09); },
    wrong:    () => beep(150, .35, 'sawtooth', .12),
    mult:     () => [420, 530, 670].forEach((f, i) => beep(f, .08, 'square', .15, i * .07)),
    win:      () => [523, 659, 784, 1047].forEach((f, i) => beep(f, .16, 'triangle', .2, i * .12)),
    buy:      () => { beep(880, .06, 'triangle'); beep(1175, .1, 'triangle', .16, .07); },
    lose:     () => [392, 330, 262, 196].forEach((f, i) => beep(f, .2, 'sawtooth', .1, i * .16)),
  };

  let frVoice = null;
  const pickVoice = () => frVoice =
    speechSynthesis.getVoices().find(v => v.lang.startsWith('fr')) || null;
  speechSynthesis.onvoiceschanged = pickVoice;
  pickVoice();
  function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR'; if (frVoice) u.voice = frVoice;
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  // mastery persists across runs — this IS the learning progress
  const M = JSON.parse(localStorage.getItem('parole-mastery') || '{}');
  const mast = fr => M[fr] || (M[fr] = { ok:0, wrong:0, cursed:false, cure:0 });
  const saveM = () => localStorage.setItem('parole-mastery', JSON.stringify(M));

  let S = null;      // run state
  let busy = false;  // block input during animations

  // ---------- fx helpers ----------
  function float(x, y, text, cls = '') {
    const el = document.createElement('div');
    el.className = 'float ' + cls;
    el.textContent = text;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    $('fx').appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
  function floatOver(el, text, cls) {
    const r = el.getBoundingClientRect();
    float(r.left + r.width / 2 - 20, r.top - 10, text, cls);
  }
  function burst(x, y) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'spark';
      const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 100;
      p.style.left = x + 'px'; p.style.top = y + 'px';
      p.style.setProperty('--dx', Math.cos(a) * d + 'px');
      p.style.setProperty('--dy', Math.sin(a) * d - 40 + 'px');
      p.style.background = ['#ffd54a', '#4ade80', '#5cb8ff', '#ff8fab'][i % 4];
      $('fx').appendChild(p);
      setTimeout(() => p.remove(), 750);
    }
  }
  function banner(text, mult = false) {
    const b = $('banner');
    b.textContent = text;
    b.className = mult ? 'mult' : '';
    b.classList.remove('hidden');
    void b.offsetWidth; // restart animation
    b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
    setTimeout(() => b.classList.add('hidden'), 800);
  }
  function shake() {
    $('game').classList.add('shake');
    setTimeout(() => $('game').classList.remove('shake'), 450);
  }
  function rollNum(el, to) {
    const from = parseInt(el.textContent.replace(/\D/g, '')) || 0;
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 500, 1);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  // ---------- run / blind setup ----------
  function newRun() {
    const pool = shuffle(VOCAB.slice());
    S = {
      deck: pool.splice(0, 30), pool,
      ante:1, blindNo:1, money:4, jokers:[],
      hand:[], sel:new Set(), drawPile:[], discardPile:[],
      target:0, scored:0, hands:4,
      stats:{ correct:0, wrong:0, blinds:0 },
    };
    startBlind();
  }

  function startBlind() {
    S.target = blindTarget(S.ante, S.blindNo);
    S.scored = 0; S.hands = 4;
    S.drawPile = shuffle(S.deck.slice());
    S.discardPile = []; S.hand = []; S.sel.clear();
    const i = S.blindNo - 1;
    $('intro-name').textContent = BLIND_NAMES[i] + (i === 2 ? ' (Boss)' : '');
    $('intro-icon').textContent = BLIND_ICONS[i];
    $('intro-target').textContent = S.target;
    $('intro-twist').classList.toggle('hidden', i !== 2);
    $('intro-twist').textContent = '🦜 Boss : ¡responde en FRANCÉS! (español → francés)';
    showScreen('intro');
    renderHUD();
  }

  const isBoss = () => S.blindNo === 3;

  function showScreen(name) {
    ['intro', 'table', 'shop', 'over'].forEach(s =>
      $('screen-' + s).classList.toggle('hidden', s !== name));
  }

  // cursed words are drawn twice as often — the deck won't let you ignore them
  function drawOne() {
    if (!S.drawPile.length) {
      S.drawPile = shuffle(S.discardPile);
      S.discardPile = [];
    }
    if (!S.drawPile.length) return null;
    const weights = S.drawPile.map(c => mast(c.fr).cursed ? 2 : 1);
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r <= 0) return S.drawPile.splice(i, 1)[0];
    }
    return S.drawPile.pop();
  }

  function fillHand() {
    while (S.hand.length < 6) {
      const c = drawOne();
      if (!c) break;
      S.hand.push(c);
    }
  }

  // ---------- rendering ----------
  function renderHUD() {
    $('blind-name').textContent = BLIND_NAMES[S.blindNo - 1];
    $('hud-target').textContent = S.target;
    $('hud-scored').textContent = S.scored;
    $('hud-hands').textContent = S.hands;
    $('hud-money').textContent = S.money;
    $('hud-ante').textContent = S.ante;
    $('hud-deck').textContent = S.drawPile.length;
    $('joker-row').innerHTML = S.jokers.map(id => {
      const j = JOKERS.find(x => x.id === id);
      return `<div class="joker" data-jid="${j.id}">${j.icon}<div class="tip"><b>${j.name}</b><br>${j.desc}</div></div>`;
    }).join('') || '<span class="hud-sub">aucun</span>';
  }

  function cardHTML(c) {
    const m = mast(c.fr);
    const tier = tierOf(m.ok);
    const isNew = !m.taught && m.ok + m.wrong === 0;
    // boss quizzes ES→FR: a photo on the card would leak the answer, so emoji only
    const pic = (!isBoss() && typeof IMAGES !== 'undefined' && IMAGES[c.fr])
      ? `<img class="card-img" src="${IMAGES[c.fr]}" alt="">`
      : `<div class="icon">${THEME_ICON[c.theme]}</div>`;
    return `<div class="cardwrap"><div class="card ${m.cursed ? 'cursed' : ''}">
      ${isNew ? '<div class="new-tag">✨ nouveau</div>' : ''}
      ${tier ? `<div class="tier ${tier}"></div>` : ''}
      ${pic}
      <div class="fr">${c.fr}</div>
      <div class="chips">${m.cursed ? '☠ maudite' : '+' + chipsFor(c, M)}</div>
    </div></div>`;
  }

  function renderHand() {
    $('hand').innerHTML = S.hand.map(cardHTML).join('');
    [...$('hand').children].forEach((w, i) => {
      w.querySelector('.card').style.animationDelay = (i * 0.05) + 's';
      w.classList.toggle('sel', S.sel.has(i));
      w.onclick = () => toggleSelect(i);
      // Balatro-ish 3D tilt
      const card = w.querySelector('.card');
      w.onmousemove = e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 22 + 'deg');
        card.style.setProperty('--rx', (.5 - (e.clientY - r.top) / r.height) * 22 + 'deg');
      };
      w.onmouseleave = () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); };
    });
    updateControls();
  }

  function toggleSelect(i) {
    if (busy) return;
    if (S.sel.has(i)) { S.sel.delete(i); SFX.deselect(); }
    else if (S.sel.size < 5) { S.sel.add(i); SFX.select(); speak(S.hand[i].fr); }
    [...$('hand').children].forEach((w, k) => w.classList.toggle('sel', S.sel.has(k)));
    updateControls();
  }

  function updateControls() {
    $('btn-play').disabled = busy || !S.sel.size || !S.hands;
    $('combo-preview').textContent = S.sel.size
      ? `${S.sel.size} carte${S.sel.size > 1 ? 's' : ''} — chaque bonne réponse = +1 mult`
      : "Choisis jusqu'à 5 cartes";
  }

  // ---------- quiz ----------
  // first encounter is a lesson, not a test — show the meaning, then quiz from next time
  function showTeach(card) {
    return new Promise(resolve => {
      $('quiz-hint').textContent = '✨ ¡Palabra nueva!';
      $('quiz-word').textContent = card.fr;
      const [exFr, exEs] = EX[card.fr];
      $('quiz-ex').classList.add('hidden'); // may still hold the previous card's sentence
      $('quiz-speak').classList.remove('hidden');
      $('quiz-speak').onclick = () => speak(card.fr + '. ' + exFr);
      speak(card.fr + '. ' + exFr);
      const img = (typeof IMAGES !== 'undefined' && IMAGES[card.fr])
        ? `<img class="teach-img" src="${IMAGES[card.fr]}" alt="">` : '';
      $('quiz-options').innerHTML =
        `${img}<div class="teach-es">= ${card.es}</div>
         <div class="quiz-ex">« ${boldEx(exFr, card.fr)} »<br><span>${exEs}</span></div>
         <button class="opt teach-ok">¡Entendido!</button>`;
      $('quiz').classList.remove('hidden');
      $('quiz-options').querySelector('.teach-ok').onclick = () => {
        SFX.right();
        $('quiz').classList.add('hidden');
        resolve();
      };
    });
  }

  let quizStreak = 0; // consecutive correct answers, for escalating celebration

  function showQuiz(card, reversed) {
    return new Promise(resolve => {
      // same-theme distractors: forces real discrimination, not elimination by topic
      const others = shuffle(VOCAB.filter(v => v.fr !== card.fr && v.theme === card.theme)).slice(0, 3);
      const opts = shuffle([card, ...others]);
      const key = reversed ? 'fr' : 'es';
      $('quiz-hint').textContent = reversed ? '¿Cómo se dice en francés…?' : '¿Qué significa…?';
      $('quiz-word').textContent = reversed ? card.es : card.fr;
      $('quiz-options').innerHTML = opts.map(o => `<button class="opt">${o[key]}</button>`).join('');
      $('quiz-ex').classList.add('hidden');
      // speak the French word — except in boss mode, where hearing it would spoil the answer
      $('quiz-speak').classList.toggle('hidden', reversed);
      $('quiz-speak').onclick = () => speak(card.fr);
      if (!reversed) speak(card.fr);
      $('quiz').classList.remove('hidden');
      [...$('quiz-options').children].forEach((btn, i) => {
        btn.onclick = async () => {
          const ok = opts[i].fr === card.fr;
          btn.classList.add(ok ? 'right' : 'wrong');
          (ok ? SFX.right : SFX.wrong)();
          if (ok) {
            const r = btn.getBoundingClientRect();
            burst(r.left + r.width / 2, r.top + r.height / 2);
            const box = document.querySelector('.quiz-box');
            box.classList.add('correct');
            setTimeout(() => box.classList.remove('correct'), 550);
            if (++quizStreak >= 2) {
              floatOver($('quiz-word'), `🔥 ${quizStreak} de suite !`, 'gold');
              if (quizStreak % 5 === 0) shake();
            }
          } else quizStreak = 0;
          if (reversed) speak(card.fr); // reveal pronunciation after answering
          if (!ok) {
            const rightBtn = [...$('quiz-options').children][opts.findIndex(o => o.fr === card.fr)];
            rightBtn.classList.add('right');
          }
          [...$('quiz-options').children].forEach(b => b.onclick = null);
          // show the word in a real sentence — usage, not just translation
          const [exFr, exEs] = EX[card.fr];
          const img = (typeof IMAGES !== 'undefined' && IMAGES[card.fr])
            ? `<img class="teach-img small" src="${IMAGES[card.fr]}" alt="">` : '';
          $('quiz-ex').innerHTML = `${img}« ${boldEx(exFr, card.fr)} »<br><span>${exEs}</span>`;
          $('quiz-ex').classList.remove('hidden');
          await sleep(ok ? 1300 : 2600); // linger on mistakes so the answer sinks in
          $('quiz').classList.add('hidden');
          resolve(ok);
        };
      });
    });
  }

  function recordAnswer(card, ok) {
    const m = mast(card.fr);
    if (ok) {
      m.ok++; S.stats.correct++;
      if (m.cursed && ++m.cure >= 2) { m.cursed = false; m.cure = 0; }
    } else {
      m.wrong++; S.stats.wrong++;
      m.cursed = true; m.cure = 0;
    }
    saveM();
  }

  // ---------- playing a hand ----------
  async function playHand() {
    if (busy || !S.sel.size) return;
    busy = true; updateControls();
    S.hands--; renderHUD();

    const idxs = [...S.sel].sort((a, b) => a - b);
    const cards = idxs.map(i => S.hand[i]);
    const els = idxs.map(i => $('hand').children[i].querySelector('.card'));
    const results = [];
    let streak = 0, bestStreak = 0;

    // quiz each played card (first-ever encounter: teach instead, free points)
    for (let k = 0; k < cards.length; k++) {
      const m = mast(cards[k].fr);
      if (!m.taught && m.ok + m.wrong === 0) {
        m.taught = 1; saveM();
        await showTeach(cards[k]);
        results.push({ ok:true, wasCursed:false });
        streak++;
      } else {
        const wasCursed = m.cursed;
        const ok = await showQuiz(cards[k], isBoss());
        recordAnswer(cards[k], ok);
        results.push({ ok, wasCursed });
        streak = ok ? streak + 1 : 0;
      }
      bestStreak = Math.max(bestStreak, streak);
    }

    // mult = correct answers: knowing French IS the strategy
    const correct = results.filter(r => r.ok).length;
    banner(`${correct}/${cards.length} bonnes  ×${Math.max(1, correct)}`, true);
    SFX.mult();
    await sleep(700);

    const has = id => S.jokers.includes(id);
    let chips = 0;

    for (let k = 0; k < cards.length; k++) {
      const { ok, wasCursed } = results[k];
      let c = 0;
      if (ok && !wasCursed) c = chipsFor(cards[k], M);
      else if (!ok && has('prof')) c = Math.floor(chipsFor(cards[k], M) / 2);
      chips += c;
      els[k].classList.add(c > 0 ? 'scoring' : 'failed');
      floatOver(els[k], c > 0 ? `+${c}` : '✗', c > 0 ? '' : 'red');
      if (c > 0) SFX.chip();
      await sleep(300);
    }

    // joker super-power triggers
    let mult = Math.max(1, correct);
    const trigger = async (id, text) => {
      const el = $('joker-row').querySelector(`[data-jid="${id}"]`);
      if (el) { el.classList.add('pulse'); floatOver(el, text, 'gold'); }
      await sleep(450);
      if (el) el.classList.remove('pulse');
    };
    if (has('flamme') && bestStreak > 1) { chips += 6 * bestStreak; await trigger('flamme', `+${6 * bestStreak}`); }
    if (has('perfect') && results.every(r => r.ok)) { mult += 3; await trigger('perfect', '+3 mult'); }
    if (has('etoile')) {
      const golds = cards.filter(c => tierOf(mast(c.fr).ok) === 'gold').length;
      if (golds) { mult += golds; await trigger('etoile', `+${golds} mult`); }
    }
    if (has('chance') && Math.random() < 0.25) { mult *= 2; await trigger('chance', '×2 !'); }

    const total = Math.round(chips * mult);
    banner(`${chips} × ${mult} = ${total}`, true);
    SFX.mult();
    if (total >= 150) shake();
    S.scored += total;
    rollNum($('hud-scored'), S.scored);
    await sleep(900);

    // clean up hand
    idxs.reverse().forEach(i => S.discardPile.push(S.hand.splice(i, 1)[0]));
    S.sel.clear();

    if (S.scored >= S.target) return winBlind();
    if (!S.hands) return gameOver(false);
    fillHand(); renderHand(); renderHUD();
    busy = false; updateControls();
  }

  // ---------- shop ----------
  async function winBlind() {
    S.stats.blinds++;
    const reward = 4 + S.hands + (S.jokers.includes('marchand') ? 3 : 0);
    S.money += reward;
    banner(`Mise battue ! +€${reward}`);
    SFX.win();
    shake();
    await sleep(1100);
    busy = false;
    openShop();
  }

  function openShop() {
    const items = [];
    const forSale = shuffle(JOKERS.filter(j => !S.jokers.includes(j.id))).slice(0, 3);
    forSale.forEach(j => items.push({ ...j, kind:'joker' }));
    if (S.pool.length >= 5)
      items.push({ id:'pack', kind:'pack', icon:'📦', name:'Paquet de Mots',
        desc:'5 nouveaux mots entrent dans ton deck', cost:4 });

    $('shop-items').innerHTML = items.map((it, i) => `
      <div class="shop-item" style="animation-delay:${i * .08}s" data-i="${i}">
        <div class="icon">${it.icon}</div><div class="name">${it.name}</div>
        <div class="desc">${it.desc}</div>
        <button class="btn buy">€${it.cost}</button>
      </div>`).join('');

    [...$('shop-items').children].forEach((el, i) => {
      el.querySelector('.buy').onclick = () => {
        const it = items[i];
        if (S.money < it.cost || el.classList.contains('sold')) return;
        if (it.kind === 'joker' && S.jokers.length >= 5) { banner('5 pouvoirs max !'); return; }
        S.money -= it.cost;
        el.classList.add('sold');
        SFX.buy();
        if (it.kind === 'joker') { S.jokers.push(it.id); floatOver(el, it.name, 'gold'); }
        else {
          const fresh = S.pool.splice(0, 5);
          S.deck.push(...fresh);
          el.querySelector('.desc').innerHTML = fresh.map(w => `<b>${w.fr}</b> = ${w.es}`).join('<br>');
        }
        renderHUD();
      };
    });
    showScreen('shop');
    renderHUD();
  }

  function nextBlind() {
    S.blindNo++;
    if (S.blindNo > 3) { S.blindNo = 1; S.ante++; }
    startBlind();
  }

  // ---------- game over ----------
  function gameOver() {
    const cursed = S.deck.filter(c => mast(c.fr).cursed);
    const golds = S.deck.filter(c => tierOf(mast(c.fr).ok) === 'gold').length;
    $('over-title').textContent = 'Partie terminée !';
    $('over-stats').innerHTML =
      `Ante <b class="gold">${S.ante}</b> · Mises battues : <b>${S.stats.blinds}</b><br>
       Bonnes réponses : <b class="blue">${S.stats.correct}</b> · Erreurs : <b class="red">${S.stats.wrong}</b><br>
       Mots Or dans ton deck : <b class="gold">${golds}</b>`;
    $('over-words').innerHTML = cursed.length
      ? `<b>☠ À réviser :</b><br>` + cursed.map(c => `${c.fr} = ${c.es}`).join(' · ')
      : '✨ Aucun mot maudit. Chapeau !';
    SFX.lose();
    showScreen('over');
    busy = false;
  }

  // ---------- boot ----------
  $('btn-start').onclick = () => { fillHand(); renderHand(); renderHUD(); showScreen('table'); };
  $('btn-play').onclick = playHand;
  $('btn-shop-continue').onclick = nextBlind;
  $('btn-newrun').onclick = newRun;
  newRun();

} else {
  // ponytail: smoke test — run `node game.js`
  console.assert(tierOf(15) === 'gold' && tierOf(7) === 'silver' && tierOf(3) === 'bronze' && tierOf(2) === null, 'tiers');
  console.assert(chipsFor({ fr:'x' }, { x:{ ok:20 } }) === 35, 'gold chips');
  console.assert(blindTarget(1, 1) === 150 && blindTarget(1, 3) > blindTarget(1, 2), 'targets');
  console.assert(new Set(VOCAB.map(v => v.fr)).size === VOCAB.length, 'no duplicate words');
  // every theme needs 4+ words so the quiz can build same-theme distractors
  Object.keys(THEME_ICON).forEach(t =>
    console.assert(VOCAB.filter(v => v.theme === t).length >= 4, 'thin theme: ' + t));
  console.assert(VOCAB.every(v => v.fr && v.es && THEME_ICON[v.theme]), 'malformed entry');
  VOCAB.forEach(v => console.assert(EX[v.fr] && EX[v.fr].length === 2, 'missing example: ' + v.fr));
  VOCAB.forEach(v => console.assert(boldEx(EX[v.fr][0], v.fr).includes('<b>'), 'no bold match: ' + v.fr));
  console.log(`ok — ${VOCAB.length} words, ${JOKERS.length} jokers`);
}
