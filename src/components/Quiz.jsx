import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Frown, Smile, Heart, RefreshCcw } from 'lucide-react';

const questions = [
  {
    question: "¿Cuál es mi comida favorita que siempre me hace sonreír?",
    options: ["Pizza de queso", "Ceviche ecuatoriano", "Salchipapa", "Arroz de fiesta"],
    correctAnswers: ["Arroz de fiesta"]
  },
  {
    question: "¿En qué parte de mi cuerpo tengo más lunares?",
    options: ["En la espalda", "En los brazos", "En los hombros", "En el picho"],
    correctAnswers: ["En los brazos"]
  },
  {
    question: "¿Cuál fue el primer lugar al que fuimos o donde nos vimos por primera vez?",
    options: ["En la universidad", "En un parque", "En una cafetería", "En la playa"],
    correctAnswers: ["En la playa"]
  },
  {
    question: "Si ganara la lotería hoy, ¿qué es lo primero que compraría?",
    options: ["Un auto deportivo", "Una casa para nuestra familia", "Componentes para la compu", "Hotwheels"],
    correctAnswers: ["Una casa para nuestra familia"]
  },
  {
    question: "¿Cuál es ese hábito o manía mía que te parece más tierno (o divertido)?",
    options: [
      "Cómo me río cuando veo algo gracioso", 
      "Cómo me concentro cuando juego videojuegos", 
      "Cómo me quedo dormido rápido", 
      "Como me enojo enseñandote pero igual me gusta hacerlo"
    ],
    correctAnswers: ["Cómo me concentro cuando juego videojuegos", "Como me enojo enseñandote pero igual me gusta hacerlo"]
  },
  {
    question: "¿Qué película o serie elegiría siempre para pasar una tarde juntos?",
    options: ["Acción/Ficción", "Comedia", "Documentales de tecnología", "Terror"],
    correctAnswers: ["Comedia"]
  },
  {
    question: "¿Cuál es mi mayor sueño profesional que te he contado?",
    options: [
      "Trabajar en una gran empresa de software", 
      "Tener mi propia empresa de desarrollo", 
      "Viajar por el mundo creando apps", 
      "Ser profesor y enseñar informática"
    ],
    correctAnswers: ["Viajar por el mundo creando apps"]
  },
  {
    question: "¿Qué es lo que más me gusta que hagamos cuando estamos a solas?",
    options: [
      "Ver películas abrazados", 
      "Salir a caminar a ver el atardecer", 
      "Salir a comer algo rico", 
      "Hacer el cuchis cuchis"
    ],
    correctAnswers: ["Hacer el cuchis cuchis"]
  },
  {
    question: "¿Cuál es mi talento secreto o algo que se me da muy bien?",
    options: [
      "Cocinar algo sencillo", 
      "Resolver problemas técnicos de computadoras y programas", 
      "Cantar en la ducha", 
      "Hacerte feliz"
    ],
    correctAnswers: ["Resolver problemas técnicos de computadoras y programas", "Hacerte feliz"]
  },
  {
    question: "¿Cuál es ese pequeño detalle que siempre me hace sentir amado por ti?",
    options: [
      "Tus mensajes de buenos días", 
      "Cuando me acaricias el cabello", 
      "Cuando me das un beso inesperado", 
      "Cuando me das atención que nadie más tiene"
    ],
    correctAnswers: ["Cuando me das atención que nadie más tiene"]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, message: string }

  const handleAnswer = (option) => {
    const isCorrect = questions[currentQuestion].correctAnswers.includes(option);
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback({
        isCorrect: true,
        message: "¡Correcto mi amor! ❤️"
      });
    } else {
      setFeedback({
        isCorrect: false,
        message: `La respuesta correcta era: ${questions[currentQuestion].correctAnswers.join(" o ")}`
      });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        if (score + (isCorrect ? 1 : 0) === 10) {
          triggerFireworks();
        }
      }
    }, 3000);
  };

  const triggerFireworks = () => {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setFeedback(null);
  };

  const renderResult = () => {
    if (score === 10) {
      return (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¡10/10!</h2>
          <p style={{ fontSize: '1.5rem', color: '#d63384' }}>
            Felicidades eres la mujer perfecta para mi, me conoces tanto... ❤️
          </p>
        </div>
      );
    } else if (score >= 8) {
      return (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ff4b72', marginBottom: '1rem' }}>¡Lo hiciste increíble, mi amor! ({score}/10)</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#444' }}>
            Sabía que me conocías muchísimo, pero esto lo demuestra. Gracias por prestar atención a cada pequeño detalle sobre nosotros, sobre mí, y sobre lo que nos hace felices. Te amo más de lo que las palabras pueden expresar, y saber que me guardas así en tu mente y tu corazón, me hace el hombre más afortunado del mundo. Eres mi lugar seguro y mi ingeniera favorita. ❤️
          </p>
        </div>
      );
    } else if (score >= 5) {
      return (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#f39c12', marginBottom: '1rem' }}>¡Casi, casi! ({score}/10)</h2>
          <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '2rem' }}>
            Tuviste algunas buenas, pero sé que puedes hacerlo mejor.
          </p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Puedes volver a intentarlo una vez más 😁</p>
          <button className="btn" onClick={resetQuiz} style={{ marginTop: '2rem' }}>
            <RefreshCcw size={20} /> Intentar de nuevo
          </button>
        </div>
      );
    } else {
      return (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#e74c3c', marginBottom: '1rem' }}>Ay no... ({score}/10)</h2>
          <Frown size={80} color="#e74c3c" style={{ margin: '1rem auto', display: 'block' }} />
          <p style={{ fontSize: '1.5rem', color: '#e74c3c', fontWeight: 'bold', marginBottom: '2rem' }}>
            No me amas nadita 😢😭
          </p>
          <button className="btn btn-secondary" onClick={resetQuiz}>
            <RefreshCcw size={20} /> Intentar de nuevo para demostrar tu amor
          </button>
        </div>
      );
    }
  };

  return (
    <div className="quiz-container fade-in">
      {!showResult ? (
        <div className="glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: '#888' }}>
            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span>Puntos: {score}</span>
          </div>
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', minHeight: '60px' }}>
            {questions[currentQuestion].question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                className="option-btn"
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
                style={{
                  opacity: feedback !== null ? 0.7 : 1,
                  cursor: feedback !== null ? 'default' : 'pointer'
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div style={{ 
              marginTop: '2rem', 
              padding: '1rem', 
              borderRadius: '12px',
              backgroundColor: feedback.isCorrect ? '#e8f8f5' : '#fdedec',
              color: feedback.isCorrect ? '#27ae60' : '#c0392b',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 'bold',
              animation: 'fadeIn 0.3s ease'
            }}>
              {feedback.isCorrect ? <Smile size={24} /> : <Frown size={24} />}
              {feedback.message}
            </div>
          )}
        </div>
      ) : (
        renderResult()
      )}
    </div>
  );
};

export default Quiz;
