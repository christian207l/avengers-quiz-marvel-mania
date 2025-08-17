import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Trophy, Play, Loader2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

import ironManImg from '@/assets/iron-man.jpg';
import captainAmericaImg from '@/assets/captain-america.jpg';
import thorImg from '@/assets/thor.jpg';
import hulkImg from '@/assets/hulk.jpg';
import blackWidowImg from '@/assets/black-widow.jpg';
import avengersHeroImg from '@/assets/avengers-hero.jpg';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  image: string;
  heroName: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é o nome real do Homem de Ferro?",
    options: ["Tony Stark", "Bruce Wayne", "Peter Parker", "Steve Rogers"],
    correctAnswer: 0,
    image: ironManImg,
    heroName: "Iron Man"
  },
  {
    id: 2,
    question: "De qual país é originário o Capitão América?",
    options: ["Canadá", "Reino Unido", "Estados Unidos", "França"],
    correctAnswer: 2,
    image: captainAmericaImg,
    heroName: "Captain America"
  },
  {
    id: 3,
    question: "Qual é o nome do martelo do Thor?",
    options: ["Stormbreaker", "Gungnir", "Mjolnir", "Hofund"],
    correctAnswer: 2,
    image: thorImg,
    heroName: "Thor"
  },
  {
    id: 4,
    question: "Qual é o nome real do Hulk?",
    options: ["Bruce Banner", "Bruce Wayne", "Barry Allen", "Ben Parker"],
    correctAnswer: 0,
    image: hulkImg,
    heroName: "Hulk"
  },
  {
    id: 5,
    question: "Qual é a especialidade da Viúva Negra?",
    options: ["Magia", "Tecnologia", "Espionagem", "Força"],
    correctAnswer: 2,
    image: blackWidowImg,
    heroName: "Black Widow"
  },
  {
    id: 6,
    question: "Em que filme os Vingadores se unem pela primeira vez?",
    options: ["Iron Man", "Thor", "The Avengers", "Captain America"],
    correctAnswer: 2,
    image: ironManImg,
    heroName: "Avengers"
  },
  {
    id: 7,
    question: "Qual é a fonte de poder do reator arc do Tony Stark?",
    options: ["Tesseract", "Vibranium", "Palladium", "Uridium"],
    correctAnswer: 1,
    image: ironManImg,
    heroName: "Iron Man"
  },
  {
    id: 8,
    question: "Quantas Joias do Infinito existem?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    image: thorImg,
    heroName: "Infinity Stones"
  },
  {
    id: 9,
    question: "Qual herói não tem superpoderes naturais?",
    options: ["Thor", "Hulk", "Homem de Ferro", "Capitão América"],
    correctAnswer: 2,
    image: ironManImg,
    heroName: "Iron Man"
  },
  {
    id: 10,
    question: "Qual é o metal do escudo do Capitão América?",
    options: ["Adamantium", "Vibranium", "Ferro", "Titânio"],
    correctAnswer: 1,
    image: captainAmericaImg,
    heroName: "Captain America"
  }
];

export const Quiz = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startGame = () => {
    setIsLoading(true);
    // Simula carregamento com delay
    setTimeout(() => {
      setIsLoading(false);
      setGameStarted(true);
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
    setGameStarted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "🎉 Incrível! Você é um verdadeiro herói!";
    if (percentage >= 70) return "👏 Muito bem! Você conhece os Vingadores!";
    if (percentage >= 50) return "👍 Bom trabalho! Continue estudando!";
    return "💪 Continue tentando! Todo herói precisa treinar!";
  };

  // Tela de carregamento
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center bg-gradient-to-br from-card to-muted border-border animate-fade-in">
          <div className="mb-6">
            <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Carregando Quiz...
            </h2>
            <p className="text-muted-foreground">
              Preparando as perguntas dos heróis
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Tela inicial
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={avengersHeroImg}
            alt="Avengers"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl animate-fade-in">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-glow">
              QUIZ DOS
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              VINGADORES
            </h2>
          </div>

          <div className="mb-8 space-y-4">
            <p className="text-xl md:text-2xl text-foreground mb-4">
              Teste seus conhecimentos sobre os heróis mais poderosos da Terra
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                <span>10 perguntas épicas</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span>Sistema de pontuação</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Imagens dos heróis</span>
              </div>
            </div>
          </div>

          <Button
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold text-xl px-12 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-glow"
          >
            <Play className="mr-3 h-6 w-6" />
            INICIAR PARTIDA
          </Button>

          <div className="mt-8 text-sm text-muted-foreground">
            Pressione o botão para começar sua jornada heroica
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 text-center bg-gradient-to-br from-card to-muted border-border animate-fade-in">
          <div className="mb-6">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-accent animate-glow" />
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Quiz Concluído!
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              {getScoreMessage()}
            </p>
          </div>
          
          <div className="mb-6">
            <div className="text-4xl font-bold mb-2 text-primary">
              {score}/{questions.length}
            </div>
            <div className="text-lg text-muted-foreground">
              {Math.round((score / questions.length) * 100)}% de acertos
            </div>
          </div>

          <Button onClick={restartQuiz} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            <RotateCcw className="mr-2 h-4 w-4" />
            Nova Partida
          </Button>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Quiz dos Vingadores
          </h1>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-sm">
              Pergunta {currentQuestion + 1} de {questions.length}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Pontuação: {score}
            </Badge>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-6 bg-gradient-to-br from-card to-muted border-border animate-slide-in">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Hero Image */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={question.image}
                  alt={question.heroName}
                  className="w-64 h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                <Badge className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground">
                  {question.heroName}
                </Badge>
              </div>
            </div>

            {/* Question and Answers */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option, index) => {
                  let buttonVariant: "default" | "destructive" | "secondary" = "secondary";
                  let icon = null;

                  if (showResult) {
                    if (index === question.correctAnswer) {
                      buttonVariant = "default";
                      icon = <CheckCircle className="w-4 h-4" />;
                    } else if (index === selectedAnswer && index !== question.correctAnswer) {
                      buttonVariant = "destructive";
                      icon = <XCircle className="w-4 h-4" />;
                    }
                  }

                  return (
                    <Button
                      key={index}
                      variant={buttonVariant}
                      className={cn(
                        "w-full justify-start text-left h-auto p-4 transition-all duration-200",
                        !showResult && "hover:bg-primary/10 hover:border-primary",
                        selectedAnswer === index && !showResult && "bg-primary/20"
                      )}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option}</span>
                        {icon}
                      </div>
                    </Button>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-6 animate-fade-in">
                  <Button
                    onClick={nextQuestion}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  >
                    {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};